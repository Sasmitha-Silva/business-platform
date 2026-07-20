// ==========================================
// Rotaract Business Network — Constants
// ==========================================

export const VERIFICATION_TIERS = {
  level_1: {
    label: 'GST Verified',
    shortLabel: 'Bronze Tier',
    badge: 'BRONZE TIER',
    color: 'bronze',
    bgClass: 'bg-amber-100 text-amber-800',
    dotClass: 'bg-amber-500',
    description: 'GST Certificate verified by Super Admin',
    docs: ['gst'],
  },
  level_2: {
    label: 'GST + DRR Verified',
    shortLabel: 'Silver Tier',
    badge: 'SILVER TIER',
    color: 'silver',
    bgClass: 'bg-slate-100 text-slate-700',
    dotClass: 'bg-slate-400',
    description: 'GST + DRR Recommendation verified by District Moderator',
    docs: ['gst', 'drr'],
  },
  level_3: {
    label: 'GST + DRR + Udyam Verified',
    shortLabel: 'Gold Tier',
    badge: 'GOLD TIER',
    color: 'gold',
    bgClass: 'bg-yellow-100 text-yellow-800',
    dotClass: 'bg-yellow-500',
    description: 'GST + DRR + Udyam fully verified by Super Admin',
    docs: ['gst', 'drr', 'udyam'],
  },
} as const;

export const BUSINESS_STATUSES = {
  draft: { label: 'Draft', color: 'gray' },
  pending_review: { label: 'Pending Review', color: 'yellow' },
  approved: { label: 'Approved', color: 'green' },
  rejected: { label: 'Rejected', color: 'red' },
  suspended: { label: 'Suspended', color: 'red' },
} as const;

export const DOC_STATUSES = {
  pending: { label: 'Pending', bgClass: 'bg-yellow-100 text-yellow-800' },
  in_review: { label: 'In Review', bgClass: 'bg-blue-100 text-blue-800' },
  approved: { label: 'Approved', bgClass: 'bg-green-100 text-green-800' },
  rejected: { label: 'Review Failed', bgClass: 'bg-red-100 text-red-800' },
} as const;

export const DOC_TYPES = {
  gst: {
    label: 'GST Certificate',
    description: 'Government Issued Goods and Services Tax Registration (Form REG-06).',
    fileTypes: 'PDF, JPG up to 5MB',
    tier: 'level_1',
  },
  drr: {
    label: 'DRR Letter',
    description: 'District Rotaract Representative authorization letter for current year.',
    fileTypes: 'PDF only',
    tier: 'level_2',
  },
  udyam: {
    label: 'Udyam Registry',
    description: 'MSME Registration Certificate from Ministry of Micro, Small & Medium Enterprises.',
    fileTypes: 'PDF, JPG up to 5MB',
    tier: 'level_3',
  },
} as const;

export const BUSINESS_TYPES = [
  { value: 'manufacturer', label: 'Manufacturer' },
  { value: 'trader', label: 'Trader' },
  { value: 'service_provider', label: 'Service Provider' },
  { value: 'exporter', label: 'Exporter' },
  { value: 'importer', label: 'Importer' },
  { value: 'franchise', label: 'Franchise' },
] as const;

export const SERVICE_AREAS = [
  { value: 'local', label: 'Local' },
  { value: 'state', label: 'State' },
  { value: 'pan_india', label: 'Pan India' },
  { value: 'international', label: 'International' },
] as const;

export const ENQUIRY_STATUSES = {
  new: { label: 'New', bgClass: 'bg-red-100 text-red-700' },
  read: { label: 'Read', bgClass: 'bg-blue-100 text-blue-700' },
  replied: { label: 'Replied', bgClass: 'bg-green-100 text-green-700' },
} as const;

export const ADMIN_ACTION_BADGES: Record<string, { label: string; bgClass: string }> = {
  verified_business: { label: 'Verified Business', bgClass: 'bg-green-100 text-green-700' },
  tier_upgraded: { label: 'Tier Upgraded', bgClass: 'bg-blue-100 text-blue-700' },
  verification_denied: { label: 'Verification Denied', bgClass: 'bg-red-100 text-red-700' },
  profile_edit: { label: 'Profile Edit', bgClass: 'bg-purple-100 text-purple-700' },
  new_member: { label: 'New Member', bgClass: 'bg-teal-100 text-teal-700' },
  suspended: { label: 'Suspended', bgClass: 'bg-red-100 text-red-700' },
  featured: { label: 'Featured', bgClass: 'bg-yellow-100 text-yellow-700' },
  moderator_assigned: { label: 'Moderator Assigned', bgClass: 'bg-indigo-100 text-indigo-700' },
  category_added: { label: 'Category Added', bgClass: 'bg-pink-100 text-pink-700' },
} as const;

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'verification_tier', label: 'Verification Tier' },
  { value: 'newest', label: 'Newest First' },
  { value: 'established', label: 'Years in Business' },
] as const;

export const NAV_LINKS = [
  { href: '/directory', label: 'Directory' },
  { href: '/categories', label: 'Categories' },
  { href: '/how-it-works', label: 'How it Works' },
] as const;

export const OWNER_SIDEBAR_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/directory', label: 'Directory', icon: 'Building2' },
  { href: '/business/lumina-digital-solutions', label: 'My Business Profile', icon: 'Store' },
  { href: '/verification', label: 'Verifications', icon: 'ShieldCheck' },
  { href: '/dashboard/enquiries', label: 'Enquiries', icon: 'ClipboardList' },
  { href: '/dashboard/settings', label: 'Settings', icon: 'Settings' },
] as const;

export const MODERATOR_SIDEBAR_LINKS = [
  { href: '/moderator', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/moderator/verification', label: 'Verification Queue', icon: 'ShieldCheck' },
  { href: '/moderator/directory', label: 'District Directory', icon: 'Building2' },
  { href: '/moderator/history', label: 'Audit History', icon: 'ClipboardList' },
  { href: '/moderator/settings', label: 'Settings', icon: 'Settings' },
] as const;

export const ADMIN_SIDEBAR_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/admin/verifications', label: 'Verifications', icon: 'ShieldCheck' },
  { href: '/admin/categories', label: 'Categories', icon: 'FolderTree' },
  { href: '/admin/users', label: 'Users', icon: 'Users' },
  { href: '/admin/moderators', label: 'Moderators', icon: 'UserCog' },
  { href: '/admin/audit-log', label: 'Audit Log', icon: 'ClipboardList' },
  { href: '/admin/analytics', label: 'Analytics', icon: 'BarChart3' },
  { href: '/admin/settings', label: 'Settings', icon: 'Settings' },
] as const;

export const WIZARD_STEPS = [
  { id: 1, label: 'Account', icon: 'UserCircle', description: 'Rotaractor Details' },
  { id: 2, label: 'Business Info', icon: 'Building2', description: 'Business Profile' },
  { id: 3, label: 'Location', icon: 'MapPin', description: 'Location & Contact' },
  { id: 4, label: 'Launch', icon: 'Rocket', description: 'Review & Submit' },
] as const;
