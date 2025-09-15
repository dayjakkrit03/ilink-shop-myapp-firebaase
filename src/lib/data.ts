import { prisma } from './db';
import { unstable_noStore as noStore } from 'next/cache';

// --- Type Definitions ---
// Restoring these types here to match the data fetching functions
export type Promotion = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  link_url: string | null;
  badge_text: string | null;
};

export type HeroBanner = {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  link_url: string;
  badge_text?: string;
  cta_text?: string;
};

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

    // Handle null image_url
    const formattedCategories = categories.map(category => ({
      ...category,
      image_url: category.image_url ?? '',
    }));

    return formattedCategories;

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
    const featuredCollection = await prisma.collections.findUnique({
      where: {
        slug: 'recommended-products',
      },
      select: {
        collection_products: {
          orderBy: {
            position: 'asc',
          },
          select: {
            products: {
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
            },
          },
          take: 8,
        },
      },
    });

    if (!featuredCollection) {
      console.log("Collection 'recommended-products' not found. Returning empty array.");
      return [];
    }

    const products = featuredCollection.collection_products.map(cp => cp.products);

    const featuredProducts = products.map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      rating: p.avg_rating?.toNumber() ?? 0,
      reviews: p.reviews_count ?? 0,
      isFreeShipping: p.is_free_shipping ?? false,
      price: p.product_variants[0]?.price?.toNumber() ?? 0,
      originalPrice: p.product_variants[0]?.compare_at_price?.toNumber() ?? undefined,
      image: p.product_images[0]?.url ?? '',
    }));

    return featuredProducts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch featured products data.');
  }
}

export async function fetchClearanceSaleProducts() {
  noStore();
  try {
    const saleCollection = await prisma.collections.findUnique({
      where: {
        slug: 'clearance-sale', // Target the clearance sale collection
      },
      select: {
        collection_products: {
          orderBy: {
            position: 'asc',
          },
          select: {
            products: {
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
            },
          },
          take: 8, // Limit to 8 products for the section
        },
      },
    });

    if (!saleCollection) {
      console.log("Collection 'clearance-sale' not found. Returning empty array.");
      return [];
    }

    const products = saleCollection.collection_products.map(cp => cp.products);

    const saleProducts = products.map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      rating: p.avg_rating?.toNumber() ?? 0,
      reviews: p.reviews_count ?? 0,
      isFreeShipping: p.is_free_shipping ?? false,
      price: p.product_variants[0]?.price?.toNumber() ?? 0,
      originalPrice: p.product_variants[0]?.compare_at_price?.toNumber() ?? undefined,
      image: p.product_images[0]?.url ?? '',
    }));

    return saleProducts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch clearance sale products data.');
  }
}

// RESTORING the function to fetch from the database table
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

// RESTORING the function to fetch from the database table
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

export async function fetchSiteSetting(key: string) {
  noStore();
  try {
    const setting = await prisma.site_settings.findUnique({
      where: {
        key: key,
      },
      select: {
        value: true,
      },
    });

    if (!setting) {
      console.warn(`Site setting with key "${key}" not found.`);
      return null;
    }

    return setting.value;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch site setting for key: ${key}.`);
  }
}
