import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Heart, Pause, Play, Send, X } from "lucide-react";
import type { Story } from "@/data/stories";

const DURATION = 5000;

interface Props {
  stories: Story[];
  startIndex: number;
  onClose: () => void;
}

const StoryViewer = ({ stories, startIndex, onClose }: Props) => {
  const [userIdx, setUserIdx] = useState(startIndex);
  const [itemIdx, setItemIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState(false);
  const raf = useRef<number>();

  const story = stories[userIdx];
  const item = story.items[itemIdx];

  const next = useCallback(() => {
    setLiked(false);
    setProgress(0);
    if (itemIdx < stories[userIdx].items.length - 1) setItemIdx((i) => i + 1);
    else if (userIdx < stories.length - 1) {
      setUserIdx((u) => u + 1);
      setItemIdx(0);
    } else onClose();
  }, [itemIdx, userIdx, stories, onClose]);

  const prev = useCallback(() => {
    setLiked(false);
    setProgress(0);
    if (itemIdx > 0) setItemIdx((i) => i - 1);
    else if (userIdx > 0) {
      const u = userIdx - 1;
      setUserIdx(u);
      setItemIdx(stories[u].items.length - 1);
    }
  }, [itemIdx, userIdx, stories]);

  // Progress timer
  useEffect(() => {
    let start = performance.now();
    let elapsedBefore = 0;
    let last = progress;

    const tick = (t: number) => {
      if (!paused) {
        const pct = Math.min(100, elapsedBefore + ((t - start) / DURATION) * 100);
        last = pct;
        setProgress(pct);
        if (pct >= 100) {
          next();
          return;
        }
      } else {
        start = t;
        elapsedBefore = last;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdx, itemIdx, paused, next]);

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
      <button
        onClick={onClose}
        aria-label="Close stories"
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Desktop arrows */}
      <button
        onClick={prev}
        aria-label="Previous story"
        className="hidden sm:flex absolute left-4 md:left-16 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition disabled:opacity-30"
        disabled={userIdx === 0 && itemIdx === 0}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        aria-label="Next story"
        className="hidden sm:flex absolute right-4 md:right-16 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div
        className="relative w-full h-full sm:w-[420px] sm:h-[92vh] sm:rounded-2xl overflow-hidden bg-black shadow-2xl"
        onMouseDown={() => setPaused(true)}
        onMouseUp={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <img
          key={item.image}
          src={item.image}
          alt={`${story.name}'s story`}
          className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />

        {/* Progress bars */}
        <div className="absolute top-2 inset-x-2 flex gap-1 z-10">
          {story.items.map((_, i) => (
            <div key={i} className="h-0.5 flex-1 rounded-full bg-white/30 overflow-hidden">
              <div
                className="h-full bg-white"
                style={{ width: `${i < itemIdx ? 100 : i === itemIdx ? progress : 0}%` }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-6 inset-x-3 z-10 flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
            {story.name.split(" ").map((w) => w[0]).join("")}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">{story.name}</p>
            <p className="text-[11px] text-white/70">{story.time}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPaused((p) => !p);
            }}
            aria-label={paused ? "Play" : "Pause"}
            className="ml-auto mr-10 w-8 h-8 rounded-full hover:bg-white/20 text-white flex items-center justify-center"
          >
            {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>

        {/* Tap zones */}
        <button aria-label="Previous" onClick={prev} className="absolute inset-y-0 left-0 w-1/3 z-[5]" />
        <button aria-label="Next" onClick={next} className="absolute inset-y-0 right-0 w-1/3 z-[5]" />

        {/* Caption + reply bar */}
        <div className="absolute bottom-0 inset-x-0 z-10 p-3 space-y-3">
          {item.caption && (
            <p className="text-white text-sm font-medium drop-shadow text-center px-4">{item.caption}</p>
          )}
          <div className="flex items-center gap-2">
            <input
              placeholder={`Reply to ${story.name.split(" ")[0]}...`}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className="flex-1 h-10 rounded-full bg-white/10 border border-white/30 px-4 text-sm text-white placeholder:text-white/60 outline-none focus:border-white"
            />
            <button
              onClick={() => setLiked((l) => !l)}
              aria-label="Like story"
              className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition"
            >
              <Heart className={`w-5 h-5 transition ${liked ? "fill-red-500 text-red-500 scale-110" : "text-white"}`} />
            </button>
            <button aria-label="Send" className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StoryViewer;
