CREATE TABLE public.watch_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  reel_id uuid NOT NULL REFERENCES public.reels(id) ON DELETE CASCADE,
  progress_seconds integer NOT NULL DEFAULT 0,
  completed boolean NOT NULL DEFAULT false,
  watched_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, reel_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.watch_history TO authenticated;
GRANT ALL ON public.watch_history TO service_role;

ALTER TABLE public.watch_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own watch history"
  ON public.watch_history FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own watch history"
  ON public.watch_history FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own watch history"
  ON public.watch_history FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own watch history"
  ON public.watch_history FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_watch_history_user ON public.watch_history (user_id, completed);

CREATE TRIGGER update_watch_history_updated_at
  BEFORE UPDATE ON public.watch_history
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();