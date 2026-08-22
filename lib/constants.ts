// ==========================================
// Rotaract Business Network — Constants
// ==========================================

export const VERIFICATION_TIERS = {
  level_1: {
    label: 'GST Verified',
    shortLabel: 'GST Verified',
    badge: 'GST Verified',
    color: 'blue',
    bgClass: 'bg-blue-50 text-blue-700 border border-blue-200',
    dotClass: 'bg-blue-500',
    description: 'Official GST / BRN government registration verified',
    docs: ['gst'],
  },
  level_2: {
    label: 'DRR Verified',
    shortLabel: 'DRR Verified',
    badge: 'DRR Verified',
    color: 'crimson',
    bgClass: 'bg-pink-50 text-[#D41367] border border-pink-200',
    dotClass: 'bg-[#D41367]',
    description: 'District Rotaract Representative (DRR) endorsement verified',
    docs: ['drr', 'gst'],
  },
  level_3: {
    label: 'DRR Verified',
    shortLabel: 'DRR Verified',
    badge: 'DRR Verified',
    color: 'crimson',
    bgClass: 'bg-pink-50 text-[#D41367] border border-pink-200',
    dotClass: 'bg-[#D41367]',
    description: 'District Rotaract Representative (DRR) endorsement verified',
    docs: ['drr', 'gst'],
  },
} as const;

export const VERIFICATION_BADGES = {
  0: { label: 'Standard Listing', badge: '', description: 'Standard Rotaract directory listing' },
  1: { label: 'GST Verified', badge: 'GST Verified', description: 'Tax & GST registration verified' },
  2: { label: 'DRR Verified', badge: 'DRR Verified', description: 'District Rotaract Representative endorsed' },
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
    label: 'GST / BRN Certificate',
    description: 'Government Issued Goods and Services Tax / Business Registration Certificate.',
    fileTypes: 'PDF, JPG up to 5MB',
    tier: 'level_1',
  },
  drr: {
    label: 'DRR Endorsement Letter',
    description: 'District Rotaract Representative official recommendation letter for current tenure.',
    fileTypes: 'PDF only',
    tier: 'level_2',
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

export const INQUIRY_STATUSES = {
  new: { label: 'New', bgClass: 'bg-red-100 text-red-700' },
  read: { label: 'Read', bgClass: 'bg-blue-100 text-blue-700' },
  replied: { label: 'Replied', bgClass: 'bg-green-100 text-green-700' },
} as const;

export const ENQUIRY_STATUSES = INQUIRY_STATUSES;

export const DEACTIVATION_REASON_CATEGORIES = {
  inactivity: {
    label: 'Prolonged Inactivity',
    description: 'No business activity, dormant profile, or invalid contact methods for over 6 months.',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  policy_violation: {
    label: 'Rotaract Policy & Ethics Violation',
    description: 'Breach of Rotaract ethical guidelines, business conduct, or commercial standards.',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
  },
  fraudulent_info: {
    label: 'Fraudulent or Misleading Information',
    description: 'Falsified verification documents, deceptive claims, or unverified Rotary affiliation.',
    badgeClass: 'bg-red-100 text-red-800 border-red-200',
  },
  ceased_operations: {
    label: 'Ceased Commercial Operations',
    description: 'Entity has officially closed down, dissolved, or ceased active trading.',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
  },
  unresponsive: {
    label: 'Unresponsive to District Audit',
    description: 'Failed to respond to multiple district compliance communications or document refresh requests.',
    badgeClass: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  other: {
    label: 'Other District Concern',
    description: 'Specific governance, legal, or regional compliance issues requiring administrator intervention.',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
  },
} as const;

export const DEACTIVATION_STATUS_BADGES = {
  pending: { label: 'Pending Admin Review', bgClass: 'bg-amber-100 text-amber-800 border-amber-200' },
  approved: { label: 'Deactivated by Admin', bgClass: 'bg-rose-100 text-rose-800 border-rose-200' },
  rejected: { label: 'Request Dismissed', bgClass: 'bg-slate-100 text-slate-700 border-slate-200' },
} as const;

export const DEACTIVATION_URGENCY_BADGES = {
  low: { label: 'Low', bgClass: 'bg-slate-100 text-slate-700 border-slate-200' },
  medium: { label: 'Medium', bgClass: 'bg-blue-100 text-blue-800 border-blue-200' },
  high: { label: 'High', bgClass: 'bg-orange-100 text-orange-800 border-orange-200' },
  critical: { label: 'Critical Violation', bgClass: 'bg-red-100 text-red-800 border-red-200' },
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
  deactivation_approved: { label: 'Deactivation Approved', bgClass: 'bg-rose-100 text-rose-700' },
  deactivation_dismissed: { label: 'Deactivation Dismissed', bgClass: 'bg-slate-100 text-slate-700' },
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
  { href: '/business-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/business-dashboard/edit-profile', label: 'Edit Profile', icon: 'Edit3' },
  { href: '/business-dashboard/verification', label: 'Verifications', icon: 'ShieldCheck' },
  { href: '/business-dashboard/enquiries', label: 'Inquiries', icon: 'ClipboardList' },
  { href: '/business-dashboard/settings', label: 'Settings', icon: 'Settings' },
] as const;

export const MODERATOR_SIDEBAR_LINKS = [
  { href: '/moderator-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/moderator-dashboard/verification', label: 'Verification Queue', icon: 'ShieldCheck' },
  { href: '/moderator-dashboard/directory', label: 'District Directory', icon: 'Building2' },
  { href: '/moderator-dashboard/history', label: 'Audit History', icon: 'ClipboardList' },
  { href: '/moderator-dashboard/settings', label: 'Settings', icon: 'Settings' },
] as const;

export const ADMIN_SIDEBAR_LINKS = [
  { href: '/admin-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/admin-dashboard/verifications', label: 'Verifications', icon: 'ShieldCheck' },
  { href: '/admin-dashboard/categories', label: 'Categories', icon: 'FolderTree' },
  { href: '/admin-dashboard/users', label: 'Users', icon: 'Users' },
  { href: '/admin-dashboard/moderators', label: 'Moderators', icon: 'UserCog' },
  { href: '/admin-dashboard/analytics', label: 'Analytics', icon: 'BarChart3' },
  { href: '/admin-dashboard/settings', label: 'Settings', icon: 'Settings' },
] as const;

export const WIZARD_STEPS = [
  { id: 1, label: 'Account', icon: 'UserCircle', description: 'Rotaractor Details' },
  { id: 2, label: 'Business Info', icon: 'Building2', description: 'Business Profile' },
  { id: 3, label: 'Location', icon: 'MapPin', description: 'Location & Contact' },
  { id: 4, label: 'Launch', icon: 'Rocket', description: 'Review & Submit' },
] as const;
