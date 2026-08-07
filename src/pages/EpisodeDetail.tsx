import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Bookmark, MessageCircle, Share2, ThumbsUp, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Episode, episodeThumb, timeAgo, useEpisode, useEpisodes } from "@/hooks/useEpisodes";
import { toast } from "sonner";

const EpisodeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: episode, isLoading } = useEpisode(id);
  const { data: related = [] } = useEpisodes(episode?.series);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-14 md:pb-0">
        <Navbar />
        <div className="max-w-[1100px] mx-auto p-4 space-y-4">
          <div className="w-full aspect-video rounded-xl bg-secondary animate-pulse" />
          <div className="h-6 w-2/3 rounded bg-secondary animate-pulse" />
          <div className="h-24 rounded bg-secondary animate-pulse" />
        </div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-background pb-14 md:pb-0">
        <Navbar />
        <div className="max-w-[600px] mx-auto p-8 text-center space-y-3">
          <h1 className="text-xl font-bold">Episode not found</h1>
          <Link to="/watch" className="text-primary font-medium">Back to Watch</Link>
        </div>
      </div>
    );
  }

  const others = related.filter((e) => e.id !== episode.id);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: episode.title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      /* dismissed */
    }
  };

  return (
    <div className="min-h-screen bg-background pb-14 md:pb-0">
      <Navbar />
      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-4 sm:p-4">
        <main className="flex-1 min-w-0 space-y-3">
          <Link
            to="/watch"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Watch
          </Link>

          <div className="bg-black sm:rounded-xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${episode.youtube_id}?rel=0`}
              title={episode.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full aspect-video"
            />
          </div>

          <div className="bg-card sm:rounded-xl shadow-sm p-3 sm:p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                {episode.series}
              </span>
              <span className="text-muted-foreground">Episode {episode.episode_number}</span>
            </div>

            <h1 className="text-lg sm:text-xl font-bold leading-snug">{episode.title}</h1>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                {episode.channel.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[15px] truncate">{episode.channel}</p>
                <p className="text-xs text-muted-foreground">
                  {timeAgo(episode.published_at)} · {episode.views} · {episode.duration}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground border-y py-2">
              <span>{(episode.likes + (liked ? 1 : 0)).toLocaleString()} likes</span>
              <span>{episode.comments_count.toLocaleString()} comments</span>
            </div>

            <div className="grid grid-cols-4">
              <button
                onClick={() => setLiked((l) => !l)}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-all active:scale-95 ${
                  liked ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <ThumbsUp className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                <span className="hidden sm:inline">Like</span>
              </button>
              <a
                href="#comments"
                className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="hidden sm:inline">Comment</span>
              </a>
              <button
                onClick={share}
                className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-all active:scale-95"
              >
                <Share2 className="w-5 h-5" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={() => {
                  setSaved((s) => !s);
                  toast.success(saved ? "Removed from saved" : "Saved to your videos");
                }}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-all active:scale-95 ${
                  saved ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Bookmark className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <section className="bg-card sm:rounded-xl shadow-sm p-3 sm:p-4">
            <h2 className="font-bold mb-2">About this episode</h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed whitespace-pre-line">
              {episode.description}
            </p>
          </section>

          {/* Cast */}
          {episode.cast_members.length > 0 && (
            <section className="bg-card sm:rounded-xl shadow-sm p-3 sm:p-4">
              <h2 className="font-bold mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" /> Cast
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {episode.cast_members.map((c) => (
                  <div key={c.actor} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors">
                    <div className="w-9 h-9 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {c.actor.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{c.role}</p>
                      <p className="text-xs text-muted-foreground truncate">{c.actor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* More episodes */}
        <aside className="lg:w-[340px] shrink-0 space-y-2 p-3 sm:p-0">
          <h2 className="font-bold">More from {episode.series}</h2>
          {others.map((e: Episode) => (
            <Link
              key={e.id}
              to={`/watch/${e.id}`}
              className="flex gap-3 p-2 rounded-xl bg-card shadow-sm hover:bg-secondary transition-colors"
            >
              <div className="relative w-32 shrink-0 rounded-lg overflow-hidden bg-black">
                <img
                  src={episodeThumb(e)}
                  alt={e.title}
                  loading="lazy"
                  className="w-full aspect-video object-cover"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-semibold">
                  {e.duration}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold line-clamp-2 leading-snug">{e.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Episode {e.episode_number} · {e.views}
                </p>
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default EpisodeDetail;
