-- =================================================================
-- STEP 1: ALTER TABLES TO MATCH UI REQUIREMENTS
-- =================================================================

-- Add image_url to categories table
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add performance and feature columns to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS avg_rating DECIMAL(3, 2) DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS reviews_count INT DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_free_shipping BOOLEAN DEFAULT FALSE;

-- Add badge_text to promotions table
ALTER TABLE public.promotions ADD COLUMN IF NOT EXISTS badge_text VARCHAR(100);


-- =================================================================
-- STEP 2: INSERT MOCK DATA
-- =================================================================

-- Clear existing mock data to prevent duplicates if script is run multiple times
TRUNCATE TABLE public.categories, public.promotions, public.stores, public.collections, public.products RESTART IDENTITY CASCADE;


-- == CATEGORIES ==
INSERT INTO public.categories (slug, name, image_url) VALUES
('lan-utp', 'LAN (UTP) System', '/assets/category-lan-utp.jpg'),
('fiber-optic', 'FIBER OPTIC System', '/assets/category-fiber-optic.jpg'),
('fttr-fttx', 'FTTR/FTTx OVAL / FLAT CABLE', '/assets/category-fttr-fttx.jpg'),
('data-center', 'DATA CENTER System', '/assets/category-data-center.jpg'),
('coaxial', 'COAXIAL (RG) System', '/assets/category-coaxial.jpg'),
('telephone', 'Telephone CABLE', '/assets/category-telephone.jpg'),
('solar', 'SOLAR CABLE', '/assets/category-solar.jpg'),
('security-control', 'SECURITY AND CONTROL System', '/assets/category-security-control.jpg'),
('networking', 'NETWORKING System', '/assets/category-networking.jpg'),
('germany-rack', 'GERMANY RACK', '/assets/category-germany-rack.jpg'),
('cctv-cabinet', 'CCTV OUTDOOR CABINET', '/assets/category-cctv-cabinet.jpg'),
('link-rack', 'LINK RACK', '/assets/category-link-rack.jpg');


-- == PROMOTIONS (for Hero Section) ==
INSERT INTO public.promotions (slug, title, subtitle, image_url, link_url, badge_text, position, is_active) VALUES
('free-shipping-2999', 'ส่งฟรี', 'ซื้อครบ 2,999 บาท', '/placeholder.png', '/products?tag=free-shipping', NULL, 1, TRUE),
('cod-safe', 'เก็บเงินปลายทาง', 'ปลอดภัย 100%', '/placeholder.png', '/products?tag=cod', NULL, 2, TRUE),
('genuine-guarantee', 'รับประกัน', 'สินค้าของแท้', '/placeholder.png', '/products?tag=genuine', NULL, 3, TRUE);


-- == STORES (for InterlinkMall) ==
INSERT INTO public.stores (slug, name, description, logo_url, banner_url, is_active) VALUES
('cb-cotton', 'CB Cotton IT Store', 'IT & Network Solutions', '/assets/logo-cb-cotton.jpg', '/assets/store-cb-cotton.jpg', TRUE),
('corretto-suite', 'CORRETTO SUITE', 'Enterprise IT Equipment', '/assets/logo-corretto-suite.jpg', '/assets/store-corretto-suite.jpg', TRUE),
('thailand-tech', 'Thailand Tech Plaza', 'Network & Server Solutions', '/assets/logo-thailand-tech.jpg', '/assets/store-thailand-pool.jpg', TRUE),
('in2it', 'IN2IT Computer', 'Colorful Tech Solutions', '/assets/logo-in2it.jpg', '/assets/store-in2it.jpg', TRUE),
('smart-tech', 'Smart Tech Shop', 'Smart IT Solutions', '/assets/logo-smart-tech.jpg', '/assets/store-toy-smart.jpg', TRUE),
('quiescent', 'Quiescent Systems', 'Professional IT Hardware', '/assets/logo-quiescent.jpg', '/assets/store-quiescent.jpg', TRUE);


-- == COLLECTIONS (for tagging products) ==
INSERT INTO public.collections (slug, title, description, type, is_active) VALUES
('clearance-sale', 'Clearance Sale', 'Products on flash sale or clearance.', 'manual', TRUE),
('recommended-products', 'สินค้าแนะนำ', 'Featured products for the homepage.', 'manual', TRUE),
('interlink-mall', 'InterlinkMall', 'Products sold by official stores on InterlinkMall.', 'manual', TRUE);


-- == PRODUCTS & VARIANTS (WRAPPED IN DO BLOCK) ==
DO $$
DECLARE
    a UUID;
BEGIN

-- Product 1: Fiber Optic Cable
INSERT INTO public.products (slug, name, avg_rating, reviews_count, is_free_shipping)
VALUES ('fiber-optic-cable-sm-305m', 'Fiber Optic Cable Single Mode 305m', 4.8, 156, TRUE)
RETURNING id INTO a;
INSERT INTO public.product_variants (product_id, sku, price, compare_at_price) VALUES (a, 'P1-FOC-SM-305', 2150, 2750);
INSERT INTO public.product_images (product_id, url, position) VALUES (a, '/assets/fiber-optic-cable.jpg', 0);

-- Product 2: 24-Port Gigabit Network Switch
INSERT INTO public.products (slug, name, avg_rating, reviews_count, is_free_shipping)
VALUES ('24-port-gigabit-switch', '24-Port Gigabit Network Switch', 4.6, 234, TRUE)
RETURNING id INTO a;
INSERT INTO public.product_variants (product_id, sku, price, compare_at_price) VALUES (a, 'P2-SW-GIGA-24', 3890, 4500);
INSERT INTO public.product_images (product_id, url, position) VALUES (a, '/assets/network-switch-professional.jpg', 0);

-- Product 3: RG-6 Coaxial Cable
INSERT INTO public.products (slug, name, avg_rating, reviews_count, is_free_shipping)
VALUES ('rg6-coaxial-cable-305m', 'RG-6 Coaxial Cable 305m', 4.5, 189, FALSE)
RETURNING id INTO a;
INSERT INTO public.product_variants (product_id, sku, price, compare_at_price) VALUES (a, 'P3-COAX-RG6-305', 1450, 1850);
INSERT INTO public.product_images (product_id, url, position) VALUES (a, '/assets/coaxial-cable-reel.jpg', 0);

-- Product 4: Solar Cable
INSERT INTO public.products (slug, name, avg_rating, reviews_count, is_free_shipping)
VALUES ('solar-cable-4mm-100m', 'Solar Cable 4mm² PV Wire 100m', 4.7, 145, TRUE)
RETURNING id INTO a;
INSERT INTO public.product_variants (product_id, sku, price, compare_at_price) VALUES (a, 'P4-SOLAR-4MM-100', 2800, 3200);
INSERT INTO public.product_images (product_id, url, position) VALUES (a, '/assets/solar-cable-red.jpg', 0);

-- Product 5: Telephone Cable
INSERT INTO public.products (slug, name, avg_rating, reviews_count, is_free_shipping)
VALUES ('telephone-cable-4pair-305m', 'Telephone Cable 4-Pair Indoor 305m', 4.4, 98, FALSE)
RETURNING id INTO a;
INSERT INTO public.product_variants (product_id, sku, price, compare_at_price) VALUES (a, 'P5-TEL-4P-305', 980, 1250);
INSERT INTO public.product_images (product_id, url, position) VALUES (a, '/assets/telephone-cable.jpg', 0);

-- Product 6: Server Rack Cabinet
INSERT INTO public.products (slug, name, avg_rating, reviews_count, is_free_shipping)
VALUES ('server-rack-42u', '19" Server Rack Cabinet 42U', 4.9, 87, TRUE)
RETURNING id INTO a;
INSERT INTO public.product_variants (product_id, sku, price, compare_at_price) VALUES (a, 'P6-RACK-42U', 15800, 18500);
INSERT INTO public.product_images (product_id, url, position) VALUES (a, '/assets/server-rack-19inch.jpg', 0);

-- Product 7: US-9035 CAT 5E
INSERT INTO public.products (slug, name, avg_rating, reviews_count, is_free_shipping)
VALUES ('us-9035-cat5e-utp-305m', 'US-9035 CAT 5E UTP Cable Indoor 305m', 4.7, 178, FALSE)
RETURNING id INTO a;
INSERT INTO public.product_variants (product_id, sku, price, compare_at_price) VALUES (a, 'US-9035', 6094, 6800);
INSERT INTO public.product_images (product_id, url, position) VALUES (a, '/assets/lan-cat5e-box.jpg', 0);

-- Product 8: UT-0216 Fiber Media Converter
INSERT INTO public.products (slug, name, avg_rating, reviews_count, is_free_shipping)
VALUES ('ut-0216-media-converter', 'UT-0216 Fiber Media Converter RJ45', 4.6, 124, TRUE)
RETURNING id INTO a;
INSERT INTO public.product_variants (product_id, sku, price, compare_at_price) VALUES (a, 'UT-0216', 2247, 2800);
INSERT INTO public.product_images (product_id, url, position) VALUES (a, '/assets/fiber-media-converter.jpg', 0);

-- Product 9: Ethernet PCI Card
INSERT INTO public.products (slug, name, avg_rating, reviews_count, is_free_shipping)
VALUES ('ethernet-pci-card-gigabit', 'Ethernet PCI Network Card Gigabit', 4.6, 234, TRUE)
RETURNING id INTO a;
INSERT INTO public.product_variants (product_id, sku, price, compare_at_price) VALUES (a, 'FS1-PCI-ETH', 650, 1300);
INSERT INTO public.product_images (product_id, url, position) VALUES (a, '/assets/ethernet-pci-card.jpg', 0);
INSERT INTO public.collection_products (collection_id, product_id) VALUES ((SELECT id FROM public.collections WHERE slug = 'clearance-sale'), a);

-- Product 10: WiFi Router AC1200
INSERT INTO public.products (slug, name, avg_rating, reviews_count, is_free_shipping)
VALUES ('wifi-router-ac1200', 'WiFi Router AC1200 Dual Band', 4.7, 345, TRUE)
RETURNING id INTO a;
INSERT INTO public.product_variants (product_id, sku, price, compare_at_price) VALUES (a, 'FS2-WIFI-AC1200', 1490, 2980);
INSERT INTO public.product_images (product_id, url, position) VALUES (a, '/assets/wifi-router-ac1200.jpg', 0);
INSERT INTO public.collection_products (collection_id, product_id) VALUES ((SELECT id FROM public.collections WHERE slug = 'clearance-sale'), a);

-- Product 11: 24-Port Managed Switch
INSERT INTO public.products (slug, name, avg_rating, reviews_count, is_free_shipping)
VALUES ('24-port-managed-switch', '24-Port Managed Switch Gigabit', 4.5, 167, TRUE)
RETURNING id INTO a;
INSERT INTO public.product_variants (product_id, sku, price, compare_at_price) VALUES (a, 'FS3-SW-MAN-24', 1945, 3890);
INSERT INTO public.product_images (product_id, url, position) VALUES (a, '/assets/switch-24port.jpg', 0);
INSERT INTO public.collection_products (collection_id, product_id) VALUES ((SELECT id FROM public.collections WHERE slug = 'clearance-sale'), a);

-- Product 12: CAT5E UTP Cable LSZH
INSERT INTO public.products (slug, name, avg_rating, reviews_count, is_free_shipping)
VALUES ('cat5e-utp-lszh-305m', 'CAT5E UTP Cable LSZH 305m', 4.8, 456, TRUE)
RETURNING id INTO a;
INSERT INTO public.product_variants (product_id, sku, price, compare_at_price) VALUES (a, 'FS4-CAT5E-LSZH', 1297, 2594);
INSERT INTO public.product_images (product_id, url, position) VALUES (a, '/assets/lan-cat5e-lszh.jpg', 0);
INSERT INTO public.collection_products (collection_id, product_id) VALUES ((SELECT id FROM public.collections WHERE slug = 'clearance-sale'), a);

END $$;


-- == LINK PRODUCTS TO CATEGORIES (Example) ==
INSERT INTO public.product_categories (product_id, category_id) VALUES
((SELECT id FROM public.products WHERE slug = 'fiber-optic-cable-sm-305m'), (SELECT id FROM public.categories WHERE slug = 'fiber-optic')),
((SELECT id FROM public.products WHERE slug = 'rg6-coaxial-cable-305m'), (SELECT id FROM public.categories WHERE slug = 'coaxial')),
((SELECT id FROM public.products WHERE slug = 'us-9035-cat5e-utp-305m'), (SELECT id FROM public.categories WHERE slug = 'lan-utp')),
((SELECT id FROM public.products WHERE slug = '24-port-gigabit-switch'), (SELECT id FROM public.categories WHERE slug = 'networking'));


-- == LINK PRODUCTS TO "RECOMMENDED" COLLECTION ==
INSERT INTO public.collection_products (collection_id, product_id)
SELECT
    (SELECT id FROM public.collections WHERE slug = 'recommended-products'),
    p.id
FROM public.products p
WHERE p.slug IN (
    'fiber-optic-cable-sm-305m',
    '24-port-gigabit-switch',
    'rg6-coaxial-cable-305m',
    'solar-cable-4mm-100m',
    'telephone-cable-4pair-305m',
    'server-rack-42u',
    'us-9035-cat5e-utp-305m',
    'ut-0216-media-converter'
);