import pool from './db';
import { Category, Store } from './definitions';
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
      `SELECT id, name, slug, image_url, logo_url FROM stores LIMIT 6`
    );
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stores data.');
  }
}