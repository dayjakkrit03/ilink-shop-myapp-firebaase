export interface Category {
  id?: number | string;
  name: string;
  slug: string;
  image_url: string;
}

export interface Store {
  id: number;
  name: string;
  brand: string;
  slug: string;
  image_url: string;
  logo_url: string;
}