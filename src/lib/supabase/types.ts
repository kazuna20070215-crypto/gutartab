export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          clerk_id: string;
          username: string;
          display_name: string;
          avatar_url: string | null;
          bio: string | null;
          instruments: string[];
          social_links: Json | null;
          plan: "free" | "pro" | "premium";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_id: string;
          username: string;
          display_name: string;
          avatar_url?: string | null;
          bio?: string | null;
          instruments?: string[];
          social_links?: Json | null;
          plan?: "free" | "pro" | "premium";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_id?: string;
          username?: string;
          display_name?: string;
          avatar_url?: string | null;
          bio?: string | null;
          instruments?: string[];
          social_links?: Json | null;
          plan?: "free" | "pro" | "premium";
          created_at?: string;
          updated_at?: string;
        };
      };
      tabs: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          artist_name: string;
          tab_data: Json;
          difficulty: "beginner" | "intermediate" | "advanced";
          genre: string | null;
          tuning: string;
          instrument: "guitar" | "bass";
          description: string | null;
          thumbnail_url: string | null;
          is_ai_generated: boolean;
          is_draft: boolean;
          is_public: boolean;
          likes_count: number;
          saves_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          artist_name: string;
          tab_data: Json;
          difficulty?: "beginner" | "intermediate" | "advanced";
          genre?: string | null;
          tuning?: string;
          instrument?: "guitar" | "bass";
          description?: string | null;
          thumbnail_url?: string | null;
          is_ai_generated?: boolean;
          is_draft?: boolean;
          is_public?: boolean;
          likes_count?: number;
          saves_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          artist_name?: string;
          tab_data?: Json;
          difficulty?: "beginner" | "intermediate" | "advanced";
          genre?: string | null;
          tuning?: string;
          instrument?: "guitar" | "bass";
          description?: string | null;
          thumbnail_url?: string | null;
          is_ai_generated?: boolean;
          is_draft?: boolean;
          is_public?: boolean;
          likes_count?: number;
          saves_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      practice_logs: {
        Row: {
          id: string;
          user_id: string;
          tab_id: string | null;
          content: string;
          practice_duration: number;
          media_url: string | null;
          is_public: boolean;
          likes_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tab_id?: string | null;
          content: string;
          practice_duration: number;
          media_url?: string | null;
          is_public?: boolean;
          likes_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tab_id?: string | null;
          content?: string;
          practice_duration?: number;
          media_url?: string | null;
          is_public?: boolean;
          likes_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          user_id: string;
          likeable_type: "tab" | "practice_log";
          likeable_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          likeable_type: "tab" | "practice_log";
          likeable_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          likeable_type?: "tab" | "practice_log";
          likeable_id?: string;
          created_at?: string;
        };
      };
      saves: {
        Row: {
          id: string;
          user_id: string;
          tab_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tab_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tab_id?: string;
          created_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          user_id: string;
          commentable_type: "tab" | "practice_log";
          commentable_id: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          commentable_type: "tab" | "practice_log";
          commentable_id: string;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          commentable_type?: "tab" | "practice_log";
          commentable_id?: string;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      follows: {
        Row: {
          id: string;
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          follower_id: string;
          following_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          follower_id?: string;
          following_id?: string;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          actor_id: string;
          type: "like" | "comment" | "follow";
          target_type: "tab" | "practice_log" | "user";
          target_id: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          actor_id: string;
          type: "like" | "comment" | "follow";
          target_type: "tab" | "practice_log" | "user";
          target_id: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          actor_id?: string;
          type?: "like" | "comment" | "follow";
          target_type?: "tab" | "practice_log" | "user";
          target_id?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Helper types
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Tab = Database["public"]["Tables"]["tabs"]["Row"];
export type PracticeLog = Database["public"]["Tables"]["practice_logs"]["Row"];
export type Like = Database["public"]["Tables"]["likes"]["Row"];
export type Save = Database["public"]["Tables"]["saves"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type Follow = Database["public"]["Tables"]["follows"]["Row"];
export type Notification = Database["public"]["Tables"]["notifications"]["Row"];

// Extended types with relations
export type TabWithUser = Tab & {
  user: User;
};

export type PracticeLogWithUser = PracticeLog & {
  user: User;
  tab?: Tab | null;
};

export type CommentWithUser = Comment & {
  user: User;
};


