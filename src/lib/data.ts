import pool from './db';
import { Category, Store, FeaturedProduct } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchCategories(): Promise<Category[]> {
  // Opt out of caching to ensure we get fresh data during development
  noStore(); 
  
  try {
    console.log('Fetching categories from database...');
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
    console.log('Fetching stores from database...');
    // We limit to 6 as that's the default display amount in the component
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
    console.log('Fetching featured products from database...');
    const data = await pool.query<FeaturedProduct>(`
      SELECT
        p.id,
        p.slug,
        p.name,
        (SELECT AVG(rating)::numeric(10,2) FROM product_reviews WHERE product_id = p.id) as avg_rating,
        (SELECT COUNT(*) FROM product_reviews WHERE product_id = p.id) as reviews_count,
        -- is_free_shipping is not in the schema, defaulting to false
        false as is_free_shipping,
        (SELECT price FROM product_variants WHERE product_id = p.id ORDER BY created_at ASC LIMIT 1) as price,
        (SELECT compare_at_price FROM product_variants WHERE product_id = p.id ORDER BY created_at ASC LIMIT 1) as original_price,
        (SELECT image_url FROM product_images WHERE product_id = p.id ORDER BY "order" ASC LIMIT 1) as image_url
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