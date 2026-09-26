-- ============================================================================
-- Rotaract Business Network — Initial PostgreSQL Schema Migration
-- Compatible with Supabase (PostgreSQL 15+)
-- ============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. Custom ENUM Types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('super_admin', 'moderator', 'owner', 'public');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE business_status AS ENUM ('draft', 'pending_review', 'approved', 'rejected', 'suspended');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_doc_type AS ENUM ('gst', 'drr', 'udyam');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_doc_status AS ENUM ('pending', 'in_review', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE product_service_type AS ENUM ('product', 'service');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE service_area AS ENUM ('local', 'state', 'nationwide', 'international');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE business_type AS ENUM ('manufacturer', 'trader', 'service_provider', 'exporter', 'importer', 'franchise');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE enquiry_status AS ENUM ('new', 'read', 'replied');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE deactivation_reason_category AS ENUM (
      'inactivity',
      'policy_violation',
      'fraudulent_info',
      'ceased_operations',
      'unresponsive',
      'other'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE deactivation_urgency AS ENUM ('low', 'medium', 'high', 'critical');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE deactivation_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Utility Trigger for Auto-Updating updated_at
CREATE OR REPLACE FUNCTION set_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 4. Tables
-- ============================================================================

-- 4.1. Profiles (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'owner',
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();

-- 4.2. Rotaract Member Credentials
CREATE TABLE IF NOT EXISTS public.rotaract_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    club_name TEXT NOT NULL,
    district_number INTEGER NOT NULL,
    rotary_id TEXT,
    designation TEXT,
    years_in_rotaract INTEGER NOT NULL DEFAULT 1,
    is_active_member BOOLEAN NOT NULL DEFAULT true,
    is_alumni BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_rotaract_profiles_updated_at
BEFORE UPDATE ON public.rotaract_profiles
FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();

-- 4.3. Moderator District Assignments
CREATE TABLE IF NOT EXISTS public.moderator_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    moderator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    district_number INTEGER NOT NULL,
    assigned_by UUID NOT NULL REFERENCES public.profiles(id),
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_moderator_district UNIQUE (moderator_id, district_number)
);

-- 4.4. Industry Categories & Subcategories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    parent_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    icon TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();

-- 4.5. Businesses Directory Entity
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    legal_name TEXT,
    brand_name TEXT,
    category_id UUID NOT NULL REFERENCES public.categories(id),
    subcategory_id UUID REFERENCES public.categories(id),
    business_type business_type[] NOT NULL DEFAULT '{service_provider}',
    year_established INTEGER,
    description TEXT NOT NULL,
    tagline TEXT,
    logo_url TEXT,
    cover_image_url TEXT,
    status business_status NOT NULL DEFAULT 'draft',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_women_owned BOOLEAN NOT NULL DEFAULT false,
    is_startup BOOLEAN NOT NULL DEFAULT false,
    online_delivery BOOLEAN NOT NULL DEFAULT false,
    franchise_available BOOLEAN NOT NULL DEFAULT false,
    verification_level INTEGER NOT NULL DEFAULT 0 CHECK (verification_level BETWEEN 0 AND 3),
    district_number INTEGER NOT NULL,
    view_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_businesses_updated_at
BEFORE UPDATE ON public.businesses
FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();

-- 4.6. Business Locations (1:1)
CREATE TABLE IF NOT EXISTS public.business_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
    country TEXT NOT NULL DEFAULT 'Sri Lanka',
    state TEXT NOT NULL DEFAULT 'Western',
    district TEXT NOT NULL DEFAULT 'Colombo',
    city TEXT NOT NULL,
    area TEXT,
    address TEXT NOT NULL,
    pincode TEXT,
    maps_link TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_business_locations_updated_at
BEFORE UPDATE ON public.business_locations
FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();

-- 4.7. Business Contacts & Social Links (1:1)
CREATE TABLE IF NOT EXISTS public.business_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
    mobile TEXT NOT NULL,
    alt_mobile TEXT,
    email TEXT NOT NULL,
    website TEXT,
    whatsapp TEXT,
    social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_business_contacts_updated_at
BEFORE UPDATE ON public.business_contacts
FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();

-- 4.8. Products & Services Catalog
CREATE TABLE IF NOT EXISTS public.products_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type product_service_type NOT NULL DEFAULT 'service',
    category_id UUID REFERENCES public.categories(id),
    description TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    price_from NUMERIC(12, 2),
    service_area service_area NOT NULL DEFAULT 'local',
    brochure_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_products_services_updated_at
BEFORE UPDATE ON public.products_services
FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();

-- 4.9. Product Images
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products_services(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4.10. Verification Documents (Private Storage in Cloudflare R2)
CREATE TABLE IF NOT EXISTS public.verification_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    doc_type verification_doc_type NOT NULL,
    file_key TEXT NOT NULL, -- S3/R2 storage key
    file_name TEXT NOT NULL, -- original file name
    file_size INTEGER, -- size in bytes
    mime_type TEXT,
    status verification_doc_status NOT NULL DEFAULT 'pending',
    claimed_by UUID REFERENCES public.profiles(id),
    claimed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_verification_documents_updated_at
BEFORE UPDATE ON public.verification_documents
FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();

-- 4.11. Customer Enquiries & Leads
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    from_name TEXT NOT NULL,
    from_contact TEXT NOT NULL,
    from_organization TEXT,
    service_requested TEXT,
    message TEXT NOT NULL,
    status enquiry_status NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_enquiries_updated_at
BEFORE UPDATE ON public.enquiries
FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();

-- 4.12. Business Deactivation Requests (Moderator Escalation)
CREATE TABLE IF NOT EXISTS public.business_deactivation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    moderator_id UUID NOT NULL REFERENCES public.profiles(id),
    district_number INTEGER NOT NULL,
    reason_category deactivation_reason_category NOT NULL,
    reason_details TEXT NOT NULL,
    evidence_notes TEXT,
    urgency deactivation_urgency NOT NULL DEFAULT 'medium',
    status deactivation_status NOT NULL DEFAULT 'pending',
    admin_notes TEXT,
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_deactivation_requests_updated_at
BEFORE UPDATE ON public.business_deactivation_requests
FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();

-- 4.13. Admin Audit & Security Logs
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID NOT NULL REFERENCES public.profiles(id),
    actor_role TEXT NOT NULL,
    action_type TEXT NOT NULL,
    target_table TEXT NOT NULL,
    target_id UUID NOT NULL,
    target_name TEXT NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 5. Indexes for Performance & Search
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_businesses_status_district ON public.businesses (status, district_number);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON public.businesses (category_id, subcategory_id);
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON public.businesses (slug);
CREATE INDEX IF NOT EXISTS idx_businesses_owner ON public.businesses (owner_id);
CREATE INDEX IF NOT EXISTS idx_businesses_verification ON public.businesses (verification_level);
CREATE INDEX IF NOT EXISTS idx_businesses_featured ON public.businesses (is_featured) WHERE is_featured = true;

-- GIN Trigram Search Index
CREATE INDEX IF NOT EXISTS idx_businesses_search_trgm ON public.businesses USING gin (
    (name || ' ' || COALESCE(tagline, '') || ' ' || COALESCE(description, '')) gin_trgm_ops
);

CREATE INDEX IF NOT EXISTS idx_locations_city_district ON public.business_locations (lower(city), lower(district));
CREATE INDEX IF NOT EXISTS idx_verification_docs_business ON public.verification_documents (business_id, status);
CREATE INDEX IF NOT EXISTS idx_enquiries_business ON public.enquiries (business_id, status);
CREATE INDEX IF NOT EXISTS idx_deactivation_requests_status ON public.business_deactivation_requests (status, district_number);

-- ============================================================================
-- 6. Helper RPC Functions
-- ============================================================================

-- Atomically Increment Business Impressions / Views
CREATE OR REPLACE FUNCTION public.increment_business_views(target_slug TEXT)
RETURNS void AS $$
BEGIN
    UPDATE public.businesses
    SET view_count = view_count + 1
    WHERE slug = target_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Auto Create Profile On Supabase Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'owner')
    )
    ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to sync auth.users to public.profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
