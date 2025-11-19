import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useUserPrefs } from '@/contexts/UserPrefsContext';
import { Palette } from 'lucide-react';

export const ThemeEditor: React.FC = () => {
  const { prefs, setSetting } = useUserPrefs();
  const [primary, setPrimary] = useState(prefs.settings.customTheme?.primary || '#ff6b35');
  const [secondary, setSecondary] = useState(prefs.settings.customTheme?.secondary || '#004e89');
  const [background, setBackground] = useState(prefs.settings.customTheme?.background || '#1a1a1a');

  const handleSave = () => {
    setSetting('customTheme', { primary, secondary, background });
    
    // Apply CSS variables
    document.documentElement.style.setProperty('--custom-primary', primary);
    document.documentElement.style.setProperty('--custom-secondary', secondary);
    document.documentElement.style.setProperty('--custom-background', background);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Palette className="w-4 h-4" />
          Theme Editor
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom Theme Editor</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="primary">Primary Color</Label>
            <input
              id="primary"
              type="color"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              className="w-full h-10 mt-2 rounded cursor-pointer"
            />
          </div>
          <div>
            <Label htmlFor="secondary">Secondary Color</Label>
            <input
              id="secondary"
              type="color"
              value={secondary}
              onChange={(e) => setSecondary(e.target.value)}
              className="w-full h-10 mt-2 rounded cursor-pointer"
            />
          </div>
          <div>
            <Label htmlFor="background">Background Color</Label>
            <input
              id="background"
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-full h-10 mt-2 rounded cursor-pointer"
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            Apply Theme
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
