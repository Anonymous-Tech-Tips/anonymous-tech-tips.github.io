import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trophy, History, ShieldCheck, Star } from 'lucide-react';
import { useUserPrefs } from '@/contexts/UserPrefsContext';
import { games } from '@/data/games';

// --- Developer Supporter Badge ---
export const DeveloperBadge = () => (
    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/50 px-3 py-1 flex items-center gap-2">
        <ShieldCheck className="w-3 h-3 fill-amber-500" />
        Official Supporter
    </Badge>
);

// --- Activity Timeline ---
export const ActivityTimeline = () => {
    const { prefs } = useUserPrefs();
    const history = prefs.history.slice(0, 10); // Last 10 items

    if (history.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <History className="w-5 h-5 text-blue-500" /> Activity Timeline
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm">
                    No recent activity recorded.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <History className="w-5 h-5 text-blue-500" /> Activity Timeline
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[200px] w-full pr-4">
                    <div className="space-y-4">
                        {history.map((item, i) => {
                            const game = games.find(g => g.id === item.itemId);
                            if (!game) return null;
                            return (
                                <div key={i} className="flex gap-3 items-start relative pb-4 border-l border-muted pl-4 last:border-0">
                                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-background" />
                                    <div>
                                        <div className="font-medium text-sm">Played {game.title}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {new Date(item.timestamp).toLocaleDateString()} • {new Date(item.timestamp).toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

// --- Achievement Showcase ---
// Mock achievements if none exist
const MOCK_ACHIEVEMENTS = [
    { id: 'first-win', name: 'First Victory', icon: '🏆', desc: 'Won your first game' },
    { id: 'explorer', name: 'Explorer', icon: '🗺️', desc: 'Played 5 different games' },
    { id: 'dedicated', name: 'Dedicated', icon: '⏰', desc: 'Played for 1 hour' },
];

export const AchievementShowcase = () => {
    const { prefs } = useUserPrefs();
    // Filter achievements user actually has (mock logic: assume they have some if checking 'achievements' array)
    // Real implementation: intersect MOCK with prefs.settings.achievements
    const userAchievements = MOCK_ACHIEVEMENTS; // For demo, show all locked/unlocked

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" /> Trophy Case
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {userAchievements.map((ach) => (
                        <div key={ach.id} className="flex flex-col items-center p-3 bg-muted/50 rounded-lg text-center gap-2 hover:bg-muted/80 transition-colors">
                            <div className="text-3xl filter drop-shadow-sm">{ach.icon}</div>
                            <div>
                                <div className="text-sm font-bold">{ach.name}</div>
                                <div className="text-[10px] text-muted-foreground">{ach.desc}</div>
                            </div>
                        </div>
                    ))}
                    {/* Empty Slots */}
                    {[...Array(4)].map((_, i) => (
                        <div key={`empty-${i}`} className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-muted rounded-lg opacity-50">
                            <Star className="w-6 h-6 text-muted-foreground" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
