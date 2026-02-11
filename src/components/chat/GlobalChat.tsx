import React, { useState, useEffect, useRef } from 'react';
import { db, storage } from '@/lib/firebase';
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
    writeBatch
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    MessageSquare,
    X,
    Send,
    Minimize2,
    Maximize2,
    Settings,
    Hash,
    AlertTriangle,
    Loader2,
    Calendar,
    Image as ImageIcon,
    Paperclip
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { format, isSameDay, isToday, isYesterday } from 'date-fns';

interface Message {
    id: string;
    text: string;
    uid: string;
    displayName: string;
    photoURL: string;
    createdAt: Timestamp;
    roomId: string;
    imageUrl?: string;
}

const ROOMS = [
    { id: 'general', name: 'General', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
    { id: 'gaming', name: 'Gaming', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { id: 'tech', name: 'Tech', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 'offtopic', name: 'Off-Topic', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' }
];

export const GlobalChat: React.FC = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [activeRoom, setActiveRoom] = useState('general');

    // Data States
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Settings States
    const [showSettings, setShowSettings] = useState(false);
    const [customName, setCustomName] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [indexError, setIndexError] = useState<string | null>(null);

    // Initialize custom name
    useEffect(() => {
        if (user?.displayName) {
            setCustomName(user.displayName);
        }
    }, [user]);

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

                if (scrollRef.current) {
                    setTimeout(() => {
                        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                }
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

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if ((newMessage.trim() === '') || !user) return;

        const text = newMessage;
        setNewMessage('');

        try {
            await addDoc(collection(db, 'chat'), {
                text,
                uid: user.uid,
                displayName: user.displayName || 'Anonymous Gamer',
                photoURL: user.photoURL || '',
                createdAt: serverTimestamp(),
                roomId: activeRoom
            });
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        // Reset input logic
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        setIsUploading(true);
        try {
            // Upload to Firebase Storage
            const storageRef = ref(storage, `chat-uploads/${user.uid}/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // Send message with image
            await addDoc(collection(db, 'chat'), {
                text: '', // Empty text for image-only messages, or we could add caption support later
                imageUrl: downloadURL,
                uid: user.uid,
                displayName: user.displayName || 'Anonymous Gamer',
                photoURL: user.photoURL || '',
                createdAt: serverTimestamp(),
                roomId: activeRoom
            });
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 50);

        } catch (error) {
            console.error("Error uploading image:", error);
            // Ideally show toast error here
        } finally {
            setIsUploading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e as any);
        }
    };

    const handleUpdateName = async () => {
        if (!user || !customName.trim()) return;

        setIsUpdating(true);
        try {
            await updateProfile(user, { displayName: customName });
            const sevenDaysAgo = Timestamp.fromMillis(Date.now() - 7 * 24 * 60 * 60 * 1000);

            const q = query(
                collection(db, 'chat'),
                where('uid', '==', user.uid),
                where('createdAt', '>', sevenDaysAgo)
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

            setShowSettings(false);
        } catch (error: any) {
            console.error("Error updating profile:", error);
            if (error.code === 'failed-precondition') {
                setIndexError("Link for Name Update Index in Console");
            }
        } finally {
            setIsUpdating(false);
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setIsMinimized(false);
    };

    const getDateLabel = (date: Date) => {
        if (isToday(date)) return 'Today';
        if (isYesterday(date)) return 'Yesterday';
        return format(date, 'MMMM d, yyyy');
    };

    if (!user) return null;

    const currentRoom = ROOMS.find(r => r.id === activeRoom) || ROOMS[0];

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
                        {/* Sidebar (Rooms) */}
                        {!isMinimized && (
                            <div className="w-full md:w-60 bg-black/40 border-r border-white/5 flex flex-col">
                                <div className="p-4 border-b border-white/5">
                                    <h2 className="text-sm font-bold text-white tracking-wider flex items-center gap-2">
                                        <MessageSquare size={16} className="text-indigo-400" />
                                        CHANNELS
                                    </h2>
                                </div>

                                <div className="p-2 space-y-1 overflow-y-auto flex-1">
                                    {ROOMS.map(room => (
                                        <button
                                            key={room.id}
                                            onClick={() => setActiveRoom(room.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group ${activeRoom === room.id
                                                    ? `${room.bg} text-white font-medium`
                                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            <Hash size={18} className={`${activeRoom === room.id ? room.color : 'opacity-40 group-hover:opacity-100 group-hover:text-white'
                                                } transition-opacity`} />
                                            {room.name}
                                            {activeRoom === room.id && <div className={`ml-auto w-1.5 h-1.5 rounded-full ${room.color.replace('text-', 'bg-')}`} />}
                                        </button>
                                    ))}
                                </div>

                                <div className="p-3 border-t border-white/5 bg-black/20">
                                    <Dialog open={showSettings} onOpenChange={setShowSettings}>
                                        <DialogTrigger asChild>
                                            <button className="flex items-center gap-3 px-3 py-2 text-xs text-white/50 hover:text-white hover:bg-white/5 transition-all w-full rounded-lg">
                                                <Settings size={14} />
                                                <span className="font-medium">User Settings</span>
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-[#1a1d24] border-white/10 text-white sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Chat Profile</DialogTitle>
                                                <DialogDescription className="text-white/60">
                                                    Update how you appear to others in the global chat.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-white/80">Display Name</label>
                                                    <Input
                                                        value={customName}
                                                        onChange={(e) => setCustomName(e.target.value)}
                                                        className="bg-black/30 border-white/10 text-white focus:border-indigo-500/50"
                                                        placeholder="Enter a new name..."
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button
                                                    onClick={handleUpdateName}
                                                    className="bg-indigo-600 hover:bg-indigo-500 text-white w-full sm:w-auto"
                                                    disabled={isUpdating}
                                                >
                                                    {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                    {isUpdating ? 'Apply to All Messages...' : 'Save Changes'}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        )}

                        {/* Main Chat Area */}
                        <div className="flex-1 flex flex-col min-w-0 h-full bg-[#111318]">
                            {/* Header */}
                            <div className="h-14 flex items-center justify-between px-6 border-b border-white/5 bg-white/[0.02] shrink-0 backdrop-blur-sm">
                                <div className="flex items-center gap-3">
                                    <Hash size={20} className={currentRoom.color} />
                                    <div>
                                        <h3 className="font-bold text-white text-sm leading-none">{currentRoom.name}</h3>
                                        <span className="text-[10px] text-white/30 font-medium tracking-wide">GLOBAL CHAT</span>
                                    </div>
                                    {indexError && (
                                        <div className="ml-4 flex items-center gap-1.5 text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-md animate-in fade-in slide-in-from-top-1">
                                            <AlertTriangle size={10} />
                                            Needs Index (Check Console)
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsMinimized(!isMinimized)}
                                        className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white"
                                    >
                                        {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            {!isMinimized && (
                                <>
                                    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                        {isLoading ? (
                                            <div className="flex flex-col justify-center items-center h-full text-white/20 space-y-3">
                                                <Loader2 className="animate-spin" size={24} />
                                                <span className="text-xs font-medium tracking-widest uppercase">Connecting...</span>
                                            </div>
                                        ) : messages.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-full text-white/20 space-y-4">
                                                <div className={`w-16 h-16 rounded-2xl ${currentRoom.bg} flex items-center justify-center`}>
                                                    <Hash size={32} className={currentRoom.color} />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-sm font-medium text-white/40">Welcome to #{currentRoom.name}</p>
                                                    <p className="text-xs text-white/20 mt-1">This is the start of the conversation.</p>
                                                </div>
                                            </div>
                                        ) : (
                                            messages.map((msg, index) => {
                                                const prevMsg = messages[index - 1];
                                                const isMe = msg.uid === user.uid;

                                                const isSameUser = prevMsg && prevMsg.uid === msg.uid;
                                                const isWithinTime = prevMsg && msg.createdAt && prevMsg.createdAt &&
                                                    (msg.createdAt.toMillis() - prevMsg.createdAt.toMillis() < 5 * 60 * 1000); // 5 mins
                                                const isGrouped = isSameUser && isWithinTime;

                                                const date = msg.createdAt?.toDate();
                                                const prevDate = prevMsg?.createdAt?.toDate();
                                                const showDateSeparator = date && (!prevDate || !isSameDay(date, prevDate));

                                                return (
                                                    <React.Fragment key={msg.id}>
                                                        {showDateSeparator && (
                                                            <div className="flex items-center justify-center my-6">
                                                                <div className="h-[1px] bg-white/5 flex-1 max-w-[100px]" />
                                                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-3">
                                                                    {getDateLabel(date)}
                                                                </span>
                                                                <div className="h-[1px] bg-white/5 flex-1 max-w-[100px]" />
                                                            </div>
                                                        )}

                                                        <div className={`flex gap-3 group px-2 hover:bg-white/[0.02] rounded-lg transition-colors ${isGrouped ? 'mt-0.5' : 'mt-4'
                                                            } ${isMe ? 'flex-row-reverse' : ''}`}>

                                                            <div className="w-10 flex flex-col items-center shrink-0">
                                                                {!isGrouped ? (
                                                                    <div
                                                                        className={`w-9 h-9 rounded-full bg-[#252830] flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden border border-white/10 shadow-sm
                                                                        ${msg.uid === 'admin' ? 'ring-2 ring-yellow-400' : ''}`}
                                                                    >
                                                                        {msg.photoURL ? (
                                                                            <img src={msg.photoURL} alt={msg.displayName} className="w-full h-full object-cover" />
                                                                        ) : (
                                                                            msg.displayName.charAt(0).toUpperCase()
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-9 text-[10px] text-white/20 text-center opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                                                                        {date && format(date, 'h:mm a')}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className={`flex flex-col max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                                                                {!isGrouped && (
                                                                    <div className="flex items-baseline gap-2 mb-1 px-1">
                                                                        <span className={`text-xs font-bold ${isMe ? 'text-indigo-400' : 'text-slate-300'}`}>
                                                                            {msg.displayName}
                                                                        </span>
                                                                        <span className="text-[10px] text-white/30">
                                                                            {date && format(date, 'h:mm a')}
                                                                        </span>
                                                                    </div>
                                                                )}

                                                                {msg.imageUrl && (
                                                                    <div className={`mb-2 overflow-hidden rounded-xl border border-white/10 ${isMe ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}>
                                                                        <img
                                                                            src={msg.imageUrl}
                                                                            alt="Shared image"
                                                                            className="max-w-[240px] max-h-[240px] md:max-w-[320px] md:max-h-[320px] object-cover cursor-pointer hover:opacity-90 transition-opacity bg-black/40"
                                                                            onClick={() => window.open(msg.imageUrl, '_blank')}
                                                                        />
                                                                    </div>
                                                                )}

                                                                {msg.text && (
                                                                    <div className={`px-4 py-2 text-[14px] leading-relaxed shadow-sm break-words whitespace-pre-wrap ${isMe
                                                                            ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm'
                                                                            : 'bg-[#252830] text-gray-200 rounded-2xl rounded-tl-sm'
                                                                        }`}>
                                                                        {msg.text}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                );
                                            })
                                        )}
                                        <div ref={scrollRef} />
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-4 bg-[#111318] border-t border-white/5 shrink-0">
                                        <div className="relative bg-[#1a1d24] rounded-xl border border-white/10 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20 transition-all flex items-end">
                                            {/* File Input */}
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileSelect}
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-[44px] w-[44px] rounded-l-xl rounded-r-none text-white/40 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={isUploading}
                                            >
                                                {isUploading ? <Loader2 className="animate-spin" size={20} /> : <ImageIcon size={20} />}
                                            </Button>

                                            <form onSubmit={sendMessage} className="flex-1 flex gap-2 p-2 items-end">
                                                <textarea
                                                    value={newMessage}
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    placeholder={isUploading ? "Uploading image..." : `Message #${currentRoom.name}`}
                                                    className="w-full bg-transparent border-0 text-white placeholder:text-white/30 focus:ring-0 resize-none min-h-[44px] max-h-[120px] py-2.5 px-3 text-sm scrollbar-thin scrollbar-thumb-white/10"
                                                    rows={1}
                                                    style={{ height: 'auto', minHeight: '44px' }}
                                                    disabled={isUploading}
                                                />
                                                <Button
                                                    type="submit"
                                                    size="icon"
                                                    className={`shrink-0 transition-all ${newMessage.trim()
                                                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                                            : 'bg-white/5 text-white/20 hover:bg-white/10'
                                                        }`}
                                                    disabled={!newMessage.trim() || isUploading}
                                                >
                                                    <Send size={18} />
                                                </Button>
                                            </form>
                                        </div>
                                        <div className="px-2 mt-2 flex justify-between items-center text-[10px] text-white/20">
                                            <span>Enter to send, Shift + Enter for new line</span>
                                            {isUpdating && <span className="text-indigo-400 flex items-center gap-1"><Loader2 size={8} className="animate-spin" /> Updating Identity</span>}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
