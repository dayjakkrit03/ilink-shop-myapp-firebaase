import pool from './db';
import { Category, Store, FeaturedProduct, HeroBanner, Promotion } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchCategories(): Promise<Category[]> {
  noStore();
  try {
    const data = await pool.query<Category>(
      `SELECT name, slug, image_url FROM categories ORDER BY name ASC`
    );
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories data.');
  }
}

export async function fetchStores(): Promise<Store[]> {
  noStore();
  try {
    const data = await pool.query<Store>(
      `SELECT id, name, description, slug, banner_url, logo_url FROM stores LIMIT 6`
    );
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stores data.');
  }
}

export async function fetchFeaturedProducts(): Promise<FeaturedProduct[]> {
  noStore();
  try {
    const data = await pool.query<FeaturedProduct>(`
      SELECT
        p.id,
        p.slug,
        p.name,
        p.avg_rating,
        p.reviews_count,
        p.is_free_shipping,
        (SELECT price FROM product_variants WHERE product_id = p.id ORDER BY created_at ASC LIMIT 1) as price,
        (SELECT compare_at_price FROM product_variants WHERE product_id = p.id ORDER BY created_at ASC LIMIT 1) as original_price,
        (SELECT url FROM product_images WHERE product_id = p.id ORDER BY "position" ASC LIMIT 1) as image_url
      FROM
        products p
      WHERE
        p.is_active = true
      LIMIT 8;
    `);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch featured products data.');
  }
}

export async function fetchHeroBanners(): Promise<HeroBanner[]> {
  noStore();
  try {
    const data = await pool.query<HeroBanner>(
      `SELECT id, title, subtitle, image_url, link_url, badge_text, cta_text FROM hero_banners WHERE is_active = true ORDER BY sort_order ASC`
    );
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch hero banners data.');
  }
}

export async function fetchPromotions(): Promise<Promotion[]> {
  noStore();
  try {
    const data = await pool.query<Promotion>(
      `SELECT id, slug, title, subtitle, image_url, link_url, badge_text FROM promotions WHERE is_active = true ORDER BY position ASC LIMIT 3`
    );
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch promotions data.');
  }
}
