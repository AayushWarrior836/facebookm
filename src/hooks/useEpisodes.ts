import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CastMember {
  actor: string;
  role: string;
}

export interface Episode {
  id: string;
  series: string;
  episode_number: number;
  title: string;
  description: string;
  youtube_id: string;
  thumbnail_url: string | null;
  duration: string;
  channel: string;
  views: string;
  likes: number;
  comments_count: number;
  cast_members: CastMember[];
  published_at: string;
}

const normalize = (row: any): Episode => ({
  ...row,
  cast_members: Array.isArray(row.cast_members) ? (row.cast_members as CastMember[]) : [],
});

export const episodeThumb = (ep: Episode) =>
  ep.thumbnail_url || `https://img.youtube.com/vi/${ep.youtube_id}/hqdefault.jpg`;

export const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d > 1 ? "s" : ""} ago`;
};

export const useEpisodes = (series?: string) =>
  useQuery({
    queryKey: ["episodes", series ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("episodes")
        .select("*")
        .order("published_at", { ascending: false });
      if (series) query = query.eq("series", series);
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []).map(normalize);
    },
  });

export const useEpisode = (id?: string) =>
  useQuery({
    queryKey: ["episode", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from("episodes").select("*").eq("id", id!).maybeSingle();
      if (error) throw error;
      return data ? normalize(data) : null;
    },
  });
