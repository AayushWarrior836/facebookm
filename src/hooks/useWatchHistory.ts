import { useEffect, useState, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export interface WatchEntry {
  reel_id: string;
  progress_seconds: number;
  completed: boolean;
}

const LS_KEY = "watch_history_v1";

const readLocal = (): Record<string, WatchEntry> => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
  } catch {
    return {};
  }
};

const writeLocal = (map: Record<string, WatchEntry>) => {
  localStorage.setItem(LS_KEY, JSON.stringify(map));
};

/** Current auth session (guest = null). The app has no login UI yet, so guests fall back to localStorage. */
export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);
  return session;
};

/** Watch history for the current viewer, keyed by reel id. */
export const useWatchHistory = () => {
  const session = useSession();
  const userId = session?.user?.id ?? null;

  return useQuery({
    queryKey: ["watch-history", userId ?? "guest"],
    queryFn: async (): Promise<Record<string, WatchEntry>> => {
      if (!userId) return readLocal();
      const { data, error } = await supabase
        .from("watch_history")
        .select("reel_id, progress_seconds, completed")
        .eq("user_id", userId);
      if (error) throw error;
      const map: Record<string, WatchEntry> = {};
      (data ?? []).forEach((r) => (map[r.reel_id] = r as WatchEntry));
      return map;
    },
  });
};

export const useSaveWatchProgress = () => {
  const session = useSession();
  const userId = session?.user?.id ?? null;
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      reelId,
      progressSeconds,
      completed,
    }: {
      reelId: string;
      progressSeconds: number;
      completed: boolean;
    }) => {
      if (!userId) {
        const map = readLocal();
        const prev = map[reelId];
        map[reelId] = {
          reel_id: reelId,
          progress_seconds: Math.max(progressSeconds, prev?.progress_seconds ?? 0),
          completed: completed || !!prev?.completed,
        };
        writeLocal(map);
        return;
      }
      const { error } = await supabase.from("watch_history").upsert(
        {
          user_id: userId,
          reel_id: reelId,
          progress_seconds: Math.round(progressSeconds),
          completed,
          watched_at: new Date().toISOString(),
        },
        { onConflict: "user_id,reel_id" },
      );
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["watch-history", userId ?? "guest"] });
    },
  });

  const save = useCallback(
    (reelId: string, progressSeconds: number, completed: boolean) =>
      mutation.mutate({ reelId, progressSeconds, completed }),
    [mutation],
  );

  return { save, isSaving: mutation.isPending };
};
