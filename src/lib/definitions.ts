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