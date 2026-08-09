import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, ThumbsUp, MessageCircle, Share2, Bookmark, Radio } from "lucide-react";
import Navbar from "@/components/Navbar";
import { videos, watchCategories } from "@/data/videos";
import { Episode, episodeThumb, timeAgo, useEpisodes } from "@/hooks/useEpisodes";
import WatchReels, { type ReelItem } from "@/components/WatchReels";

const SERIES = ["Ramayana", "Mahabharat"];

const Watch = () => {
  const [active, setActive] = useState("All");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const { data: episodes = [], isLoading } = useEpisodes(
    SERIES.includes(active) ? active : undefined
  );

  const episodeList = episodes;
  const showEpisodes = active === "All" || SERIES.includes(active);
  const mockList = SERIES.includes(active)
    ? []
    : active === "All"
      ? videos
      : videos.filter((v) => v.category === active);

  const categories = ["All", ...watchCategories];

  const reelItems: ReelItem[] = [
    ...(showEpisodes
      ? episodeList.map((e: Episode) => ({
          id: e.id,
          to: `/watch/${e.id}`,
          channel: e.channel,
          title: e.title,
          thumb: episodeThumb(e),
          views: e.views,
          likes: e.likes,
          comments: e.comments_count,
          badge: `${e.series} · Ep ${e.episode_number}`,
        }))
      : []),
    ...mockList.map((v) => ({
      id: v.id,
      channel: v.channel,
      title: v.title,
      thumb: v.thumb,
      views: v.views,
      likes: v.likes,
      comments: v.comments,
      badge: v.duration,
    })),
  ];

  return (
    <div className="min-h-screen bg-background pb-14 md:pb-0">
      <Navbar />
      <WatchReels
        items={reelItems}
        categories={categories}
        active={active}
        onCategory={setActive}
        loading={showEpisodes && isLoading}
      />
      <div className="flex justify-center">
        <aside className="hidden lg:block w-[300px] shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-4 border-r">
          <h1 className="text-2xl font-bold mb-3">Watch</h1>
          <nav className="space-y-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-[15px] font-medium transition-colors ${
                  active === c ? "bg-accent text-primary" : "hover:bg-secondary text-foreground"
                }`}
              >
                {c === "Live" ? <Radio className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {c}
              </button>
            ))}
          </nav>
        </aside>

        <main className="hidden lg:block flex-1 max-w-[680px] min-w-0 py-2 sm:py-4 px-0 sm:px-4 space-y-3 sm:space-y-4">
          {/* Episodes from the database */}
          {showEpisodes && isLoading && (
            <div className="space-y-3">
              {[0, 1].map((i) => (
                <div key={i} className="bg-card sm:rounded-xl p-3 space-y-3">
                  <div className="h-10 w-1/2 rounded bg-secondary animate-pulse" />
                  <div className="w-full aspect-video rounded bg-secondary animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {showEpisodes &&
            episodeList.map((e: Episode) => (
              <article
                key={e.id}
                className="bg-card sm:rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden animate-fade-in"
              >
                <div className="flex items-center gap-3 p-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {e.channel.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[15px] truncate">{e.channel}</p>
                    <p className="text-xs text-muted-foreground">
                      {timeAgo(e.published_at)} · {e.views}
                    </p>
                  </div>
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
                    {e.series}
                  </span>
                </div>

                <Link to={`/watch/${e.id}`} className="block">
                  <p className="px-3 pb-3 text-[15px] hover:underline">{e.title}</p>
                  <div className="relative group cursor-pointer bg-black">
                    <img
                      src={episodeThumb(e)}
                      alt={e.title}
                      loading="lazy"
                      className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-semibold bg-black/70 text-white">
                      {e.duration}
                    </span>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs font-semibold bg-black/70 text-white">
                      Episode {e.episode_number}
                    </span>
                  </div>
                </Link>

                <div className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground border-b">
                  <span>{(e.likes + (liked[e.id] ? 1 : 0)).toLocaleString()} likes</span>
                  <span>{e.comments_count.toLocaleString()} comments</span>
                </div>

                <div className="grid grid-cols-4 p-1">
                  <button
                    onClick={() => setLiked((p) => ({ ...p, [e.id]: !p[e.id] }))}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-all active:scale-95 ${
                      liked[e.id] ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <ThumbsUp className={`w-5 h-5 ${liked[e.id] ? "fill-current" : ""}`} />
                    <span className="hidden sm:inline">Like</span>
                  </button>
                  <Link
                    to={`/watch/${e.id}`}
                    className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-all active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="hidden sm:inline">Details</span>
                  </Link>
                  <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-all active:scale-95">
                    <Share2 className="w-5 h-5" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-all active:scale-95">
                    <Bookmark className="w-5 h-5" />
                    <span className="hidden sm:inline">Save</span>
                  </button>
                </div>
              </article>
            ))}

          {/* Community videos */}
          {mockList.map((v) => (
            <article
              key={v.id}
              className="bg-card sm:rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden animate-fade-in"
            >
              <div className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {v.channel.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[15px] truncate">{v.channel}</p>
                  <p className="text-xs text-muted-foreground">{v.time} · {v.views}</p>
                </div>
              </div>
              <p className="px-3 pb-3 text-[15px]">{v.title}</p>

              <div className="relative group cursor-pointer bg-black">
                <img
                  src={v.thumb}
                  alt={v.title}
                  loading="lazy"
                  className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>
                <span
                  className={`absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-semibold ${
                    v.duration === "LIVE" ? "bg-destructive text-destructive-foreground" : "bg-black/70 text-white"
                  }`}
                >
                  {v.duration}
                </span>
              </div>

              <div className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground border-b">
                <span>{(v.likes + (liked[v.id] ? 1 : 0)).toLocaleString()} likes</span>
                <span>{v.comments.toLocaleString()} comments</span>
              </div>

              <div className="grid grid-cols-4 p-1">
                <button
                  onClick={() => setLiked((p) => ({ ...p, [v.id]: !p[v.id] }))}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-all active:scale-95 ${
                    liked[v.id] ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <ThumbsUp className={`w-5 h-5 ${liked[v.id] ? "fill-current" : ""}`} />
                  <span className="hidden sm:inline">Like</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-all active:scale-95">
                  <MessageCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">Comment</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-all active:scale-95">
                  <Share2 className="w-5 h-5" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-all active:scale-95">
                  <Bookmark className="w-5 h-5" />
                  <span className="hidden sm:inline">Save</span>
                </button>
              </div>
            </article>
          ))}

          {!isLoading && episodeList.length === 0 && mockList.length === 0 && (
            <p className="text-center text-muted-foreground py-10">No videos found.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Watch;
