CREATE TABLE public.reels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  video_url text,
  thumbnail_url text,
  creator_name text NOT NULL DEFAULT '',
  creator_avatar text,
  category text NOT NULL CHECK (category IN ('all','mahabharata','ramayana')),
  content_type text NOT NULL CHECK (content_type IN ('clip','episode')),
  content_source text NOT NULL CHECK (content_source IN ('mahabharata','ramayana')),
  duration text NOT NULL DEFAULT '',
  views text NOT NULL DEFAULT '0 views',
  likes_count integer NOT NULL DEFAULT 0 CHECK (likes_count >= 0),
  comments_count integer NOT NULL DEFAULT 0 CHECK (comments_count >= 0),
  shares_count integer NOT NULL DEFAULT 0 CHECK (shares_count >= 0),
  source_url text NOT NULL,
  episode_number integer,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.reels TO anon;
GRANT SELECT ON public.reels TO authenticated;
GRANT ALL ON public.reels TO service_role;

ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published reels are viewable by everyone"
  ON public.reels FOR SELECT
  USING (is_published = true);

CREATE INDEX idx_reels_content_type ON public.reels (content_type);
CREATE INDEX idx_reels_category_type ON public.reels (category, content_type);
CREATE INDEX idx_reels_published ON public.reels (is_published, created_at DESC);

CREATE TABLE public.comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reel_id uuid NOT NULL REFERENCES public.reels(id) ON DELETE CASCADE,
  user_id uuid,
  author_name text NOT NULL DEFAULT 'Guest',
  content text NOT NULL CHECK (char_length(trim(content)) > 0 AND char_length(content) <= 2000),
  parent_id uuid REFERENCES public.comments(id) ON DELETE CASCADE,
  likes_count integer NOT NULL DEFAULT 0 CHECK (likes_count >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.comments TO anon;
GRANT SELECT, INSERT ON public.comments TO authenticated;
GRANT ALL ON public.comments TO service_role;

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments are viewable by everyone"
  ON public.comments FOR SELECT
  USING (true);

CREATE POLICY "Anyone can add a comment"
  ON public.comments FOR INSERT
  WITH CHECK (user_id IS NULL);

CREATE INDEX idx_comments_reel ON public.comments (reel_id, created_at DESC);
CREATE INDEX idx_comments_parent ON public.comments (parent_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON public.comments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.sync_reel_comment_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE public.reels SET comments_count = comments_count + 1 WHERE id = NEW.reel_id;
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    UPDATE public.reels SET comments_count = GREATEST(comments_count - 1, 0) WHERE id = OLD.reel_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER sync_reel_comment_count_trigger
AFTER INSERT OR DELETE ON public.comments
FOR EACH ROW EXECUTE FUNCTION public.sync_reel_comment_count();