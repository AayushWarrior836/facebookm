import { useEffect, useRef } from "react";

interface Props {
  videoId: string;
  title: string;
  startSeconds?: number;
  /** Called periodically with current position, and with completed=true when the video finishes. */
  onProgress: (seconds: number, completed: boolean) => void;
}

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;
const loadApi = () => {
  if (window.YT?.Player) return Promise.resolve();
  if (!apiPromise) {
    apiPromise = new Promise<void>((resolve) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve();
      };
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    });
  }
  return apiPromise;
};

/** YouTube embed that reports playback progress so watch history can be tracked. */
const YouTubePlayer = ({ videoId, title, startSeconds = 0, onProgress }: Props) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const cbRef = useRef(onProgress);
  cbRef.current = onProgress;

  useEffect(() => {
    let player: any;
    let timer: number | undefined;
    let cancelled = false;

    loadApi().then(() => {
      if (cancelled || !hostRef.current) return;
      player = new window.YT.Player(hostRef.current, {
        videoId,
        playerVars: { rel: 0, start: Math.floor(startSeconds) },
        events: {
          onStateChange: (e: any) => {
            const YT = window.YT;
            if (e.data === YT.PlayerState.ENDED) {
              cbRef.current(player.getDuration?.() ?? 0, true);
            }
          },
        },
      });

      timer = window.setInterval(() => {
        if (!player?.getCurrentTime) return;
        const t = player.getCurrentTime() || 0;
        const d = player.getDuration?.() || 0;
        if (t < 1) return;
        cbRef.current(t, d > 0 && t / d >= 0.95);
      }, 10000);
    });

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      try {
        player?.destroy?.();
      } catch {
        /* noop */
      }
    };
  }, [videoId, startSeconds]);

  return (
    <div className="w-full aspect-video">
      <div ref={hostRef} className="w-full h-full" title={title} />
    </div>
  );
};

export default YouTubePlayer;
