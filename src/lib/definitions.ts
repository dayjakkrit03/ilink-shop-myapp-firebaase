export interface Category {
  id?: number | string;
  name: string;
  slug: string;
  image_url: string;
}

export interface Store {
  id: number;
  name: string;
  description?: string;
  slug: string;
  banner_url: string;
  logo_url: string;
}

export interface FeaturedProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  original_price?: number | null;
  avg_rating?: number | null;
  reviews_count?: number | null;
  image_url: string;
  is_free_shipping?: boolean | null;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  link_url?: string;
  badge_text?: string;
  cta_text?: string;
}

export interface Promotion {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image_url?: string | null;
  link_url?: string | null;
  badge_text?: string | null;
}
