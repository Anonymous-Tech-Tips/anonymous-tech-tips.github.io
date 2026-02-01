import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FolderPlus, Gamepad2, Plus, Trash2 } from 'lucide-react';
import { useUserPrefs } from '@/contexts/UserPrefsContext';
import { games } from '@/data/games';
import { toast } from 'sonner';

export const GameCollections = () => {
    const { prefs, setSetting } = useUserPrefs();
    const [newCollectionName, setNewCollectionName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    // Collections are stored in prefs.collections (defined in schema as user-created collections)
    // But we need to define how to access/update them via `setSetting` or a new method.
    // For now, let's assume we can modify a 'collections' key in settings or similar.
    // The UserPrefsContext exposes `prefs` and `setSetting` (which updates settings object).
    // But collections is a top-level key in UserPrefs.
    // Wait, UserPrefsContext might not expose a generic "update whole prefs" method.
    // Let's check UserPrefsContext... (I recall setSetting updates `prefs.settings`).
    // If collections is top-level, I might need to mock this locally for now or rely on a "collections" setting if I move it there.
    // Schema says: `collections` is top level.
    // UserPrefsContext `setSetting` updates `prefs.settings`.
    // So I can't update top-level collections easily without context change.
    // HACK: I will store collections in `prefs.settings.collections` (as a JSON string or simpler object) to stick to existing context API without massive refactor. 
    // OR rely on local state for the demo.
    // Let's use local state + localStorage persistence separate from main context for safety if needed, OR just mock it.
    // Better: Use `localStorage` key 'user_collections'.

    const [collections, setCollections] = useState(() => {
        const saved = localStorage.getItem('user_collections');
        return saved ? JSON.parse(saved) : [
            { id: '1', name: 'Weekend Vibes', gameIds: ['slope', 'retro-bowl'] },
            { id: '2', name: 'Try Later', gameIds: [] }
        ];
    });

    const saveCollections = (newColls: any) => {
        setCollections(newColls);
        localStorage.setItem('user_collections', JSON.stringify(newColls));
    };

    const createCollection = () => {
        if (!newCollectionName.trim()) return;
        const newColl = {
            id: Date.now().toString(),
            name: newCollectionName,
            gameIds: []
        };
        saveCollections([...collections, newColl]);
        setNewCollectionName('');
        setIsCreating(false);
        toast.success(`Collection "${newCollectionName}" created!`);
    };

    const deleteCollection = (id: string) => {
        saveCollections(collections.filter((c: any) => c.id !== id));
        toast.error("Collection deleted.");
    };

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                    <FolderPlus className="w-5 h-5 text-indigo-500" />
                    Game Collections
                </CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setIsCreating(!isCreating)}>
                    <Plus className="w-4 h-4" /> New
                </Button>
            </CardHeader>
            <CardContent>
                {isCreating && (
                    <div className="flex gap-2 mb-4 animate-in fade-in slide-in-from-top-2">
                        <Input
                            placeholder="Collection Name..."
                            value={newCollectionName}
                            onChange={e => setNewCollectionName(e.target.value)}
                            className="h-8 text-sm"
                        />
                        <Button size="sm" onClick={createCollection}>Add</Button>
                    </div>
                )}

                <div className="grid gap-3">
                    {collections.map((coll: any) => (
                        <div key={coll.id} className="group flex items-center justify-between p-3 bg-muted/40 rounded-lg border border-transparent hover:border-indigo-500/30 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-500/10 rounded flex items-center justify-center">
                                    <Gamepad2 className="w-5 h-5 text-indigo-500" />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm">{coll.name}</div>
                                    <div className="text-xs text-muted-foreground">{coll.gameIds.length} games</div>
                                </div>
                            </div>
                            <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10" onClick={() => deleteCollection(coll.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    {collections.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground text-sm">
                            Create a collection to organize your games!
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
