import LikeIcon from "@/components/LikeIcon";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface ReelItem {
  id: string;
  to?: string;
  channel: string;
  title: string;
  thumb: string;
  views: string;
  likes: number;
  comments: number;
  badge?: string;
}

interface Props {
  items: ReelItem[];
  categories: string[];
  active: string;
  onCategory: (c: string) => void;
  loading?: boolean;
}

/** Mobile-only, Reels-style full-screen vertical video feed. */
const WatchReels = ({ items, categories, active, onCategory, loading }: Props) => {
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  return (
    <div className="lg:hidden">
      <div className="sticky top-14 z-20 bg-background/95 backdrop-blur px-3 py-2 space-y-2 border-b">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onCategory(c)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                active === c ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[calc(100dvh-10.5rem)] overflow-y-auto snap-y snap-mandatory scrollbar-hide overscroll-y-contain">
        {loading && <div className="h-full w-full shrink-0 bg-secondary animate-pulse snap-start snap-always" />}


        {items.map((item) => {
          const isLiked = !!liked[item.id];
          const media = (
            <>
              <img src={item.thumb} alt={item.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <i className="bi bi-play-fill text-[32px] text-white ml-1" />
                </div>
              </div>
            </>
          );

          return (
            <section key={item.id} className="relative h-full w-full snap-start bg-black overflow-hidden">
              {item.to ? (
                <Link to={item.to} className="absolute inset-0 block">
                  {media}
                </Link>
              ) : (
                media
              )}

              {item.badge && (
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur text-white text-[11px] font-semibold">
                  {item.badge}
                </span>
              )}

              <div className="absolute right-2 bottom-24 flex flex-col items-center gap-5">
                <button
                  onClick={() => setLiked((p) => ({ ...p, [item.id]: !p[item.id] }))}
                  className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                  aria-label="Like"
                >
                  <LikeIcon filled={isLiked} className={`w-[26px] h-[26px] ${isLiked ? "text-primary" : "text-white"}`} />
                  <span className="text-[11px] font-semibold text-white">
                    {(item.likes + (isLiked ? 1 : 0)).toLocaleString()}
                  </span>
                </button>
                <Link
                  to={item.to ? `${item.to}#comments` : "#"}
                  className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                  aria-label="Comment"
                >
                  <i className="bi bi-chat text-[28px] text-white" />
                  <span className="text-[11px] font-semibold text-white">{item.comments.toLocaleString()}</span>
                </Link>
                <button className="flex flex-col items-center gap-1 active:scale-90 transition-transform" aria-label="Share">
                  <i className="bi bi-share text-[28px] text-white" />
                  <span className="text-[11px] font-semibold text-white">Share</span>
                </button>
              </div>

              <div className="absolute left-3 right-16 bottom-6 text-white space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center font-bold">
                    {item.channel.charAt(0)}
                  </div>
                  <span className="font-semibold text-sm">{item.channel}</span>
                  <span className="text-[11px] opacity-80">· {item.views}</span>
                </div>
                <p className="text-sm leading-snug line-clamp-2">{item.title}</p>
              </div>
            </section>
          );
        })}

        {!loading && items.length === 0 && (
          <p className="text-center text-muted-foreground py-10">No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default WatchReels;
