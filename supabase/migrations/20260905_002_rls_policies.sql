-- ============================================================================
-- Rotaract Business Network — Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rotaract_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderator_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_deactivation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Helper Security Functions (SECURITY DEFINER to avoid recursion)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_moderator()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('moderator', 'super_admin') AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_moderator_for_district(target_district INTEGER)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.is_super_admin() OR EXISTS (
        SELECT 1 FROM public.moderator_assignments ma
        JOIN public.profiles p ON p.id = ma.moderator_id
        WHERE ma.moderator_id = auth.uid()
          AND ma.district_number = target_district
          AND p.is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_business_owner(target_business_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.businesses
        WHERE id = target_business_id AND owner_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ============================================================================
-- 1. Profiles Policies
-- ============================================================================
CREATE POLICY "Public profiles are readable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Super admins have full profile management"
ON public.profiles FOR ALL
USING (public.is_super_admin());

-- ============================================================================
-- 2. Rotaract Profiles Policies
-- ============================================================================
CREATE POLICY "Rotaract profiles are readable by everyone"
ON public.rotaract_profiles FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own rotaract profile"
ON public.rotaract_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own rotaract profile"
ON public.rotaract_profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Super admins have full rotaract profile access"
ON public.rotaract_profiles FOR ALL
USING (public.is_super_admin());

-- ============================================================================
-- 3. Moderator Assignments Policies
-- ============================================================================
CREATE POLICY "Moderator assignments are readable by authenticated users"
ON public.moderator_assignments FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Super admins can manage moderator assignments"
ON public.moderator_assignments FOR ALL
USING (public.is_super_admin());

-- ============================================================================
-- 4. Categories Policies
-- ============================================================================
CREATE POLICY "Active categories are readable by everyone"
ON public.categories FOR SELECT
USING (is_active = true OR public.is_super_admin());

CREATE POLICY "Super admins can manage categories"
ON public.categories FOR ALL
USING (public.is_super_admin());

-- ============================================================================
-- 5. Businesses Policies
-- ============================================================================
CREATE POLICY "Approved businesses are readable by everyone"
ON public.businesses FOR SELECT
USING (
    status = 'approved'
    OR auth.uid() = owner_id
    OR public.is_moderator_for_district(district_number)
    OR public.is_super_admin()
);

CREATE POLICY "Users can insert their own businesses"
ON public.businesses FOR INSERT
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners and Admins can update businesses"
ON public.businesses FOR UPDATE
USING (
    auth.uid() = owner_id
    OR public.is_moderator_for_district(district_number)
    OR public.is_super_admin()
)
WITH CHECK (
    auth.uid() = owner_id
    OR public.is_moderator_for_district(district_number)
    OR public.is_super_admin()
);

CREATE POLICY "Owners and Super Admins can delete businesses"
ON public.businesses FOR DELETE
USING (auth.uid() = owner_id OR public.is_super_admin());

-- ============================================================================
-- 6. Business Locations & Contacts Policies
-- ============================================================================
CREATE POLICY "Locations readable with business visibility"
ON public.business_locations FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.businesses b
        WHERE b.id = business_locations.business_id
          AND (b.status = 'approved' OR b.owner_id = auth.uid() OR public.is_moderator_for_district(b.district_number) OR public.is_super_admin())
    )
);

CREATE POLICY "Owners and Admins can manage business locations"
ON public.business_locations FOR ALL
USING (public.is_business_owner(business_id) OR public.is_super_admin())
WITH CHECK (public.is_business_owner(business_id) OR public.is_super_admin());

CREATE POLICY "Contacts readable with business visibility"
ON public.business_contacts FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.businesses b
        WHERE b.id = business_contacts.business_id
          AND (b.status = 'approved' OR b.owner_id = auth.uid() OR public.is_moderator_for_district(b.district_number) OR public.is_super_admin())
    )
);

CREATE POLICY "Owners and Admins can manage business contacts"
ON public.business_contacts FOR ALL
USING (public.is_business_owner(business_id) OR public.is_super_admin())
WITH CHECK (public.is_business_owner(business_id) OR public.is_super_admin());

-- ============================================================================
-- 7. Products & Services & Product Images Policies
-- ============================================================================
CREATE POLICY "Products readable with business visibility"
ON public.products_services FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.businesses b
        WHERE b.id = products_services.business_id
          AND (b.status = 'approved' OR b.owner_id = auth.uid() OR public.is_moderator_for_district(b.district_number) OR public.is_super_admin())
    )
);

CREATE POLICY "Owners and Admins can manage products"
ON public.products_services FOR ALL
USING (public.is_business_owner(business_id) OR public.is_super_admin())
WITH CHECK (public.is_business_owner(business_id) OR public.is_super_admin());

CREATE POLICY "Product images readable with product visibility"
ON public.product_images FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.products_services ps
        JOIN public.businesses b ON b.id = ps.business_id
        WHERE ps.id = product_images.product_id
          AND (b.status = 'approved' OR b.owner_id = auth.uid() OR public.is_moderator_for_district(b.district_number) OR public.is_super_admin())
    )
);

CREATE POLICY "Owners and Admins can manage product images"
ON public.product_images FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.products_services ps
        WHERE ps.id = product_images.product_id AND (public.is_business_owner(ps.business_id) OR public.is_super_admin())
    )
);

-- ============================================================================
-- 8. Verification Documents Policies (Strict Access)
-- ============================================================================
CREATE POLICY "Verification docs visible to owner, district mod, and admin"
ON public.verification_documents FOR SELECT
USING (
    public.is_business_owner(business_id)
    OR EXISTS (
        SELECT 1 FROM public.businesses b
        WHERE b.id = verification_documents.business_id AND public.is_moderator_for_district(b.district_number)
    )
    OR public.is_super_admin()
);

CREATE POLICY "Owners can submit verification docs"
ON public.verification_documents FOR INSERT
WITH CHECK (public.is_business_owner(business_id));

CREATE POLICY "Moderators and Admins can update verification doc status"
ON public.verification_documents FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.businesses b
        WHERE b.id = verification_documents.business_id AND public.is_moderator_for_district(b.district_number)
    )
    OR public.is_super_admin()
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.businesses b
        WHERE b.id = verification_documents.business_id AND public.is_moderator_for_district(b.district_number)
    )
    OR public.is_super_admin()
);

-- ============================================================================
-- 9. Enquiries Policies
-- ============================================================================
CREATE POLICY "Anyone can submit an enquiry"
ON public.enquiries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Business owners and admins can read their enquiries"
ON public.enquiries FOR SELECT
USING (public.is_business_owner(business_id) OR public.is_super_admin());

CREATE POLICY "Business owners and admins can update enquiry status"
ON public.enquiries FOR UPDATE
USING (public.is_business_owner(business_id) OR public.is_super_admin())
WITH CHECK (public.is_business_owner(business_id) OR public.is_super_admin());

-- ============================================================================
-- 10. Deactivation Requests Policies
-- ============================================================================
CREATE POLICY "Moderators and Admins can view deactivation requests"
ON public.business_deactivation_requests FOR SELECT
USING (public.is_moderator_for_district(district_number) OR public.is_super_admin());

CREATE POLICY "Moderators can submit deactivation requests for their district"
ON public.business_deactivation_requests FOR INSERT
WITH CHECK (public.is_moderator_for_district(district_number));

CREATE POLICY "Super Admins can update deactivation request status"
ON public.business_deactivation_requests FOR UPDATE
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

-- ============================================================================
-- 11. Admin Audit Logs Policies
-- ============================================================================
CREATE POLICY "Admins and Moderators can view audit logs"
ON public.admin_audit_logs FOR SELECT
USING (public.is_moderator() OR public.is_super_admin());

CREATE POLICY "Authenticated users can create audit logs"
ON public.admin_audit_logs FOR INSERT
WITH CHECK (auth.role() = 'authenticated');
