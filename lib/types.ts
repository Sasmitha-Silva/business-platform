// ==========================================
// Rotaract Business Network — Type Definitions
// ==========================================

// --- Enums ---

export type UserRole = 'super_admin' | 'moderator' | 'owner' | 'public';

export type BusinessStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'suspended';

export type VerificationTier = 'level_1' | 'level_2' | 'level_3';

export type VerificationDocType = 'gst' | 'drr' | 'udyam';

export type VerificationDocStatus =
  | 'pending'
  | 'in_review'
  | 'approved'
  | 'rejected';

export type ProductServiceType = 'product' | 'service';

export type ServiceArea =
  | 'local'
  | 'state'
  | 'pan_india'
  | 'international';

export type BusinessType =
  | 'manufacturer'
  | 'trader'
  | 'service_provider'
  | 'exporter'
  | 'importer'
  | 'franchise';

export type EnquiryStatus = 'new' | 'read' | 'replied';

// --- Core Entities ---

export interface User {
  id: string;
  role: UserRole;
  email: string;
  phone?: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  is_active: boolean;
}

export interface RotaractProfile {
  user_id: string;
  club_name: string;
  district_number: number;
  rotary_id?: string;
  designation?: string;
  years_in_rotaract: number;
  is_active: boolean;
  is_alumni: boolean;
}

export interface ModeratorAssignment {
  id: string;
  moderator_id: string;
  district_number: number;
  assigned_by: string;
  assigned_at: string;
  moderator?: User;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  icon?: string;
  is_active: boolean;
  sort_order: number;
  children?: Category[];
  business_count?: number;
}

export interface Business {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  legal_name?: string;
  brand_name?: string;
  category_id: string;
  subcategory_id?: string;
  category?: Category;
  subcategory?: Category;
  business_type: BusinessType[];
  year_established: number;
  description: string;
  tagline?: string;
  logo_url?: string;
  cover_image_url?: string;
  status: BusinessStatus;
  is_featured: boolean;
  is_women_owned: boolean;
  is_startup: boolean;
  online_delivery: boolean;
  franchise_available: boolean;
  verification_level: number; // 0, 1, 2, 3
  created_at: string;
  updated_at: string;
  // Relations
  owner?: User;
  rotaract_profile?: RotaractProfile;
  location?: BusinessLocation;
  contact?: BusinessContact;
  products_services?: ProductService[];
  verification_documents?: VerificationDocument[];
}

export interface BusinessLocation {
  id: string;
  business_id: string;
  country: string;
  state: string;
  district: string;
  city: string;
  area?: string;
  address: string;
  pincode: string;
  maps_link?: string;
}

export interface BusinessContact {
  id: string;
  business_id: string;
  mobile: string;
  alt_mobile?: string;
  email: string;
  website?: string;
  whatsapp?: string;
  social_links: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface VerificationDocument {
  id: string;
  business_id: string;
  doc_type: VerificationDocType;
  file_url: string;
  status: VerificationDocStatus;
  reviewed_by?: string;
  reviewed_at?: string;
  reviewer_name?: string;
  rejection_reason?: string;
  claimed_by?: string;
  claimed_at?: string;
  created_at: string;
  business?: Business;
}

export interface ProductService {
  id: string;
  business_id: string;
  name: string;
  type: ProductServiceType;
  category_id?: string;
  description: string;
  tags: string[];
  price_from?: number;
  service_area: ServiceArea;
  brochure_url?: string;
  images: ProductImage[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  sort_order: number;
}

export interface Enquiry {
  id: string;
  business_id: string;
  from_name: string;
  from_contact: string;
  from_organization?: string;
  message: string;
  service_requested?: string;
  status: EnquiryStatus;
  created_at: string;
  business?: Business;
}

export interface AdminAction {
  id: string;
  admin_id: string;
  admin_name: string;
  admin_role: string;
  action: string;
  action_type: 'verified_business' | 'tier_upgraded' | 'verification_denied' | 'profile_edit' | 'new_member' | 'suspended' | 'unsuspended' | 'featured' | 'unfeatured' | 'moderator_assigned' | 'moderator_removed' | 'category_added' | 'category_edited';
  target_table: string;
  target_id: string;
  target_name: string;
  reason?: string;
  timestamp: string;
}

// --- Analytics ---

export interface DashboardAnalytics {
  total_businesses: number;
  total_businesses_change: number;
  gold_tier_count: number;
  gold_tier_percentage: number;
  silver_tier_count: number;
  silver_tier_percentage: number;
  unverified_count: number;
  pending_verifications: number;
  monthly_registrations: { month: string; businesses: number; users: number }[];
  category_breakdown: { name: string; percentage: number; color: string }[];
  districts_without_moderators: number[];
}

export interface ModeratorDashboardStats {
  pending_verifications: number;
  pending_change: number;
  active_businesses: number;
  active_verified_percentage: number;
  monthly_claims: number;
  avg_turnaround: string;
  district_health_score: number;
  district_health_percentile: string;
}

export interface OwnerDashboardStats {
  profile_completeness: number;
  profile_impressions: number;
  impressions_change: number;
  total_enquiries: number;
  unread_enquiries: number;
}

// --- Filter/Search ---

export interface DirectoryFilters {
  search?: string;
  category_id?: string;
  subcategory_id?: string;
  verification_tier?: VerificationTier[];
  country?: string;
  state?: string;
  district?: string;
  city?: string;
  business_type?: BusinessType[];
  is_women_owned?: boolean;
  is_startup?: boolean;
  online_delivery?: boolean;
  franchise_available?: boolean;
  years_min?: number;
  sort_by?: 'relevance' | 'newest' | 'verification_tier' | 'established';
  page?: number;
  per_page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}
