import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { X, Eraser, PenTool, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TacticalBoardProps {
    roomId: string;
    isOpen: boolean;
    onClose: () => void;
    user: any;
}

interface Stroke {
    id?: string;
    points: { x: number; y: number }[];
    color: string;
    width: number;
    uid: string;
}

const COLORS = [
    { id: 'cyan', val: '#06b6d4' }, // Cyan-500
    { id: 'green', val: '#22c55e' }, // Green-500
    { id: 'amber', val: '#f59e0b' }, // Amber-500
    { id: 'red', val: '#ef4444' }, // Red-500
    { id: 'white', val: '#ffffff' },
];

export const TacticalBoard: React.FC<TacticalBoardProps> = ({ roomId, isOpen, onClose, user }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);
    const [activeColor, setActiveColor] = useState('#06b6d4');
    const [activeTool, setActiveTool] = useState<'pen' | 'eraser'>('pen');
    const [strokes, setStrokes] = useState<Stroke[]>([]);

    // Board ID matches Room ID, or specialized sub-collection
    // Using a 'boards' collection at root might be cleaner: /boards/{roomId}/strokes

    // 1. Resize Canvas on Mount/Window Resize
    useEffect(() => {
        if (!isOpen) return;
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                redrawCanvas();
            }
        };
        window.addEventListener('resize', resizeCanvas);
        // Delay slighty to allow animation to finish
        setTimeout(resizeCanvas, 100);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [isOpen, strokes]);

    // 2. Subscribe to Strokes
    useEffect(() => {
        if (!isOpen || !roomId) return;

        // Limit to last 500 strokes to prevent overload
        const q = query(collection(db, 'boards', roomId, 'strokes'), orderBy('createdAt', 'asc'), limit(500));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newStrokes: Stroke[] = [];
            snapshot.forEach(doc => {
                newStrokes.push({ id: doc.id, ...doc.data() } as Stroke);
            });
            setStrokes(newStrokes);
        });

        return () => unsubscribe();
    }, [roomId, isOpen]);

    // 3. Redraw Canvas when strokes change
    useEffect(() => {
        if (isOpen) redrawCanvas();
    }, [strokes, isOpen]);

    const redrawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Grid
        drawGrid(ctx, canvas.width, canvas.height);

        // Draw Saved Strokes
        strokes.forEach(stroke => drawLine(ctx, stroke));

        // Draw Current Stroke efficiently
        if (currentStroke.length > 0) {
            drawLine(ctx, {
                points: currentStroke,
                color: activeTool === 'eraser' ? '#000000' : activeColor, // Eraser preview logic could be complex, simple black for now if background is black
                width: activeTool === 'eraser' ? 20 : 2,
                uid: 'me'
            });
        }
    };

    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        const gridSize = 40;

        for (let x = 0; x <= width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y <= height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    };

    const drawLine = (ctx: CanvasRenderingContext2D, stroke: Stroke) => {
        if (stroke.points.length < 2) return;

        ctx.beginPath();
        ctx.lineWidth = stroke.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = stroke.color;

        // If eraser, we might need composite operation "destination-out"
        // But if background is simple color, painting that color is easier
        if (stroke.color === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 20;
        } else {
            ctx.globalCompositeOperation = 'source-over';
        }

        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
            ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
    };

    // --- Interaction Handlers ---

    const getPoint = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true);
        const { x, y } = getPoint(e);
        setCurrentStroke([{ x, y }]);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const { x, y } = getPoint(e);
        setCurrentStroke(prev => [...prev, { x, y }]);
        redrawCanvas(); // Instant feedback
    };

    const stopDrawing = async () => {
        if (!isDrawing) return;
        setIsDrawing(false);

        if (currentStroke.length > 1) {
            // Save to Firestore
            try {
                await addDoc(collection(db, 'boards', roomId, 'strokes'), {
                    points: currentStroke,
                    color: activeTool === 'eraser' ? 'eraser' : activeColor,
                    width: activeTool === 'eraser' ? 20 : 2,
                    uid: user.uid,
                    createdAt: serverTimestamp()
                });
            } catch (err) {
                console.error("Error saving stroke:", err);
            }
        }
        setCurrentStroke([]);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] bg-[#09090b] text-white flex flex-col"
                >
                    {/* Toolbar */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#18181b] border border-white/10 rounded-full px-4 py-2 flex items-center gap-4 shadow-2xl z-20">
                        <div className="flex gap-2 border-r border-white/10 pr-4">
                            {COLORS.map(c => (
                                <button
                                    key={c.id}
                                    onClick={() => { setActiveColor(c.val); setActiveTool('pen'); }}
                                    className={`w-6 h-6 rounded-full border border-white/10 transition-transform hover:scale-110 ${activeColor === c.val && activeTool === 'pen' ? 'ring-2 ring-white scale-110' : ''}`}
                                    style={{ backgroundColor: c.val }}
                                />
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setActiveTool('pen')}
                                className={activeTool === 'pen' ? 'text-white bg-white/10' : 'text-white/40'}
                            >
                                <PenTool size={18} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setActiveTool('eraser')}
                                className={activeTool === 'eraser' ? 'text-red-400 bg-red-400/10' : 'text-white/40'}
                            >
                                <Eraser size={18} />
                            </Button>
                        </div>
                        <div className="w-px h-6 bg-white/10 mx-2" />
                        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-red-500/20 hover:text-red-400">
                            <X size={20} />
                        </Button>
                    </div>

                    {/* Header/Status */}
                    <div className="absolute top-6 left-6 z-10 pointer-events-none">
                        <h2 className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase">Tactical Board // {roomId}</h2>
                    </div>

                    <canvas
                        ref={canvasRef}
                        className="touch-none cursor-crosshair bg-[radial-gradient(circle_at_center,_#18181b_1px,_transparent_1px)] bg-[size:24px_24px]"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        style={{ backgroundColor: '#09090b' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
