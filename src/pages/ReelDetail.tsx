import LikeIcon from "@/components/LikeIcon";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ReelComments from "@/components/ReelComments";
import { toast } from "sonner";
import {
  reelThumb,
  timeAgo,
  useReel,
  useRelatedReels,
  youtubeId,
  type Reel,
} from "@/hooks/useReels";

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background pb-14 md:pb-0">
    <Navbar />
    {children}
  </div>
);

const ReelDetail = () => {
  const { reelId } = useParams<{ reelId: string }>();
  const { data: reel, isLoading, isError, error, refetch } = useReel(reelId);
  const { data: related = [] } = useRelatedReels(reel);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (isLoading) {
    return (
      <Shell>
        <div className="max-w-[1100px] mx-auto p-4 space-y-4">
          <div className="w-full aspect-video rounded-xl bg-secondary animate-pulse" />
          <div className="h-6 w-2/3 rounded bg-secondary animate-pulse" />
          <div className="h-24 rounded bg-secondary animate-pulse" />
        </div>
      </Shell>
    );
  }

  if (isError) {
    return (
      <Shell>
        <div className="max-w-[600px] mx-auto p-8 text-center space-y-3">
          <i className="bi bi-exclamation-triangle text-[32px] text-destructive" />
          <h1 className="text-xl font-bold">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">
            {(error as Error)?.message || "We couldn't load this video."}
          </p>
          <button onClick={() => refetch()} className="text-primary font-medium underline">
            Try again
          </button>
        </div>
      </Shell>
    );
  }

  if (!reel) {
    return (
      <Shell>
        <div className="max-w-[600px] mx-auto p-8 text-center space-y-3">
          <i className="bi bi-camera-video-off text-[32px] text-muted-foreground" />
          <h1 className="text-xl font-bold">Video not found</h1>
          <p className="text-sm text-muted-foreground">
            This reel may have been removed or the link is incorrect.
          </p>
          <Link to="/watch" className="text-primary font-medium">Back to Watch</Link>
        </div>
      </Shell>
    );
  }

  const vid = youtubeId(reel.video_url);
  const thumb = reelThumb(reel);
  const label = reel.content_source === "ramayana" ? "Ramayana" : "Mahabharata";
  const others = related.filter((r) => r.id !== reel.id);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: reel.title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      /* dismissed */
    }
  };

  return (
    <Shell>
      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-4 sm:p-4">
        <main className="flex-1 min-w-0 space-y-3">
          <Link
            to="/watch"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <i className="bi bi-arrow-left text-[16px]" /> Back to Watch
          </Link>

          <div className="bg-black sm:rounded-xl overflow-hidden">
            {vid ? (
              <iframe
                src={`https://www.youtube.com/embed/${vid}?rel=0`}
                title={reel.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video"
              />
            ) : (
              <div className="w-full aspect-video relative flex items-center justify-center">
                {thumb && <img src={thumb} alt={reel.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />}
                <div className="relative text-center text-white space-y-2 px-6">
                  <i className="bi bi-camera-video text-[28px]" />
                  <p className="text-sm">Video link not added yet for this clip.</p>
                  <a
                    href={reel.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium underline"
                  >
                    Open source playlist <i className="bi bi-box-arrow-up-right text-[14px]" />
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="bg-card sm:rounded-xl shadow-sm p-3 sm:p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{label}</span>
              <span className="text-muted-foreground">
                {reel.content_type === "episode"
                  ? `Episode ${reel.episode_number ?? ""}`.trim()
                  : "Short clip"}
              </span>
            </div>

            <h1 className="text-lg sm:text-xl font-bold leading-snug">{reel.title}</h1>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                {reel.creator_name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[15px] truncate">{reel.creator_name}</p>
                <p className="text-xs text-muted-foreground">
                  {timeAgo(reel.created_at)} · {reel.views} · {reel.duration}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground border-y py-2">
              <span>{(reel.likes_count + (liked ? 1 : 0)).toLocaleString()} likes</span>
              <span>{reel.comments_count.toLocaleString()} comments</span>
            </div>

            <div className="grid grid-cols-4">
              <button
                onClick={() => setLiked((l) => !l)}
                aria-label="Like"
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-all active:scale-95 ${
                  liked ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <LikeIcon filled={liked} className="w-[20px] h-[20px]" />
                <span className="hidden sm:inline">Like</span>
              </button>
              <a
                href="#comments"
                className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-all active:scale-95"
              >
                <i className="bi bi-chat text-[20px]" />
                <span className="hidden sm:inline">Comment</span>
              </a>
              <button
                onClick={share}
                aria-label="Share"
                className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-all active:scale-95"
              >
                <i className="bi bi-share text-[20px]" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={() => {
                  setSaved((s) => !s);
                  toast.success(saved ? "Removed from saved" : "Saved to your videos");
                }}
                aria-label="Save"
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-all active:scale-95 ${
                  saved ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <i className="bi bi-bookmark text-[20px]" />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>

          {reel.description && (
            <section className="bg-card sm:rounded-xl shadow-sm p-3 sm:p-4">
              <h2 className="font-bold mb-2">About this video</h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed whitespace-pre-line">
                {reel.description}
              </p>
            </section>
          )}

          <ReelComments reelId={reel.id} />
        </main>

        <aside className="lg:w-[340px] shrink-0 space-y-2 p-3 sm:p-0">
          <h2 className="font-bold">More from {label}</h2>
          {others.length === 0 && (
            <p className="text-sm text-muted-foreground">Nothing else here yet.</p>
          )}
          {others.map((r: Reel) => {
            const t = reelThumb(r);
            return (
              <Link
                key={r.id}
                to={`/watch/${r.id}`}
                className="flex gap-3 p-2 rounded-xl bg-card shadow-sm hover:bg-secondary transition-colors"
              >
                <div className="relative w-32 shrink-0 rounded-lg overflow-hidden bg-black">
                  {t ? (
                    <img src={t} alt={r.title} loading="lazy" className="w-full aspect-video object-cover" />
                  ) : (
                    <div className="w-full aspect-video flex items-center justify-center">
                      <i className="bi bi-play-btn text-[20px] text-white/70" />
                    </div>
                  )}
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-semibold">
                    {r.duration}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold line-clamp-2 leading-snug">{r.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {r.content_type === "episode" ? `Episode ${r.episode_number ?? ""} · ` : ""}
                    {r.views}
                  </p>
                </div>
              </Link>
            );
          })}
        </aside>
      </div>
    </Shell>
  );
};

export default ReelDetail;
