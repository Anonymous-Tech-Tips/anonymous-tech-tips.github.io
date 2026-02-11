import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Hash,
    Lock,
    Link as LinkIcon,
    Minimize2,
    Maximize2,
    AlertTriangle
} from 'lucide-react';
import { Room } from './types';

interface ChatHeaderProps {
    isPublicRoom: boolean;
    currentRoom: Room;
    activeRoom: string; // The ID/Link of the room even if it is private
    indexError: string | null;
    onCopyLink: () => void;
    isMinimized: boolean;
    onToggleMinimize: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
    isPublicRoom,
    currentRoom,
    activeRoom,
    indexError,
    onCopyLink,
    isMinimized,
    onToggleMinimize
}) => {
    return (
        <div className="h-14 flex items-center justify-between px-6 border-b border-white/5 bg-white/[0.02] shrink-0 backdrop-blur-sm">
            <div className="flex items-center gap-3">
                {isPublicRoom ? (
                    <Hash size={20} className={currentRoom.color} />
                ) : (
                    <Lock size={20} className="text-pink-400" />
                )}
                <div>
                    <h3 className="font-bold text-white text-sm leading-none flex items-center gap-2">
                        {currentRoom.name}
                        {!isPublicRoom && (
                            <span className="px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 text-[9px] border border-pink-500/20 uppercase tracking-widest">
                                Private
                            </span>
                        )}
                    </h3>
                    <span className="text-[10px] text-white/30 font-medium tracking-wide">
                        {isPublicRoom ? 'GLOBAL CHAT' : 'ENCRYPTED CHANNEL'}
                    </span>
                </div>
                {indexError && (
                    <div className="ml-4 flex items-center gap-1.5 text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-md">
                        <AlertTriangle size={10} />
                        Needs Index
                    </div>
                )}
            </div>
            <div className="flex items-center gap-2">
                {!isPublicRoom && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onCopyLink}
                        className="h-8 px-2 text-xs text-white/60 hover:text-white hover:bg-white/10 gap-1.5"
                    >
                        <LinkIcon size={12} />
                        Share
                    </Button>
                )}
                <button
                    onClick={onToggleMinimize}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white"
                >
                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
            </div>
        </div>
    );
};
