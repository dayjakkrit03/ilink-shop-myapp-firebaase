-- This script creates the wishlist_items table to store user's liked products.
-- It includes foreign key constraints to link with users and products tables.

CREATE TABLE public.wishlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    product_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Foreign key to the users table.
    -- IMPORTANT: This assumes you have a 'users' table in the 'public' schema.
    -- If your users table is named differently or is in another schema, please adjust this line.
    CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
        REFERENCES public.users(id) 
        ON DELETE CASCADE,
        
    -- Foreign key to the products table
    CONSTRAINT fk_product 
        FOREIGN KEY(product_id) 
        REFERENCES public.products(id) 
        ON DELETE CASCADE,
        
    -- Ensure a user can only like a product once
    UNIQUE (user_id, product_id)
);

-- Optional: Add comments for better documentation
COMMENT ON TABLE public.wishlist_items IS 'Stores items that users have added to their wishlist.';
COMMENT ON COLUMN public.wishlist_items.user_id IS 'Foreign key to the public.users table.';
COMMENT ON COLUMN public.wishlist_items.product_id IS 'Foreign key to the public.products table.';