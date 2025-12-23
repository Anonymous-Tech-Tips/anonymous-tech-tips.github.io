import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Copy, Check, Share2, QrCode, Code, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import QRCodeLib from "qrcode";
import { TopBannerAd, BottomAd } from "@/components/GoogleAd";

const SharePage = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const siteUrl = "https://armaans-tech-tips.github.io";
  const safeUrl = `${siteUrl}/#/safe`;

  React.useEffect(() => {
    QRCodeLib.toDataURL(siteUrl, { width: 256, margin: 2 })
      .then(setQrDataUrl)
      .catch(console.error);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItem(label);
      toast.success(`${label} copied!`);
      setTimeout(() => setCopiedItem(null), 2000);
    });
  };

  const shareMessages = {
    discord: `🎮 **Tech Tips - Best Unblocked Games Hub 2025**
145+ games | Daily rewards | Zero downloads
${siteUrl}

✨ Features:
• Instant play - no installs
• Privacy mode built-in
• Streak rewards & points shop
• Utilities & optimization tools

Start playing now! 🚀`,

    docs: `Tech Tips - Unblocked Games Hub

Play 145+ free browser games instantly:
🎮 Popular titles: Slope, Retro Bowl, 2048, Basketball Legends
🛡️ Privacy features & safe mode
🎁 Daily rewards & achievement system
🔧 Bonus utilities & tech tools

Link: ${siteUrl}

(Copy and paste this in your notes or share with friends!)`,

    reddit: `I found this awesome unblocked games site with 145+ games and zero ads. Clean interface, privacy features, and they even have a rewards system.

${siteUrl}

Perfect for quick gaming sessions. Thought you all might enjoy it!`,

    casual: `Check out this games site I found! 145+ free browser games, no downloads, super clean. Has Slope, Retro Bowl, basketball games, and tons more.

${siteUrl}`,
  };

  const bookmarklets = {
    launcher: `javascript:(function(){window.open('${siteUrl}','_blank','noopener,noreferrer')})();`,
    aboutBlank: `javascript:(function(){var w=window.open('about:blank','_blank');w.document.write('<iframe src="${siteUrl}" style="position:fixed;inset:0;width:100%;height:100%;border:none;"></iframe>')})();`,
  };

  return (
    <>
      <SEO
        title="Share Tech Tips - Best Unblocked Games Hub"
        description="Share Tech Tips with friends! Get QR codes, share messages, and bookmarklets for Discord, Google Docs, and more."
        keywords="share games, unblocked games link, games hub share, qr code games"
      />
      <div className="min-h-screen bg-gamer-bg">
        <Navbar />

        <TopBannerAd />

        <main className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Share2 className="text-gamer-accent" size={40} />
              <h1 className="text-4xl font-rowdies font-bold text-gamer-text">
                Share Tech Tips
              </h1>
            </div>
            <p className="text-gamer-muted text-lg">
              Help your friends discover the best unblocked games hub
            </p>
          </div>

          <Tabs defaultValue="links" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gamer-card mb-8">
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="qr">QR Code</TabsTrigger>
              <TabsTrigger value="bookmarklets">Bookmarklets</TabsTrigger>
            </TabsList>

            {/* Links Tab */}
            <TabsContent value="links" className="space-y-4">
              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text">Main Site Link</CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Direct link to the homepage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={siteUrl}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gamer-bg border border-gamer-border rounded text-gamer-text text-sm"
                    />
                    <Button
                      onClick={() => copyToClipboard(siteUrl, "Main link")}
                      variant="default"
                      size="sm"
                    >
                      {copiedItem === "Main link" ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text">Safe Mode Link</CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Disguised interface for discreet browsing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={safeUrl}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gamer-bg border border-gamer-border rounded text-gamer-text text-sm"
                    />
                    <Button
                      onClick={() => copyToClipboard(safeUrl, "Safe link")}
                      variant="default"
                      size="sm"
                    >
                      {copiedItem === "Safe link" ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-4">
              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text flex items-center gap-2">
                    <MessageSquare size={20} />
                    Discord Message
                  </CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Formatted for Discord with emojis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gamer-bg border border-gamer-border rounded p-3 mb-3 text-sm text-gamer-text whitespace-pre-wrap font-mono">
                    {shareMessages.discord}
                  </div>
                  <Button
                    onClick={() => copyToClipboard(shareMessages.discord, "Discord message")}
                    variant="default"
                    className="w-full"
                  >
                    {copiedItem === "Discord message" ? <Check className="mr-2" size={16} /> : <Copy className="mr-2" size={16} />}
                    Copy Discord Message
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text">Google Docs / Notes</CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Plain text format for documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gamer-bg border border-gamer-border rounded p-3 mb-3 text-sm text-gamer-text whitespace-pre-wrap">
                    {shareMessages.docs}
                  </div>
                  <Button
                    onClick={() => copyToClipboard(shareMessages.docs, "Docs message")}
                    variant="default"
                    className="w-full"
                  >
                    {copiedItem === "Docs message" ? <Check className="mr-2" size={16} /> : <Copy className="mr-2" size={16} />}
                    Copy Docs Format
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text">Reddit / Forums</CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Community-friendly format
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gamer-bg border border-gamer-border rounded p-3 mb-3 text-sm text-gamer-text whitespace-pre-wrap">
                    {shareMessages.reddit}
                  </div>
                  <Button
                    onClick={() => copyToClipboard(shareMessages.reddit, "Reddit message")}
                    variant="default"
                    className="w-full"
                  >
                    {copiedItem === "Reddit message" ? <Check className="mr-2" size={16} /> : <Copy className="mr-2" size={16} />}
                    Copy Reddit Format
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text">Casual Share</CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Short & simple message
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gamer-bg border border-gamer-border rounded p-3 mb-3 text-sm text-gamer-text whitespace-pre-wrap">
                    {shareMessages.casual}
                  </div>
                  <Button
                    onClick={() => copyToClipboard(shareMessages.casual, "Casual message")}
                    variant="default"
                    className="w-full"
                  >
                    {copiedItem === "Casual message" ? <Check className="mr-2" size={16} /> : <Copy className="mr-2" size={16} />}
                    Copy Casual Format
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* QR Code Tab */}
            <TabsContent value="qr" className="space-y-4">
              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text flex items-center gap-2">
                    <QrCode size={20} />
                    Site QR Code
                  </CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Scan to instantly access Tech Tips
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  {qrDataUrl && (
                    <img
                      src={qrDataUrl}
                      alt="QR Code for Tech Tips"
                      className="border-4 border-gamer-border rounded-lg"
                    />
                  )}
                  <p className="text-sm text-gamer-muted text-center">
                    Share this QR code in presentations, documents, or print it out!
                  </p>
                  {qrDataUrl && (
                    <Button
                      onClick={() => {
                        const a = document.createElement("a");
                        a.href = qrDataUrl;
                        a.download = "tech-tips-qr-code.png";
                        a.click();
                        toast.success("QR code downloaded!");
                      }}
                      variant="default"
                      className="w-full"
                    >
                      Download QR Code
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookmarklets Tab */}
            <TabsContent value="bookmarklets" className="space-y-4">
              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text flex items-center gap-2">
                    <Code size={20} />
                    Quick Launch Bookmarklet
                  </CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Click to instantly open Tech Tips in a new tab
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-gamer-bg border border-gamer-border rounded p-3 text-xs text-gamer-text break-all font-mono">
                    {bookmarklets.launcher}
                  </div>
                  <Button
                    onClick={() => copyToClipboard(bookmarklets.launcher, "Quick launch bookmarklet")}
                    variant="default"
                    className="w-full"
                  >
                    {copiedItem === "Quick launch bookmarklet" ? <Check className="mr-2" size={16} /> : <Copy className="mr-2" size={16} />}
                    Copy Bookmarklet
                  </Button>
                  <p className="text-xs text-gamer-muted">
                    <strong>How to use:</strong> Copy the code, create a new bookmark, paste it as the URL, and click it anytime to launch Tech Tips.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text">About:Blank Launcher</CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Opens site in about:blank for extra privacy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-gamer-bg border border-gamer-border rounded p-3 text-xs text-gamer-text break-all font-mono">
                    {bookmarklets.aboutBlank}
                  </div>
                  <Button
                    onClick={() => copyToClipboard(bookmarklets.aboutBlank, "About:blank bookmarklet")}
                    variant="default"
                    className="w-full"
                  >
                    {copiedItem === "About:blank bookmarklet" ? <Check className="mr-2" size={16} /> : <Copy className="mr-2" size={16} />}
                    Copy Bookmarklet
                  </Button>
                  <p className="text-xs text-gamer-muted">
                    <strong>Privacy mode:</strong> This bookmarklet opens Tech Tips inside an about:blank page, hiding the real URL from browser history.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <BottomAd />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SharePage;
