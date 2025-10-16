import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ColorPicker: React.FC = () => {
  const [color, setColor] = useState("#3b82f6");
  const [hexInput, setHexInput] = useState("#3b82f6");
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${text} copied to clipboard`,
      });
    } catch (err) {
      console.error('Copy error:', err);
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleHexChange = (value: string) => {
    setHexInput(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setColor(value);
    }
  };

  const generateRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColor(randomColor);
    setHexInput(randomColor);
  };

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number;
    let s: number;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎨 Color Picker
        </CardTitle>
        <CardDescription>
          Pick colors and get hex, RGB, and HSL values
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="color-picker">Color</Label>
          <div className="flex gap-2">
            <Input
              id="color-picker"
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                setHexInput(e.target.value);
              }}
              className="w-16 h-10 p-1 border rounded"
            />
            <Input
              type="text"
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Color Preview</Label>
          <div
            className="w-full h-16 rounded-md border"
            style={{ backgroundColor: color }}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between p-2 bg-muted rounded">
            <span className="text-sm font-medium">HEX:</span>
            <div className="flex items-center gap-2">
              <code className="text-sm">{color}</code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(color)}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 bg-muted rounded">
            <span className="text-sm font-medium">RGB:</span>
            <div className="flex items-center gap-2">
              <code className="text-sm">{hexToRgb(color)}</code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(hexToRgb(color))}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 bg-muted rounded">
            <span className="text-sm font-medium">HSL:</span>
            <div className="flex items-center gap-2">
              <code className="text-sm">{hexToHsl(color)}</code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(hexToHsl(color))}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        <Button onClick={generateRandomColor} className="w-full">
          <Palette className="w-4 h-4 mr-2" />
          Random Color
        </Button>
      </CardContent>
    </Card>
  );
};
