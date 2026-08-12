import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ContentType = "clip" | "episode";
export type ContentSource = "mahabharata" | "ramayana";

export interface Reel {
  id: string;
  title: string;
  description: string;
  video_url: string | null;
  thumbnail_url: string | null;
  creator_name: string;
  creator_avatar: string | null;
  category: string;
  content_type: ContentType;
  content_source: ContentSource;
  duration: string;
  views: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  source_url: string;
  episode_number: number | null;
  is_published: boolean;
  created_at: string;
}

export interface ReelComment {
  id: string;
  reel_id: string;
  user_id: string | null;
  author_name: string;
  content: string;
  parent_id: string | null;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

/** The three Watch categories and how each maps to the database. */
export const WATCH_CATEGORIES = ["All", "Mahabharata", "Ramayana"] as const;
export type WatchCategory = (typeof WATCH_CATEGORIES)[number];

export const youtubeId = (url?: string | null) => {
  if (!url) return null;
  const m = url.match(/(?:v=|youtu\.be\/|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
};

export const reelThumb = (r: Reel) => {
  if (r.thumbnail_url) return r.thumbnail_url;
  const id = youtubeId(r.video_url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};

export const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d > 1 ? "s" : ""} ago`;
};

/**
 * All        -> clips only (mahabharata + ramayana)
 * Mahabharata-> mahabharata episodes only
 * Ramayana   -> ramayana episodes only
 */
export const useReels = (category: WatchCategory) =>
  useQuery({
    queryKey: ["reels", category],
    queryFn: async (): Promise<Reel[]> => {
      let query = supabase.from("reels").select("*").eq("is_published", true);

      if (category === "All") {
        // Clips only, newest first.
        query = query.eq("content_type", "clip").order("created_at", { ascending: false });
      } else {
        // Episodes only, in numeric episode order.
        query = query
          .eq("content_type", "episode")
          .eq("category", category.toLowerCase())
          .order("episode_number", { ascending: true, nullsFirst: false })
          .order("created_at", { ascending: true });
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as unknown as Reel[];
    },
  });


export const useReel = (id?: string) =>
  useQuery({
    queryKey: ["reel", id],
    enabled: !!id,
    queryFn: async (): Promise<Reel | null> => {
      const { data, error } = await supabase
        .from("reels")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as Reel) ?? null;
    },
    retry: false,
  });

/** Other reels from the same source + type, for the "More from" rail. */
export const useRelatedReels = (reel?: Reel | null) =>
  useQuery({
    queryKey: ["reels-related", reel?.content_source, reel?.content_type],
    enabled: !!reel,
    queryFn: async (): Promise<Reel[]> => {
      const { data, error } = await supabase
        .from("reels")
        .select("*")
        .eq("is_published", true)
        .eq("content_source", reel!.content_source)
        .eq("content_type", reel!.content_type)
        .order("created_at", { ascending: false })
        .limit(12);
      if (error) throw error;
      return (data ?? []) as unknown as Reel[];
    },
  });

export const useComments = (reelId?: string) =>
  useQuery({
    queryKey: ["comments", reelId],
    enabled: !!reelId,
    queryFn: async (): Promise<ReelComment[]> => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("reel_id", reelId!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as ReelComment[];
    },
  });

export const useAddComment = (reelId?: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      content,
      parentId,
      authorName,
    }: {
      content: string;
      parentId?: string | null;
      authorName?: string;
    }) => {
      if (!reelId) throw new Error("Missing reel id");
      const { data, error } = await supabase
        .from("comments")
        .insert({
          reel_id: reelId,
          content: content.trim(),
          parent_id: parentId ?? null,
          author_name: authorName || "Shiva Raj Lamsal",
        })
        .select()
        .single();
      if (error) throw error;
      return data as unknown as ReelComment;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comments", reelId] });
      qc.invalidateQueries({ queryKey: ["reel", reelId] });
      qc.invalidateQueries({ queryKey: ["reels"] });
    },
  });
};
