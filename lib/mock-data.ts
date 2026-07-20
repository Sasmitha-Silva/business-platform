// ==========================================
// Rotaract Business Network — Mock Data
// ==========================================

import type {
  Business,
  Category,
  User,
  RotaractProfile,
  BusinessLocation,
  BusinessContact,
  VerificationDocument,
  ProductService,
  Enquiry,
  AdminAction,
  ModeratorAssignment,
  DashboardAnalytics,
  ModeratorDashboardStats,
  OwnerDashboardStats,
} from './types';

// --- Categories (seed) ---

export const mockCategories: Category[] = [
  {
    id: 'cat-1', name: 'Manufacturing', slug: 'manufacturing', parent_id: null, icon: 'Factory', is_active: true, sort_order: 1,
    children: [
      { id: 'cat-1-1', name: 'Textile & Garments', slug: 'textile-garments', parent_id: 'cat-1', is_active: true, sort_order: 1 },
      { id: 'cat-1-2', name: 'Machinery', slug: 'machinery', parent_id: 'cat-1', is_active: true, sort_order: 2 },
      { id: 'cat-1-3', name: 'Printing', slug: 'printing', parent_id: 'cat-1', is_active: true, sort_order: 3 },
      { id: 'cat-1-4', name: 'Packaging', slug: 'packaging', parent_id: 'cat-1', is_active: true, sort_order: 4 },
      { id: 'cat-1-5', name: 'Furniture', slug: 'furniture', parent_id: 'cat-1', is_active: true, sort_order: 5 },
      { id: 'cat-1-6', name: 'Electronics', slug: 'electronics-mfg', parent_id: 'cat-1', is_active: true, sort_order: 6 },
      { id: 'cat-1-7', name: 'Food Manufacturing', slug: 'food-manufacturing', parent_id: 'cat-1', is_active: true, sort_order: 7 },
    ],
  },
  {
    id: 'cat-2', name: 'Retail', slug: 'retail', parent_id: null, icon: 'ShoppingBag', is_active: true, sort_order: 2,
    children: [
      { id: 'cat-2-1', name: 'Fashion', slug: 'fashion', parent_id: 'cat-2', is_active: true, sort_order: 1 },
      { id: 'cat-2-2', name: 'Grocery', slug: 'grocery', parent_id: 'cat-2', is_active: true, sort_order: 2 },
      { id: 'cat-2-3', name: 'Gifts', slug: 'gifts', parent_id: 'cat-2', is_active: true, sort_order: 3 },
      { id: 'cat-2-4', name: 'Jewelry', slug: 'jewelry', parent_id: 'cat-2', is_active: true, sort_order: 4 },
      { id: 'cat-2-5', name: 'Electronics', slug: 'electronics-retail', parent_id: 'cat-2', is_active: true, sort_order: 5 },
    ],
  },
  {
    id: 'cat-3', name: 'Professional Services', slug: 'professional-services', parent_id: null, icon: 'Briefcase', is_active: true, sort_order: 3,
    children: [
      { id: 'cat-3-1', name: 'CA & Tax Consulting', slug: 'ca-tax', parent_id: 'cat-3', is_active: true, sort_order: 1 },
      { id: 'cat-3-2', name: 'Legal', slug: 'legal', parent_id: 'cat-3', is_active: true, sort_order: 2 },
      { id: 'cat-3-3', name: 'Consultancy', slug: 'consultancy', parent_id: 'cat-3', is_active: true, sort_order: 3 },
      { id: 'cat-3-4', name: 'HR', slug: 'hr', parent_id: 'cat-3', is_active: true, sort_order: 4 },
      { id: 'cat-3-5', name: 'Marketing', slug: 'marketing', parent_id: 'cat-3', is_active: true, sort_order: 5 },
      { id: 'cat-3-6', name: 'IT Services', slug: 'it-services', parent_id: 'cat-3', is_active: true, sort_order: 6 },
    ],
  },
  {
    id: 'cat-4', name: 'Technology', slug: 'technology', parent_id: null, icon: 'Cpu', is_active: true, sort_order: 4, business_count: 12,
    children: [
      { id: 'cat-4-1', name: 'Software Development', slug: 'software-development', parent_id: 'cat-4', is_active: true, sort_order: 1 },
      { id: 'cat-4-2', name: 'AI & ML', slug: 'ai-ml', parent_id: 'cat-4', is_active: false, sort_order: 2 },
      { id: 'cat-4-3', name: 'SaaS', slug: 'saas', parent_id: 'cat-4', is_active: true, sort_order: 3 },
      { id: 'cat-4-4', name: 'Web Development', slug: 'web-development', parent_id: 'cat-4', is_active: true, sort_order: 4 },
      { id: 'cat-4-5', name: 'App Development', slug: 'app-development', parent_id: 'cat-4', is_active: true, sort_order: 5 },
    ],
  },
  {
    id: 'cat-5', name: 'Healthcare', slug: 'healthcare', parent_id: null, icon: 'Heart', is_active: true, sort_order: 5, business_count: 5,
    children: [
      { id: 'cat-5-1', name: 'Hospitals', slug: 'hospitals', parent_id: 'cat-5', is_active: true, sort_order: 1 },
      { id: 'cat-5-2', name: 'Clinics', slug: 'clinics', parent_id: 'cat-5', is_active: true, sort_order: 2 },
      { id: 'cat-5-3', name: 'Diagnostics', slug: 'diagnostics', parent_id: 'cat-5', is_active: true, sort_order: 3 },
      { id: 'cat-5-4', name: 'Pharmacy', slug: 'pharmacy', parent_id: 'cat-5', is_active: true, sort_order: 4 },
    ],
  },
  {
    id: 'cat-6', name: 'Education', slug: 'education', parent_id: null, icon: 'GraduationCap', is_active: true, sort_order: 6,
    children: [
      { id: 'cat-6-1', name: 'Schools', slug: 'schools', parent_id: 'cat-6', is_active: true, sort_order: 1 },
      { id: 'cat-6-2', name: 'Coaching', slug: 'coaching', parent_id: 'cat-6', is_active: true, sort_order: 2 },
      { id: 'cat-6-3', name: 'Training', slug: 'training', parent_id: 'cat-6', is_active: true, sort_order: 3 },
      { id: 'cat-6-4', name: 'EdTech', slug: 'edtech', parent_id: 'cat-6', is_active: true, sort_order: 4 },
    ],
  },
  {
    id: 'cat-7', name: 'Hospitality', slug: 'hospitality', parent_id: null, icon: 'UtensilsCrossed', is_active: true, sort_order: 7,
    children: [
      { id: 'cat-7-1', name: 'Hotels', slug: 'hotels', parent_id: 'cat-7', is_active: true, sort_order: 1 },
      { id: 'cat-7-2', name: 'Restaurants', slug: 'restaurants', parent_id: 'cat-7', is_active: true, sort_order: 2 },
      { id: 'cat-7-3', name: 'Catering', slug: 'catering', parent_id: 'cat-7', is_active: true, sort_order: 3 },
      { id: 'cat-7-4', name: 'Event Management', slug: 'event-management', parent_id: 'cat-7', is_active: true, sort_order: 4 },
    ],
  },
  {
    id: 'cat-8', name: 'Real Estate & Construction', slug: 'real-estate-construction', parent_id: null, icon: 'Building', is_active: true, sort_order: 8, business_count: 8,
    children: [
      { id: 'cat-8-1', name: 'Builders', slug: 'builders', parent_id: 'cat-8', is_active: true, sort_order: 1 },
      { id: 'cat-8-2', name: 'Architects', slug: 'architects', parent_id: 'cat-8', is_active: true, sort_order: 2 },
      { id: 'cat-8-3', name: 'Interior Designers', slug: 'interior-designers', parent_id: 'cat-8', is_active: true, sort_order: 3 },
    ],
  },
  {
    id: 'cat-9', name: 'Creative Services', slug: 'creative-services', parent_id: null, icon: 'Palette', is_active: true, sort_order: 9,
    children: [
      { id: 'cat-9-1', name: 'Photography', slug: 'photography', parent_id: 'cat-9', is_active: true, sort_order: 1 },
      { id: 'cat-9-2', name: 'Videography', slug: 'videography', parent_id: 'cat-9', is_active: true, sort_order: 2 },
      { id: 'cat-9-3', name: 'Graphic Design', slug: 'graphic-design', parent_id: 'cat-9', is_active: true, sort_order: 3 },
      { id: 'cat-9-4', name: 'Content Creation', slug: 'content-creation', parent_id: 'cat-9', is_active: true, sort_order: 4 },
    ],
  },
  {
    id: 'cat-10', name: 'Others', slug: 'others', parent_id: null, icon: 'MoreHorizontal', is_active: true, sort_order: 10,
    children: [
      { id: 'cat-10-1', name: 'Travel', slug: 'travel', parent_id: 'cat-10', is_active: true, sort_order: 1 },
      { id: 'cat-10-2', name: 'Logistics', slug: 'logistics', parent_id: 'cat-10', is_active: true, sort_order: 2 },
      { id: 'cat-10-3', name: 'Finance', slug: 'finance', parent_id: 'cat-10', is_active: true, sort_order: 3 },
      { id: 'cat-10-4', name: 'Agriculture', slug: 'agriculture', parent_id: 'cat-10', is_active: true, sort_order: 4 },
      { id: 'cat-10-5', name: 'NGOs', slug: 'ngos', parent_id: 'cat-10', is_active: true, sort_order: 5 },
    ],
  },
];

// --- Users ---

export const mockUsers: User[] = [
  { id: 'user-1', role: 'super_admin', email: 'kanishka@rotaract3220.org', name: 'Rtn. Kanishka De Silva', avatar_url: '', created_at: '2024-01-01', is_active: true },
  { id: 'user-2', role: 'moderator', email: 'dilshan@rotaract3220.org', name: 'Ptr. Dilshan Wickremasinghe', avatar_url: '', created_at: '2024-02-15', is_active: true },
  { id: 'user-3', role: 'owner', email: 'sarah@nexusanalytics.lk', name: 'Rtr. Sarah Perera', avatar_url: '', created_at: '2024-03-10', is_active: true },
  { id: 'user-4', role: 'owner', email: 'anand@luminadigital.in', name: 'Rtr. Anand Vardhan Sharma', avatar_url: '', created_at: '2024-04-05', is_active: true },
  { id: 'user-5', role: 'moderator', email: 'samuel@rotaract9212.org', name: 'Rtr. Samuel Omondi', avatar_url: '', created_at: '2024-03-01', is_active: true },
  { id: 'user-6', role: 'owner', email: 'zainab@vanguardlegal.ng', name: 'Rtr. Zainab Abiola', avatar_url: '', created_at: '2024-05-20', is_active: true },
  { id: 'user-7', role: 'moderator', email: 'ayodeji@rotaract9110.org', name: 'Rtr. Ayodeji Balogun', avatar_url: '', created_at: '2024-06-12', is_active: true },
  { id: 'user-8', role: 'owner', email: 'robert@ironcladindustries.com.au', name: 'Rtr. Robert Chen', avatar_url: '', created_at: '2024-07-01', is_active: true },
  { id: 'user-9', role: 'owner', email: 'arjun@skylinelegal.in', name: 'Rtr. Arjun Mehta', avatar_url: '', created_at: '2024-04-22', is_active: true },
  { id: 'user-10', role: 'owner', email: 'alisha@studiobloom.design', name: 'Rtr. Alisha Fernandez', avatar_url: '', created_at: '2024-05-18', is_active: true },
];

export const mockRotaractProfiles: RotaractProfile[] = [
  { user_id: 'user-3', club_name: 'Rotaract Club of Colombo Downtown', district_number: 3220, rotary_id: 'RID-3220-4102', designation: 'Club President', years_in_rotaract: 5, is_active: true, is_alumni: false },
  { user_id: 'user-4', club_name: 'Rotaract Club of Mumbai Central', district_number: 3141, rotary_id: 'RID-3141-8841', designation: 'District Director - Professional Development', years_in_rotaract: 4, is_active: true, is_alumni: false },
  { user_id: 'user-6', club_name: 'Rotaract Club of Lagos Metropolitan', district_number: 9110, rotary_id: 'RID-9110-3021', designation: 'Club Vice President', years_in_rotaract: 4, is_active: true, is_alumni: false },
  { user_id: 'user-8', club_name: 'Rotaract Club of Sydney Harbour', district_number: 9675, rotary_id: 'RID-9675-7749', designation: 'Professional Service Chair', years_in_rotaract: 3, is_active: true, is_alumni: false },
  { id: 'user-9', user_id: 'user-9', club_name: 'Rotaract Club of Delhi South', district_number: 3011, rotary_id: 'RID-3011-9215', designation: 'Past President', years_in_rotaract: 6, is_active: true, is_alumni: true } as unknown as RotaractProfile,
];

// --- Businesses ---

export const mockBusinesses: Business[] = [
  {
    id: 'biz-1',
    owner_id: 'user-4',
    name: 'Lumina Digital Solutions',
    slug: 'lumina-digital-solutions',
    legal_name: 'Lumina Digital Solutions Pvt. Ltd.',
    brand_name: 'Lumina',
    category_id: 'cat-4',
    subcategory_id: 'cat-4-1',
    category: { id: 'cat-4', name: 'Technology', slug: 'technology', parent_id: null, is_active: true, sort_order: 4 },
    subcategory: { id: 'cat-4-1', name: 'Software Development', slug: 'software-development', parent_id: 'cat-4', is_active: true, sort_order: 1 },
    business_type: ['service_provider'],
    year_established: 2015,
    description: 'Lumina Digital Solutions has been at the forefront of digital transformation for over a decade. We specialize in providing comprehensive IT consulting, custom software development, and cloud-native infrastructure solutions. Our mission is to bridge the gap between complex technological capabilities and practical business needs.',
    tagline: 'Transforming businesses through innovative technology',
    logo_url: '/mock/lumina-logo.png',
    cover_image_url: '/mock/lumina-cover.jpg',
    status: 'approved',
    is_featured: true,
    is_women_owned: false,
    is_startup: false,
    online_delivery: true,
    franchise_available: false,
    verification_level: 3,
    created_at: '2024-06-15',
    updated_at: '2024-10-20',
    owner: mockUsers[3],
    rotaract_profile: mockRotaractProfiles[1],
    location: { id: 'loc-1', business_id: 'biz-1', country: 'India', state: 'Telangana', district: 'Hyderabad', city: 'Hyderabad', area: 'Banjara Hills', address: '123 Tech Park, Road No. 12', pincode: '500034', maps_link: 'https://maps.google.com/?q=17.4326,78.4071' },
    contact: { id: 'con-1', business_id: 'biz-1', mobile: '+91-9876543210', email: 'info@lumina.com', website: 'https://lumina.com', whatsapp: '+919876543210', social_links: { linkedin: 'https://linkedin.com/company/lumina', instagram: 'https://instagram.com/lumina' } },
  },
  {
    id: 'biz-2',
    owner_id: 'user-3',
    name: 'Nexus Analytics',
    slug: 'nexus-analytics',
    legal_name: 'Nexus Analytics Inc.',
    category_id: 'cat-4',
    subcategory_id: 'cat-4-3',
    category: { id: 'cat-4', name: 'Technology', slug: 'technology', parent_id: null, is_active: true, sort_order: 4 },
    subcategory: { id: 'cat-4-3', name: 'SaaS', slug: 'saas', parent_id: 'cat-4', is_active: true, sort_order: 3 },
    business_type: ['service_provider'],
    year_established: 2018,
    description: 'Leading tech & data solutions provider offering cutting-edge analytics, business intelligence, and data engineering services for enterprises worldwide.',
    tagline: 'Data-Driven Decisions, Simplified',
    logo_url: '/mock/nexus-logo.png',
    cover_image_url: '/mock/nexus-cover.jpg',
    status: 'approved',
    is_featured: true,
    is_women_owned: false,
    is_startup: true,
    online_delivery: true,
    franchise_available: false,
    verification_level: 3,
    created_at: '2024-07-10',
    updated_at: '2024-10-24',
  },
  {
    id: 'biz-3',
    owner_id: 'user-10',
    name: 'Studio Bloom',
    slug: 'studio-bloom',
    category_id: 'cat-9',
    subcategory_id: 'cat-9-3',
    category: { id: 'cat-9', name: 'Creative Services', slug: 'creative-services', parent_id: null, is_active: true, sort_order: 9 },
    subcategory: { id: 'cat-9-3', name: 'Graphic Design', slug: 'graphic-design', parent_id: 'cat-9', is_active: true, sort_order: 3 },
    business_type: ['service_provider'],
    year_established: 2020,
    description: 'A premium creative marketing agency specializing in brand identity, visual design, and digital campaigns for forward-thinking businesses.',
    tagline: 'Creativity that Captivates',
    logo_url: '/mock/bloom-logo.png',
    cover_image_url: '/mock/bloom-cover.jpg',
    status: 'approved',
    is_featured: false,
    is_women_owned: true,
    is_startup: true,
    online_delivery: true,
    franchise_available: false,
    verification_level: 2,
    created_at: '2024-08-05',
    updated_at: '2024-10-25',
  },
  {
    id: 'biz-4',
    owner_id: 'user-6',
    name: 'Vanguard Legal',
    slug: 'vanguard-legal',
    category_id: 'cat-3',
    subcategory_id: 'cat-3-2',
    category: { id: 'cat-3', name: 'Professional Services', slug: 'professional-services', parent_id: null, is_active: true, sort_order: 3 },
    subcategory: { id: 'cat-3-2', name: 'Legal', slug: 'legal', parent_id: 'cat-3', is_active: true, sort_order: 2 },
    business_type: ['service_provider'],
    year_established: 2012,
    description: 'Specializing in corporate law, international trade agreements, and startup scaling. Trusted legal partner for 200+ businesses.',
    tagline: 'Justice, Integrity, Results',
    logo_url: '/mock/vanguard-logo.png',
    cover_image_url: '/mock/vanguard-cover.jpg',
    status: 'approved',
    is_featured: false,
    is_women_owned: false,
    is_startup: false,
    online_delivery: false,
    franchise_available: false,
    verification_level: 1,
    created_at: '2024-05-20',
    updated_at: '2024-10-18',
  },
  {
    id: 'biz-5',
    owner_id: 'user-8',
    name: 'Ironclad Industries',
    slug: 'ironclad-industries',
    category_id: 'cat-1',
    subcategory_id: 'cat-1-2',
    category: { id: 'cat-1', name: 'Manufacturing', slug: 'manufacturing', parent_id: null, is_active: true, sort_order: 1 },
    subcategory: { id: 'cat-1-2', name: 'Machinery', slug: 'machinery', parent_id: 'cat-1', is_active: true, sort_order: 2 },
    business_type: ['manufacturer', 'exporter'],
    year_established: 2008,
    description: 'Precision manufacturing of industrial machinery and components for the automotive and aerospace sectors.',
    tagline: 'Built to Last, Engineered to Excel',
    logo_url: '/mock/ironclad-logo.png',
    cover_image_url: '/mock/ironclad-cover.jpg',
    status: 'approved',
    is_featured: false,
    is_women_owned: false,
    is_startup: false,
    online_delivery: false,
    franchise_available: false,
    verification_level: 3,
    created_at: '2024-04-12',
    updated_at: '2024-10-15',
  },
  {
    id: 'biz-6',
    owner_id: 'user-9',
    name: 'Skyline Legal Associates',
    slug: 'skyline-legal-associates',
    category_id: 'cat-3',
    subcategory_id: 'cat-3-2',
    category: { id: 'cat-3', name: 'Professional Services', slug: 'professional-services', parent_id: null, is_active: true, sort_order: 3 },
    business_type: ['service_provider'],
    year_established: 2010,
    description: 'Specializing in corporate law, international trade agreements, and startup scaling.',
    tagline: 'Your Legal Partner for Growth',
    status: 'approved',
    is_featured: true,
    is_women_owned: false,
    is_startup: false,
    online_delivery: false,
    franchise_available: false,
    verification_level: 3,
    created_at: '2024-03-08',
    updated_at: '2024-10-22',
    location: { id: 'loc-6', business_id: 'biz-6', country: 'UAE', state: 'Dubai', district: 'Dubai', city: 'Dubai', address: 'DIFC Tower, Level 12', pincode: '000000' },
  },
  {
    id: 'biz-7',
    owner_id: 'user-3',
    name: 'Apex Dental Studio',
    slug: 'apex-dental-studio',
    category_id: 'cat-5',
    subcategory_id: 'cat-5-2',
    category: { id: 'cat-5', name: 'Healthcare', slug: 'healthcare', parent_id: null, is_active: true, sort_order: 5 },
    business_type: ['service_provider'],
    year_established: 2016,
    description: 'Premium cosmetic dentistry and oral health consultations using state-of-the-art technology.',
    tagline: 'Smile with Confidence',
    status: 'approved',
    is_featured: true,
    is_women_owned: false,
    is_startup: false,
    online_delivery: false,
    franchise_available: false,
    verification_level: 3,
    created_at: '2024-05-01',
    updated_at: '2024-10-20',
    location: { id: 'loc-7', business_id: 'biz-7', country: 'India', state: 'Maharashtra', district: 'Mumbai', city: 'Mumbai', address: 'Bandra West', pincode: '400050' },
  },
  {
    id: 'biz-8',
    owner_id: 'user-10',
    name: 'Vivid Design Hub',
    slug: 'vivid-design-hub',
    category_id: 'cat-9',
    subcategory_id: 'cat-9-3',
    category: { id: 'cat-9', name: 'Creative Services', slug: 'creative-services', parent_id: null, is_active: true, sort_order: 9 },
    business_type: ['service_provider'],
    year_established: 2019,
    description: 'Full-stack digital agency specializing in branding, UI/UX design, and social media.',
    tagline: 'Design that Speaks',
    status: 'approved',
    is_featured: true,
    is_women_owned: true,
    is_startup: true,
    online_delivery: true,
    franchise_available: false,
    verification_level: 3,
    created_at: '2024-06-20',
    updated_at: '2024-10-23',
    location: { id: 'loc-8', business_id: 'biz-8', country: 'Kenya', state: 'Nairobi County', district: 'Nairobi', city: 'Nairobi', address: 'Westlands Business Park', pincode: '00100' },
  },
];

// Pending businesses for moderator/admin queues
export const mockPendingBusinesses: Business[] = [
  {
    id: 'biz-p1', owner_id: 'user-8', name: 'Vortex Solutions Ltd.', slug: 'vortex-solutions',
    category_id: 'cat-4', business_type: ['service_provider'], year_established: 2021,
    description: 'Cloud computing solutions provider.',
    status: 'pending_review', is_featured: false, is_women_owned: false, is_startup: true,
    online_delivery: true, franchise_available: false, verification_level: 0,
    created_at: '2024-10-24', updated_at: '2024-10-24',
    category: { id: 'cat-4', name: 'Technology', slug: 'technology', parent_id: null, is_active: true, sort_order: 4 },
  },
  {
    id: 'biz-p2', owner_id: 'user-9', name: 'Green Earth Designs', slug: 'green-earth-designs',
    category_id: 'cat-8', business_type: ['service_provider'], year_established: 2019,
    description: 'Sustainable architecture and interior design.',
    status: 'pending_review', is_featured: false, is_women_owned: true, is_startup: false,
    online_delivery: false, franchise_available: false, verification_level: 0,
    created_at: '2024-10-25', updated_at: '2024-10-25',
    category: { id: 'cat-8', name: 'Real Estate & Construction', slug: 'real-estate-construction', parent_id: null, is_active: true, sort_order: 8 },
  },
  {
    id: 'biz-p3', owner_id: 'user-10', name: 'The Daily Grind', slug: 'the-daily-grind',
    category_id: 'cat-7', business_type: ['service_provider'], year_established: 2022,
    description: 'Artisan coffee shop and café.',
    status: 'pending_review', is_featured: false, is_women_owned: false, is_startup: true,
    online_delivery: true, franchise_available: true, verification_level: 0,
    created_at: '2024-10-26', updated_at: '2024-10-26',
    category: { id: 'cat-7', name: 'Hospitality', slug: 'hospitality', parent_id: null, is_active: true, sort_order: 7 },
  },
];

// --- Products/Services ---

export const mockProducts: ProductService[] = [
  {
    id: 'prod-1', business_id: 'biz-1', name: 'Cloud Migration Suite', type: 'service',
    description: 'Complete end-to-end cloud transition services.',
    tags: ['Cloud Computing', 'AWS', 'Azure', 'Migration'], price_from: 4999,
    service_area: 'international', images: [{ id: 'img-1', product_id: 'prod-1', image_url: '/mock/cloud-migration.jpg', sort_order: 1 }],
  },
  {
    id: 'prod-2', business_id: 'biz-1', name: 'Security Audit Pro', type: 'service',
    description: 'Comprehensive vulnerability assessment & reporting.',
    tags: ['Cybersecurity', 'Audit', 'Compliance'], price_from: 1250,
    service_area: 'pan_india', images: [{ id: 'img-2', product_id: 'prod-2', image_url: '/mock/security-audit.jpg', sort_order: 1 }],
  },
  {
    id: 'prod-3', business_id: 'biz-1', name: 'Enterprise Software', type: 'product',
    description: 'Custom enterprise software solutions.',
    tags: ['Enterprise', 'Software', 'Custom Development'], price_from: 9999,
    service_area: 'international', images: [{ id: 'img-3', product_id: 'prod-3', image_url: '/mock/enterprise-sw.jpg', sort_order: 1 }],
  },
];

// --- Verification Documents ---

export const mockVerificationDocs: VerificationDocument[] = [
  { id: 'doc-1', business_id: 'biz-1', doc_type: 'gst', file_url: '/mock/gst-cert.pdf', status: 'approved', reviewed_by: 'user-1', reviewed_at: '2024-01-12', reviewer_name: 'Rtn. Kanishka De Silva', created_at: '2024-01-10' },
  { id: 'doc-2', business_id: 'biz-1', doc_type: 'drr', file_url: '/mock/drr-letter.pdf', status: 'approved', reviewed_by: 'user-2', reviewed_at: '2024-02-05', reviewer_name: 'Ptr. Dilshan Wickremasinghe', created_at: '2024-02-01' },
  { id: 'doc-3', business_id: 'biz-1', doc_type: 'udyam', file_url: '/mock/udyam-cert.pdf', status: 'approved', reviewed_by: 'user-1', reviewed_at: '2024-03-15', reviewer_name: 'Rtn. Kanishka De Silva', created_at: '2024-03-10' },
  // For owner dashboard — mixed statuses
  { id: 'doc-4', business_id: 'biz-3', doc_type: 'gst', file_url: '/mock/gst-cert-2.pdf', status: 'rejected', rejection_reason: 'The uploaded document is blurry. Please re-scan the original certificate in high resolution (300 DPI) ensuring all corners are visible.', reviewed_by: 'user-1', reviewed_at: '2024-10-20', reviewer_name: 'Rtn. Kanishka De Silva', created_at: '2024-10-18' },
  { id: 'doc-5', business_id: 'biz-3', doc_type: 'drr', file_url: '/mock/drr-letter-2.pdf', status: 'rejected', rejection_reason: 'The letter provided is for the previous Rotary tenure. Please upload the official DRR authorization letter for the current 2024-25 year.', reviewed_by: 'user-2', reviewed_at: '2024-10-21', reviewer_name: 'Ptr. Dilshan Wickremasinghe', created_at: '2024-10-19' },
  { id: 'doc-6', business_id: 'biz-3', doc_type: 'udyam', file_url: '/mock/udyam-cert-2.pdf', status: 'in_review', created_at: '2024-10-22' },
  // Pending docs for moderator queue
  { id: 'doc-7', business_id: 'biz-p1', doc_type: 'gst', file_url: '/mock/gst-pending.pdf', status: 'pending', created_at: '2024-10-24' },
  { id: 'doc-8', business_id: 'biz-p2', doc_type: 'drr', file_url: '/mock/drr-pending.pdf', status: 'pending', created_at: '2024-10-25' },
  { id: 'doc-9', business_id: 'biz-p3', doc_type: 'gst', file_url: '/mock/gst-pending-2.pdf', status: 'pending', created_at: '2024-10-26' },
];

// --- Enquiries ---

export const mockEnquiries: Enquiry[] = [
  { id: 'enq-1', business_id: 'biz-1', from_name: 'Rtr. Michael Fernandez', from_contact: 'michael@apex-global.com', from_organization: 'Rotaract Club of Sydney Harbour', message: 'Interested in enterprise cloud infrastructure audit services for our platform.', service_requested: 'Software Consulting', status: 'new', created_at: '2024-10-24' },
  { id: 'enq-2', business_id: 'biz-1', from_name: 'Rtr. Alisha Fernandez', from_contact: 'alisha@studiobloom.design', from_organization: 'Rotaract Club of Bangalore West', message: 'Looking for a technical API integration partner for our visual design platform.', service_requested: 'API Integration', status: 'replied', created_at: '2024-10-22' },
  { id: 'enq-3', business_id: 'biz-1', from_name: 'Rtr. Marcus Reed', from_contact: 'marcus@founderhouse.co', from_organization: 'Rotaract District 3220 Secretariat', message: 'Need custom web portal development for our upcoming District Assembly.', service_requested: 'Web Development', status: 'replied', created_at: '2024-10-20' },
  { id: 'enq-4', business_id: 'biz-1', from_name: 'Rtr. Priya Sharma', from_contact: 'priya@techinnovations.in', message: 'Requesting NDA & quote for custom cross-platform mobile app development.', service_requested: 'App Development', status: 'new', created_at: '2024-10-19' },
  { id: 'enq-5', business_id: 'biz-1', from_name: 'Rtr. David Wilson', from_contact: 'david@wilsonenterprises.com', from_organization: 'Rotary Club of Colombo East', message: 'Inquiring about cybersecurity vulnerability audit services for our firm.', service_requested: 'Security Audit', status: 'read', created_at: '2024-10-17' },
];

// --- Admin Actions (Audit Log) ---

export const mockAdminActions: AdminAction[] = [
  { id: 'act-1', admin_id: 'user-1', admin_name: 'Rtn. Kanishka De Silva', admin_role: 'Super Admin', action: 'Verified Business', action_type: 'verified_business', target_table: 'businesses', target_id: 'biz-2', target_name: 'Nexus Analytics', reason: 'GST Registration & DRR Endorsement Letter verified.', timestamp: '2024-10-24T09:42:00Z' },
  { id: 'act-2', admin_id: 'user-2', admin_name: 'Ptr. Dilshan Wickremasinghe', admin_role: 'District Moderator', action: 'Tier Upgraded', action_type: 'tier_upgraded', target_table: 'businesses', target_id: 'biz-3', target_name: 'Studio Bloom', reason: 'Recommended for Silver Tier approval after document inspection.', timestamp: '2024-10-23T14:15:00Z' },
  { id: 'act-3', admin_id: 'user-7', admin_name: 'Rtr. Ayodeji Balogun', admin_role: 'District Moderator', action: 'Verification Denied', action_type: 'verification_denied', target_table: 'businesses', target_id: 'biz-4', target_name: 'Vanguard Legal', reason: 'Missing valid DRR endorsement letter for current year.', timestamp: '2024-10-23T11:05:00Z' },
  { id: 'act-4', admin_id: 'user-9', admin_name: 'Rtr. Arjun Mehta', admin_role: 'Past District Rotaract Representative', action: 'Profile Edit', action_type: 'profile_edit', target_table: 'businesses', target_id: 'biz-6', target_name: 'Skyline Legal Associates', reason: 'Updated office contact details and service offerings.', timestamp: '2024-10-22T17:30:00Z' },
  { id: 'act-5', admin_id: 'user-1', admin_name: 'Rtn. Kanishka De Silva', admin_role: 'Super Admin', action: 'New Member', action_type: 'new_member', target_table: 'businesses', target_id: 'biz-1', target_name: 'Lumina Digital Solutions', reason: 'Approved initial business profile registration.', timestamp: '2024-10-22T09:12:00Z' },
];

// --- Moderator Assignments ---

export const mockModeratorAssignments: ModeratorAssignment[] = [
  { id: 'ma-1', moderator_id: 'user-2', district_number: 3220, assigned_by: 'user-1', assigned_at: '2024-02-15', moderator: mockUsers[1] },
  { id: 'ma-2', moderator_id: 'user-5', district_number: 9125, assigned_by: 'user-1', assigned_at: '2024-03-01', moderator: mockUsers[4] },
  { id: 'ma-3', moderator_id: 'user-7', district_number: 9110, assigned_by: 'user-1', assigned_at: '2024-06-12', moderator: mockUsers[6] },
];

// --- Analytics ---

export const mockAdminAnalytics: DashboardAnalytics = {
  total_businesses: 4822,
  total_businesses_change: 12,
  gold_tier_count: 1240,
  gold_tier_percentage: 25.7,
  silver_tier_count: 2115,
  silver_tier_percentage: 43.8,
  unverified_count: 842,
  pending_verifications: 42,
  monthly_registrations: [
    { month: 'Jan', businesses: 80, users: 120 },
    { month: 'Feb', businesses: 120, users: 180 },
    { month: 'Mar', businesses: 150, users: 250 },
    { month: 'Apr', businesses: 200, users: 350 },
    { month: 'May', businesses: 280, users: 500 },
    { month: 'Jun', businesses: 350, users: 650 },
    { month: 'Jul', businesses: 420, users: 800 },
    { month: 'Aug', businesses: 500, users: 1000 },
    { month: 'Sep', businesses: 600, users: 1200 },
    { month: 'Oct', businesses: 700, users: 1500 },
    { month: 'Nov', businesses: 820, users: 1800 },
    { month: 'Dec', businesses: 1000, users: 2200 },
  ],
  category_breakdown: [
    { name: 'Technology', percentage: 34, color: '#9B1B30' },
    { name: 'Creative', percentage: 22, color: '#4A90D9' },
    { name: 'Finance', percentage: 18, color: '#C7A94F' },
    { name: 'Others', percentage: 26, color: '#333333' },
  ],
  districts_without_moderators: [3220, 9100, 1240],
};

export const mockModeratorStats: ModeratorDashboardStats = {
  pending_verifications: 24,
  pending_change: 3,
  active_businesses: 142,
  active_verified_percentage: 98,
  monthly_claims: 58,
  avg_turnaround: '4h',
  district_health_score: 9.4,
  district_health_percentile: 'Top 5%',
};

export const mockOwnerStats: OwnerDashboardStats = {
  profile_completeness: 75,
  profile_impressions: 2840,
  impressions_change: 12,
  total_enquiries: 15,
  unread_enquiries: 2,
};
