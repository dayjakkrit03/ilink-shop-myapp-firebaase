import { prisma } from './db';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchCategories() {
  noStore();
  try {
    const categories = await prisma.categories.findMany({
      select: {
        name: true,
        slug: true,
        image_url: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return categories;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories data.');
  }
}

export async function fetchStores() {
  noStore();
  try {
    const stores = await prisma.stores.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        slug: true,
        banner_url: true,
        logo_url: true,
      },
      take: 6,
    });
    return stores;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stores data.');
  }
}

export async function fetchFeaturedProducts() {
  noStore();
  try {
    const products = await prisma.products.findMany({
      where: {
        is_active: true,
      },
      select: {
        id: true,
        slug: true,
        name: true,
        avg_rating: true,
        reviews_count: true,
        is_free_shipping: true,
        product_variants: {
          select: {
            price: true,
            compare_at_price: true,
          },
          orderBy: {
            created_at: 'asc',
          },
          take: 1,
        },
        product_images: {
          select: {
            url: true,
          },
          orderBy: {
            position: 'asc',
          },
          take: 1,
        },
      },
      take: 8,
    });

    // Map data to match the expected prop types of the client component (e.g., ProductCardProps)
    const featuredProducts = products.map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      rating: p.avg_rating?.toNumber() ?? 0, // Use 0 as a fallback for rating
      reviews: p.reviews_count ?? 0, // Use 0 as a fallback for reviews
      isFreeShipping: p.is_free_shipping ?? false,
      price: p.product_variants[0]?.price?.toNumber() ?? 0,
      originalPrice: p.product_variants[0]?.compare_at_price?.toNumber() ?? undefined, // FINAL FIX: Match component prop type (number | undefined)
      image: p.product_images[0]?.url ?? '',
    }));

    return featuredProducts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch featured products data.');
  }
}

export async function fetchHeroBanners() {
  noStore();
  try {
    const banners = await prisma.hero_banners.findMany({
      where: {
        is_active: true,
      },
      select: {
        id: true,
        title: true,
        subtitle: true,
        image_url: true,
        link_url: true,
        badge_text: true,
        cta_text: true,
      },
      orderBy: {
        sort_order: 'asc',
      },
    });
    return banners;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch hero banners data.');
  }
}

export async function fetchPromotions() {
  noStore();
  try {
    const promotions = await prisma.promotions.findMany({
      where: {
        is_active: true,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        subtitle: true,
        image_url: true,
        link_url: true,
        badge_text: true,
      },
      orderBy: {
        position: 'asc',
      },
      take: 3,
    });
    return promotions;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch promotions data.');
  }
}
