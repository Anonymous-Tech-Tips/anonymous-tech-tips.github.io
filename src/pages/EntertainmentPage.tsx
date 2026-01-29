
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
const animeList = [
  { title: "HiAnime", url: "https://hianime.to/", desc: "Sub / Dub / Auto-Next", thumb: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Popular", "HD"] },
  { title: "AnimeKai", url: "https://animekai.to/", desc: "Hard Subs / Dub", thumb: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Dub"] },
  { title: "Miruro", url: "https://miruro.tv/", desc: "Clean UI / No Ads", thumb: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["No Ads"] },
  { title: "Crunchyroll", url: "https://docs.google.com/presentation/d/11emRJ473ihU1R5lKucb1e9xJDbHy4-myZBw3sMzBiac/edit?usp=sharing", desc: "Anime Streaming", thumb: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Official"] },
];

const movieList = [
  { title: "Cineby", url: "https://cineby.app/", desc: "Movies / TV / Anime", thumb: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["4K"] },
  { title: "Rive", url: "https://rfrsh.rive.app/", desc: "Premium Streaming", thumb: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Fast"] },
  { title: "Flixer", url: "https://flixer.vip/", desc: "Auto-Next Feature", thumb: "https://images.unsplash.com/photo-1517604931442-710c8ed05254?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Movies"] },
  { title: "VeloraTV", url: "https://veloratv.su/", desc: "High Quality Streams", thumb: "https://images.unsplash.com/photo-1593784697956-14185ac9489f?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Series"] },
  { title: "Aether", url: "https://aether.mom/", desc: "Modern UI", thumb: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["New"] },
];

const premiumList = [
  { title: "Disney+", url: "https://docs.google.com/presentation/d/1cqMoS7rNvOX77938GusdWNi6mYVPOfETCVsAVW9I9ps/edit?usp=sharing", desc: "Magic & Entertainment", thumb: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Disney"] },
  { title: "Netflix", url: "https://netflix-offical.my.canva.site/", desc: "Unlimited Entertainment", thumb: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Netflix"] },
  { title: "Netflix Alt", url: "https://docs.google.com/presentation/d/149GpUX0v2xNpwbUTv0Ra1bXSBJ8VImN3yQXMYA9ZhKA/edit?usp=sharing", desc: "Alternative Access", thumb: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Mirror"] },
  { title: "Roku", url: "https://docs.google.com/presentation/d/1OjrWHYHz5xbxhVYfWbDF4J0NdM3AYHC9x2pTchv4GuU/edit#slide=id.g26f6dcac621_1_0", desc: "Streaming Platform", thumb: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["TV"] },
  { title: "Tubi", url: "https://docs.google.com/presentation/d/1MKUZLOhfS1PyOtbz-uhfdNqewzDJIqZxBEfMeWPhJpE/edit#slide=id.g2d03a5085ad_0_68", desc: "Free Movies & TV", thumb: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Free"] },
  { title: "YouTube", url: "https://docs.google.com/presentation/d/1KBqFsMZ10Buf485l-AzkcjIDzFQyyg_O6EfX3vJmYTY/edit?usp=sharing", desc: "Video Platform", thumb: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Social"] },
];

const liveContentList = [
  { title: "StreamEast", url: "https://streameast.app/", desc: "The GOAT of Sports", thumb: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Sports"] },
  { title: "MethStreams", url: "https://crackstreams.biz/", desc: "MMA / Boxing / NFL", thumb: "https://images.unsplash.com/photo-1599586120429-48285b6a8a81?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["MMA"] },
  { title: "Streamed.su", url: "https://streamed.su/", desc: "Clean Sports Aggregator", thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Live"] },
  { title: "DaddyLive", url: "https://daddylive.mp/", desc: "24/7 Live TV Channels", thumb: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["IPTV"] },
  { title: "Sportsurge", url: "https://v2.sportsurge.net/", desc: "Link Aggregator", thumb: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["Links"] },
  { title: "NFLBite", url: "https://nflbite.com/", desc: "American Football", thumb: "https://images.unsplash.com/photo-1611000271746-59914442df7f?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["NFL"] },
  { title: "NBAMonster", url: "https://nbamonster.xyz/", desc: "Basketball Streams", thumb: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["NBA"] },
  { title: "SportyHunter", url: "https://sportyhunter.com/", desc: "Live Schedule", thumb: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["sched"] },
  { title: "NLive", url: "https://docs.google.com/presentation/u/0/d/1qs4zcgOXev4PIHqncEnXB4t9pTwOdn8bgJY55NBv11w/edit", desc: "Live TV Channels", thumb: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1000&auto=format&fit=crop", redirect: true, tags: ["TV"] },
];

export const EntertainmentPage = () => {
  const { prefs } = useUserPrefs();
  const [searchQuery, setSearchQuery] = useState("");

  const allStreams = [...animeList, ...movieList, ...premiumList, ...liveContentList];
  const featured = animeList[0];

  const filteredStreams = searchQuery
    ? allStreams.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-rose-500/30 overflow-x-hidden font-sans">

      {/* 1. CINEMATIC HERO */}
      {!searchQuery && (
        <div className="relative h-[70vh] w-full group overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={featured.thumb}
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent" />
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
      <div className={`sticky top-0 z-50 transition-all duration-300 ${searchQuery ? "bg-[#09090b] py-4 shadow-xl" : "bg-gradient-to-b from-transparent to-[#09090b]/80 -mt-24 pt-8 pb-12"}`}>
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
            <ContentRow title="Trending Anime" items={animeList} />
            <ContentRow title="Blockbuster Movies" items={movieList} />

            <div className="py-8">
              <TopBannerAd />
            </div>

            <ContentRow title="Premium Collections" items={premiumList} />
            <ContentRow title="Live Sports & TV" items={liveContentList} />
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
    <div className="relative aspect-[2/3] overflow-hidden rounded-sm bg-white/5">
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
