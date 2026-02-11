import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2, Image as ImageIcon, X } from 'lucide-react';

interface ChatInputProps {
    newMessage: string;
    setNewMessage: (msg: string) => void;
    onSendMessage: (e: React.FormEvent, file?: File | null) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    isUploading: boolean;
    isUpdating: boolean;
    isPublicRoom: boolean;
    currentRoomName: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
    newMessage,
    setNewMessage,
    onSendMessage,
    onKeyDown,
    isUploading,
    isUpdating,
    isPublicRoom,
    currentRoomName,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Cleanup preview URL to avoid memory leaks
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if ((!newMessage.trim() && !selectedFile) || isUploading) return;

        onSendMessage(e, selectedFile);

        // Clear file after send
        clearFile();
    }

    // Adjust textarea height
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [newMessage]);

    return (
        <div className="p-4 bg-[#111318] border-t border-white/5 shrink-0">
            {/* Image Preview Area */}
            {previewUrl && (
                <div className="mb-2 relative inline-block">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-20 w-auto rounded-lg border border-white/10 object-cover"
                    />
                    <button
                        onClick={clearFile}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                    >
                        <X size={12} />
                    </button>
                </div>
            )}

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
                    className={`h-[44px] w-[44px] rounded-l-xl rounded-r-none transition-colors ${previewUrl ? 'text-indigo-400 bg-indigo-500/10' : 'text-white/40 hover:text-indigo-400 hover:bg-indigo-500/10'}`}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                >
                    {isUploading ? <Loader2 className="animate-spin" size={20} /> : <ImageIcon size={20} />}
                </Button>

                <form onSubmit={handleSubmit} className="flex-1 flex gap-2 p-2 items-end">
                    <textarea
                        ref={textareaRef}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                            // Don't call parent onKeyDown here to avoid double submits if parent also submits
                        }}
                        placeholder={isUploading ? "Uploading image..." : selectedFile ? "Add a caption..." : `Message #${currentRoomName}`}
                        className="w-full bg-transparent border-0 text-white placeholder:text-white/30 focus:ring-0 resize-none min-h-[44px] max-h-[120px] py-2.5 px-3 text-sm scrollbar-thin scrollbar-thumb-white/10"
                        rows={1}
                        disabled={isUploading}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className={`shrink-0 transition-all ${newMessage.trim() || selectedFile
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                            : 'bg-white/5 text-white/20 hover:bg-white/10'
                            }`}
                        disabled={(!newMessage.trim() && !selectedFile) || isUploading}
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
    );
};
