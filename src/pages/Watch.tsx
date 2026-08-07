import { useState } from "react";
import { Play, ThumbsUp, MessageCircle, Share2, Bookmark, Radio, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import { videos, watchCategories } from "@/data/videos";

const Watch = () => {
  const [active, setActive] = useState("For You");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const list = active === "For You" ? videos : videos.filter((v) => v.category === active);

  return (
    <div className="min-h-screen bg-background pb-14 md:pb-0">
      <Navbar />
      <div className="flex justify-center">
        <aside className="hidden lg:block w-[300px] shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-4 border-r">
          <h1 className="text-2xl font-bold mb-3">Watch</h1>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search videos"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <nav className="space-y-1">
            {watchCategories.map((c) => (
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

        <main className="flex-1 max-w-[680px] min-w-0 py-2 sm:py-4 px-0 sm:px-4 space-y-3 sm:space-y-4">
          <div className="lg:hidden flex gap-2 overflow-x-auto px-3 pb-1">
            {watchCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active === c ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {list.map((v) => (
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
        </main>
      </div>
    </div>
  );
};

export default Watch;
