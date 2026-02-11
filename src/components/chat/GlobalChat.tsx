import React, { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase';
import {
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp,
    Timestamp,
    where,
    getDocs,
    writeBatch,
    doc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';
import {
    MessageSquare,
    X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

// Sub-components & Utils
import { ChatSidebar } from './ChatSidebar';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { ChatMessageList } from './ChatMessageList';
import { TacticalBoard } from './TacticalBoard';
import { PUBLIC_ROOMS } from './constants';
import { Message } from './types';
import { compressImage } from './utils';

export const GlobalChat: React.FC = () => {
    const { user, deviceId } = useAuth();
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isBoardOpen, setIsBoardOpen] = useState(false);

    // Identity Logic
    // If using the shared demo account, use deviceId as the identifier.
    // Otherwise use the actual specific user ID.
    const isDemoAccount = user?.email === 'BlasterBoy28@gmail.com';
    const effectiveUid = isDemoAccount ? deviceId : (user?.uid || '');

    // Persistent Name for Demo Account
    // We cannot use user.displayName because it's shared.
    // We must use localStorage to persist name per device.
    const [demoName, setDemoName] = useState(() => {
        return localStorage.getItem(`chat_name_${deviceId}`) || '';
    });

    const effectiveDisplayName = isDemoAccount
        ? (demoName || 'Demo Student')
        : (user?.displayName || 'Anonymous Gamer');

    // Room State
    const [activeRoom, setActiveRoom] = useState('general');
    const [privateRooms, setPrivateRooms] = useState<string[]>([]);

    // Data States
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    // Settings States
    // Initialize custom name from effective display name
    const [customName, setCustomName] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [indexError, setIndexError] = useState<string | null>(null);

    // Initialize custom name
    useEffect(() => {
        if (effectiveDisplayName) {
            setCustomName(effectiveDisplayName);
        }
    }, [effectiveDisplayName]);

    // Check URL Params or Pending Room on Mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let roomParam = params.get('room');

        // Check for pending room from pre-login (sessionStorage)
        const pendingRoom = sessionStorage.getItem('pendingRoom');
        if (!roomParam && pendingRoom) {
            roomParam = pendingRoom;
            sessionStorage.removeItem('pendingRoom');
        }

        if (roomParam) {
            // If it's not a public room, add it to private rooms list
            const isPublic = PUBLIC_ROOMS.some(r => r.id === roomParam);
            if (!isPublic && !privateRooms.includes(roomParam)) {
                setPrivateRooms(prev => [...prev, roomParam!]);
            }
            setActiveRoom(roomParam);
            setIsOpen(true); // Auto-open chat if room is specified
        }
    }, []);

    // Update URL when Room Changes
    useEffect(() => {
        if (!isOpen) return;
        const newUrl = new URL(window.location.href);
        if (activeRoom === 'general') {
            newUrl.searchParams.delete('room'); // Default room, clean URL
        } else {
            newUrl.searchParams.set('room', activeRoom);
        }
        window.history.pushState({}, '', newUrl.toString());
    }, [activeRoom, isOpen]);

    // Handle Messages Subscription
    useEffect(() => {
        if (!user || !isOpen) return;

        setIsLoading(true);
        setIndexError(null);

        // Calculate 7 days ago
        const sevenDaysAgo = Timestamp.fromMillis(Date.now() - 7 * 24 * 60 * 60 * 1000);

        try {
            const q = query(
                collection(db, 'chat'),
                where('roomId', '==', activeRoom),
                where('createdAt', '>', sevenDaysAgo),
                orderBy('createdAt', 'desc'),
                limit(100)
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const msgs: Message[] = [];
                snapshot.forEach((doc) => {
                    msgs.push({ id: doc.id, ...doc.data() } as Message);
                });
                setMessages(msgs.reverse());
                setIsLoading(false);
            }, (error) => {
                console.error("Firestore Error:", error);
                if (error.code === 'failed-precondition') {
                    setIndexError("Missing Index: Check Console for Link");
                }
                setIsLoading(false);
            });

            return () => unsubscribe();
        } catch (err) {
            console.error("Query Error", err);
            setIsLoading(false);
        }
    }, [user, isOpen, activeRoom]);

    const sendMessage = async (e: React.FormEvent, file?: File | null) => {
        e.preventDefault();
        if ((!newMessage.trim() && !file) || !user) return;

        const text = newMessage;
        setNewMessage('');

        let imageUrl = '';

        if (file) {
            setIsUploading(true);
            try {
                imageUrl = await compressImage(file);
            } catch (error) {
                console.error("Error compressing image:", error);
                toast({
                    title: "Image Upload Failed",
                    description: "Details in console.",
                    variant: "destructive"
                });
                setIsUploading(false);
                return;
            } finally {
                setIsUploading(false);
            }
        }

        try {
            await addDoc(collection(db, 'chat'), {
                text,
                imageUrl, // Empty string if no image
                uid: effectiveUid, // Use effective ID (device or auth)
                displayName: effectiveDisplayName,
                photoURL: user.photoURL || '',
                createdAt: serverTimestamp(),
                roomId: activeRoom
            });
        } catch (error) {
            console.error("Error sending message:", error);
            toast({ title: "Send Failed", variant: "destructive" });
        }
    };

    const editMessage = async (messageId: string, newText: string) => {
        try {
            await updateDoc(doc(db, 'chat', messageId), {
                text: newText,
                isEdited: true,
                lastEditedAt: serverTimestamp()
            });
            toast({ title: "Message Updated" });
        } catch (error) {
            console.error("Error editing message:", error);
            toast({ title: "Edit Failed", variant: "destructive" });
        }
    };

    // Cleanup Old Messages on Mount (Free Tier Protection)
    useEffect(() => {
        if (!user) return;

        const cleanupOldMessages = async () => {
            const sevenDaysAgo = Timestamp.fromMillis(Date.now() - 7 * 24 * 60 * 60 * 1000);
            try {
                const q = query(
                    collection(db, 'chat'),
                    where('createdAt', '<', sevenDaysAgo),
                    limit(50)
                );

                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    const batch = writeBatch(db);
                    snapshot.docs.forEach(doc => {
                        batch.delete(doc.ref);
                    });
                    await batch.commit();
                    console.log(`Cleaned up ${snapshot.size} old messages.`);
                }
            } catch (error) {
                console.error("Cleanup Error:", error);
            }
        };

        cleanupOldMessages();
    }, [user]);

    const deleteMessage = async (messageId: string) => {
        try {
            await updateDoc(doc(db, 'chat', messageId), {
                text: 'Message deleted',
                imageUrl: '',
                isDeleted: true,
                lastEditedAt: serverTimestamp()
            });
            toast({ title: "Message Deleted" });
        } catch (error) {
            console.error("Error deleting message:", error);
            toast({ title: "Delete Failed", variant: "destructive" });
        }
    };

    // handleKeyDown removed (handled in ChatInput)

    const handleUpdateName = async () => {
        if (!user || !customName.trim()) return;

        setIsUpdating(true);

        try {
            if (isDemoAccount) {
                // For demo account, strict local only
                localStorage.setItem(`chat_name_${deviceId}`, customName);
                setDemoName(customName);
            } else {
                // For regular users, update profile
                await updateProfile(user, { displayName: customName });
            }

            // Update *past messages* for this effective ID
            const q = query(
                collection(db, 'chat'),
                where('uid', '==', effectiveUid)
            );

            const snapshot = await getDocs(q);
            const batch = writeBatch(db);

            let updateCount = 0;
            if (!snapshot.empty) {
                snapshot.docs.forEach((doc) => {
                    batch.update(doc.ref, { displayName: customName });
                    updateCount++;
                });
                if (updateCount > 0) {
                    await batch.commit();
                }
            }
            toast({ title: "Profile Updated", description: "Your display name has been changed." });
        } catch (error: any) {
            console.error("Error updating profile:", error);
            if (error.code === 'failed-precondition') {
                setIndexError("Link for Name Update Index in Console");
            }
        } finally {
            setIsUpdating(false);
        }
    };

    const copyRoomLink = () => {
        const url = new URL(window.location.href);
        url.searchParams.set('room', activeRoom);
        navigator.clipboard.writeText(url.toString());
        toast({ title: "Link Copied", description: "Share this link to invite others!" });
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setIsMinimized(false);
    };

    if (!user) return null;

    const isPublicRoom = PUBLIC_ROOMS.some(r => r.id === activeRoom);
    const currentRoom = isPublicRoom
        ? PUBLIC_ROOMS.find(r => r.id === activeRoom)!
        : { id: activeRoom, name: activeRoom, color: 'text-pink-400', bg: 'bg-pink-500/10' };

    // We mock the user object passed to children to carry the effective Display Name and UID
    const effectiveUser = {
        ...user,
        uid: effectiveUid,
        displayName: effectiveDisplayName
    };

    return (
        <>
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChat}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg shadow-indigo-500/20 transition-colors ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-500'
                    } text-white`}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? 'auto' : '650px',
                            width: isMinimized ? '320px' : '900px'
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className={`fixed bottom-24 right-6 max-w-[calc(100vw-2rem)] bg-[#0f1115]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex overflow-hidden flex-col md:flex-row transition-all duration-300 ring-1 ring-white/5`}
                    >
                        {/* Sidebar */}
                        {!isMinimized && (
                            <ChatSidebar
                                activeRoom={activeRoom}
                                setActiveRoom={setActiveRoom}
                                privateRooms={privateRooms}
                                setPrivateRooms={setPrivateRooms}
                                user={effectiveUser as any}
                                customName={customName}
                                setCustomName={setCustomName}
                                handleUpdateName={handleUpdateName}
                                isUpdating={isUpdating}
                                onOpenBoard={() => setIsBoardOpen(true)}
                            />
                        )}

                        {/* Main Chat Area */}
                        <div className="flex-1 flex flex-col min-w-0 h-full bg-[#111318]">
                            <ChatHeader
                                isPublicRoom={isPublicRoom}
                                currentRoom={currentRoom}
                                activeRoom={activeRoom}
                                indexError={indexError}
                                onCopyLink={copyRoomLink}
                                isMinimized={isMinimized}
                                onToggleMinimize={() => setIsMinimized(!isMinimized)}
                            />

                            {!isMinimized && (
                                <>
                                    <ChatMessageList
                                        messages={messages}
                                        isLoading={isLoading}
                                        currentUser={effectiveUser as any}
                                        isPublicRoom={isPublicRoom}
                                        currentRoom={currentRoom}
                                        activeRoom={activeRoom}
                                        onCopyLink={copyRoomLink}
                                        onEditMessage={editMessage}
                                        onDeleteMessage={deleteMessage}
                                    />
                                    <ChatInput
                                        newMessage={newMessage}
                                        setNewMessage={setNewMessage}
                                        onSendMessage={sendMessage}
                                        onKeyDown={() => { }} // No-op, managed internally now
                                        isUploading={isUploading}
                                        isUpdating={isUpdating}
                                        isPublicRoom={isPublicRoom}
                                        currentRoomName={isPublicRoom ? currentRoom.name : activeRoom}
                                    />
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <TacticalBoard
                roomId={activeRoom}
                isOpen={isBoardOpen}
                onClose={() => setIsBoardOpen(false)}
                user={effectiveUser as any}
            />
        </>
    );
};
