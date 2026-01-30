-- TAB GENIE SOCIAL - Initial Schema
-- This migration creates all the core tables for the application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_id TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    instruments TEXT[] DEFAULT '{}',
    social_links JSONB DEFAULT '{}',
    plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'premium')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_users_clerk_id ON public.users(clerk_id);
CREATE INDEX idx_users_username ON public.users(username);

-- ============================================
-- TABS TABLE
-- ============================================
CREATE TABLE public.tabs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    artist_name TEXT NOT NULL,
    tab_data JSONB NOT NULL DEFAULT '{}',
    difficulty TEXT DEFAULT 'intermediate' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    genre TEXT,
    tuning TEXT DEFAULT 'Standard',
    instrument TEXT DEFAULT 'guitar' CHECK (instrument IN ('guitar', 'bass')),
    description TEXT,
    thumbnail_url TEXT,
    is_ai_generated BOOLEAN DEFAULT FALSE,
    is_draft BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    likes_count INTEGER DEFAULT 0,
    saves_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_tabs_user_id ON public.tabs(user_id);
CREATE INDEX idx_tabs_public_created ON public.tabs(is_public, created_at DESC) WHERE is_public = TRUE AND is_draft = FALSE;
CREATE INDEX idx_tabs_genre ON public.tabs(genre) WHERE genre IS NOT NULL;
CREATE INDEX idx_tabs_difficulty ON public.tabs(difficulty);

-- ============================================
-- PRACTICE LOGS TABLE
-- ============================================
CREATE TABLE public.practice_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    tab_id UUID REFERENCES public.tabs(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    practice_duration INTEGER NOT NULL DEFAULT 0, -- in minutes
    media_url TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_practice_logs_user_id ON public.practice_logs(user_id);
CREATE INDEX idx_practice_logs_tab_id ON public.practice_logs(tab_id) WHERE tab_id IS NOT NULL;
CREATE INDEX idx_practice_logs_public_created ON public.practice_logs(is_public, created_at DESC) WHERE is_public = TRUE;

-- ============================================
-- LIKES TABLE (Polymorphic)
-- ============================================
CREATE TABLE public.likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    likeable_type TEXT NOT NULL CHECK (likeable_type IN ('tab', 'practice_log')),
    likeable_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, likeable_type, likeable_id)
);

-- Indexes
CREATE INDEX idx_likes_user_id ON public.likes(user_id);
CREATE INDEX idx_likes_likeable ON public.likes(likeable_type, likeable_id);

-- ============================================
-- SAVES TABLE
-- ============================================
CREATE TABLE public.saves (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    tab_id UUID NOT NULL REFERENCES public.tabs(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, tab_id)
);

-- Indexes
CREATE INDEX idx_saves_user_id ON public.saves(user_id);
CREATE INDEX idx_saves_tab_id ON public.saves(tab_id);

-- ============================================
-- COMMENTS TABLE (Polymorphic)
-- ============================================
CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    commentable_type TEXT NOT NULL CHECK (commentable_type IN ('tab', 'practice_log')),
    commentable_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_comments_user_id ON public.comments(user_id);
CREATE INDEX idx_comments_commentable ON public.comments(commentable_type, commentable_id);

-- ============================================
-- FOLLOWS TABLE
-- ============================================
CREATE TABLE public.follows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

-- Indexes
CREATE INDEX idx_follows_follower_id ON public.follows(follower_id);
CREATE INDEX idx_follows_following_id ON public.follows(following_id);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    actor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('like', 'comment', 'follow')),
    target_type TEXT NOT NULL CHECK (target_type IN ('tab', 'practice_log', 'user')),
    target_id UUID NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read) WHERE is_read = FALSE;

-- ============================================
-- AI GENERATION LOGS TABLE
-- ============================================
CREATE TABLE public.ai_generation_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    input_data JSONB NOT NULL DEFAULT '{}',
    output_tab_id UUID REFERENCES public.tabs(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_ai_generation_logs_user_id ON public.ai_generation_logs(user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tabs_updated_at
    BEFORE UPDATE ON public.tabs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_practice_logs_updated_at
    BEFORE UPDATE ON public.practice_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON public.comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_generation_logs_updated_at
    BEFORE UPDATE ON public.ai_generation_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment likes_count
CREATE OR REPLACE FUNCTION increment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.likeable_type = 'tab' THEN
        UPDATE public.tabs SET likes_count = likes_count + 1 WHERE id = NEW.likeable_id;
    ELSIF NEW.likeable_type = 'practice_log' THEN
        UPDATE public.practice_logs SET likes_count = likes_count + 1 WHERE id = NEW.likeable_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement likes_count
CREATE OR REPLACE FUNCTION decrement_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.likeable_type = 'tab' THEN
        UPDATE public.tabs SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.likeable_id;
    ELSIF OLD.likeable_type = 'practice_log' THEN
        UPDATE public.practice_logs SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.likeable_id;
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_like_insert
    AFTER INSERT ON public.likes
    FOR EACH ROW EXECUTE FUNCTION increment_likes_count();

CREATE TRIGGER on_like_delete
    AFTER DELETE ON public.likes
    FOR EACH ROW EXECUTE FUNCTION decrement_likes_count();

-- Function to increment/decrement saves_count
CREATE OR REPLACE FUNCTION increment_saves_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.tabs SET saves_count = saves_count + 1 WHERE id = NEW.tab_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrement_saves_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.tabs SET saves_count = GREATEST(saves_count - 1, 0) WHERE id = OLD.tab_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_save_insert
    AFTER INSERT ON public.saves
    FOR EACH ROW EXECUTE FUNCTION increment_saves_count();

CREATE TRIGGER on_save_delete
    AFTER DELETE ON public.saves
    FOR EACH ROW EXECUTE FUNCTION decrement_saves_count();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tabs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generation_logs ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users are viewable by everyone" ON public.users
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid()::text = clerk_id);

-- Tabs policies
CREATE POLICY "Public tabs are viewable by everyone" ON public.tabs
    FOR SELECT USING (is_public = true AND is_draft = false);

CREATE POLICY "Users can view own tabs" ON public.tabs
    FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can insert own tabs" ON public.tabs
    FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can update own tabs" ON public.tabs
    FOR UPDATE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can delete own tabs" ON public.tabs
    FOR DELETE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

-- Practice logs policies
CREATE POLICY "Public practice logs are viewable by everyone" ON public.practice_logs
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view own practice logs" ON public.practice_logs
    FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can insert own practice logs" ON public.practice_logs
    FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can update own practice logs" ON public.practice_logs
    FOR UPDATE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can delete own practice logs" ON public.practice_logs
    FOR DELETE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

-- Likes policies
CREATE POLICY "Likes are viewable by everyone" ON public.likes
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own likes" ON public.likes
    FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can delete own likes" ON public.likes
    FOR DELETE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

-- Saves policies
CREATE POLICY "Users can view own saves" ON public.saves
    FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can insert own saves" ON public.saves
    FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can delete own saves" ON public.saves
    FOR DELETE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON public.comments
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own comments" ON public.comments
    FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can update own comments" ON public.comments
    FOR UPDATE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can delete own comments" ON public.comments
    FOR DELETE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

-- Follows policies
CREATE POLICY "Follows are viewable by everyone" ON public.follows
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own follows" ON public.follows
    FOR INSERT WITH CHECK (follower_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can delete own follows" ON public.follows
    FOR DELETE USING (follower_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

-- AI generation logs policies
CREATE POLICY "Users can view own AI generation logs" ON public.ai_generation_logs
    FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can insert own AI generation logs" ON public.ai_generation_logs
    FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));


