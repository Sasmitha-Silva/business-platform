-- ============================================================================
-- Rotaract Business Network — Database Reset Script
-- Clears all mock/seed businesses, transactions, documents, and owner users
-- Restores standard industry categories and keeps Super Admin ready for manual UI entry
-- ============================================================================

-- 1. Truncate / Clear all platform application tables (CASCADE)
TRUNCATE TABLE 
  public.admin_audit_logs,
  public.business_deactivation_requests,
  public.enquiries,
  public.verification_documents,
  public.product_images,
  public.products_services,
  public.business_contacts,
  public.business_locations,
  public.businesses,
  public.moderator_assignments,
  public.rotaract_profiles,
  public.profiles
CASCADE;

-- 2. Clear Auth Users (except super_admin)
DELETE FROM auth.users WHERE email != 'admin@rotaractnetwork.org';

-- 3. Ensure Super Admin Account exists (Password: Admin@123456)
DO $$
DECLARE
  super_admin_id UUID := '00000000-0000-0000-0000-000000000001';
BEGIN
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) VALUES (
    super_admin_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'admin@rotaractnetwork.org',
    crypt('Admin@123456', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Super Administrator","role":"super_admin"}',
    NOW(), NOW()
  ) ON CONFLICT (id) DO UPDATE
  SET encrypted_password = crypt('Admin@123456', gen_salt('bf')),
      raw_user_meta_data = '{"full_name":"Super Administrator","role":"super_admin"}';

  INSERT INTO public.profiles (id, email, full_name, role, is_active)
  VALUES (super_admin_id, 'admin@rotaractnetwork.org', 'Super Administrator', 'super_admin', true)
  ON CONFLICT (id) DO UPDATE SET role = 'super_admin', is_active = true;
END $$;

-- 4. Re-apply Safe Auth User Sync Trigger (Prevents "DB error saving new user")
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role, is_active)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'owner'::public.user_role),
        true
    )
    ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        updated_at = NOW();
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'handle_new_user exception: %', SQLERRM;
        RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Restore Base Categories & Subcategories for Registration Forms
INSERT INTO public.categories (id, name, slug, parent_id, icon, is_active, sort_order)
VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Manufacturing', 'manufacturing', NULL, 'Factory', true, 1),
  ('c1000000-0000-0000-0000-000000000002', 'Retail', 'retail', NULL, 'ShoppingBag', true, 2),
  ('c1000000-0000-0000-0000-000000000003', 'Professional Services', 'professional-services', NULL, 'Briefcase', true, 3),
  ('c1000000-0000-0000-0000-000000000004', 'Technology', 'technology', NULL, 'Cpu', true, 4),
  ('c1000000-0000-0000-0000-000000000005', 'Healthcare', 'healthcare', NULL, 'Heart', true, 5),
  ('c1000000-0000-0000-0000-000000000006', 'Education', 'education', NULL, 'GraduationCap', true, 6),
  ('c1000000-0000-0000-0000-000000000007', 'Hospitality', 'hospitality', NULL, 'UtensilsCrossed', true, 7),
  ('c1000000-0000-0000-0000-000000000008', 'Real Estate & Construction', 'real-estate-construction', NULL, 'Building', true, 8)
ON CONFLICT (slug) DO UPDATE
SET id = EXCLUDED.id, name = EXCLUDED.name, icon = EXCLUDED.icon, sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (id, name, slug, parent_id, icon, is_active, sort_order)
VALUES
  -- Manufacturing
  ('c2000000-0000-0000-0000-000000000001', 'Textile & Garments', 'textile-garments', 'c1000000-0000-0000-0000-000000000001', NULL, true, 1),
  ('c2000000-0000-0000-0000-000000000002', 'Machinery', 'machinery', 'c1000000-0000-0000-0000-000000000001', NULL, true, 2),
  ('c2000000-0000-0000-0000-000000000003', 'Printing', 'printing', 'c1000000-0000-0000-0000-000000000001', NULL, true, 3),
  ('c2000000-0000-0000-0000-000000000004', 'Packaging', 'packaging', 'c1000000-0000-0000-0000-000000000001', NULL, true, 4),
  ('c2000000-0000-0000-0000-000000000005', 'Furniture', 'furniture', 'c1000000-0000-0000-0000-000000000001', NULL, true, 5),
  ('c2000000-0000-0000-0000-000000000006', 'Electronics (Mfg)', 'electronics-mfg', 'c1000000-0000-0000-0000-000000000001', NULL, true, 6),
  ('c2000000-0000-0000-0000-000000000007', 'Food Manufacturing', 'food-manufacturing', 'c1000000-0000-0000-0000-000000000001', NULL, true, 7),

  -- Retail
  ('c2000000-0000-0000-0000-000000000008', 'Fashion', 'fashion', 'c1000000-0000-0000-0000-000000000002', NULL, true, 1),
  ('c2000000-0000-0000-0000-000000000009', 'Grocery', 'grocery', 'c1000000-0000-0000-0000-000000000002', NULL, true, 2),
  ('c2000000-0000-0000-0000-000000000010', 'Gifts', 'gifts', 'c1000000-0000-0000-0000-000000000002', NULL, true, 3),
  ('c2000000-0000-0000-0000-000000000011', 'Jewelry', 'jewelry', 'c1000000-0000-0000-0000-000000000002', NULL, true, 4),
  ('c2000000-0000-0000-0000-000000000012', 'Electronics (Retail)', 'electronics-retail', 'c1000000-0000-0000-0000-000000000002', NULL, true, 5),

  -- Professional Services
  ('c2000000-0000-0000-0000-000000000013', 'CA & Tax Consulting', 'ca-tax', 'c1000000-0000-0000-0000-000000000003', NULL, true, 1),
  ('c2000000-0000-0000-0000-000000000014', 'Legal', 'legal', 'c1000000-0000-0000-0000-000000000003', NULL, true, 2),
  ('c2000000-0000-0000-0000-000000000015', 'Business Consultancy', 'consultancy', 'c1000000-0000-0000-0000-000000000003', NULL, true, 3),
  ('c2000000-0000-0000-0000-000000000016', 'Human Resources (HR)', 'hr', 'c1000000-0000-0000-0000-000000000003', NULL, true, 4),
  ('c2000000-0000-0000-0000-000000000017', 'Marketing & Branding', 'marketing', 'c1000000-0000-0000-0000-000000000003', NULL, true, 5),
  ('c2000000-0000-0000-0000-000000000018', 'IT Services', 'it-services', 'c1000000-0000-0000-0000-000000000003', NULL, true, 6),

  -- Technology
  ('c2000000-0000-0000-0000-000000000019', 'Software Development', 'software-development', 'c1000000-0000-0000-0000-000000000004', NULL, true, 1),
  ('c2000000-0000-0000-0000-000000000020', 'AI & Machine Learning', 'ai-ml', 'c1000000-0000-0000-0000-000000000004', NULL, true, 2),
  ('c2000000-0000-0000-0000-000000000021', 'SaaS Products', 'saas', 'c1000000-0000-0000-0000-000000000004', NULL, true, 3),
  ('c2000000-0000-0000-0000-000000000022', 'Web Development', 'web-development', 'c1000000-0000-0000-0000-000000000004', NULL, true, 4),
  ('c2000000-0000-0000-0000-000000000023', 'Mobile App Development', 'app-development', 'c1000000-0000-0000-0000-000000000004', NULL, true, 5),

  -- Healthcare
  ('c2000000-0000-0000-0000-000000000024', 'Hospitals', 'hospitals', 'c1000000-0000-0000-0000-000000000005', NULL, true, 1),
  ('c2000000-0000-0000-0000-000000000025', 'Clinics & Practices', 'clinics', 'c1000000-0000-0000-0000-000000000005', NULL, true, 2),
  ('c2000000-0000-0000-0000-000000000026', 'Diagnostics & Labs', 'diagnostics', 'c1000000-0000-0000-0000-000000000005', NULL, true, 3),
  ('c2000000-0000-0000-0000-000000000027', 'Pharmacy', 'pharmacy', 'c1000000-0000-0000-0000-000000000005', NULL, true, 4),

  -- Education
  ('c2000000-0000-0000-0000-000000000028', 'Schools & Colleges', 'schools', 'c1000000-0000-0000-0000-000000000006', NULL, true, 1),
  ('c2000000-0000-0000-0000-000000000029', 'Coaching & Tutoring', 'coaching', 'c1000000-0000-0000-0000-000000000006', NULL, true, 2),
  ('c2000000-0000-0000-0000-000000000030', 'Corporate Training', 'training', 'c1000000-0000-0000-0000-000000000006', NULL, true, 3),
  ('c2000000-0000-0000-0000-000000000031', 'EdTech Platforms', 'edtech', 'c1000000-0000-0000-0000-000000000006', NULL, true, 4),

  -- Hospitality
  ('c2000000-0000-0000-0000-000000000032', 'Hotels & Resorts', 'hotels', 'c1000000-0000-0000-0000-000000000007', NULL, true, 1),
  ('c2000000-0000-0000-0000-000000000033', 'Restaurants & Cafes', 'restaurants', 'c1000000-0000-0000-0000-000000000007', NULL, true, 2),
  ('c2000000-0000-0000-0000-000000000034', 'Catering Services', 'catering', 'c1000000-0000-0000-0000-000000000007', NULL, true, 3),
  ('c2000000-0000-0000-0000-000000000035', 'Event Management', 'event-management', 'c1000000-0000-0000-0000-000000000007', NULL, true, 4),

  -- Real Estate & Construction
  ('c2000000-0000-0000-0000-000000000036', 'Builders & Developers', 'builders', 'c1000000-0000-0000-0000-000000000008', NULL, true, 1),
  ('c2000000-0000-0000-0000-000000000037', 'Architects & Planners', 'architects', 'c1000000-0000-0000-0000-000000000008', NULL, true, 2),
  ('c2000000-0000-0000-0000-000000000038', 'Interior Design', 'interior-design', 'c1000000-0000-0000-0000-000000000008', NULL, true, 3),
  ('c2000000-0000-0000-0000-000000000039', 'Construction Materials', 'construction-materials', 'c1000000-0000-0000-0000-000000000008', NULL, true, 4)
ON CONFLICT (slug) DO UPDATE
SET id = EXCLUDED.id, name = EXCLUDED.name, parent_id = EXCLUDED.parent_id, sort_order = EXCLUDED.sort_order;
