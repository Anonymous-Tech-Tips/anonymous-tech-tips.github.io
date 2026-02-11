import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Hash,
    Settings,
    Loader2,
    Plus,
    Lock
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { PUBLIC_ROOMS } from './constants';
import { useToast } from "@/hooks/use-toast";

interface ChatSidebarProps {
    activeRoom: string;
    setActiveRoom: (room: string) => void;
    privateRooms: string[];
    setPrivateRooms: (rooms: string[]) => void;
    user: any; // Using any for now to avoid AuthContext circular or complex type import for just the user object
    customName: string;
    setCustomName: (name: string) => void;
    handleUpdateName: () => void;
    isUpdating: boolean;
    onOpenBoard: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
    activeRoom,
    setActiveRoom,
    privateRooms,
    setPrivateRooms,
    user,
    customName,
    setCustomName,
    handleUpdateName,
    isUpdating,
    onOpenBoard
}) => {
    const { toast } = useToast();
    const [showJoinRoom, setShowJoinRoom] = useState(false);
    const [newRoomCode, setNewRoomCode] = useState('');
    const [showSettings, setShowSettings] = useState(false);

    const joinPrivateRoom = () => {
        if (!newRoomCode.trim()) return;
        const code = newRoomCode.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'); // Sanitize
        if (!privateRooms.includes(code) && !PUBLIC_ROOMS.some(r => r.id === code)) {
            setPrivateRooms([...privateRooms, code]);
        }
        setActiveRoom(code);
        setNewRoomCode('');
        setShowJoinRoom(false);
        toast({ title: "Joined Room", description: `Entered channel #${code}` });
    };

    return (
        <div className="w-full md:w-60 bg-black/40 border-r border-white/5 flex flex-col h-full">
            <div className="p-4 border-b border-white/5">
                <h2 className="text-xs font-bold text-white/60 tracking-wider flex items-center gap-2 mb-2">
                    PUBLIC CHANNELS
                </h2>
                <div className="space-y-1">
                    {PUBLIC_ROOMS.map(room => (
                        <button
                            key={room.id}
                            onClick={() => setActiveRoom(room.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all group ${activeRoom === room.id
                                ? `${room.bg} text-white font-medium`
                                : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Hash size={16} className={`${activeRoom === room.id ? room.color : 'opacity-40 group-hover:opacity-100 group-hover:text-white'
                                } transition-opacity`} />
                            {room.name}
                        </button>
                    ))}
                </div>



                <div className="mt-6 mb-2">
                    <button
                        onClick={onOpenBoard}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 hover:border-white/20 group"
                    >
                        <div className="w-5 h-5 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="12" x2="12" y1="3" y2="21" /><line x1="3" x2="21" y1="12" y2="12" /></svg>
                        </div>
                        <span className="font-bold tracking-wide text-cyan-100/80">TACTICAL BOARD</span>
                    </button>
                </div>

                <div className="mt-6 flex items-center justify-between mb-2">
                    <h2 className="text-xs font-bold text-white/60 tracking-wider">
                        PRIVATE
                    </h2>
                    <Dialog open={showJoinRoom} onOpenChange={setShowJoinRoom}>
                        <DialogTrigger asChild>
                            <button className="text-white/40 hover:text-white transition-colors">
                                <Plus size={14} />
                            </button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#1a1d24] border-white/10 text-white sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Join Private Channel</DialogTitle>
                                <DialogDescription className="text-white/60">
                                    Enter a unique channel code. Anyone with this code can join.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <Input
                                    value={newRoomCode}
                                    onChange={(e) => setNewRoomCode(e.target.value)}
                                    placeholder="e.g. secret-base-123"
                                    className="bg-black/30 border-white/10 text-white"
                                />
                            </div>
                            <DialogFooter>
                                <Button onClick={joinPrivateRoom} className="bg-indigo-600 text-white">
                                    Join Channel
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="space-y-1">
                    {privateRooms.map(room => (
                        <button
                            key={room}
                            onClick={() => setActiveRoom(room)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all group ${activeRoom === room
                                ? 'bg-pink-500/10 text-white font-medium'
                                : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Lock size={14} className={`${activeRoom === room ? 'text-pink-400' : 'opacity-40'
                                }`} />
                            <span className="truncate">{room}</span>
                        </button>
                    ))}
                    {privateRooms.length === 0 && (
                        <p className="text-[10px] text-white/20 px-2 italic">No private channels joined.</p>
                    )}
                </div>
            </div>

            <div className="mt-auto p-3 border-t border-white/5 bg-black/20">
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
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Display Name</label>
                                <Input
                                    value={customName}
                                    onChange={(e) => setCustomName(e.target.value)}
                                    className="bg-black/30 border-white/10 text-white"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={() => {
                                    handleUpdateName();
                                    setShowSettings(false);
                                }}
                                className="bg-indigo-600 text-white"
                                disabled={isUpdating}
                            >
                                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div >
    );
};
