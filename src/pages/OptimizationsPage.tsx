import React from "react";
import { Cpu } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ShareBanner } from "@/components/ShareBanner";
import { ContentSection } from "@/components/ContentSection";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";

const OptimizationsPage = () => {
  return (
    <>
      <SEO 
        title="PC Optimization Guides & Windows Tips | Armaan's Tech Tips"
        description="Complete PC optimization guides including Windows settings, GPU drivers, power plans, CPU unparking, network optimization, and system cleanup tools."
        keywords="pc optimization, windows optimization, gpu optimization, cpu optimization, network optimization, system cleanup, windows settings, power plan, gaming optimization, pc performance"
      />
      <div className="min-h-screen bg-gamer-bg">
        <ShareBanner />
        <Navbar />

        <ContentSection
          id="pc-optimizations"
          icon={Cpu}
          title="PC Optimizations"
          description="Tips and tricks to keep your PC running smoothly"
          items={[
            { text: "📋 Complete Optimization Guide", guide: "complete-guide" },
            { text: "🛠️ Chris Titus Tech's WinUtil", guide: "winutil-guide" },
            { text: "💾 System Restore Point Setup", guide: "restore-point" },
            { text: "⚡ Power Plan Optimization", guide: "power-plan" },
            { text: "🔥 CPU Core Unparking", guide: "unpark-cpu" },
            { text: "🔧 Services Optimization", guide: "services-optimization" },
            { text: "⚙️ Windows Settings", guide: "windows-settings" },
            { text: "🎮 GPU Driver Optimization", guide: "gpu-optimization" },
            { text: "📊 MSI Afterburner Setup", guide: "msi-afterburner" },
            { text: "🌐 Network Optimization", guide: "network-optimization" },
            { text: "📡 TCP Optimizer Setup", guide: "tcp-optimization" },
            { text: "🧹 System Cleanup Tools", guide: "system-cleanup" },
          ]}
        />

        <Footer />
      </div>
    </>
  );
};

export default OptimizationsPage;
