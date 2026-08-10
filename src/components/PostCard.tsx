import { useState } from "react";
import type { Post } from "@/data/posts";
import profileImg from "@/assets/profile-shiva.jpg";

const getAvatar = (author: string) => {
  if (author === "Shiva Raj Lamsal") return profileImg;
  return "";
};

const AvatarCircle = ({ author, size = "w-10 h-10" }: { author: string; size?: string }) => {
  const src = getAvatar(author);
  if (src) return <img src={src} alt={author} className={`${size} rounded-full object-cover`} />;
  return (
    <div className={`${size} rounded-full bg-gradient-to-br from-primary/30 to-primary/60 flex items-center justify-center text-sm font-semibold text-primary-foreground`}>
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
  const [commentText, setCommentText] = useState("");

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
    <div className="bg-card sm:rounded-lg shadow-sm sm:border">
      {/* Header */}
      <div className="flex items-start justify-between p-3 pb-1">
        <div className="flex items-center gap-2">
          <AvatarCircle author={post.author} />
          <div>
            <p className="font-semibold text-[14px] sm:text-[15px] hover:underline cursor-pointer">{post.author}</p>
            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-muted-foreground">
              <span>{post.time}</span>
              <span>·</span>
              <i className="bi bi-globe text-[12px]" />
              {post.location && (
                <>
                  <span>·</span>
                  <i className="bi bi-geo-alt text-[12px]" />
                  <span className="font-medium text-foreground truncate max-w-[120px]">{post.location}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="p-1.5 sm:p-2 rounded-full hover:bg-secondary transition-colors">
          <i className="bi bi-three-dots text-[20px] text-muted-foreground" />
        </button>
      </div>

      {/* Memory badge */}
      {post.type === "memory" && (
        <div className="mx-3 mb-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-accent text-accent-foreground text-sm">
          <i className="bi bi-clock text-[16px]" />
          <span className="font-medium">{post.memoryDate}</span>
        </div>
      )}

      {/* Activity */}
      {post.activityText && (
        <p className="px-3 pb-2 text-[14px] sm:text-[15px]">{post.activityText}</p>
      )}

      {/* Text */}
      {post.text && (
        <p className={`px-3 pb-2 ${post.type === "text" && !post.image ? "text-xl sm:text-2xl py-3 sm:py-4" : "text-[14px] sm:text-[15px]"}`}>
          {post.text}
        </p>
      )}

      {/* Single image */}
      {post.type === "image" && post.image && (
        <img src={post.image} alt="post" className="w-full max-h-[400px] sm:max-h-[500px] object-cover cursor-pointer" />
      )}

      {/* Multi images */}
      {post.type === "images" && post.images && (
        <div className={`grid gap-0.5 sm:gap-1 grid-cols-2`}>
          {post.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`post-${i}`}
              className={`w-full object-cover cursor-pointer ${
                post.images!.length === 3 && i === 0 ? "row-span-2 h-full" : "h-40 sm:h-60"
              }`}
            />
          ))}
        </div>
      )}

      {/* Video */}
      {post.type === "video" && post.videoThumb && (
        <div className="relative cursor-pointer group">
          <img src={post.videoThumb} alt="video" className="w-full max-h-[400px] sm:max-h-[500px] object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-black/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="bi bi-play-fill text-[28px] text-white ml-1" />
            </div>
          </div>
        </div>
      )}

      {/* Memory image */}
      {post.type === "memory" && post.memoryImage && (
        <img src={post.memoryImage} alt="memory" className="w-full max-h-[400px] sm:max-h-[500px] object-cover" />
      )}

      {/* Poll */}
      {post.type === "poll" && post.pollOptions && (
        <div className="px-3 pb-2 space-y-2">
          {post.pollOptions.map((opt, i) => {
            const pct = Math.round((opt.votes / totalVotes) * 100);
            const isVoted = pollVoted === i;
            return (
              <button
                key={i}
                onClick={() => setPollVoted(i)}
                className={`w-full text-left rounded-lg border p-2.5 sm:p-3 relative overflow-hidden transition-all ${
                  isVoted ? "border-primary bg-primary/5" : "hover:bg-secondary"
                }`}
              >
                <div
                  className="absolute inset-y-0 left-0 bg-primary/10 transition-all duration-500"
                  style={{ width: pollVoted !== null ? `${pct}%` : "0%" }}
                />
                <div className="relative flex justify-between text-sm">
                  <span className={isVoted ? "font-semibold" : ""}>{opt.label}</span>
                  {pollVoted !== null && <span className="font-semibold text-primary">{pct}%</span>}
                </div>
              </button>
            );
          })}
          {pollVoted !== null && (
            <p className="text-xs text-muted-foreground">{totalVotes} total votes</p>
          )}
        </div>
      )}

      {/* Link preview */}
      {post.type === "link" && post.linkPreview && (
        <div className="border-t border-b bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors">
          <img src={post.linkPreview.image} alt={post.linkPreview.title} className="w-full h-40 sm:h-52 object-cover" />
          <div className="p-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{post.linkPreview.site}</p>
            <p className="font-semibold text-[14px] sm:text-[15px] mt-0.5">{post.linkPreview.title}</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-2">{post.linkPreview.description}</p>
          </div>
        </div>
      )}

      {/* Like count + comment count */}
      <div className="flex items-center justify-between px-3 py-2 text-muted-foreground text-xs sm:text-sm">
        <div className="flex items-center gap-1 cursor-pointer hover:underline">
          {likeCount > 0 && (
            <>
              <div className="flex -space-x-1">
                <span className="w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center">
                  <i className="bi bi-hand-thumbs-up text-[20px] text-primary-foreground fill-primary-foreground" />
                </span>
              </div>
              <span>{likeCount}</span>
            </>
          )}
        </div>
        <div className="flex gap-3">
          {post.comments.length > 0 && (
            <button
              onClick={() => setShowComments(!showComments)}
              className="hover:underline cursor-pointer"
            >
              {post.comments.length} comment{post.comments.length > 1 ? "s" : ""}
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center border-t border-b mx-3 py-1">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors hover:bg-secondary ${
            liked ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <i className="bi bi-hand-thumbs-up text-[20px]" className={`w-4 sm:w-5 h-4 sm:h-5 ${animateLike ? "animate-like-pop" : ""} ${liked ? "fill-primary" : ""}`} />
          Like
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
        >
          <i className="bi bi-chat text-[16px]" />
          Comment
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors">
          <i className="bi bi-share text-[16px]" />
          Share
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="p-3 space-y-3">
          {post.comments.map((c) => (
            <div key={c.id} className="flex gap-2">
              <AvatarCircle author={c.author} size="w-8 h-8" />
              <div className="min-w-0">
                <div className="bg-secondary rounded-2xl px-3 py-2">
                  <p className="text-[13px] font-semibold hover:underline cursor-pointer">{c.author}</p>
                  <p className="text-[13px] break-words">{c.text}</p>
                </div>
                <div className="flex gap-3 mt-0.5 ml-3 text-xs text-muted-foreground">
                  <span>{c.time}</span>
                  <button className="font-semibold hover:underline">Like</button>
                  <button className="font-semibold hover:underline">Reply</button>
                </div>
              </div>
            </div>
          ))}
          {/* Comment input */}
          <div className="flex gap-2 items-center pt-1">
            <AvatarCircle author="Shiva Raj Lamsal" size="w-8 h-8" />
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-secondary rounded-full px-3 sm:px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 min-w-0"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
