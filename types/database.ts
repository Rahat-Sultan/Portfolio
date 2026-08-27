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
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          tech_stack: string[];
          image_url: string | null;
          images: string[];
          live_url: string | null;
          github_url: string | null;
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          tech_stack?: string[];
          image_url?: string | null;
          images?: string[];
          live_url?: string | null;
          github_url?: string | null;
          featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          tech_stack?: string[];
          image_url?: string | null;
          images?: string[];
          live_url?: string | null;
          github_url?: string | null;
          featured?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string | null;
          message: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          company?: string | null;
          message?: string;
          read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      profile: {
        Row: {
          id: string;
          name: string;
          title: string;
          bio: string;
          avatar_url: string | null;
          skills: string[];
          social_links: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          title: string;
          bio: string;
          avatar_url?: string | null;
          skills?: string[];
          social_links?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          title?: string;
          bio?: string;
          avatar_url?: string | null;
          skills?: string[];
          social_links?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
