import { useState } from "react";
import { ThumbsUp, MessageCircle, Share2, MapPin, Play, Clock, ExternalLink } from "lucide-react";
import type { Post } from "@/data/posts";
import profileImg from "@/assets/profile-shiva.jpg";

const getAvatar = (author: string) => {
  if (author === "Shiva Raj Lamsal") return profileImg;
  return "";
};

const AvatarCircle = ({ author }: { author: string }) => {
  const src = getAvatar(author);
  if (src) return <img src={src} alt={author} className="w-10 h-10 rounded-full object-cover" />;
  return (
    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
      {author.split(" ").map((w) => w[0]).join("")}
    </div>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [animateLike, setAnimateLike] = useState(false);
  const [pollVoted, setPollVoted] = useState<number | null>(null);

  const handleLike = () => {
    setAnimateLike(true);
    if (liked) {
      setLikeCount((c) => c - 1);
    } else {
      setLikeCount((c) => c + 1);
    }
    setLiked(!liked);
    setTimeout(() => setAnimateLike(false), 300);
  };

  const totalVotes = post.pollOptions?.reduce((s, o) => s + o.votes, 0) || 1;

  return (
    <div className="bg-card rounded-xl shadow-sm border hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-2">
        <AvatarCircle author={post.author} />
        <div>
          <p className="font-semibold text-sm">{post.author}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{post.time}</span>
            {post.location && (
              <>
                <span>·</span>
                <MapPin className="w-3 h-3" />
                <span>{post.location}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Memory badge */}
      {post.type === "memory" && (
        <div className="mx-4 mb-2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-medium">{post.memoryDate}</span>
        </div>
      )}

      {/* Activity */}
      {post.type === "activity" && (
        <p className="px-4 pb-2 text-sm italic text-muted-foreground">{post.activityText}</p>
      )}

      {/* Text */}
      {post.text && <p className="px-4 pb-2 text-sm">{post.text}</p>}

      {/* Single image */}
      {post.type === "image" && post.image && (
        <img src={post.image} alt="post" className="w-full max-h-96 object-cover" />
      )}

      {/* Multi images */}
      {post.type === "images" && post.images && (
        <div className="grid grid-cols-2 gap-0.5">
          {post.images.map((img, i) => (
            <img key={i} src={img} alt={`post-${i}`} className="w-full h-48 object-cover" />
          ))}
        </div>
      )}

      {/* Video */}
      {post.type === "video" && post.videoThumb && (
        <div className="relative">
          <img src={post.videoThumb} alt="video" className="w-full max-h-96 object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>
        </div>
      )}

      {/* Memory image */}
      {post.type === "memory" && post.memoryImage && (
        <img src={post.memoryImage} alt="memory" className="w-full max-h-96 object-cover" />
      )}

      {/* Poll */}
      {post.type === "poll" && post.pollOptions && (
        <div className="px-4 pb-2 space-y-2">
          {post.pollOptions.map((opt, i) => {
            const pct = Math.round((opt.votes / totalVotes) * 100);
            const isVoted = pollVoted === i;
            return (
              <button
                key={i}
                onClick={() => setPollVoted(i)}
                className={`w-full text-left rounded-lg border p-3 relative overflow-hidden transition-colors ${
                  isVoted ? "border-primary" : "hover:bg-secondary"
                }`}
              >
                <div
                  className="absolute inset-y-0 left-0 bg-primary/10 transition-all"
                  style={{ width: pollVoted !== null ? `${pct}%` : "0%" }}
                />
                <div className="relative flex justify-between text-sm">
                  <span>{opt.label}</span>
                  {pollVoted !== null && <span className="font-semibold">{pct}%</span>}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Link preview */}
      {post.type === "link" && post.linkPreview && (
        <div className="mx-4 mb-2 border rounded-lg overflow-hidden hover:shadow transition-shadow">
          <img src={post.linkPreview.image} alt={post.linkPreview.title} className="w-full h-40 object-cover" />
          <div className="p-3">
            <p className="text-xs text-muted-foreground uppercase">{post.linkPreview.site}</p>
            <p className="font-semibold text-sm">{post.linkPreview.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{post.linkPreview.description}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-primary">
              <ExternalLink className="w-3 h-3" /> Visit
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-2 border-t mx-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            liked ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${animateLike ? "animate-like-pop" : ""} ${liked ? "fill-primary" : ""}`} />
          <span>{likeCount}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{post.comments.length}</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Comments */}
      {showComments && post.comments.length > 0 && (
        <div className="px-4 pb-3 space-y-2 border-t mx-4 pt-2">
          {post.comments.map((c) => (
            <div key={c.id} className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-semibold shrink-0">
                {c.author.split(" ").map((w) => w[0]).join("")}
              </div>
              <div className="bg-secondary rounded-xl px-3 py-1.5">
                <p className="text-xs font-semibold">{c.author}</p>
                <p className="text-xs">{c.text}</p>
                <span className="text-[10px] text-muted-foreground">{c.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
