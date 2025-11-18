import React from "react";
import { Wrench, Cpu, GraduationCap, MoreHorizontal, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useUserPrefs } from "@/contexts/UserPrefsContext";
import { Navbar } from "@/components/Navbar";
import { ShareBanner } from "@/components/ShareBanner";
import { ContentSection } from "@/components/ContentSection";
import { HeroBanner } from "@/components/HeroBanner";
import { GamerHome } from "@/components/GamerHome";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { FallingLeaves } from "@/components/FallingLeaves";
import { ThanksgivingCountdown } from "@/components/ThanksgivingCountdown";
import { DailyReward } from "@/components/DailyReward";
import { hash } from "@/lib/paths";
import games from "@/data/games.json";
import { thumb } from "@/lib/thumb";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { prefs } = useUserPrefs();

  // Get continue playing items
  const continueIds = prefs.history.filter(h => h.itemType==='game').map(h => h.itemId);
  const uniqueContinue = [...new Set(continueIds)];
  const continueItems = uniqueContinue.map(id => games.find(g => g.id===id)).filter(Boolean) as typeof games;

  // Get favorite items
  const favItems = prefs.favorites.map(id => games.find(g => g.id===id)).filter(Boolean) as typeof games;

  return (
    <>
      <SEO />
      <div className={`min-h-screen transition-colors duration-300 ${
        isAuthenticated ? "bg-gamer-bg" : "bg-background"
      }`}>
        <ShareBanner />
        <Navbar />

      {isAuthenticated ? (
        <>
          <FallingLeaves />
          <DailyReward streakCount={prefs.settings.streakCount || 0} />
          {/* Gamer Mode Home */}
          <HeroBanner />

          <GamerHome />

          {/* Thanksgiving Countdown */}
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ThanksgivingCountdown />
          </section>

          {/* Continue Playing Rail */}
          {continueItems.length > 0 && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
              <h2 className="text-2xl md:text-3xl font-rowdies font-bold text-gamer-text mb-6 flex items-center gap-2">
                🎮 Continue Playing
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {continueItems.slice(0, 12).map((game, idx) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={`/games/${game.id}`}
                      className="group bg-gamer-card border border-gamer-border rounded-lg p-3
                               transition-all duration-normal hover:border-gamer-accent hover:shadow-lg hover:shadow-gamer-accent/20 hover:-translate-y-1"
                    >
                      <img
                        src={thumb(game.thumbnail)}
                        alt={game.title}
                        className={`w-full h-20 object-cover rounded mb-2 ${prefs.settings.studyMode ? 'blur-sm contrast-50' : ''}`}
                      />
                      {prefs.settings.studyMode && (
                        <button
                          className="text-xs underline opacity-80"
                          onClick={(e) => { e.preventDefault(); /* temporarily reveal this card */ }}
                        >
                          reveal
                        </button>
                      )}
                      <h3 className="font-medium text-gamer-text group-hover:text-gamer-accent transition-colors duration-fast text-sm text-center truncate">
                        {game.title}
                      </h3>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Favorites Rail */}
          {favItems.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h2 className="text-2xl md:text-3xl font-rowdies font-bold text-gamer-text mb-6 flex items-center gap-2">
                ⭐ Your Favorites
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {favItems.slice(0, 12).map(game => (
                  <Link
                    key={game.id}
                    to={`/games/${game.id}`}
                    className="group bg-gamer-card border border-gamer-border rounded-lg p-3
                             transition-all duration-normal hover:border-gamer-accent hover:shadow-lg hover:shadow-gamer-accent/20 hover:-translate-y-1"
                  >
                    <img
                      src={thumb(game.thumbnail)}
                      alt={game.title}
                      className={`w-full h-20 object-cover rounded mb-2 ${prefs.settings.studyMode ? 'blur-sm contrast-50' : ''}`}
                    />
                    {prefs.settings.studyMode && (
                      <button
                        className="text-xs underline opacity-80"
                        onClick={(e) => { e.preventDefault(); /* temporarily reveal this card */ }}
                      >
                        reveal
                      </button>
                    )}
                    <h3 className="font-medium text-gamer-text group-hover:text-gamer-accent transition-colors duration-fast text-sm text-center truncate">
                      {game.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Quick Access Cards for Gamer Mode */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            <h2 className="text-3xl md:text-4xl font-rowdies font-bold text-gamer-text text-center mb-12 flex items-center justify-center gap-3">
              <span>🍂</span> Quick Access <span>🦃</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { to: "/games", icon: Gamepad2, title: "Games Hub", desc: "Browse and play games", delay: 0 },
                { to: "/utilities", icon: Wrench, title: "Utilities", desc: "Essential tools and utilities", delay: 0.1 },
                { to: "/optimizations", icon: Cpu, title: "PC Optimizations", desc: "Tips and tricks for your PC", delay: 0.2 },
                { to: "/education", icon: GraduationCap, title: "Education", desc: "Learning resources and content", delay: 0.3 }
              ].map((item, idx) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + item.delay }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.to}
                    className="group bg-gamer-card border border-gamer-border rounded-lg p-6
                             transition-all duration-normal hover:border-gamer-accent hover:shadow-lg hover:shadow-gamer-accent/20 block"
                  >
                    <item.icon className="text-gamer-accent mx-auto mb-4 group-hover:scale-110 transition-transform" size={48} />
                    <h3 className="font-semibold text-gamer-text group-hover:text-gamer-accent transition-colors duration-fast text-center">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gamer-muted text-center mt-2">
                      {item.desc}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </>
      ) : (
        <>
          {/* Public Home Page */}
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-rowdies font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                <span>🦃</span> Welcome to Tech Tips <span>🍂</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Your cozy corner for tech tools, tips, and tricks this Thanksgiving season
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-12">
              <ThanksgivingCountdown />
            </div>
          </div>

          <ContentSection
            id="utilities"
            icon={Wrench}
            title="🍁 Utilities"
            description="Essential tools and utilities to enhance your experience"
            items={[
              { text: "🔐 Password Generator", utility: "password" },
              { text: "🎨 Color Picker", utility: "color" },
              { text: "📝 Text Converter", utility: "text" },
              { text: "📱 QR Code Generator", utility: "qr" },
              { text: "❄️ Snow Day Predictor", url: "https://docs.google.com/spreadsheets/d/1dInwA7F-w0TB4Qy-D_463frdBPr9c21LPI4kdhktsO4/edit?gid=0#gid=0" },
              { text: "🛡️ The Best Adblocker", url: "https://ublockorigin.com/" },
              { text: "📅 LCPS Calendars", url: "https://www.lcps.org/documents/discover-lcps/about-loudoun/calendars---loudoun-county-public-schools/629038" },
            ]}
          />

          <ContentSection
            id="pc-optimizations"
            icon={Cpu}
            title="🌰 PC Optimizations"
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

          <ContentSection
            id="education"
            icon={GraduationCap}
            title="📚 Education"
            description="Learning resources and educational content"
            items={[
              { text: "🧮 Course Grade Calculator", url: "https://www.desmos.com/calculator/wrmalnmnpj" },
              { text: "📺 Subject Review Channels", guide: "review-channels" },
              { text: "💻 Programming Fundamentals", guide: "programming-basics" },
              { text: "🧮 Math Resources", guide: "math-resources" },
              { text: "📚 Study Techniques", guide: "study-methods" },
              { text: "🔬 Science Experiments", guide: "science-experiments" },
              { text: "🌍 Language Learning", guide: "language-learning" },
              { text: "🖥️ Tech Concepts Explained", guide: "tech-concepts" },
            ]}
          />

          <ContentSection
            id="other"
            icon={MoreHorizontal}
            title="🍽️ Other"
            description="Additional resources and interesting finds"
            items={[
              { text: "👨‍💻 About Me", guide: "about-me" },
              { text: "🔗 Cool Websites Collection", guide: "cool-websites" },
              { text: "📰 Tech News & Updates", guide: "tech-news" },
              { text: "👥 Community Projects", guide: "community-projects" },
              { text: "📋 Helpful Links Directory", guide: "helpful-links" },
              { text: "💿 Software Recommendations", guide: "software-recommendations" },
              { text: "💡 Tips & Tricks Compilation", guide: "tips-tricks" },
              { text: "📝 Suggestions", url: "https://docs.google.com/forms/d/e/1FAIpQLSceaVXrWwjj0zqMqdmPJTCxPQoq166Pe72I7pKjcChU-h1mRQ/viewform?embedded=true" },
              { text: "⚖️ DMCA Takedown", url: "https://docs.google.com/forms/d/e/1FAIpQLSe6wFMCXkW_U_U_GwbnyxscD2t91wP4KakVLOiKBzYnZRFfTg/viewform" },
            ]}
          />
        </>
      )}

        <Footer />
      </div>
    </>
  );
};

export default Index;
