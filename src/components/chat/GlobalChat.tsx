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
    where
} from 'firebase/firestore';
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
    Check,
    AlertTriangle
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

interface Message {
    id: string;
    text: string;
    uid: string;
    displayName: string;
    photoURL: string;
    createdAt: Timestamp;
    roomId: string;
}

const ROOMS = [
    { id: 'general', name: 'General', color: 'text-indigo-400' },
    { id: 'gaming', name: 'Gaming', color: 'text-green-400' },
    { id: 'tech', name: 'Tech', color: 'text-blue-400' },
    { id: 'offtopic', name: 'Off-Topic', color: 'text-yellow-400' }
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
    const scrollRef = useRef<HTMLDivElement>(null);

    // Settings States
    const [showSettings, setShowSettings] = useState(false);
    const [customName, setCustomName] = useState('');
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
                limit(50)
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
        if (newMessage.trim() === '' || !user) return;

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
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleUpdateName = async () => {
        if (!user || !customName.trim()) return;
        try {
            await updateProfile(user, { displayName: customName });
            setShowSettings(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setIsMinimized(false);
    };

    if (!user) return null;

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
                            height: isMinimized ? 'auto' : '600px',
                            width: isMinimized ? '300px' : '800px' // Wider for sidebar
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className={`fixed bottom-24 right-6 max-w-[calc(100vw-2rem)] bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl z-50 flex overflow-hidden flex-col md:flex-row transition-all duration-300`}
                    >
                        {/* Sidebar (Rooms) - Only visible when maximized */}
                        {!isMinimized && (
                            <div className="w-full md:w-48 bg-black/20 border-r border-white/5 p-3 flex flex-col gap-2">
                                <div className="text-xs font-bold text-white/40 uppercase tracking-widest px-2 py-2">Rooms</div>
                                {ROOMS.map(room => (
                                    <button
                                        key={room.id}
                                        onClick={() => setActiveRoom(room.id)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${activeRoom === room.id
                                                ? 'bg-white/10 text-white font-medium'
                                                : 'text-white/60 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <Hash size={14} className={room.color} />
                                        {room.name}
                                    </button>
                                ))}

                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <Dialog open={showSettings} onOpenChange={setShowSettings}>
                                        <DialogTrigger asChild>
                                            <button className="flex items-center gap-2 px-3 py-2 text-xs text-white/50 hover:text-white transition-colors w-full">
                                                <Settings size={14} />
                                                Chat Settings
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Chat Profile</DialogTitle>
                                                <DialogDescription className="text-white/60">
                                                    Update how you appear to others in the global chat.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Display Name</label>
                                                    <Input
                                                        value={customName}
                                                        onChange={(e) => setCustomName(e.target.value)}
                                                        className="bg-black/20 border-white/10 text-white"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button
                                                    onClick={handleUpdateName}
                                                    className="bg-indigo-600 hover:bg-indigo-500 text-white"
                                                >
                                                    Save Changes
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        )}

                        {/* Main Chat Area */}
                        <div className="flex-1 flex flex-col min-w-0 h-full">
                            {/* Header */}
                            <div className="h-14 flex items-center justify-between px-4 border-b border-white/5 bg-white/5 shrink-0">
                                <div className="flex items-center gap-2">
                                    <Hash size={16} className={ROOMS.find(r => r.id === activeRoom)?.color} />
                                    <h3 className="font-bold text-white text-sm">{ROOMS.find(r => r.id === activeRoom)?.name}</h3>
                                    {indexError && (
                                        <div className="ml-4 flex items-center gap-1 text-[10px] text-red-400 bg-red-400/10 px-2 py-1 rounded">
                                            <AlertTriangle size={10} />
                                            Needs Index
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                                >
                                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                                </button>
                            </div>

                            {/* Messages */}
                            {!isMinimized && (
                                <>
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                        {isLoading ? (
                                            <div className="flex justify-center items-center h-full text-white/20 text-xs uppercase tracking-widest">
                                                Loading {ROOMS.find(r => r.id === activeRoom)?.name}...
                                            </div>
                                        ) : messages.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-full text-white/20 space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                                                    <Hash className="opacity-50" />
                                                </div>
                                                <p className="text-xs uppercase tracking-widest">Quiet Room</p>
                                                <p className="text-[10px]">Be the first to chat in #{activeRoom}</p>
                                            </div>
                                        ) : (
                                            messages.map((msg) => {
                                                const isMe = msg.uid === user.uid;
                                                return (
                                                    <div key={msg.id} className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''} group`}>
                                                        {/* Avatar */}
                                                        <div
                                                            className={`w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden border border-white/10 shadow-sm
                                                            ${msg.uid === 'admin' ? 'ring-2 ring-yellow-400' : ''}`}
                                                        >
                                                            {msg.photoURL ? (
                                                                <img src={msg.photoURL} alt={msg.displayName} className="w-full h-full object-cover" />
                                                            ) : (
                                                                msg.displayName.charAt(0).toUpperCase()
                                                            )}
                                                        </div>

                                                        {/* Message Bubble */}
                                                        <div className={`flex flex-col max-w-[85%] ${isMe ? 'items-end' : 'items-start'}`}>
                                                            <div className="flex items-center gap-2 mb-1 px-1">
                                                                <span className={`text-[10px] font-bold ${isMe ? 'text-indigo-300' : 'text-slate-400'}`}>
                                                                    {msg.displayName}
                                                                </span>
                                                                <span className="text-[9px] text-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </span>
                                                            </div>
                                                            <div className={`px-3 py-2 rounded-2xl text-sm shadow-sm ${isMe
                                                                    ? 'bg-indigo-600 text-white rounded-tr-sm'
                                                                    : 'bg-white/10 text-white/90 rounded-tl-sm'
                                                                }`}>
                                                                {msg.text}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                        <div ref={scrollRef} />
                                    </div>

                                    {/* Input */}
                                    <form onSubmit={sendMessage} className="p-3 bg-white/5 border-t border-white/5 flex gap-2 shrink-0">
                                        <Input
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder={`Message #${activeRoom}`}
                                            className="bg-black/20 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500/50"
                                        />
                                        <Button
                                            type="submit"
                                            size="icon"
                                            className="bg-indigo-600 hover:bg-indigo-500 text-white shrink-0"
                                            disabled={!newMessage.trim()}
                                        >
                                            <Send size={18} />
                                        </Button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
