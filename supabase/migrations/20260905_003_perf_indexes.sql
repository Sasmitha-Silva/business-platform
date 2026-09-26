-- ============================================================================
-- Rotaract Business Network — Performance Optimization & Database Indexes
-- ============================================================================

-- 1. Businesses Table Indexes
CREATE INDEX IF NOT EXISTS idx_businesses_status_created_at ON public.businesses (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_businesses_district_status ON public.businesses (district_number, status);
CREATE INDEX IF NOT EXISTS idx_businesses_owner_created ON public.businesses (owner_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_businesses_verification_level ON public.businesses (verification_level, status);

-- 2. Moderator Assignments Table Indexes
CREATE INDEX IF NOT EXISTS idx_mod_assignments_district ON public.moderator_assignments (district_number, assigned_at DESC);
CREATE INDEX IF NOT EXISTS idx_mod_assignments_moderator ON public.moderator_assignments (moderator_id);

-- 3. Verification Documents Table Indexes
CREATE INDEX IF NOT EXISTS idx_verification_docs_status_created ON public.verification_documents (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_verification_docs_biz_status ON public.verification_documents (business_id, status);

-- 4. Business Deactivation Requests Indexes
CREATE INDEX IF NOT EXISTS idx_deact_requests_status_created ON public.business_deactivation_requests (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_deact_requests_district ON public.business_deactivation_requests (district_number, status);

-- 5. Profiles & Rotaract Profiles Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role_created ON public.profiles (role, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);
CREATE INDEX IF NOT EXISTS idx_rotaract_profiles_club_district ON public.rotaract_profiles (club_name, district_number);

-- 6. Enquiries Table Indexes
CREATE INDEX IF NOT EXISTS idx_enquiries_biz_created ON public.enquiries (business_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);
