-- ============================================================================
-- Rotaract Business Network — Complete Performance & Fast Directory Indexes
-- Run this in Supabase SQL Editor for instant indexing across all tables.
-- ============================================================================

-- 1. Enable pg_trgm extension for blazing fast fuzzy & substring searches
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. GIN Trigram Search Indexes for instant text searches on directory
CREATE INDEX IF NOT EXISTS idx_businesses_name_trgm ON public.businesses USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_businesses_tagline_trgm ON public.businesses USING gin (tagline gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_businesses_desc_trgm ON public.businesses USING gin (description gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON public.businesses (slug);

-- 3. Composite & Partial Indexes for Live Approved Directory Queries
CREATE INDEX IF NOT EXISTS idx_businesses_approved_rank ON public.businesses (is_featured DESC, verification_level DESC, created_at DESC) WHERE status = 'approved';
CREATE INDEX IF NOT EXISTS idx_businesses_approved_cats ON public.businesses (category_id, subcategory_id) WHERE status = 'approved';
CREATE INDEX IF NOT EXISTS idx_businesses_approved_dist ON public.businesses (district_number) WHERE status = 'approved';
CREATE INDEX IF NOT EXISTS idx_businesses_approved_year ON public.businesses (year_established ASC) WHERE status = 'approved';
CREATE INDEX IF NOT EXISTS idx_businesses_approved_flags ON public.businesses (is_women_owned, is_startup, online_delivery, franchise_available) WHERE status = 'approved';

-- 4. Fast Join Foreign Key Indexes on Related Tables
CREATE INDEX IF NOT EXISTS idx_biz_locations_biz_id ON public.business_locations (business_id);
CREATE INDEX IF NOT EXISTS idx_biz_locations_city ON public.business_locations (city);
CREATE INDEX IF NOT EXISTS idx_biz_contacts_biz_id ON public.business_contacts (business_id);
CREATE INDEX IF NOT EXISTS idx_products_services_biz_id ON public.products_services (business_id);
CREATE INDEX IF NOT EXISTS idx_product_images_prod_id ON public.product_images (product_id);

-- 5. User Profiles & Rotaract District Profiles
CREATE INDEX IF NOT EXISTS idx_profiles_user_role ON public.profiles (id, role, is_active);
CREATE INDEX IF NOT EXISTS idx_rotaract_profiles_user_id ON public.rotaract_profiles (user_id);
CREATE INDEX IF NOT EXISTS idx_rotaract_profiles_district ON public.rotaract_profiles (district_number);

-- 6. Categories Taxonomy Index
CREATE INDEX IF NOT EXISTS idx_categories_parent_active ON public.categories (parent_id, is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories (slug);

-- 7. Audit & Verification Document Indexes
CREATE INDEX IF NOT EXISTS idx_verification_docs_biz_id ON public.verification_documents (business_id);
CREATE INDEX IF NOT EXISTS idx_mod_assignments_mod_dist ON public.moderator_assignments (moderator_id, district_number);
