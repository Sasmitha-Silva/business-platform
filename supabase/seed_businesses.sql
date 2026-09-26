-- ============================================================================
-- Rotaract Business Network — Complete Seed Script (Categories + Admin + 15 Enterprises)
-- ============================================================================

-- 1. Insert Root Categories
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

-- 2. Insert Subcategories
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

-- 3. Create Super Admin User (Password: Admin@123456) & 15 Business Owners
DO $$
DECLARE
  super_admin_id UUID := '00000000-0000-0000-0000-000000000001';
BEGIN
  -- Insert Super Admin Auth User (Password: Admin@123456)
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
  SET raw_user_meta_data = '{"full_name":"Super Administrator","role":"super_admin"}';

  -- Upsert Super Admin Profile
  INSERT INTO public.profiles (id, email, full_name, role, is_active)
  VALUES (super_admin_id, 'admin@rotaractnetwork.org', 'Super Administrator', 'super_admin', true)
  ON CONFLICT (id) DO UPDATE SET role = 'super_admin', is_active = true;

  -- Create 15 Business Owners (Password: Rotaract@2026)
  FOR i IN 1..15 LOOP
    DECLARE
      u_id UUID := ('00000000-0000-0000-0000-0000000000' || LPAD((i + 10)::text, 2, '0'))::UUID;
      u_email TEXT := 'owner' || i || '@rotaractnetwork.org';
      u_name TEXT := CASE i
        WHEN 1 THEN 'Rtr. Anand Vardhan Sharma'
        WHEN 2 THEN 'Rtr. Sarah Chen'
        WHEN 3 THEN 'Rtr. Marcus Vance'
        WHEN 4 THEN 'Rtr. Dr. Ayesha Perera'
        WHEN 5 THEN 'Rtr. Rahul Deshmukh'
        WHEN 6 THEN 'Rtr. Kanishka Fernando'
        WHEN 7 THEN 'Rtr. Priya Sundaram'
        WHEN 8 THEN 'Rtr. David O''Connor'
        WHEN 9 THEN 'Rtr. Natasha Jayawardena'
        WHEN 10 THEN 'Rtr. Vikram Malhotra'
        WHEN 11 THEN 'Rtr. Elena Rostova'
        WHEN 12 THEN 'Rtr. Tariq Mansoor'
        WHEN 13 THEN 'Rtr. Samantha Wickramasinghe'
        WHEN 14 THEN 'Rtr. Rohan Senanayake'
        WHEN 15 THEN 'Rtr. Fatima Al-Mansoor'
      END;
      u_club TEXT := CASE i
        WHEN 1 THEN 'Rotaract Club of Colombo Central'
        WHEN 2 THEN 'Rotaract Club of Mumbai Downtown'
        WHEN 3 THEN 'Rotaract Club of Kandy'
        WHEN 4 THEN 'Rotaract Club of Colombo Millennium'
        WHEN 5 THEN 'Rotaract Club of Pune North'
        WHEN 6 THEN 'Rotaract Club of University of Moratuwa'
        WHEN 7 THEN 'Rotaract Club of Chennai Mid Town'
        WHEN 8 THEN 'Rotaract Club of Colombo West'
        WHEN 9 THEN 'Rotaract Club of Colombo Midtown'
        WHEN 10 THEN 'Rotaract Club of Delhi Central'
        WHEN 11 THEN 'Rotaract Club of Nicosia'
        WHEN 12 THEN 'Rotaract Club of Dubai Emirates'
        WHEN 13 THEN 'Rotaract Club of Negombo'
        WHEN 14 THEN 'Rotaract Club of Colombo Uptown'
        ELSE 'Rotaract Club of Colombo North'
      END;
      u_dist INTEGER := CASE i
        WHEN 2 THEN 3141
        WHEN 5 THEN 3131
        WHEN 7 THEN 3232
        WHEN 10 THEN 3011
        WHEN 11 THEN 2452
        WHEN 12 THEN 2452
        ELSE 3220
      END;
    BEGIN
      INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        raw_app_meta_data, raw_user_meta_data, created_at, updated_at
      ) VALUES (
        u_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        u_email,
        crypt('Rotaract@2026', gen_salt('bf')),
        NOW(),
        '{"provider":"email","providers":["email"]}',
        jsonb_build_object('full_name', u_name, 'role', 'owner'),
        NOW(), NOW()
      ) ON CONFLICT (id) DO UPDATE SET raw_user_meta_data = jsonb_build_object('full_name', u_name, 'role', 'owner');

      INSERT INTO public.profiles (id, email, full_name, role, is_active)
      VALUES (u_id, u_email, u_name, 'owner', true)
      ON CONFLICT (id) DO UPDATE SET full_name = u_name, is_active = true;

      INSERT INTO public.rotaract_profiles (user_id, club_name, district_number, rotary_id, designation)
      VALUES (u_id, u_club, u_dist, 'RI-' || (987650 + i)::text, 'Active Member')
      ON CONFLICT (user_id) DO UPDATE SET club_name = u_club, district_number = u_dist;
    END;
  END LOOP;
END $$;

-- 4. Insert 15 Businesses
INSERT INTO public.businesses (
  id, owner_id, name, slug, tagline, description, category_id, subcategory_id,
  year_established, status, verification_level, is_featured, view_count,
  is_women_owned, is_startup, online_delivery, franchise_available, district_number
) VALUES
-- 1. Lumina Digital Solutions (Tech)
(
  'b1000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011',
  'Lumina Digital Solutions', 'lumina-digital-solutions',
  'Next-Generation Cloud Architecture & Enterprise Web Engineering',
  'Lumina Digital Solutions delivers mission-critical software engineering, scalable cloud infrastructure, and custom SaaS platforms for high-growth enterprises worldwide.',
  'c1000000-0000-0000-0000-000000000004', 'c2000000-0000-0000-0000-000000000019',
  2021, 'approved', 2, true, 284, false, true, true, false, 3220
),
-- 2. Apex Dental Studio & Implant Center (Healthcare)
(
  'b1000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000012',
  'Apex Dental Studio & Implant Center', 'apex-dental-studio',
  'Advanced Digital Prosthodontics & Cosmetic Dental Care',
  'Modern clinical facility specializing in guided dental implants, 3D smile redesigns, and comprehensive restorative dental treatments with digital precision.',
  'c1000000-0000-0000-0000-000000000005', 'c2000000-0000-0000-0000-000000000025',
  2019, 'approved', 2, true, 319, true, false, false, false, 3141
),
-- 3. Studio Bloom Creative Agency (Creative/Professional)
(
  'b1000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000013',
  'Studio Bloom Creative Agency', 'studio-bloom-creative',
  'High-Impact Brand Identity, Visual Storytelling & 3D Packaging',
  'Studio Bloom is a boutique creative powerhouse helping challenger brands and global businesses stand out through bespoke visual identity and package design.',
  'c1000000-0000-0000-0000-000000000003', 'c2000000-0000-0000-0000-000000000017',
  2022, 'approved', 1, false, 195, false, true, true, false, 3220
),
-- 4. Colombo Tea Exports Ltd (Manufacturing/Food)
(
  'b1000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000014',
  'Colombo Tea Exports Ltd', 'colombo-tea-exports',
  'Single-Origin Pure Ceylon Artisan Teas & Bulk Private Label Supply',
  'Producers and certified global exporters of ethical, single-estate Ceylon Black, Green, and Herbal specialty teas direct from high-altitude plantations.',
  'c1000000-0000-0000-0000-000000000001', 'c2000000-0000-0000-0000-000000000007',
  2016, 'approved', 2, true, 412, true, false, true, true, 3220
),
-- 5. BuildCraft Engineering & Interiors (Real Estate)
(
  'b1000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000015',
  'BuildCraft Engineering & Interiors', 'buildcraft-engineering',
  'Sustainable Architectural Contracting & Luxury Commercial Interiors',
  'Full-service construction and turnkey interior fit-out firm delivering sustainable commercial spaces, corporate offices, and luxury residences.',
  'c1000000-0000-0000-0000-000000000008', 'c2000000-0000-0000-0000-000000000036',
  2018, 'approved', 1, false, 168, false, false, false, false, 3131
),
-- 6. Ceylon Spice Traders (Retail/Food)
(
  'b1000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000016',
  'Ceylon Spice Traders', 'ceylon-spice-traders',
  'Authentic Organic True Cinnamon, Cardamom & Gourmet Spices',
  'Direct-from-farm organic spice merchants supplying pure Ceylon Cinnamon, pepper, cloves, and premium seasoning blends to culinary professionals globally.',
  'c1000000-0000-0000-0000-000000000002', 'c2000000-0000-0000-0000-000000000009',
  2020, 'approved', 2, true, 255, false, true, true, true, 3220
),
-- 7. Nexus Analytics Group (Tech/AI)
(
  'b1000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000017',
  'Nexus Analytics Group', 'nexus-analytics-group',
  'AI-Powered Predictive Business Intelligence & Data Pipelines',
  'Nexus Analytics empowers enterprise leaders with automated data warehousing, predictive customer modeling, and machine learning insight dashboards.',
  'c1000000-0000-0000-0000-000000000004', 'c2000000-0000-0000-0000-000000000020',
  2023, 'approved', 1, false, 180, true, true, true, false, 3232
),
-- 8. Heritage Silk & Garments (Manufacturing/Textiles)
(
  'b1000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000018',
  'Heritage Silk & Garments', 'heritage-silk-garments',
  'Artisanal Handwoven Silk Fabrics, Formalwear & Uniform Manufacturing',
  'Specializing in premium handloom silk fabrics, luxury bespoke formalwear, and institutional uniform manufacturing with eco-friendly dyes.',
  'c1000000-0000-0000-0000-000000000001', 'c2000000-0000-0000-0000-000000000001',
  2014, 'approved', 2, false, 340, false, false, true, true, 3220
),
-- 9. EcoNest Sustainable Packaging (Manufacturing)
(
  'b1000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000019',
  'EcoNest Sustainable Packaging', 'econest-packaging',
  '100% Biodegradable & Compostable Food Delivery Packaging Solutions',
  'EcoNest manufactures sustainable, sugarcane bagasse and plant-fiber food boxes, paper bags, and eco-friendly protective shipping cartons.',
  'c1000000-0000-0000-0000-000000000001', 'c2000000-0000-0000-0000-000000000004',
  2021, 'approved', 2, true, 290, true, true, true, true, 3220
),
-- 10. Horizon Legal & Tax Consultancy (Professional)
(
  'b1000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000020',
  'Horizon Legal & Tax Consultancy', 'horizon-legal-tax',
  'Corporate Structuring, Cross-Border Taxation & IP Advisory',
  'Trusted legal counsel providing end-to-end company incorporation, compliance management, trademark filings, and international tax planning.',
  'c1000000-0000-0000-0000-000000000003', 'c2000000-0000-0000-0000-000000000013',
  2017, 'approved', 1, false, 210, false, false, false, false, 3011
),
-- 11. BlueWave Hospitality & Culinary (Hospitality)
(
  'b1000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000021',
  'BlueWave Hospitality & Culinary', 'bluewave-hospitality',
  'Boutique Beachfront Dining & High-End Corporate Event Catering',
  'Curating gourmet culinary dining experiences, artisanal catering services for Rotary conventions, and bespoke destination wedding banquets.',
  'c1000000-0000-0000-0000-000000000007', 'c2000000-0000-0000-0000-000000000032',
  2020, 'approved', 2, false, 275, false, true, true, false, 3220
),
-- 12. MindSpark EdTech & Learning (Education)
(
  'b1000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000022',
  'MindSpark EdTech & Learning', 'mindspark-edtech',
  'Interactive STEM Curriculum & Youth Leadership Academy',
  'Pioneering digital learning academies offering robotics training, coding for students, and corporate leadership programs for young professionals.',
  'c1000000-0000-0000-0000-000000000006', 'c2000000-0000-0000-0000-000000000030',
  2022, 'approved', 1, true, 198, true, true, true, false, 2452
),
-- 13. BioMedica Diagnostics & Labs (Healthcare)
(
  'b1000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000023',
  'BioMedica Diagnostics & Labs', 'biomedica-diagnostics',
  'Automated Pathology, Genomic Profiling & Home Health Checkups',
  'Accredited clinical diagnostic center offering comprehensive health screening panels, preventative wellness checks, and corporate employee testing.',
  'c1000000-0000-0000-0000-000000000005', 'c2000000-0000-0000-0000-000000000026',
  2019, 'approved', 2, false, 230, false, false, true, false, 3220
),
-- 14. UrbanLiving Furniture & Decor (Retail/Furniture)
(
  'b1000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000024',
  'UrbanLiving Furniture & Decor', 'urbanliving-furniture',
  'Minimalist Solid Teak Furniture & Contemporary Home Accents',
  'Designing and manufacturing ergonomic home-office desks, solid timber dining tables, and modular living room suites built for modern apartments.',
  'c1000000-0000-0000-0000-000000000002', 'c2000000-0000-0000-0000-000000000010',
  2018, 'approved', 1, false, 310, false, false, true, true, 3220
),
-- 15. PrimeLogistics & Cold Chain (Professional/Services)
(
  'b1000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000025',
  'PrimeLogistics & Cold Chain', 'primelogistics-cold-chain',
  'Temperature-Controlled Freight, Warehousing & Global Logistics',
  'PrimeLogistics delivers precision cold chain transport, pharmaceutical cargo handling, and integrated freight forwarding across South Asia and the Middle East.',
  'c1000000-0000-0000-0000-000000000003', 'c2000000-0000-0000-0000-000000000018',
  2015, 'approved', 2, true, 480, false, false, true, true, 3220
)
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
    status = 'approved', verification_level = EXCLUDED.verification_level;

-- 5. Insert Business Locations
INSERT INTO public.business_locations (business_id, city, state, country, district, address, pincode)
VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Colombo', 'Western Province', 'Sri Lanka', 'Colombo', '142 R. A. De Mel Mawatha, Colombo 03', '00300'),
  ('b1000000-0000-0000-0000-000000000002', 'Mumbai', 'Maharashtra', 'India', 'Mumbai', '401 Pinnacle Plaza, Bandra West', '400050'),
  ('b1000000-0000-0000-0000-000000000003', 'Kandy', 'Central Province', 'Sri Lanka', 'Kandy', '78 Dalada Veediya, Kandy', '20000'),
  ('b1000000-0000-0000-0000-000000000004', 'Colombo', 'Western Province', 'Sri Lanka', 'Colombo', '92 Vauxhall Street, Colombo 02', '00200'),
  ('b1000000-0000-0000-0000-000000000005', 'Pune', 'Maharashtra', 'India', 'Pune', '12 Senapati Bapat Road, Shivajinagar', '411016'),
  ('b1000000-0000-0000-0000-000000000006', 'Galle', 'Southern Province', 'Sri Lanka', 'Galle', '15 Church Street, Galle Fort', '80000'),
  ('b1000000-0000-0000-0000-000000000007', 'Chennai', 'Tamil Nadu', 'India', 'Chennai', '88 Mount Road, Anna Salai', '600002'),
  ('b1000000-0000-0000-0000-000000000008', 'Kurunegala', 'North Western Province', 'Sri Lanka', 'Kurunegala', '34 Colombo Road, Kurunegala', '60000'),
  ('b1000000-0000-0000-0000-000000000009', 'Colombo', 'Western Province', 'Sri Lanka', 'Colombo', '215 Nawala Road, Nugegoda', '10250'),
  ('b1000000-0000-0000-0000-000000000010', 'New Delhi', 'Delhi NCR', 'India', 'Delhi', '50 Barakhamba Road, Connaught Place', '110001'),
  ('b1000000-0000-0000-0000-000000000011', 'Bentota', 'Southern Province', 'Sri Lanka', 'Galle', 'Coastal Highway, Bentota', '80500'),
  ('b1000000-0000-0000-0000-000000000012', 'Dubai', 'Dubai', 'United Arab Emirates', 'Dubai', 'Suite 1802, Business Bay Tower', '00000'),
  ('b1000000-0000-0000-0000-000000000013', 'Colombo', 'Western Province', 'Sri Lanka', 'Colombo', '65 Baseline Road, Colombo 09', '00900'),
  ('b1000000-0000-0000-0000-000000000014', 'Moratuwa', 'Western Province', 'Sri Lanka', 'Colombo', '108 Galle Road, Moratuwa', '10400'),
  ('b1000000-0000-0000-0000-000000000015', 'Colombo', 'Western Province', 'Sri Lanka', 'Colombo', 'Port Access Road, Colombo 13', '01300')
ON CONFLICT (business_id) DO UPDATE
SET city = EXCLUDED.city, address = EXCLUDED.address, state = EXCLUDED.state, country = EXCLUDED.country;

-- 6. Insert Business Contacts
INSERT INTO public.business_contacts (business_id, email, mobile, whatsapp, website)
VALUES
  ('b1000000-0000-0000-0000-000000000001', 'contact@luminadigital.io', '+94 77 123 4567', '+94771234567', 'https://luminadigital.io'),
  ('b1000000-0000-0000-0000-000000000002', 'care@apexdental.in', '+91 98201 23456', '+919820123456', 'https://apexdental.in'),
  ('b1000000-0000-0000-0000-000000000003', 'hello@studiobloom.lk', '+94 71 987 6543', '+94719876543', 'https://studiobloom.lk'),
  ('b1000000-0000-0000-0000-000000000004', 'exports@colombotea.com', '+94 11 234 5678', '+94773456789', 'https://colombotea.com'),
  ('b1000000-0000-0000-0000-000000000005', 'projects@buildcraft.in', '+91 94220 87654', '+919422087654', 'https://buildcraft.in'),
  ('b1000000-0000-0000-0000-000000000006', 'sales@ceylonspicetraders.com', '+94 91 223 4567', '+94778901234', 'https://ceylonspicetraders.com'),
  ('b1000000-0000-0000-0000-000000000007', 'insights@nexusanalytics.ai', '+91 98400 11223', '+919840011223', 'https://nexusanalytics.ai'),
  ('b1000000-0000-0000-0000-000000000008', 'orders@heritagesilk.lk', '+94 37 222 3344', '+94761234987', 'https://heritagesilk.lk'),
  ('b1000000-0000-0000-0000-000000000009', 'info@econestpackaging.com', '+94 11 456 7890', '+94776543210', 'https://econestpackaging.com'),
  ('b1000000-0000-0000-0000-000000000010', 'advisory@horizonlegal.in', '+91 11 4150 9988', '+919811122334', 'https://horizonlegal.in'),
  ('b1000000-0000-0000-0000-000000000011', 'dine@bluewavehospitality.lk', '+94 34 227 8899', '+94779887766', 'https://bluewavehospitality.lk'),
  ('b1000000-0000-0000-0000-000000000012', 'learn@mindsparkedtech.com', '+971 4 332 1100', '+971501234567', 'https://mindsparkedtech.com'),
  ('b1000000-0000-0000-0000-000000000013', 'lab@biomedicadiagnostics.lk', '+94 11 567 8901', '+94772233445', 'https://biomedicadiagnostics.lk'),
  ('b1000000-0000-0000-0000-000000000014', 'furniture@urbanliving.lk', '+94 11 265 4321', '+94774455667', 'https://urbanliving.lk'),
  ('b1000000-0000-0000-0000-000000000015', 'dispatch@primelogistics.com', '+94 11 789 0123', '+94775566778', 'https://primelogistics.com')
ON CONFLICT (business_id) DO UPDATE
SET email = EXCLUDED.email, mobile = EXCLUDED.mobile, whatsapp = EXCLUDED.whatsapp, website = EXCLUDED.website;

-- 7. Insert Products & Services
INSERT INTO public.products_services (business_id, name, type, description, price_from, service_area, tags)
VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Enterprise Cloud Migration & DevOps', 'service', 'End-to-end containerized AWS/GCP cloud migration with Terraform infrastructure as code.', 2500, 'international', ARRAY['Cloud', 'DevOps', 'AWS', 'Next.js']),
  ('b1000000-0000-0000-0000-000000000001', 'Custom SaaS Platform Development', 'service', 'High-performance full-stack web and mobile application engineering.', 4500, 'international', ARRAY['SaaS', 'Web Development']),
  ('b1000000-0000-0000-0000-000000000002', 'Full Mouth Digital Dental Implant', 'service', 'Computer-guided keyhole implant procedure with zirconia dental crown.', 650, 'state', ARRAY['Dental', 'Implants', 'Cosmetic']),
  ('b1000000-0000-0000-0000-000000000003', 'Complete Brand Identity Suite', 'service', 'Brand guidelines, typography, 3D packaging mockups, and digital asset library.', 1200, 'international', ARRAY['Branding', 'Design', 'Packaging']),
  ('b1000000-0000-0000-0000-000000000004', 'Ceylon Silver Tips White Tea (100g Tin)', 'product', 'Rare sun-dried single-estate pure white tea buds packed in luxury airtight tin.', 35, 'international', ARRAY['Tea', 'Gourmet', 'Organic']),
  ('b1000000-0000-0000-0000-000000000006', 'Organic Ceylon Cinnamon Quills (Grade ALBA)', 'product', 'Finest grade true Alba Ceylon cinnamon sticks with delicate aroma and sweet notes.', 22, 'international', ARRAY['Cinnamon', 'Spices', 'Organic']),
  ('b1000000-0000-0000-0000-000000000007', 'Customer Retention AI Dashboard', 'product', 'Plug-and-play machine learning engine analyzing churn risk and customer lifetime value.', 499, 'international', ARRAY['AI', 'Analytics', 'SaaS']),
  ('b1000000-0000-0000-0000-000000000009', 'Biodegradable Meal Boxes (Pack of 500)', 'product', 'Eco-friendly sugarcane bagasse takeaway containers resistant to hot oil and liquids.', 75, 'nationwide', ARRAY['Eco-Friendly', 'Packaging', 'Recyclable']),
  ('b1000000-0000-0000-0000-000000000014', 'Teakwood Minimalist Executive Desk', 'product', 'Handcrafted solid plantation teak desk with integrated concealed cable tray.', 450, 'nationwide', ARRAY['Furniture', 'Teak', 'Interior'])
ON CONFLICT DO NOTHING;
