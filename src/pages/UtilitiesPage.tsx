import React from "react";
import { Wrench, Shield, Globe, Zap, Lock, Eye, FileText } from "lucide-react";
import { ShareBanner } from "@/components/ShareBanner";
import { ContentSection } from "@/components/ContentSection";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { TopBannerAd, BottomAd, InContentAd } from "@/components/GoogleAd";

const UtilitiesPage = () => {
  const { isAuthenticated } = useAuth();

  // Privacy & Security (consolidated)
  const privacySecurity: Array<{ text: string; url?: string }> = [
    { text: "🛡️ uBlock Origin - Best Adblocker", url: "https://ublockorigin.com/" },
    { text: "📺 SponsorBlock - Skip YouTube Sponsors", url: "https://sponsor.ajay.app/" },
    { text: "🔇 Spotify Adblocker (SpotX)", url: "https://github.com/SpotX-Official/SpotX" },
    { text: "🎮 Discord Adblock", url: "https://github.com/BetterDiscord/BetterDiscord" },
    { text: "🍪 ClearURLs - Remove Tracking", url: "https://docs.clearurls.xyz/" },
    { text: "☁️ Cloudflare WARP - Free VPN", url: "https://1.1.1.1/" },
    { text: "🔐 Proton VPN - Free Tier", url: "https://protonvpn.com/" },
    { text: "💨 Windscribe - 10GB Free", url: "https://windscribe.com/" },
    { text: "🌍 CroxyProxy - Web Proxy", url: "https://www.croxyproxy.com/" },
    { text: "🔓 Blockaway - Proxy", url: "https://www.blockaway.net/" },
  ];



  return (
    <>
      <SEO
        title={isAuthenticated ? "Premium Utilities | Tech Tips" : "Free Utilities & Tools | Tech Tips"}
        description="Free online utilities including password generator, color picker, text converter, QR code generator, and more essential tools for students."
        keywords="password generator, color picker, text converter, qr code generator, free utilities, online tools, adblocker, vpn, proxy, streaming"
      />
      <div className={`min-h-screen ${isAuthenticated ? "" : "bg-background"}`}>
        {isAuthenticated ? (
          <>
            {/* Authenticated view - consistent with Games/Profile/Rewards pages */}
            <TopBannerAd />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl">🛠️</span>
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Utilities</h1>
                </div>
                <p className="text-slate-500 text-sm">Tools & resources — open anything in one click.</p>
              </div>

              <ContentSection
                id="privacy-security"
                icon={Shield}
                title="🛡️ Privacy & Security"
                description="Adblockers, VPNs, and privacy tools"
                items={privacySecurity}
              />

              <InContentAd />
            </main>

            <BottomAd />
            <Footer />
          </>
        ) : (
          <>
            {/* Unauthenticated view - public layout */}
            <ShareBanner />
            <TopBannerAd />

            <ContentSection
              id="utilities"
              icon={Shield}
              title="Utilities & Tools"
              description="Essential tools and utilities to enhance your experience"
              items={privacySecurity}
            />

            <BottomAd />
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default UtilitiesPage;
