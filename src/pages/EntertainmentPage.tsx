
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const unblockedSlidesList = [
  { title: "Netflix Slides", url: "https://docs.google.com/presentation/d/149GpUX0v2xNpwbUTv0Ra1bXSBJ8VImN3yQXMYA9ZhKA/edit?usp=sharing", desc: "Unblocked Netflix", thumb: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop", redirect: false, tags: ["School"] },
  { title: "Disney+ Slides", url: "https://docs.google.com/presentation/d/1cqMoS7rNvOX77938GusdWNi6mYVPOfETCVsAVW9I9ps/edit", desc: "Unblocked Disney+", thumb: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop", redirect: false, tags: ["School"] },
  { title: "Paramount+", url: "https://docs.google.com/presentation/d/1CiZMdBm677M7EIus7gT89WPxwYPzXJQgwmXGv3sLAaw/edit#slide=id.g1b71f8bdb3c_2_77", desc: "Unblocked Stream", thumb: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1000&auto=format&fit=crop", redirect: false, tags: ["School"] },
  { title: "Roku Slides", url: "https://docs.google.com/presentation/d/1OjrWHYHz5xbxhVYfWbDF4J0NdM3AYHC9x2pTchv4GuU/edit#slide=id.g26f6dcac621_1_0", desc: "Roku Channel", thumb: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop", redirect: false, tags: ["School"] },
  { title: "Tubi Slides", url: "https://docs.google.com/presentation/d/1MKUZLOhfS1PyOtbz-uhfdNqewzDJIqZxBEfMeWPhJpE/edit#slide=id.g2d03a5085ad_0_68", desc: "Free Movies", thumb: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1000&auto=format&fit=crop", redirect: false, tags: ["School"] },
  { title: "Hulu Slides", url: "https://docs.google.com/presentation/d/1YDZCGRJMcIXA6CDnnxEUcNuZuEx-NdUETeeVFulhYDg/edit", desc: "Unblocked Hulu", thumb: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1000&auto=format&fit=crop", redirect: false, tags: ["School"] },
  { title: "YouTube TM", url: "https://docs.google.com/presentation/d/1KBqFsMZ10Buf485l-AzkcjIDzFQyyg_O6EfX3vJmYTY/edit?usp=sharing", desc: "Unblocked YT", thumb: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop", redirect: false, tags: ["School"] },
  { title: "NLive TV", url: "https://docs.google.com/presentation/u/0/d/1qs4zcgOXev4PIHqncEnXB4t9pTwOdn8bgJY55NBv11w/edit", desc: "Live TV Slides", thumb: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1000&auto=format&fit=crop", redirect: false, tags: ["School"] },
];

export const EntertainmentPage = () => {
  const { prefs } = useUserPrefs();
  const [searchQuery, setSearchQuery] = useState("");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const allStreams = [...streamingList, ...singleServerList, ...aggregatorsList, ...animeList, ...liveTvList, ...liveSportsList, ...unblockedSlidesList];
  const featured = streamingList[0];

  const filteredStreams = searchQuery
    ? allStreams.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  return (
    <div className="min-h-screen text-white selection:bg-rose-500/30 overflow-x-hidden font-sans">
      {/* COZY MESH GRADIENT OVERLAY - Handled Globally */}

      {/* 1. CINEMATIC HERO */}
      {/* 1. SANCTUARY HEADER (Replaces Cinematic Hero) */}
      {!searchQuery && (
        <div className="relative pt-32 pb-8 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto space-y-8">
          {/* GREETING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h1 className="text-5xl md:text-6xl font-serif italic text-white/90">
              {getGreeting()}, <span className="text-rose-400">Guest</span>.
            </h1>
            <p className="text-xl text-white/60 font-light max-w-2xl">
              Popcorn is ready. Here's what's trending in your theater.
            </p>
          </motion.div>

          {/* BENTO FEATURED CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative h-[500px] rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-rose-900/20 cursor-pointer"
            onClick={() => openSmart(featured.url, featured.redirect)}
          >
            <img
              src={featured.thumb}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105 opacity-80"
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-10 flex flex-col items-start gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/20 backdrop-blur-md border border-rose-500/20 rounded-full text-xs font-bold uppercase tracking-widest text-rose-200">
                <Flame className="w-3 h-3 fill-rose-200" /> Hot Pick
              </div>
              <h2 className="text-5xl md:text-7xl font-serif italic font-medium tracking-tight text-white mb-2">{featured.title}</h2>
              <p className="text-lg text-white/80 max-w-xl font-light leading-relaxed line-clamp-2">{featured.desc}</p>

              <div className="flex gap-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                <Button className="h-12 px-8 rounded-full bg-white text-black hover:bg-slate-200 font-bold">
                  <Play className="fill-black w-4 h-4 mr-2" /> Watch Now
                </Button>
              </div>
            </div>
          </motion.div>
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
          <Tabs defaultValue="movies" className="space-y-8">
            <TabsList className="bg-white/5 border border-white/10 rounded-full p-1 h-auto flex-wrap justify-center md:justify-start gap-2">
              <TabsTrigger value="movies" className="rounded-full px-6 py-2 text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-black transition-all">
                Movies & TV
              </TabsTrigger>
              <TabsTrigger value="anime" className="rounded-full px-6 py-2 text-sm md:text-base data-[state=active]:bg-Rose-500 data-[state=active]:text-white transition-all">
                Anime
              </TabsTrigger>
              <TabsTrigger value="live" className="rounded-full px-6 py-2 text-sm md:text-base data-[state=active]:bg-red-500 data-[state=active]:text-white transition-all">
                Live TV & Sports
              </TabsTrigger>
              <TabsTrigger value="unblocked" className="rounded-full px-6 py-2 text-sm md:text-base data-[state=active]:bg-purple-500 data-[state=active]:text-white transition-all">
                Unblocked
              </TabsTrigger>
            </TabsList>

            <TabsContent value="movies" className="space-y-12 animate-in fade-in slide-in-from-left-4">
              <ContentRow title="Streaming Services" items={streamingList} />
              <ContentRow title="High-Speed Servers" items={singleServerList} />
              <div className="py-4"><TopBannerAd /></div>
              <ContentRow title="Aggregators" items={aggregatorsList} />
            </TabsContent>

            <TabsContent value="anime" className="space-y-12 animate-in fade-in slide-in-from-left-4">
              <ContentRow title="Anime Universe" items={animeList} />
              <ContentRow title="Manga Readers" items={[{ title: "Mangadex (Proxy)", url: "https://mangadex.org", desc: "Manga", thumb: "https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80", redirect: true, tags: ["Manga"] }]} />
            </TabsContent>

            <TabsContent value="live" className="space-y-12 animate-in fade-in slide-in-from-left-4">
              <ContentRow title="Live TV Channels" items={liveTvList} />
              <ContentRow title="Sports Events" items={liveSportsList} />
            </TabsContent>

            <TabsContent value="unblocked" className="space-y-12 animate-in fade-in slide-in-from-left-4">
              <ContentRow title="Unblocked Slides" items={unblockedSlidesList} />
            </TabsContent>

          </Tabs>
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

