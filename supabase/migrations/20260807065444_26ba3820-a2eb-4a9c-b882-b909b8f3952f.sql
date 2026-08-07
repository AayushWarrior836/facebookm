CREATE TABLE public.episodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  series TEXT NOT NULL,
  episode_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  youtube_id TEXT NOT NULL,
  thumbnail_url TEXT,
  duration TEXT NOT NULL DEFAULT '',
  channel TEXT NOT NULL DEFAULT '',
  views TEXT NOT NULL DEFAULT '0 views',
  likes INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  cast_members JSONB NOT NULL DEFAULT '[]'::jsonb,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX episodes_series_number_idx ON public.episodes (series, episode_number);

GRANT SELECT ON public.episodes TO anon;
GRANT SELECT ON public.episodes TO authenticated;
GRANT ALL ON public.episodes TO service_role;

ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Episodes are viewable by everyone"
ON public.episodes FOR SELECT
USING (true);