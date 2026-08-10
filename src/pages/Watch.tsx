import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import WatchReels, { type ReelItem } from "@/components/WatchReels";
import {
  reelThumb,
  timeAgo,
  useReels,
  WATCH_CATEGORIES,
  type Reel,
  type WatchCategory,
} from "@/hooks/useReels";

const Watch = () => {
  const [active, setActive] = useState<WatchCategory>("All");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const { data: reels = [], isLoading, isError, error, refetch } = useReels(active);

  const reelItems: ReelItem[] = reels.map((r) => ({
    id: r.id,
    to: `/watch/${r.id}`,
    channel: r.creator_name,
    title: r.title,
    thumb: reelThumb(r) ?? "",
    views: r.views,
    likes: r.likes_count,
    comments: r.comments_count,
    badge:
      r.content_type === "episode"
        ? `${r.content_source === "ramayana" ? "Ramayana" : "Mahabharata"} · Ep ${r.episode_number ?? ""}`.trim()
        : r.duration,
  }));

  const categories = [...WATCH_CATEGORIES];

  return (
    <div className="min-h-screen bg-background pb-14 md:pb-0">
      <Navbar />
      <WatchReels
        items={reelItems}
        categories={categories}
        active={active}
        onCategory={(c) => setActive(c as WatchCategory)}
        loading={isLoading}
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
                <i className={`bi ${c === "All" ? "bi-collection-play" : "bi-play-btn"} text-[20px]`} />
                {c}
              </button>
            ))}
          </nav>
        </aside>

        <main className="hidden lg:block flex-1 max-w-[680px] min-w-0 py-2 sm:py-4 px-0 sm:px-4 space-y-3 sm:space-y-4">
          {isLoading && (
            <div className="space-y-3">
              {[0, 1].map((i) => (
                <div key={i} className="bg-card sm:rounded-xl p-3 space-y-3">
                  <div className="h-10 w-1/2 rounded bg-secondary animate-pulse" />
                  <div className="w-full aspect-video rounded bg-secondary animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="bg-card sm:rounded-xl p-6 text-center space-y-2">
              <i className="bi bi-exclamation-triangle text-[28px] text-destructive" />
              <p className="font-semibold">Couldn't load videos</p>
              <p className="text-sm text-muted-foreground">{(error as Error)?.message}</p>
              <button onClick={() => refetch()} className="text-primary font-medium underline">
                Try again
              </button>
            </div>
          )}

          {!isError &&
            reels.map((r: Reel) => {
              const thumb = reelThumb(r);
              return (
                <article
                  key={r.id}
                  className="bg-card sm:rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden animate-fade-in"
                >
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {r.creator_name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[15px] truncate">{r.creator_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {timeAgo(r.created_at)} · {r.views}
                      </p>
                    </div>
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold capitalize">
                      {r.content_source}
                    </span>
                  </div>

                  <Link to={`/watch/${r.id}`} className="block">
                    <p className="px-3 pb-3 text-[15px] hover:underline">{r.title}</p>
                    <div className="relative group cursor-pointer bg-black">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={r.title}
                          loading="lazy"
                          className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                      ) : (
                        <div className="w-full aspect-video" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                          <i className="bi bi-play-fill text-[32px] text-white ml-1" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-semibold bg-black/70 text-white">
                        {r.duration}
                      </span>
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs font-semibold bg-black/70 text-white">
                        {r.content_type === "episode" ? `Episode ${r.episode_number ?? ""}`.trim() : "Clip"}
                      </span>
                    </div>
                  </Link>

                  <div className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground border-b">
                    <span>{(r.likes_count + (liked[r.id] ? 1 : 0)).toLocaleString()} likes</span>
                    <span>{r.comments_count.toLocaleString()} comments</span>
                  </div>

                  <div className="grid grid-cols-4 p-1">
                    <button
                      onClick={() => setLiked((p) => ({ ...p, [r.id]: !p[r.id] }))}
                      aria-label="Like"
                      className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-all active:scale-95 ${
                        liked[r.id] ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <i className="bi bi-hand-thumbs-up text-[20px]" />
                      <span className="hidden sm:inline">Like</span>
                    </button>
                    <Link
                      to={`/watch/${r.id}#comments`}
                      className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-all active:scale-95"
                    >
                      <i className="bi bi-chat text-[20px]" />
                      <span className="hidden sm:inline">Comment</span>
                    </Link>
                    <Link
                      to={`/watch/${r.id}`}
                      className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-all active:scale-95"
                    >
                      <i className="bi bi-share text-[20px]" />
                      <span className="hidden sm:inline">Share</span>
                    </Link>
                    <button
                      aria-label="Save"
                      className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-all active:scale-95"
                    >
                      <i className="bi bi-bookmark text-[20px]" />
                      <span className="hidden sm:inline">Save</span>
                    </button>
                  </div>
                </article>
              );
            })}

          {!isLoading && !isError && reels.length === 0 && (
            <p className="text-center text-muted-foreground py-10">No videos found in this category.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Watch;
