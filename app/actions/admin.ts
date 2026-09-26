'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendModeratorAppointmentEmail } from '@/lib/email/resend';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';
import type {
  Business,
  BusinessStatus,
  Category,
  BusinessDeactivationRequest,
  AdminAction,
  DashboardAnalytics,
} from '@/lib/types';

/**
 * SECURITY: Verify the calling user is a super_admin.
 * Must be called at the top of every admin-only server action.
 */
async function requireSuperAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized: not authenticated');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_active')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'super_admin' || !profile.is_active) {
    throw new Error('Unauthorized: requires super_admin role');
  }

  return { supabase, user, profile };
}

function generateSecurePassword(): string {
  return crypto.randomBytes(12).toString('base64url').slice(0, 16) + '!A1';
}

/**
 * 1. Fetch All Directory Businesses for Super Admin
 */
export async function getAllBusinessesAdminAction(): Promise<Business[]> {
  try {
    const { supabase } = await requireSuperAdmin();
    const { data, error } = await supabase
      .from('businesses')
      .select(
        `
        *,
        category:categories!businesses_category_id_fkey(*),
        subcategory:categories!businesses_subcategory_id_fkey(*),
        location:business_locations(*),
        contact:business_contacts(*),
        owner:profiles!businesses_owner_id_fkey(
          full_name,
          email,
          rotaract_profile:rotaract_profiles(*)
        )
      `
      )
      .order('created_at', { ascending: false });

    if (error || !data) {
      if (error) console.error('Error in getAllBusinessesAdminAction:', error);
      return [];
    }

    const formatted = data.map((b: any) => ({
      ...b,
      location: Array.isArray(b.location) ? b.location[0] || null : b.location,
      contact: Array.isArray(b.contact) ? b.contact[0] || null : b.contact,
      rotaract_profile: Array.isArray(b.owner?.rotaract_profile)
        ? b.owner?.rotaract_profile[0] || null
        : b.owner?.rotaract_profile || null,
    }));

    return formatted as unknown as Business[];
  } catch (error) {
    console.error('Error fetching admin businesses:', error);
    return [];
  }
}

/**
 * 2. Update Business Status (Approve / Suspend / Reject)
 */
export async function updateBusinessStatusAdminAction(
  businessId: string,
  status: BusinessStatus,
  reason?: string
) {
  try {
    const { supabase, user } = await requireSuperAdmin();

    const { data: business, error } = await supabase
      .from('businesses')
      .update({ status })
      .eq('id', businessId)
      .select('name')
      .single();

    if (error) throw error;

    // Log in admin_audit_logs
    await supabase.from('admin_audit_logs').insert({
      actor_id: user.id,
      actor_role: 'super_admin',
      action_type: status === 'suspended' ? 'suspended' : status === 'approved' ? 'verified_business' : 'unsuspended',
      target_table: 'businesses',
      target_id: businessId,
      target_name: business?.name || 'Business',
      details: { status, reason },
    });

    revalidatePath('/admin-dashboard');
    revalidatePath('/directory');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update status' };
  }
}

/**
 * 3. Toggle Featured Status
 */
export async function toggleBusinessFeatureAdminAction(
  businessId: string,
  isFeatured: boolean
) {
  try {
    const { supabase } = await requireSuperAdmin();
    const { error } = await supabase
      .from('businesses')
      .update({ is_featured: isFeatured })
      .eq('id', businessId);

    if (error) throw error;

    revalidatePath('/admin-dashboard');
    revalidatePath('/directory');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update featured flag' };
  }
}

/**
 * 4. Fetch All District Moderators & Assignments
 */
export async function getModeratorsAdminAction(): Promise<any[]> {
  try {
    const { supabase } = await requireSuperAdmin();
    const { data, error } = await supabase
      .from('moderator_assignments')
      .select(
        `
        id,
        district_number,
        assigned_at,
        moderator:profiles!moderator_assignments_moderator_id_fkey(
          id, full_name, email, role, is_active, phone
        )
      `
      )
      .order('district_number', { ascending: true });

    if (error || !data) {
      return [];
    }

    return data;
  } catch {
    return [];
  }
}

/**
 * 5. Create or Assign Moderator to District
 */
export async function createOrAssignModeratorAdminAction({
  email,
  fullName,
  districtNumber,
  clubName,
  phone,
}: {
  email: string;
  fullName: string;
  districtNumber: number;
  clubName?: string;
  phone?: string;
}) {
  try {
    const { supabase, user } = await requireSuperAdmin();

    const admin = createAdminClient();
    const cleanEmail = email.trim().toLowerCase();

    // 1. Check if user profile already exists
    const { data: existingProfile } = await admin
      .from('profiles')
      .select('id, role')
      .eq('email', cleanEmail)
      .maybeSingle();

    let moderatorId = existingProfile?.id;
    let tempPassword: string | undefined;

    if (!moderatorId) {
      tempPassword = generateSecurePassword();

      // 2. Create Auth User in auth.users with unique random password
      const { data: authData, error: authError } = await admin.auth.admin.createUser({
        email: cleanEmail,
        password: tempPassword,
        email_confirm: true,
        user_metadata: { full_name: fullName.trim() },
      });

      if (authError || !authData?.user) {
        throw new Error(authError?.message || 'Failed to create user account');
      }

      moderatorId = authData.user.id;

      // 3. Upsert profile
      await admin.from('profiles').upsert({
        id: moderatorId,
        email: cleanEmail,
        full_name: fullName.trim(),
        role: 'moderator',
        is_active: true,
        phone: phone || null,
      });

      // 4. Insert rotaract profile
      await admin.from('rotaract_profiles').upsert({
        user_id: moderatorId,
        club_name: clubName?.trim() || `District ${districtNumber} Secretariat`,
        district_number: districtNumber,
        is_active: true,
        years_in_rotaract: 1,
        is_alumni: false,
      });
    } else if (existingProfile) {
      // Elevate existing user to moderator
      if (existingProfile.role !== 'super_admin') {
        await admin
          .from('profiles')
          .update({ role: 'moderator', full_name: fullName.trim() })
          .eq('id', moderatorId);
      }
    }

    // 5. Check if already assigned to this district
    const { data: existingAssignment } = await admin
      .from('moderator_assignments')
      .select('id')
      .eq('moderator_id', moderatorId)
      .eq('district_number', districtNumber)
      .maybeSingle();

    if (!existingAssignment) {
      const { error: assignError } = await admin.from('moderator_assignments').insert({
        moderator_id: moderatorId,
        district_number: districtNumber,
        assigned_by: user.id,
      });
      if (assignError) throw assignError;
    }

    // 6. Send official appointment email via Resend
    await sendModeratorAppointmentEmail({
      to: cleanEmail,
      fullName: fullName.trim(),
      districtNumber,
      isNewAccount: !existingProfile,
      temporaryPassword: !existingProfile ? tempPassword : undefined,
    }).catch((e) => console.error('Failed to send appointment email:', e));

    revalidatePath('/admin-dashboard/moderators');
    revalidatePath('/admin-dashboard/users');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to appoint moderator' };
  }
}

/**
 * 6. Remove Moderator Assignment
 */
export async function removeModeratorAssignmentAction(assignmentId: string) {
  try {
    const { user } = await requireSuperAdmin();
    const admin = createAdminClient();

    // Get assignment details first to see who the moderator was
    const { data: assignment } = await admin
      .from('moderator_assignments')
      .select('moderator_id')
      .eq('id', assignmentId)
      .maybeSingle();

    const { error } = await admin
      .from('moderator_assignments')
      .delete()
      .eq('id', assignmentId);

    if (error) throw error;

    if (assignment?.moderator_id) {
      // Check if user still has other district assignments
      const { count } = await admin
        .from('moderator_assignments')
        .select('*', { count: 'exact', head: true })
        .eq('moderator_id', assignment.moderator_id);

      if (!count || count === 0) {
        // Demote back to owner if not super_admin
        await admin
          .from('profiles')
          .update({ role: 'owner' })
          .eq('id', assignment.moderator_id)
          .neq('role', 'super_admin');
      }
    }

    revalidatePath('/admin-dashboard/moderators');
    revalidatePath('/admin-dashboard/users');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to remove assignment' };
  }
}

/**
 * 7. Fetch Deactivation Requests
 */
export async function getDeactivationRequestsAdminAction(): Promise<BusinessDeactivationRequest[]> {
  try {
    const { supabase } = await requireSuperAdmin();
    const { data, error } = await supabase
      .from('business_deactivation_requests')
      .select(
        `
        *,
        business:businesses(name, slug),
        moderator:profiles!business_deactivation_requests_moderator_id_fkey(full_name)
      `
      )
      .order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as unknown as BusinessDeactivationRequest[];
  } catch {
    return [];
  }
}

/**
 * 8. Resolve Deactivation Request
 */
export async function resolveDeactivationRequestAdminAction({
  requestId,
  businessId,
  status,
  adminNotes,
  suspendBusiness = false,
}: {
  requestId: string;
  businessId: string;
  status: 'approved' | 'rejected';
  adminNotes?: string;
  suspendBusiness?: boolean;
}) {
  try {
    const { supabase, user } = await requireSuperAdmin();

    // 1. Update request
    await supabase
      .from('business_deactivation_requests')
      .update({
        status,
        admin_notes: adminNotes || null,
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', requestId);

    // 2. If approved and suspendBusiness is true, suspend the business
    if (status === 'approved' && suspendBusiness) {
      await supabase
        .from('businesses')
        .update({ status: 'suspended' })
        .eq('id', businessId);
    }

    revalidatePath('/admin-dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to resolve request' };
  }
}

/**
 * 9. Fetch Categories for Admin Management
 */
export async function getCategoriesAdminAction(): Promise<Category[]> {
  try {
    const { supabase } = await requireSuperAdmin();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return [];
    }

    const root = data.filter((c) => c.parent_id === null);
    const subs = data.filter((c) => c.parent_id !== null);

    return root.map((r) => ({
      ...r,
      children: subs.filter((s) => s.parent_id === r.id),
    }));
  } catch {
    return [];
  }
}

/**
 * 10. Save / Update Category
 */
export async function saveCategoryAdminAction(formData: {
  id?: string;
  name: string;
  slug: string;
  parentId?: string | null;
  icon?: string;
  sortOrder?: number;
  isActive?: boolean;
}) {
  try {
    const { supabase } = await requireSuperAdmin();

    const payload = {
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      parent_id: formData.parentId || null,
      icon: formData.icon || null,
      sort_order: formData.sortOrder || 0,
      is_active: formData.isActive !== undefined ? formData.isActive : true,
    };

    if (formData.id) {
      const { error } = await supabase
        .from('categories')
        .update(payload)
        .eq('id', formData.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('categories').insert(payload);
      if (error) throw error;
    }

    revalidatePath('/admin-dashboard/categories');
    revalidatePath('/categories');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to save category' };
  }
}

/**
 * 11. Fetch Admin Audit Logs
 */
export async function getAdminAuditLogsAction(): Promise<AdminAction[]> {
  try {
    const { supabase } = await requireSuperAdmin();
    const { data, error } = await supabase
      .from('admin_audit_logs')
      .select(
        `
        *,
        actor:profiles!admin_audit_logs_actor_id_fkey(full_name)
      `
      )
      .order('created_at', { ascending: false })
      .limit(50);

    if (error || !data) {
      return [];
    }

    return data.map((log) => ({
      id: log.id,
      admin_id: log.actor_id,
      admin_name: (log.actor as any)?.full_name || 'System Admin',
      admin_role: log.actor_role,
      action: log.action_type.replace('_', ' ').toUpperCase(),
      action_type: log.action_type,
      target_table: log.target_table,
      target_id: log.target_id,
      target_name: log.target_name,
      reason: log.details?.reason || log.details?.rejectionReason,
      timestamp: log.created_at,
    }));
  } catch {
    return [];
  }
}

/**
 * 12. Fetch All Platform Users for Admin Management
 */
export async function getAllUsersAdminAction(): Promise<any[]> {
  try {
    const { supabase } = await requireSuperAdmin();
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        email,
        role,
        is_active,
        created_at,
        rotaract_profile:rotaract_profiles(*)
      `)
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data.map((u: any) => ({
      id: u.id,
      name: u.full_name || 'Member User',
      email: u.email || 'user@rbn.org',
      role: u.role === 'super_admin' ? 'Super Admin' : u.role === 'moderator' ? 'District Moderator' : 'Business Owner',
      district: u.rotaract_profile?.district_number ? `District ${u.rotaract_profile.district_number}` : 'Unassigned',
      status: u.is_active !== false ? 'Active' : 'Suspended',
      rotaryId: u.rotaract_profile?.rotary_id || 'N/A',
    }));
  } catch {
    return [];
  }
}

/**
 * 13. Fetch Super Admin Analytics Overview
 */
export async function getAdminAnalyticsAction(): Promise<DashboardAnalytics> {
  try {
    const { supabase } = await requireSuperAdmin();

    const { count: totalBusinesses } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true });

    const { count: goldCount } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true })
      .gte('verification_level', 2);

    const { count: silverCount } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true })
      .eq('verification_level', 1);

    const { count: pendingVerifications } = await supabase
      .from('verification_documents')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    const { count: totalModerators } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'moderator');

    const { count: pendingDeact } = await supabase
      .from('business_deactivation_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Fetch district distribution
    const { data: businesses } = await supabase
      .from('businesses')
      .select('district_number');

    const distMap: Record<number, number> = {};
    (businesses || []).forEach((b) => {
      if (b.district_number) {
        const d = Number(b.district_number);
        distMap[d] = (distMap[d] || 0) + 1;
      }
    });

    const businesses_by_district = Object.entries(distMap).map(([district, count]) => ({
      district: Number(district),
      count,
    }));

    return {
      total_businesses: totalBusinesses || 0,
      total_users: totalUsers || 0,
      total_moderators: totalModerators || 0,
      gold_tier_count: goldCount || 0,
      silver_tier_count: silverCount || 0,
      pending_verifications: pendingVerifications || 0,
      pending_deactivations: pendingDeact || 0,
      businesses_by_district,
      businesses_by_category: [],
      verification_status_distribution: [],
      monthly_growth: [],
      recent_activity: [],
    };
  } catch {
    return {
      total_businesses: 0,
      total_users: 0,
      total_moderators: 0,
      gold_tier_count: 0,
      silver_tier_count: 0,
      pending_verifications: 0,
      pending_deactivations: 0,
      businesses_by_district: [],
      businesses_by_category: [],
      verification_status_distribution: [],
      monthly_growth: [],
      recent_activity: [],
    };
  }
}

/**
 * 14. Fetch All Global Districts (from DB or default master directory)
 */
export async function getDistrictsAction(): Promise<
  Array<{ district_number: number; name: string; region: string; country: string }>
> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('districts')
      .select('district_number, name, region, country')
      .order('district_number', { ascending: true });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    // If table doesn't exist yet, fall back cleanly
  }

  const { GLOBAL_ROTARACT_DISTRICTS } = await import('@/lib/constants/districts');
  return GLOBAL_ROTARACT_DISTRICTS;
}
