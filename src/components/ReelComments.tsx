import { useState } from "react";
import { toast } from "sonner";
import { useAddComment, useComments, timeAgo, type ReelComment } from "@/hooks/useReels";

const initials = (name: string) =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

const Avatar = ({ name, small }: { name: string; small?: boolean }) => (
  <div
    className={`${small ? "w-7 h-7 text-[10px]" : "w-9 h-9 text-xs"} shrink-0 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary`}
  >
    {initials(name)}
  </div>
);

/** Comment thread bound to a single reel via comments.reel_id. */
const ReelComments = ({ reelId }: { reelId: string }) => {
  const { data: comments = [], isLoading, isError, refetch } = useComments(reelId);
  const add = useAddComment(reelId);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<ReelComment | null>(null);
  const [replyText, setReplyText] = useState("");

  const roots = comments.filter((c) => !c.parent_id);
  const repliesOf = (id: string) => comments.filter((c) => c.parent_id === id);

  const submit = (content: string, parentId: string | null, reset: () => void) => {
    if (!content.trim()) return;
    add.mutate(
      { content, parentId },
      {
        onSuccess: () => reset(),
        onError: () => toast.error("Could not post your comment. Please try again."),
      }
    );
  };

  return (
    <section id="comments" className="bg-card sm:rounded-xl shadow-sm p-3 sm:p-4 space-y-3">
      <h2 className="font-bold flex items-center gap-2">
        <i className="bi bi-chat text-[16px] text-primary" />
        Comments <span className="text-muted-foreground font-normal">({comments.length})</span>
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(text, null, () => setText(""));
        }}
        className="flex items-center gap-2"
      >
        <Avatar name="Shiva Raj Lamsal" />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment…"
          className="flex-1 bg-secondary rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          type="submit"
          disabled={!text.trim() || add.isPending}
          aria-label="Post comment"
          className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40"
        >
          <i className="bi bi-send text-[16px]" />
        </button>
      </form>

      {isLoading && (
        <div className="space-y-2">
          {[0, 1].map((i) => (
            <div key={i} className="h-12 rounded-lg bg-secondary animate-pulse" />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-sm text-destructive flex items-center gap-3">
          Couldn't load comments.
          <button onClick={() => refetch()} className="text-primary font-medium underline">
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && roots.length === 0 && (
        <p className="text-sm text-muted-foreground py-2">No comments yet. Be the first to comment.</p>
      )}

      {roots.map((c) => (
        <div key={c.id} className="space-y-2">
          <div className="flex gap-2">
            <Avatar name={c.author_name} />
            <div className="min-w-0 flex-1">
              <div className="bg-secondary rounded-2xl px-3 py-2">
                <p className="text-[13px] font-semibold">{c.author_name}</p>
                <p className="text-[14px] break-words">{c.content}</p>
              </div>
              <div className="flex items-center gap-3 pl-3 pt-1 text-[11px] text-muted-foreground">
                <span>{timeAgo(c.created_at)}</span>
                <button
                  onClick={() => setReplyTo(replyTo?.id === c.id ? null : c)}
                  className="font-semibold hover:underline"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>

          {repliesOf(c.id).map((r) => (
            <div key={r.id} className="flex gap-2 pl-10">
              <Avatar name={r.author_name} small />
              <div className="min-w-0 flex-1">
                <div className="bg-secondary rounded-2xl px-3 py-1.5">
                  <p className="text-[12px] font-semibold">{r.author_name}</p>
                  <p className="text-[13px] break-words">{r.content}</p>
                </div>
                <span className="pl-3 text-[11px] text-muted-foreground">{timeAgo(r.created_at)}</span>
              </div>
            </div>
          ))}

          {replyTo?.id === c.id && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(replyText, c.id, () => {
                  setReplyText("");
                  setReplyTo(null);
                });
              }}
              className="flex items-center gap-2 pl-10"
            >
              <input
                autoFocus
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${c.author_name}…`}
                className="flex-1 bg-secondary rounded-full px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                disabled={!replyText.trim() || add.isPending}
                aria-label="Post reply"
                className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40"
              >
                <i className="bi bi-send text-[14px]" />
              </button>
            </form>
          )}
        </div>
      ))}
    </section>
  );
};

export default ReelComments;
