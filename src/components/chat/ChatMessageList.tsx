import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Hash, Lock, Copy, MoreVertical, Pencil, Trash, X, Check } from 'lucide-react';
import { Message, Room } from './types';
import { getDateLabel } from './utils';
import { format, isSameDay } from 'date-fns';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatMessageListProps {
    messages: Message[];
    isLoading: boolean;
    currentUser: any;
    isPublicRoom: boolean;
    currentRoom: Room;
    activeRoom: string;
    onCopyLink: () => void;
    onEditMessage: (id: string, newText: string) => void;
    onDeleteMessage: (id: string) => void;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
    messages,
    isLoading,
    currentUser,
    isPublicRoom,
    currentRoom,
    activeRoom,
    onCopyLink,
    onEditMessage,
    onDeleteMessage
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');

    // Auto-scroll on new messages
    useEffect(() => {
        if (!isLoading && scrollRef.current) {
            setTimeout(() => {
                scrollRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [messages, isLoading]);

    if (isLoading) {
        return (
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="flex flex-col justify-center items-center h-full text-white/20 space-y-3">
                    <Loader2 className="animate-spin" size={24} />
                    <span className="text-xs font-medium tracking-widest uppercase">Connecting...</span>
                </div>
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="flex flex-col items-center justify-center h-full text-white/20 space-y-4">
                    <div className={`w-16 h-16 rounded-2xl ${isPublicRoom ? currentRoom.bg : 'bg-pink-500/10'} flex items-center justify-center`}>
                        {isPublicRoom ? <Hash size={32} className={currentRoom.color} /> : <Lock size={32} className="text-pink-400" />}
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-white/40">Welcome to #{currentRoom.name}</p>
                        <p className="text-xs text-white/20 mt-1">This is the start of the conversation.</p>
                        {!isPublicRoom && (
                            <Button
                                variant="link"
                                className="text-pink-400 text-xs mt-2"
                                onClick={onCopyLink}
                            >
                                <Copy size={12} className="mr-1" /> Copy Invite Link
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((msg, index) => {
                const prevMsg = messages[index - 1];
                const isMe = msg.uid === currentUser.uid;

                const isSameUser = prevMsg && prevMsg.uid === msg.uid;
                const isWithinTime = prevMsg && msg.createdAt && prevMsg.createdAt &&
                    (msg.createdAt.toMillis() - prevMsg.createdAt.toMillis() < 5 * 60 * 1000);
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

                                {editingId === msg.id ? (
                                    <div className="flex flex-col gap-2 items-end w-full min-w-[200px]">
                                        <textarea
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="w-full bg-[#1a1d24] text-white text-sm p-2 rounded-md border border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            rows={2}
                                        />
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                                onClick={() => setEditingId(null)}
                                            >
                                                <X size={14} />
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="h-7 w-7 p-0 bg-indigo-600 hover:bg-indigo-500 text-white"
                                                onClick={() => {
                                                    if (editText.trim()) {
                                                        onEditMessage(msg.id, editText);
                                                        setEditingId(null);
                                                    }
                                                }}
                                            >
                                                <Check size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="group relative">
                                        {isMe && !editingId && (
                                            <div className="absolute top-0 -left-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white/20 hover:text-white/80">
                                                            <MoreVertical size={14} />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-32 bg-[#1a1d24] border-white/10 text-white">
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setEditingId(msg.id);
                                                                setEditText(msg.text);
                                                            }}
                                                            className="text-xs cursor-pointer hover:bg-white/5 focus:bg-white/5"
                                                        >
                                                            <Pencil className="mr-2 h-3 w-3" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => onDeleteMessage(msg.id)}
                                                            className="text-xs text-red-400 cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10"
                                                        >
                                                            <Trash className="mr-2 h-3 w-3" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        )}
                                        {msg.text && (
                                            <div className={`px-4 py-2 text-[14px] leading-relaxed shadow-sm break-words whitespace-pre-wrap relative ${isMe
                                                ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm'
                                                : 'bg-[#252830] text-gray-200 rounded-2xl rounded-tl-sm'
                                                }`}>
                                                {msg.text}
                                                {msg.isEdited && (
                                                    <span className="text-[10px] opacity-50 ml-1 italic">(edited)</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </React.Fragment>
                );
            })}
            <div ref={scrollRef} />
        </div>
    );
};
