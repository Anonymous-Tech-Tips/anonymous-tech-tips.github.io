import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Play, Compass, RefreshCw } from 'lucide-react';
import { games } from '@/data/games';
import { useNavigate } from 'react-router-dom';

export const DiscoveryFeed = () => {
    const navigate = useNavigate();

    // Memoize random picks so they don't change on every render (until refresh)
    const picks = useMemo(() => {
        const shuffled = [...games].sort(() => 0.5 - Math.random());
        return [
            { type: 'Daily Gem', game: shuffled[0], color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Sparkles },
            { type: 'Hidden Hit', game: shuffled[1], color: 'text-purple-500', bg: 'bg-purple-500/10', icon: Compass },
            { type: 'Dev Pick', game: shuffled[2], color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Play },
        ];
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <h2 className="text-2xl font-bold text-white font-serif italic">Discovery Feed</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-white/40 hover:text-white">
                    <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {picks.map((pick, i) => (
                    <div key={i} className="group relative bg-[#1A1A1A] border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all cursor-pointer" onClick={() => navigate(`/games/${pick.game.id}`)}>
                        <div className="absolute top-3 left-3 z-10">
                            <Badge variant="secondary" className={`${pick.bg} ${pick.color} border-none backdrop-blur-md`}>
                                <pick.icon className="w-3 h-3 mr-1" /> {pick.type}
                            </Badge>
                        </div>
                        <div className="aspect-video relative overflow-hidden">
                            <img src={pick.game.thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
                        </div>
                        <div className="p-4 relative -mt-8">
                            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{pick.game.title}</h3>
                            <p className="text-xs text-white/40 mt-1 line-clamp-1">{pick.game.tags.join(" • ")}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
