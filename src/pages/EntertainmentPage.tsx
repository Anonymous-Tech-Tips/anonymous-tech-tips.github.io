
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Play, ChevronRight, Star, Film,
  Monitor, Tv, Zap, Crown, Flame,
  Clapperboard, Trophy, Gamepad
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUserPrefs } from "@/contexts/UserPrefsContext";
import { DailyReward } from "@/components/DailyReward";
import { TopBannerAd, BottomAd, InContentAd } from "@/components/GoogleAd";
import { openSmart } from "@/utils/openGameSandbox";
import { Button } from "@/components/ui/button";

// 🎬 DATA SOURCES

const streamingList = [
  { title: "Cineby", url: "https://www.cineby.gd/", desc: "Movies / TV", thumb: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Popular"] },
  { title: "XPrime", url: "https://xprime.today/", desc: "Premium Streaming", thumb: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["HD"] },
  { title: "Rive", url: "https://rivestream.org/", desc: "Fast & Clean", thumb: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Fast"] },
  { title: "P-Stream", url: "https://pstream.mov/", desc: "Movie Database", thumb: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Movies"] },
  { title: "FlickyStream", url: "https://flickystream.ru/", desc: "Reliable Player", thumb: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["New"] },
  { title: "VeloraTV", url: "https://veloratv.ru/", desc: "TV Series Focus", thumb: "https://images.unsplash.com/photo-1593784697956-14185ac9489f?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["TV"] },
  { title: "SpenFlix", url: "https://watch.spencerdevs.xyz/", desc: "Developer's Choice", thumb: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Dev"] },
  { title: "Cinegram", url: "https://cinegram.net/", desc: "Modern UI", thumb: "https://images.unsplash.com/photo-1586899028174-e7098604235b?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["UI"] },
];

const singleServerList = [
  { title: "Nepu", url: "https://nepu.to/", desc: "High Reliability", thumb: "https://images.unsplash.com/photo-1517604931442-710c8ed05254?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Stable"] },
  { title: "EE3", url: "https://ee3.me/", desc: "Fast Loads", thumb: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Speed"] },
  { title: "yFlix", url: "https://yflix.to/", desc: "Less Mislabeled", thumb: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Quality"] },
];

const aggregatorsList = [
  { title: "Flixer", url: "https://flixer.sh/", desc: "Multi-Source", thumb: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Search"] },
  { title: "Cinezo", url: "https://www.cinezo.net/", desc: "Aggregator", thumb: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["All"] },
  { title: "bCine", url: "https://bcine.app/", desc: "App-like Experience", thumb: "https://images.unsplash.com/photo-1586899028174-e7098604235b?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Clean"] },
  { title: "Filmex", url: "https://filmex.to/", desc: "Large Database", thumb: "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Huge"] },
];

const animeList = [
  { title: "AnimeKai", url: "https://animekai.to/home", desc: "Top Tier Anime", thumb: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Anime"] },
  { title: "Miruro", url: "https://www.miruro.com/", desc: "Clean Player", thumb: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Sub"] },
  { title: "Anime Realms", url: "https://www.animerealms.org/", desc: "Community Fav", thumb: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Dub"] },
  { title: "All Manga", url: "https://allmanga.to/", desc: "Manga & Anime", thumb: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Reader"] },
];

const liveTvList = [
  { title: "PlayTorrio", url: "https://iptv.playtorrio.xyz/", desc: "IPTV Channels", thumb: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["IPTV"] },
  { title: "Famelack", url: "https://famelack.com/", desc: "Live Networks", thumb: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Live"] },
  { title: "NTV", url: "https://ntvstream.cx/", desc: "Global Streams", thumb: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["World"] },
  { title: "EasyWebTV", url: "https://zhangboheng.github.io/Easy-Web-TV-M3u8/routes/countries.html", desc: "Web TV", thumb: "https://images.unsplash.com/photo-1584905066893-7d5c142abc4e?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Web"] },
  { title: "RgShows", url: "https://www.rgshows.ru/livetv/", desc: "Russian/Global", thumb: "https://images.unsplash.com/photo-1505673542670-a5e3ff5b14a3?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["RU"] },
];

const liveSportsList = [
  { title: "Streamed", url: "https://streamed.pk/", desc: "Sports Events", thumb: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Events"] },
  { title: "SportyHunter", url: "https://sportyhunter.com/", desc: "Match Schedule", thumb: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Sched"] },
  { title: "WatchSports", url: "https://watchsports.to/", desc: "Live Action", thumb: "https://images.unsplash.com/photo-1599586120429-48285b6a8a81?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Live"] },
];

export const EntertainmentPage = () => {
  const { prefs } = useUserPrefs();
  const [searchQuery, setSearchQuery] = useState("");

  const allStreams = [...streamingList, ...singleServerList, ...aggregatorsList, ...animeList, ...liveTvList, ...liveSportsList];
  const featured = streamingList[0];

  const filteredStreams = searchQuery
    ? allStreams.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  return (
    <div className="min-h-screen bg-gamer-bg text-white selection:bg-rose-500/30 overflow-x-hidden font-sans">
      {/* COZY MESH GRADIENT OVERLAY */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-900/10 via-gamer-bg to-gamer-bg pointer-events-none" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      {/* 1. CINEMATIC HERO */}
      {!searchQuery && (
        <div className="relative h-[70vh] w-full group overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={featured.thumb}
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gamer-bg via-gamer-bg/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-gamer-bg via-gamer-bg/80 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 w-full p-8 md:p-24 z-10 flex flex-col items-start gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl space-y-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-sm">Featured</span>
                <span className="text-white/60 text-sm font-medium tracking-wide">Updated Daily</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-serif italic font-medium tracking-tight text-white">{featured.title}</h1>
              <p className="text-xl text-white/70 max-w-xl font-light leading-relaxed">{featured.desc} - Experience the highest quality anime streaming with zero interruptions and blazing fast load times.</p>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => openSmart(featured.url, featured.redirect)}
                  className="h-14 px-8 bg-white text-black hover:bg-slate-200 rounded-sm font-bold text-lg flex items-center gap-2"
                >
                  <Play className="fill-black w-5 h-5" /> Start Watching
                </Button>
                <Button
                  variant="outline"
                  className="h-14 px-8 border-white/20 text-white hover:bg-white/10 rounded-sm font-medium text-lg"
                >
                  More Info
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* 2. OVERLAY SEARCH BAR */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${searchQuery ? "bg-gamer-bg/95 backdrop-blur-md py-4 shadow-xl" : "bg-gradient-to-b from-transparent to-gamer-bg/80 -mt-24 pt-8 pb-12"}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className={`relative transition-all duration-300 ${searchQuery ? "w-full" : "w-full md:w-96"}`}>
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search titles, genres..."
              className="w-full bg-transparent border-b border-white/20 py-3 pl-8 text-xl font-light text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
            />
          </div>
          {!searchQuery && (
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <div className="text-xs text-white/40 uppercase tracking-widest">Rewards Streak</div>
                <div className="text-2xl font-serif italic">{prefs.settings.streakCount} Days</div>
              </div>
              <DailyReward streakCount={prefs.settings.streakCount || 0} />
            </div>
          )}
        </div>
      </div>

      {/* 3. CONTENT ROWS (NETFLIX STYLE) */}
      <div className="relative z-20 max-w-[1600px] mx-auto px-6 md:px-12 pb-24 space-y-16">

        {searchQuery ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredStreams?.map((stream, idx) => (
              <PosterCard key={idx} stream={stream} index={idx} />
            ))}
            {filteredStreams?.length === 0 && (
              <div className="col-span-full text-center py-24 text-white/40">No results found for "{searchQuery}"</div>
            )}
          </div>
        ) : (
          <>
            <>
              <ContentRow title="Streaming Services" items={streamingList} />
              <ContentRow title="High-Speed Single Server" items={singleServerList} />

              <div className="py-8">
                <TopBannerAd />
              </div>

              <ContentRow title="Stream Aggregators" items={aggregatorsList} />
              <ContentRow title="Anime Universe" items={animeList} />
              <ContentRow title="Live TV Channels" items={liveTvList} />
              <ContentRow title="Live Sports" items={liveSportsList} />
            </>
          </>
        )}

        <div className="border-t border-white/10 pt-12 mt-12 text-center space-y-4">
          <p className="text-sm text-white/30">
            TechTips does not host any content. All links point to external third-party services.
          </p>
          <BottomAd />
        </div>

      </div>
    </div>
  );
};

// --- SUBCOMPONENTS ---

const ContentRow = ({ title, items }: { title: string, items: any[] }) => (
  <section className="space-y-6">
    <div className="flex items-end justify-between px-2">
      <h2 className="text-2xl font-medium text-white/90">{title}</h2>
      <div className="flex gap-2">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronRight className="w-5 h-5 text-white/60" /></button>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item, i) => (
        <PosterCard key={i} stream={item} index={i} />
      ))}
    </div>
  </section>
);

const PosterCard = ({ stream, index }: { stream: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    onClick={() => openSmart(stream.url, stream.redirect)}
    className="group cursor-pointer space-y-3"
  >
    <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-white/5 shadow-lg border border-white/5">
      <img
        src={stream.thumb}
        alt={stream.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

      {/* Hover Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
          <Play className="w-5 h-5 fill-white text-white" />
        </div>
      </div>

      <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] uppercase font-bold text-white/80">
        {stream.tags[0]}
      </div>
    </div>

    <div>
      <h3 className="font-medium text-white/90 truncate group-hover:text-rose-500 transition-colors">{stream.title}</h3>
      <p className="text-xs text-white/40 truncate">{stream.desc}</p>
    </div>
  </motion.div>
);

export default EntertainmentPage;
