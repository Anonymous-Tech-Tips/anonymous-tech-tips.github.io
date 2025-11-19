import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUserPrefs } from '@/contexts/UserPrefsContext';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

export const GameRequestForm: React.FC = () => {
  const { prefs, setSetting } = useUserPrefs();
  const [gameName, setGameName] = useState('');
  const [gameUrl, setGameUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gameName || !gameUrl) {
      toast.error('Please fill in game name and URL');
      return;
    }

    const requests = prefs.settings.gameRequests || [];
    const newRequest = {
      id: Date.now().toString(),
      gameName,
      gameUrl,
      description,
      date: new Date().toISOString(),
    };

    setSetting('gameRequests', [...requests, newRequest]);
    
    toast.success('Game request submitted!');
    setGameName('');
    setGameUrl('');
    setDescription('');
  };

  const requests = prefs.settings.gameRequests || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5" />
          Game Request
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="gameName">Game Name</Label>
            <Input
              id="gameName"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              placeholder="Enter game name"
            />
          </div>
          <div>
            <Label htmlFor="gameUrl">Game URL</Label>
            <Input
              id="gameUrl"
              type="url"
              value={gameUrl}
              onChange={(e) => setGameUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Why should we add this game?"
              rows={3}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Request
          </Button>
        </form>

        {requests.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Your Requests</h4>
            <div className="space-y-2">
              {requests.map((req: any) => (
                <div key={req.id} className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">{req.gameName}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {req.gameUrl}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(req.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
