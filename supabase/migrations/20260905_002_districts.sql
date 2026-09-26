-- =========================================================
-- Migration: 20260905_002_districts.sql
-- Description: Dynamic Global Rotaract Districts Table
-- =========================================================

CREATE TABLE IF NOT EXISTS public.districts (
  district_number INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  country TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all active districts
CREATE POLICY "Public read active districts"
  ON public.districts
  FOR SELECT
  USING (true);

-- Allow super admins full manage rights
CREATE POLICY "Super admin manage districts"
  ON public.districts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin'
    )
  );

-- Seed comprehensive default Rotaract districts
INSERT INTO public.districts (district_number, name, region, country) VALUES
  (3220, 'District 3220', 'Sri Lanka & Maldives', 'Sri Lanka'),
  (3011, 'District 3011', 'Delhi & NCR', 'India'),
  (3012, 'District 3012', 'Delhi, Ghaziabad & Meerut', 'India'),
  (3040, 'District 3040', 'Madhya Pradesh & Gujarat', 'India'),
  (3054, 'District 3054', 'Rajasthan & Gujarat', 'India'),
  (3060, 'District 3060', 'Gujarat & Maharashtra', 'India'),
  (3080, 'District 3080', 'Chandigarh, Punjab & Haryana', 'India'),
  (3131, 'District 3131', 'Pune & Raigad', 'India'),
  (3132, 'District 3132', 'Maharashtra Central', 'India'),
  (3141, 'District 3141', 'Mumbai', 'India'),
  (3142, 'District 3142', 'Thane & Navi Mumbai', 'India'),
  (3150, 'District 3150', 'Telangana & Andhra Pradesh', 'India'),
  (3170, 'District 3170', 'Goa & North Karnataka', 'India'),
  (3181, 'District 3181', 'Mysore & Mangalore', 'India'),
  (3182, 'District 3182', 'Shimoga & Udupi', 'India'),
  (3190, 'District 3190', 'Bangalore', 'India'),
  (3201, 'District 3201', 'Coimbatore & Cochin', 'India'),
  (3202, 'District 3202', 'Kerala & Tamil Nadu', 'India'),
  (3203, 'District 3203', 'Erode & Tirupur', 'India'),
  (3232, 'District 3232', 'Chennai', 'India'),
  (3240, 'District 3240', 'North East India', 'India'),
  (3250, 'District 3250', 'Bihar & Jharkhand', 'India'),
  (3261, 'District 3261', 'Odisha & Chhattisgarh', 'India'),
  (3291, 'District 3291', 'Kolkata & West Bengal', 'India'),
  (3292, 'District 3292', 'Nepal & Bhutan', 'Nepal'),
  (3281, 'District 3281', 'Bangladesh North', 'Bangladesh'),
  (3282, 'District 3282', 'Bangladesh South', 'Bangladesh'),
  (9110, 'District 9110', 'Lagos & Ogun States', 'Nigeria'),
  (9111, 'District 9111', 'Lagos Central', 'Nigeria'),
  (9125, 'District 9125', 'Abuja & Northern Nigeria', 'Nigeria'),
  (9141, 'District 9141', 'Rivers, Delta & Edo', 'Nigeria'),
  (9142, 'District 9142', 'South East Nigeria', 'Nigeria'),
  (9212, 'District 9212', 'Kenya, Ethiopia, South Sudan & Eritrea', 'Kenya'),
  (9213, 'District 9213', 'Uganda', 'Uganda'),
  (9214, 'District 9214', 'Uganda & Tanzania', 'Uganda'),
  (9400, 'District 9400', 'South Africa, Botswana & Mozambique', 'South Africa'),
  (2452, 'District 2452', 'UAE, Lebanon, Jordan, Cyprus, Bahrain & Sudan', 'UAE'),
  (2451, 'District 2451', 'Egypt', 'Egypt'),
  (2420, 'District 2420', 'Istanbul & Northern Turkey', 'Turkey'),
  (3300, 'District 3300', 'West Malaysia', 'Malaysia'),
  (3310, 'District 3310', 'Singapore, Brunei & East Malaysia', 'Singapore'),
  (3810, 'District 3810', 'Manila & Cavite', 'Philippines'),
  (3830, 'District 3830', 'Makati & Southern Tagalog', 'Philippines'),
  (3800, 'District 3800', 'Rizal & Metro Manila North', 'Philippines'),
  (3350, 'District 3350', 'Central Thailand', 'Thailand'),
  (3450, 'District 3450', 'Hong Kong, Macau & Mongolia', 'Hong Kong'),
  (7020, 'District 7020', 'Northern Caribbean (Jamaica, Bahamas, Haiti)', 'Jamaica'),
  (7030, 'District 7030', 'Southern Caribbean (Barbados, Trinidad, Guyana)', 'Barbados'),
  (1090, 'District 1090', 'Thames Valley & Oxford', 'United Kingdom'),
  (1910, 'District 1910', 'Eastern Austria & Bosnia', 'Austria'),
  (2041, 'District 2041', 'Milan', 'Italy'),
  (2202, 'District 2202', 'Barcelona & Northern Spain', 'Spain'),
  (5170, 'District 5170', 'Silicon Valley & Bay Area', 'United States'),
  (5280, 'District 5280', 'Los Angeles', 'United States'),
  (7230, 'District 7230', 'New York & Bermuda', 'United States'),
  (4420, 'District 4420', 'São Paulo', 'Brazil'),
  (4895, 'District 4895', 'Buenos Aires', 'Argentina'),
  (4170, 'District 4170', 'Mexico City', 'Mexico'),
  (9675, 'District 9675', 'Sydney', 'Australia')
ON CONFLICT (district_number) DO UPDATE
  SET region = EXCLUDED.region,
      name = EXCLUDED.name,
      country = EXCLUDED.country;
