'use server';

import { createClient } from '@/lib/supabase/server';
import {
  sendVerificationApprovedEmail,
  sendVerificationRejectedEmail,
} from '@/lib/email/resend';
import { revalidatePath } from 'next/cache';
import type {
  VerificationDocument,
  Business,
  BusinessDeactivationRequest,
  DeactivationReasonCategory,
  ModeratorDashboardStats,
} from '@/lib/types';

async function requireModeratorOrAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized: Authentication required');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role, is_active')
    .eq('id', user.id)
    .single();

  if (!profile || !profile.is_active || (profile.role !== 'moderator' && profile.role !== 'super_admin')) {
    throw new Error('Forbidden: Moderator or Super Admin access required');
  }

  return { supabase, user, role: profile.role };
}

/**
 * 1. Fetch Verification Queue for District Moderator
 */
export async function getModeratorVerificationQueueAction(): Promise<any[]> {
  try {
    const { supabase, user } = await requireModeratorOrAdmin();

    // Fetch moderator's assigned districts
    const { data: assignments } = await supabase
      .from('moderator_assignments')
      .select('district_number')
      .eq('moderator_id', user.id);

    const districts = assignments?.map((a) => a.district_number) || [];

    let query = supabase
      .from('verification_documents')
      .select(
        `
        *,
        business:businesses(
          id, name, slug, verification_level, district_number, status,
          owner:profiles!businesses_owner_id_fkey(
            full_name, email,
            rotaract_profile:rotaract_profiles(*)
          )
        ),
        reviewer:profiles!verification_documents_reviewed_by_fkey(full_name),
        claimer:profiles!verification_documents_claimed_by_fkey(full_name)
      `
      )
      .order('created_at', { ascending: false });

    if (districts.length > 0) {
      // In Supabase, filter businesses by district
      query = query.in('business.district_number', districts);
    }

    const { data, error } = await query;

    if (error || !data) {
      if (error) console.error('Error fetching moderator queue:', error);
      return [];
    }

    return data.map((d: any) => ({
      ...d,
      business: d.business ? {
        ...d.business,
        rotaract_profile: Array.isArray(d.business.owner?.rotaract_profile)
          ? d.business.owner?.rotaract_profile[0] || null
          : d.business.owner?.rotaract_profile || null,
      } : null,
    }));
  } catch (error) {
    console.error('Error fetching moderator verification queue:', error);
    return [];
  }
}

/**
 * 2. Claim a Verification Document for Review
 */
export async function claimVerificationDocAction(docId: string) {
  try {
    const { supabase, user } = await requireModeratorOrAdmin();

    const { error } = await supabase
      .from('verification_documents')
      .update({
        claimed_by: user.id,
        claimed_at: new Date().toISOString(),
        status: 'in_review',
      })
      .eq('id', docId);

    if (error) throw error;

    revalidatePath('/moderator-dashboard/verification');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to claim document' };
  }
}

/**
 * 3. Review & Approve or Reject a Verification Document
 */
export async function reviewVerificationDocAction({
  docId,
  businessId,
  status,
  rejectionReason,
  tierToAward,
}: {
  docId: string;
  businessId: string;
  status: 'approved' | 'rejected';
  rejectionReason?: string;
  tierToAward?: number; // 1 for GST Verified, 2 for DRR Verified
}) {
  try {
    const { supabase, user } = await requireModeratorOrAdmin();

    // 1. Update verification_documents record
    const { data: doc, error: docError } = await supabase
      .from('verification_documents')
      .update({
        status,
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
        rejection_reason: status === 'rejected' ? rejectionReason || null : null,
      })
      .eq('id', docId)
      .select('*, business:businesses(name, owner:profiles!businesses_owner_id_fkey(full_name, email))')
      .single();

    if (docError) throw docError;

    // 2. If approved, upgrade business verification level & approve status
    if (status === 'approved' && tierToAward !== undefined) {
      await supabase
        .from('businesses')
        .update({
          verification_level: tierToAward,
          status: 'approved',
        })
        .eq('id', businessId);
    }

    // 3. Log into admin_audit_logs
    await supabase.from('admin_audit_logs').insert({
      actor_id: user.id,
      actor_role: 'moderator',
      action_type: status === 'approved' ? 'verified_business' : 'verification_denied',
      target_table: 'verification_documents',
      target_id: docId,
      target_name: (doc?.business as any)?.name || 'Business Document',
      details: {
        status,
        tierToAward,
        rejectionReason,
      },
    });

    // 4. Dispatch Email to Owner via Resend
    const ownerEmail = (doc?.business as any)?.owner?.email;
    const ownerName = (doc?.business as any)?.owner?.full_name || 'Business Owner';
    const bizName = (doc?.business as any)?.name || 'Your Business';

    if (ownerEmail) {
      if (status === 'approved') {
        await sendVerificationApprovedEmail({
          to: ownerEmail,
          fullName: ownerName,
          businessName: bizName,
          tierLevel: tierToAward || 1,
        });
      } else {
        await sendVerificationRejectedEmail({
          to: ownerEmail,
          fullName: ownerName,
          businessName: bizName,
          docType: doc.doc_type || 'document',
          reason: rejectionReason || 'Document did not meet verification criteria.',
        });
      }
    }

    revalidatePath('/moderator-dashboard/verification');
    revalidatePath('/directory');

    return { success: true };
  } catch (error: any) {
    console.error('Error reviewing verification doc:', error);
    return { success: false, error: error.message || 'Failed to submit review' };
  }
}

/**
 * 4. Submit Business Deactivation Request to Super Admin
 */
export async function submitBusinessDeactivationRequestAction(formData: {
  businessId: string;
  districtNumber: number;
  reasonCategory: DeactivationReasonCategory;
  reasonDetails: string;
  evidenceNotes?: string;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
}) {
  try {
    const { supabase, user } = await requireModeratorOrAdmin();

    const { error } = await supabase.from('business_deactivation_requests').insert({
      business_id: formData.businessId,
      moderator_id: user.id,
      district_number: formData.districtNumber,
      reason_category: formData.reasonCategory,
      reason_details: formData.reasonDetails.trim(),
      evidence_notes: formData.evidenceNotes?.trim() || null,
      urgency: formData.urgency || 'medium',
      status: 'pending',
    });

    if (error) throw error;

    revalidatePath('/moderator-dashboard/directory');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to submit deactivation request' };
  }
}

/**
 * 5. Fetch Businesses in Moderator's District
 */
export async function getModeratorDistrictBusinessesAction(): Promise<Business[]> {
  try {
    const { supabase, user } = await requireModeratorOrAdmin();

    const { data: assignments } = await supabase
      .from('moderator_assignments')
      .select('district_number')
      .eq('moderator_id', user.id);

    const districts = assignments?.map((a) => a.district_number) || [];

    let query = supabase
      .from('businesses')
      .select(
        `
        *,
        category:categories!businesses_category_id_fkey(*),
        subcategory:categories!businesses_subcategory_id_fkey(*),
        location:business_locations(*),
        contact:business_contacts(*),
        owner:profiles!businesses_owner_id_fkey(
          *,
          rotaract_profile:rotaract_profiles(*)
        )
      `
      )
      .order('created_at', { ascending: false });

    if (districts.length > 0) {
      query = query.in('district_number', districts);
    }

    const { data, error } = await query;

    if (error || !data) {
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
  } catch {
    return [];
  }
}
