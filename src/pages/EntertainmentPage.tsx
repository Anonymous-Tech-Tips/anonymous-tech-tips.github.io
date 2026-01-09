import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, Flame, Tv, Play, ChevronRight, 
  Film, Trophy, Zap, Clapperboard, Monitor,
  Gamepad, Crown, Popcorn
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUserPrefs } from "@/contexts/UserPrefsContext";
import { DailyReward } from "@/components/DailyReward";
import { TopBannerAd, BottomAd, InContentAd } from "@/components/GoogleAd";
import { openSmart } from "@/utils/openGameSandbox";

// 🎬 STREAMING DATA
// I have pre-filled these with the URLs you provided earlier.
// "redirect: true" fixes the Firefox/Blocked Frame error.

const animeList = [
  { 
    title: "HiAnime", 
    url: "https://hianime.to/", 
    desc: "Sub / Dub / Auto-Next", 
    icon: Zap, 
    color: "from-orange-500 to-red-600", 
    thumb: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
  { 
    title: "AnimeKai", 
    url: "https://animekai.to/", 
    desc: "Hard Subs / Dub", 
    icon: Clapperboard, 
    color: "from-purple-500 to-indigo-600", 
    thumb: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
  { 
    title: "Miruro", 
    url: "https://miruro.tv/", 
    desc: "Clean UI / No Ads", 
    icon: Crown, 
    color: "from-green-500 to-emerald-700", 
    thumb: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
];

const movieList = [
  { 
    title: "Cineby", 
    url: "https://cineby.app/", 
    desc: "Movies / TV / Anime", 
    icon: Film, 
    color: "from-blue-600 to-blue-900", 
    thumb: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
  { 
    title: "Rive", 
    url: "https://rfrsh.rive.app/", 
    desc: "Premium Streaming", 
    icon: Play, 
    color: "from-rose-500 to-rose-800", 
    thumb: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
  { 
    title: "Flixer", 
    url: "https://flixer.vip/", 
    desc: "Auto-Next Feature", 
    icon: Popcorn, 
    color: "from-yellow-500 to-orange-700", 
    thumb: "https://images.unsplash.com/photo-1517604931442-710c8ed05254?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
  { 
    title: "VeloraTV", 
    url: "https://veloratv.su/", 
    desc: "High Quality Streams", 
    icon: Tv, 
    color: "from-purple-600 to-purple-900", 
    thumb: "https://images.unsplash.com/photo-1593784697956-14185ac9489f?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
  { 
    title: "Aether", 
    url: "https://aether.mom/", 
    desc: "Modern UI", 
    icon: Crown, 
    color: "from-indigo-500 to-blue-800", 
    thumb: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
];

const sportsList = [
  { 
    title: "StreamEast", 
    url: "https://streameast.app/", 
    desc: "The GOAT of Sports", 
    icon: Trophy, 
    color: "from-green-600 to-green-900", 
    thumb: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
  { 
    title: "MethStreams", 
    url: "https://crackstreams.biz/", 
    desc: "MMA / Boxing / NFL", 
    icon: Flame, 
    color: "from-red-600 to-red-900", 
    thumb: "https://images.unsplash.com/photo-1599586120429-48285b6a8a81?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
  { 
    title: "Streamed.su", 
    url: "https://streamed.su/", 
    desc: "Clean Sports Aggregator", 
    icon: Monitor, 
    color: "from-blue-500 to-blue-800", 
    thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
  { 
    title: "DaddyLive", 
    url: "https://daddylive.mp/", 
    desc: "24/7 Live TV Channels", 
    icon: Tv, 
    color: "from-orange-500 to-orange-800", 
    thumb: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
  { 
    title: "Sportsurge", 
    url: "https://v2.sportsurge.net/", 
    desc: "Link Aggregator", 
    icon: Zap, 
    color: "from-slate-600 to-slate-900", 
    thumb: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
  { 
    title: "NFLBite", 
    url: "https://nflbite.com/", 
    desc: "American Football", 
    icon: Gamepad, 
    color: "from-blue-800 to-blue-950", 
    thumb: "https://images.unsplash.com/photo-1611000271746-59914442df7f?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
  { 
    title: "NBAMonster", 
    url: "https://nbamonster.xyz/", 
    desc: "Basketball Streams", 
    icon: Trophy, 
    color: "from-orange-600 to-orange-900", 
    thumb: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
  { 
    title: "SportyHunter", 
    url: "https://sportyhunter.com/", 
    desc: "Live Schedule", 
    icon: Search, 
    color: "from-emerald-600 to-emerald-900", 
    thumb: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=1000&auto=format&fit=crop",
    redirect: true 
  },
];

export const EntertainmentPage = () => {
  const { prefs } = useUserPrefs();
  const [searchQuery, setSearchQuery] = useState("");

  const allStreams = [...animeList, ...movieList, ...sportsList];
  
  const filteredStreams = searchQuery 
    ? allStreams.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  // Featured Hero Item (HiAnime)
  const featured = animeList[0];

  return (
    <div className="min-h-screen pb-24 bg-[#121217] text-white overflow-x-hidden">
      
      {/* 1. TOP BAR */}
      <div className="sticky top-0 z-40 bg-[#121217]/90 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-500 transition-colors" size={18} />
            <Input 
              placeholder="Search streams..." 
              className="bg-[#1E1E24] border-white/10 pl-10 text-white placeholder:text-slate-500 focus:border-purple-500/50 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
             <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 px-4 py-2 rounded-full border border-purple-500/20">
              <Flame className="text-purple-500 fill-purple-500 animate-pulse" size={18} />
              <span className="font-bold text-purple-400">{prefs.settings.streakCount || 0} Streak</span>
            </div>
            <DailyReward streakCount={prefs.settings.streakCount || 0} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* 2. HERO (HiAnime) */}
        {!searchQuery && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden aspect-[21/9] md:aspect-[24/9] mb-12 group cursor-pointer border border-white/5 hover:border-orange-500/50 transition-colors"
            onClick={() => openSmart(featured.url, featured.redirect)}
          >
            <div className="absolute inset-0">
              <img 
                src={featured.thumb} 
                alt="Featured" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#121217] via-[#121217]/60 to-transparent" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4 shadow-lg">
                  FEATURED
                </div>
                <h1 className="text-4xl md:text-6xl font-rowdies text-white mb-2 leading-tight">
                  {featured.title}
                </h1>
                <p className="text-xl text-slate-300 font-light mb-4">{featured.desc}</p>
                <div className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 rounded-xl text-lg font-bold shadow-lg transition-all">
                  <Play className="fill-white mr-2" size={20} /> Watch Now
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        <div className="mb-12"><TopBannerAd /></div>

        {/* 3. GRIDS */}
        {searchQuery ? (
           <SectionGrid title={`Results for "${searchQuery}"`} items={filteredStreams || []} icon={Search} />
        ) : (
           <>
              <SectionGrid title="Anime Hub" items={animeList} icon={Zap} delay={0.1} />
              <div className="my-12"><InContentAd /></div>
              <SectionGrid title="Movies & TV Shows" items={movieList} icon={Clapperboard} delay={0.2} />
              <div className="my-12"><InContentAd /></div>
              <SectionGrid title="Live Sports" items={sportsList} icon={Trophy} delay={0.3} />
           </>
        )}

        <div className="mt-16 mb-8 p-6 bg-white/5 rounded-xl border border-white/10 text-center">
            <p className="text-xs text-slate-500">
                TechTips does not host any content. All links point to external third-party services.
            </p>
        </div>
      </div>
      <BottomAd />
    </div>
  );
};

const SectionGrid = ({ title, items, icon: Icon, delay = 0 }: any) => (
  <section className="mb-12">
    <div className="flex items-center justify-between mb-6 px-2">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Icon className="text-purple-400" /> {title}
      </h2>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((stream: any, idx: number) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + (idx * 0.05) }}
        >
          <div
            /* 👇 THIS IS THE MAGIC LINE that fixes the buttons */
            onClick={() => openSmart(stream.url, stream.redirect)} 
            className="group relative bg-[#1E1E24] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:-translate-y-1 cursor-pointer h-full flex flex-col"
          >
            <div className={`h-24 bg-gradient-to-r ${stream.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <stream.icon className="absolute -bottom-4 -right-4 text-white/10 -rotate-12 transform scale-[2.5]" size={64} />
            </div>
            <div className="px-6 -mt-8 relative z-10 flex justify-between items-end">
                <div className="w-16 h-16 rounded-xl bg-[#1E1E24] p-1 shadow-2xl">
                  <img src={stream.thumb} alt="icon" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="mb-1"><ChevronRight className="text-slate-600 group-hover:text-purple-400 transition-colors" /></div>
            </div>
            <div className="p-6 pt-3 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mb-1">{stream.title}</h3>
              <p className="text-xs text-slate-400 mb-4 flex-1 line-clamp-2">{stream.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default EntertainmentPage;
