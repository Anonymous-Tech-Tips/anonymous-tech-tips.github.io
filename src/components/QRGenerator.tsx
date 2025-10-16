import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCodeLib from "qrcode";

export const QRGenerator: React.FC = () => {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQR = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter text or URL to generate QR code",
        variant: "destructive",
      });
      return;
    }

    try {
      const options = {
        errorCorrectionLevel: errorCorrection,
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
        width: 256,
      };

      const qrDataUrl = await QRCodeLib.toDataURL(text, options);
      setQrCode(qrDataUrl);
    } catch (err) {
      console.error('QR generation error:', err);
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    } catch (err) {
      console.error('Copy error:', err);
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;

    const link = document.createElement("a");
    link.download = `qrcode-${Date.now()}.png`;
    link.href = qrCode;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Downloaded!",
      description: "QR code saved to downloads",
    });
  };

  const clearAll = () => {
    setText("");
    setQrCode("");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="w-5 h-5" />
          QR Code Generator
        </CardTitle>
        <CardDescription>
          Generate QR codes for text, URLs, or any content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="qr-text">Text or URL</Label>
          <Input
            id="qr-text"
            placeholder="Enter text or URL..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Error Correction</Label>
            <select
              value={errorCorrection}
              onChange={(e) => setErrorCorrection(e.target.value as "L" | "M" | "Q" | "H")}
              className="w-full p-2 border rounded-md"
            >
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Foreground</Label>
            <Input
              type="color"
              value={foregroundColor}
              onChange={(e) => setForegroundColor(e.target.value)}
              className="w-full h-10"
            />
          </div>

          <div className="space-y-2">
            <Label>Background</Label>
            <Input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-full h-10"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={generateQR} className="flex-1">
            Generate QR
          </Button>
          <Button onClick={clearAll} variant="outline">
            Clear
          </Button>
        </div>

        {qrCode && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={qrCode}
                alt="Generated QR Code"
                className="border rounded-lg"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copy Text
              </Button>
              <Button onClick={downloadQR} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
