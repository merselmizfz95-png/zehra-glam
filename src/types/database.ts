export interface Database {
  public: {
    Tables: {
      hero_content: {
        Row: {
          id: string;
          title_en: string;
          title_fr: string;
          subtitle_en: string;
          subtitle_fr: string;
          cta_text_en: string;
          cta_text_fr: string;
          image_url: string | null;
        };
        Insert: {
          id?: string;
          title_en?: string;
          title_fr?: string;
          subtitle_en?: string;
          subtitle_fr?: string;
          cta_text_en?: string;
          cta_text_fr?: string;
          image_url?: string | null;
        };
        Update: {
          id?: string;
          title_en?: string;
          title_fr?: string;
          subtitle_en?: string;
          subtitle_fr?: string;
          cta_text_en?: string;
          cta_text_fr?: string;
          image_url?: string | null;
        };
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          name_en: string;
          name_fr: string;
          description_en: string;
          description_fr: string;
          icon: string;
          image_url: string | null;
          display_order: number;
        };
        Insert: {
          id?: string;
          name_en: string;
          name_fr: string;
          description_en: string;
          description_fr: string;
          icon?: string;
          image_url?: string | null;
          display_order?: number;
        };
        Update: {
          id?: string;
          name_en?: string;
          name_fr?: string;
          description_en?: string;
          description_fr?: string;
          icon?: string;
          image_url?: string | null;
          display_order?: number;
        };
        Relationships: [];
      };
      about_content: {
        Row: {
          id: string;
          title_en: string;
          title_fr: string;
          body_en: string;
          body_fr: string;
          years_experience: number;
          happy_clients: number;
          image_url: string | null;
        };
        Insert: {
          id?: string;
          title_en?: string;
          title_fr?: string;
          body_en: string;
          body_fr: string;
          years_experience?: number;
          happy_clients?: number;
          image_url?: string | null;
        };
        Update: {
          id?: string;
          title_en?: string;
          title_fr?: string;
          body_en?: string;
          body_fr?: string;
          years_experience?: number;
          happy_clients?: number;
          image_url?: string | null;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          client_name: string;
          service_en: string;
          service_fr: string;
          quote_en: string;
          quote_fr: string;
          rating: number;
        };
        Insert: {
          id?: string;
          client_name: string;
          service_en: string;
          service_fr: string;
          quote_en: string;
          quote_fr: string;
          rating?: number;
        };
        Update: {
          id?: string;
          client_name?: string;
          service_en?: string;
          service_fr?: string;
          quote_en?: string;
          quote_fr?: string;
          rating?: number;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          name_en: string;
          name_fr: string;
          description_en: string;
          description_fr: string;
          price: number;
          category: string;
          image_url: string | null;
          in_stock: boolean;
          featured: boolean;
          stripe_price_id: string | null;
        };
        Insert: {
          id?: string;
          name_en: string;
          name_fr: string;
          description_en: string;
          description_fr: string;
          price?: number;
          category: string;
          image_url?: string | null;
          in_stock?: boolean;
          featured?: boolean;
          stripe_price_id?: string | null;
        };
        Update: {
          id?: string;
          name_en?: string;
          name_fr?: string;
          description_en?: string;
          description_fr?: string;
          price?: number;
          category?: string;
          image_url?: string | null;
          in_stock?: boolean;
          featured?: boolean;
          stripe_price_id?: string | null;
        };
        Relationships: [];
      };
      contact_info: {
        Row: {
          id: string;
          address: string;
          phone: string;
          email: string;
          hours: string;
          booking_url: string;
        };
        Insert: {
          id?: string;
          address: string;
          phone: string;
          email: string;
          hours: string;
          booking_url: string;
        };
        Update: {
          id?: string;
          address?: string;
          phone?: string;
          email?: string;
          hours?: string;
          booking_url?: string;
        };
        Relationships: [];
      };
      bookings: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          service: string;
          message: string | null;
          preferred_date: string | null;
          status: string;
          stripe_session_id: string | null;
          payment_status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          service: string;
          message?: string | null;
          preferred_date?: string | null;
          status?: string;
          stripe_session_id?: string | null;
          payment_status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          service?: string;
          message?: string | null;
          preferred_date?: string | null;
          status?: string;
          stripe_session_id?: string | null;
          payment_status?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          title_en: string;
          title_fr: string;
          slug: string;
          excerpt_en: string;
          excerpt_fr: string;
          body_en: string;
          body_fr: string;
          image_url: string | null;
          category: string;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_en: string;
          title_fr: string;
          slug: string;
          excerpt_en: string;
          excerpt_fr: string;
          body_en: string;
          body_fr: string;
          image_url?: string | null;
          category?: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title_en?: string;
          title_fr?: string;
          slug?: string;
          excerpt_en?: string;
          excerpt_fr?: string;
          body_en?: string;
          body_fr?: string;
          image_url?: string | null;
          category?: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
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

export type HeroContent = Database["public"]["Tables"]["hero_content"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type AboutContent = Database["public"]["Tables"]["about_content"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ContactInfo = Database["public"]["Tables"]["contact_info"]["Row"];
export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
