'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';
import { deleteStorageObjectAction } from '@/app/actions/storage';
import type {
  Business,
  ProductService,
  VerificationDocType,
  VerificationDocument,
  Enquiry,
  EnquiryStatus,
  OwnerDashboardStats,
} from '@/lib/types';

async function verifyBusinessOwnership(supabase: any, businessId: string, userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('businesses')
    .select('id')
    .eq('id', businessId)
    .eq('owner_id', userId)
    .maybeSingle();
  return !error && !!data;
}

/**
 * 1. Fetch the logged-in owner's business profile with all relations
 */
export async function getOwnerBusinessAction(): Promise<Business | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: business, error } = await supabase
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
        ),
        products_services:products_services(
          *,
          images:product_images(*)
        ),
        verification_documents:verification_documents(*)
      `
      )
      .eq('owner_id', user.id)
      .maybeSingle();

    if (error || !business) {
      if (error) console.error('Error fetching owner business:', error);
      return null;
    }

    const formatted = {
      ...business,
      location: Array.isArray((business as any).location) ? (business as any).location[0] || null : (business as any).location,
      contact: Array.isArray((business as any).contact) ? (business as any).contact[0] || null : (business as any).contact,
      rotaract_profile: Array.isArray((business as any).owner?.rotaract_profile)
        ? (business as any).owner?.rotaract_profile[0] || null
        : (business as any).owner?.rotaract_profile || null,
    };

    return formatted as unknown as Business;
  } catch (error) {
    console.error('Error fetching owner business:', error);
    return null;
  }
}

/**
 * 2. Update Business Profile, Location, and Contacts
 */
export async function updateOwnerBusinessAction(formData: {
  businessId: string;
  name: string;
  tagline?: string;
  description: string;
  yearEstablished?: number;
  logoUrl?: string;
  coverImageUrl?: string;
  categoryId?: string;
  subcategoryId?: string;
  businessType?: ('manufacturer' | 'trader' | 'service_provider' | 'exporter' | 'importer' | 'franchise')[];
  isWomenOwned?: boolean;
  isStartup?: boolean;
  onlineDelivery?: boolean;
  franchiseAvailable?: boolean;
  // Location
  city: string;
  state?: string;
  country?: string;
  district?: string;
  address: string;
  pincode?: string;
  mapsLink?: string;
  // Contact & Socials
  email: string;
  mobile: string;
  altMobile?: string;
  website?: string;
  whatsapp?: string;
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Unauthorized' };

    const isOwner = await verifyBusinessOwnership(supabase, formData.businessId, user.id);
    if (!isOwner) {
      return { success: false, error: 'Forbidden: You do not own this business profile.' };
    }

    // 1. Update business
    const updateData: any = {
      name: formData.name.trim(),
      tagline: formData.tagline?.trim() || null,
      description: formData.description.trim(),
      year_established: formData.yearEstablished || null,
      logo_url: formData.logoUrl && formData.logoUrl.trim() ? formData.logoUrl.trim() : null,
      cover_image_url: formData.coverImageUrl && formData.coverImageUrl.trim() ? formData.coverImageUrl.trim() : null,
      is_women_owned: formData.isWomenOwned || false,
      is_startup: formData.isStartup || false,
      online_delivery: formData.onlineDelivery || false,
      franchise_available: formData.franchiseAvailable || false,
    };

    if (formData.categoryId) {
      updateData.category_id = formData.categoryId;
    }
    if (formData.subcategoryId !== undefined) {
      updateData.subcategory_id = formData.subcategoryId || null;
    }
    if (formData.businessType && formData.businessType.length > 0) {
      updateData.business_type = formData.businessType;
    }

    const { data: updatedBiz, error: bizError } = await supabase
      .from('businesses')
      .update(updateData)
      .eq('id', formData.businessId)
      .eq('owner_id', user.id)
      .select('slug')
      .maybeSingle();

    if (bizError) throw bizError;

    // 2. Upsert location if location fields are present
    if (formData.city !== undefined || formData.address !== undefined) {
      await supabase.from('business_locations').upsert({
        business_id: formData.businessId,
        city: (formData.city || '').trim(),
        state: formData.state?.trim() || null,
        country: formData.country?.trim() || null,
        district: formData.district?.trim() || null,
        address: (formData.address || '').trim(),
        pincode: formData.pincode?.trim() || null,
        maps_link: formData.mapsLink?.trim() || null,
      });
    }

    // 3. Upsert contacts if contact fields are present
    if (formData.email !== undefined || formData.mobile !== undefined) {
      await supabase.from('business_contacts').upsert({
        business_id: formData.businessId,
        email: (formData.email || '').trim(),
        mobile: (formData.mobile || '').trim(),
        alt_mobile: formData.altMobile?.trim() || null,
        website: formData.website?.trim() || null,
        whatsapp: formData.whatsapp?.trim() || null,
        social_links: formData.socialLinks || {},
      });
    }

    revalidatePath('/business-dashboard');
    revalidatePath('/directory');
    if (updatedBiz?.slug) {
      revalidatePath(`/business/${updatedBiz.slug}`);
    }
    revalidatePath('/', 'layout');

    return { success: true };
  } catch (error: any) {
    console.error('Error updating business profile:', error);
    return { success: false, error: error.message || 'Failed to update profile' };
  }
}

/**
 * 3. Add or Update Product/Service Offering
 */
export async function saveProductServiceAction(formData: {
  businessId: string;
  productId?: string;
  name: string;
  type: 'product' | 'service';
  description: string;
  tags?: string[];
  priceFrom?: number;
  serviceArea?: 'local' | 'state' | 'nationwide' | 'international';
  brochureUrl?: string;
  imageUrls?: string[];
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Unauthorized' };

    const isOwner = await verifyBusinessOwnership(supabase, formData.businessId, user.id);
    if (!isOwner) {
      return { success: false, error: 'Forbidden: You do not have permission to modify this business.' };
    }

    let productRecord: any;

    if (formData.productId) {
      // Update existing
      const { data, error } = await supabase
        .from('products_services')
        .update({
          name: formData.name.trim(),
          type: formData.type,
          description: formData.description.trim(),
          tags: formData.tags || [],
          price_from: formData.priceFrom || null,
          service_area: formData.serviceArea || 'local',
          brochure_url: formData.brochureUrl || null,
        })
        .eq('id', formData.productId)
        .eq('business_id', formData.businessId)
        .select()
        .single();

      if (error) throw error;
      productRecord = data;
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('products_services')
        .insert({
          business_id: formData.businessId,
          name: formData.name.trim(),
          type: formData.type,
          description: formData.description.trim(),
          tags: formData.tags || [],
          price_from: formData.priceFrom || null,
          service_area: formData.serviceArea || 'local',
          brochure_url: formData.brochureUrl || null,
        })
        .select()
        .single();

      if (error) throw error;
      productRecord = data;
    }

    // Insert Gallery Images if provided
    if (formData.imageUrls && formData.imageUrls.length > 0 && productRecord) {
      const imagesToInsert = formData.imageUrls.map((url, idx) => ({
        product_id: productRecord.id,
        image_url: url,
        sort_order: idx + 1,
      }));

      await supabase.from('product_images').insert(imagesToInsert);
    }

    revalidatePath('/business-dashboard');
    return { success: true, product: productRecord };
  } catch (error: any) {
    console.error('Error saving product/service:', error);
    return { success: false, error: error.message || 'Failed to save offering' };
  }
}

/**
 * 4. Delete Product/Service Offering
 */
export async function deleteProductServiceAction(productId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Unauthorized' };

    // Verify ownership of the business that owns this product
    const { data: product } = await supabase
      .from('products_services')
      .select('business_id, business:businesses(owner_id)')
      .eq('id', productId)
      .maybeSingle();

    if (!product || (product.business as any)?.owner_id !== user.id) {
      return { success: false, error: 'Forbidden: You do not own this product offering.' };
    }

    const { error } = await supabase
      .from('products_services')
      .delete()
      .eq('id', productId);

    if (error) throw error;

    revalidatePath('/business-dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete product' };
  }
}

/**
 * 5. Submit Verification Document to Private R2 Storage
 */
export async function submitVerificationDocumentAction(formData: {
  businessId: string;
  docType: VerificationDocType;
  fileKey: string;
  fileName: string;
  fileSize?: number;
  mimeType?: string;
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Unauthorized' };

    const isOwner = await verifyBusinessOwnership(supabase, formData.businessId, user.id);
    if (!isOwner) {
      return { success: false, error: 'Forbidden: You do not own this business.' };
    }

    // Check if document already exists for this business and type
    const { data: existingDoc } = await supabase
      .from('verification_documents')
      .select('id')
      .eq('business_id', formData.businessId)
      .eq('doc_type', formData.docType)
      .maybeSingle();

    let doc;
    if (existingDoc) {
      const { data: updatedDoc, error: updateError } = await supabase
        .from('verification_documents')
        .update({
          file_key: formData.fileKey,
          file_name: formData.fileName,
          file_size: formData.fileSize || null,
          mime_type: formData.mimeType || null,
          status: 'pending',
          rejection_reason: null,
          reviewed_by: null,
          reviewed_at: null,
          claimed_by: null,
          claimed_at: null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingDoc.id)
        .select()
        .single();

      if (updateError) throw updateError;
      doc = updatedDoc;
    } else {
      const { data: newDoc, error: insertError } = await supabase
        .from('verification_documents')
        .insert({
          business_id: formData.businessId,
          doc_type: formData.docType,
          file_key: formData.fileKey,
          file_name: formData.fileName,
          file_size: formData.fileSize || null,
          mime_type: formData.mimeType || null,
          status: 'pending',
        })
        .select()
        .single();

      if (insertError) throw insertError;
      doc = newDoc;
    }

    revalidatePath('/business-dashboard/verification');
    return { success: true, document: doc };
  } catch (error: any) {
    console.error('Error submitting verification doc:', error);
    return { success: false, error: error.message || 'Failed to submit document' };
  }
}

/**
 * 5b. Delete Verification Document from R2 and Supabase
 */
export async function deleteVerificationDocumentAction({
  businessId,
  docType,
  fileKey,
  documentId,
}: {
  businessId: string;
  docType?: VerificationDocType;
  fileKey?: string;
  documentId?: string;
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Unauthorized' };

    const isOwner = await verifyBusinessOwnership(supabase, businessId, user.id);
    if (!isOwner) {
      return { success: false, error: 'Forbidden: You do not own this business.' };
    }

    // 1. Delete file from R2 storage if key provided
    if (fileKey) {
      try {
        await deleteStorageObjectAction(fileKey);
      } catch (storageErr) {
        console.warn('Could not delete document file from storage:', storageErr);
      }
    }

    // 2. Delete database record using admin client to bypass RLS restrictions
    const adminSupabase = createAdminClient();
    let query = adminSupabase.from('verification_documents').delete().eq('business_id', businessId);

    if (documentId) {
      query = query.eq('id', documentId);
    } else if (fileKey) {
      query = query.eq('file_key', fileKey);
    } else if (docType) {
      query = query.eq('doc_type', docType);
    }

    const { error: dbError } = await query;

    if (dbError) {
      console.error('Error deleting verification document from db:', dbError);
      throw dbError;
    }

    revalidatePath('/business-dashboard/verification');
    revalidatePath('/business-dashboard');
    revalidatePath('/moderator-dashboard/verification');
    revalidatePath('/admin-dashboard/verifications');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting verification document:', error);
    return { success: false, error: error.message || 'Failed to delete verification document.' };
  }
}

/**
 * 6. Fetch Business Enquiries / Leads Inbox
 */
export async function getOwnerEnquiriesAction(businessId: string): Promise<Enquiry[]> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !(await verifyBusinessOwnership(supabase, businessId, user.id))) {
      return [];
    }

    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as unknown as Enquiry[];
  } catch (error) {
    console.error('Error fetching owner enquiries:', error);
    return [];
  }
}

/**
 * 7. Update Enquiry Status (e.g. mark as 'read' or 'replied')
 */
export async function updateEnquiryStatusAction({
  enquiryId,
  status,
}: {
  enquiryId: string;
  status: EnquiryStatus;
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Unauthorized' };

    // Verify user owns the business associated with this enquiry
    const { data: enquiry } = await supabase
      .from('enquiries')
      .select('business:businesses(owner_id)')
      .eq('id', enquiryId)
      .maybeSingle();

    if (!enquiry || (enquiry.business as any)?.owner_id !== user.id) {
      return { success: false, error: 'Forbidden: You do not have permission to manage this enquiry.' };
    }

    const { error } = await supabase
      .from('enquiries')
      .update({ status })
      .eq('id', enquiryId);

    if (error) throw error;

    revalidatePath('/business-dashboard/enquiries');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update enquiry' };
  }
}

/**
 * 7b. Send and Persist Reply to Customer Enquiry
 */
export async function replyToOwnerEnquiryAction({
  enquiryId,
  replyText,
}: {
  enquiryId: string;
  replyText: string;
}) {
  try {
    if (!replyText || !replyText.trim()) {
      return { success: false, error: 'Reply text cannot be empty.' };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Unauthorized' };

    // Verify user owns the business associated with this enquiry
    const { data: enquiry, error: fetchErr } = await supabase
      .from('enquiries')
      .select('*, business:businesses(name, owner_id)')
      .eq('id', enquiryId)
      .maybeSingle();

    if (fetchErr || !enquiry || (enquiry.business as any)?.owner_id !== user.id) {
      return { success: false, error: 'Forbidden: You do not have permission to reply to this enquiry.' };
    }

    const replyTimestamp = new Date().toISOString();
    const replyMarker = `\n\n--- [Owner Reply • ${replyTimestamp}]:\n${replyText.trim()}`;
    const updatedMessage = `${enquiry.message || ''}${replyMarker}`;

    const { error: updateErr } = await supabase
      .from('enquiries')
      .update({
        message: updatedMessage,
        status: 'replied',
        updated_at: replyTimestamp,
      })
      .eq('id', enquiryId);

    if (updateErr) throw updateErr;

    // Email notification via Resend if email is configured and contact has email
    if (process.env.RESEND_API_KEY && enquiry.from_contact?.includes('@')) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const bizName = (enquiry.business as any)?.name || 'Rotaract Enterprise';
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Rotaract Business Network <onboarding@resend.dev>',
          to: enquiry.from_contact.trim(),
          subject: `Response to your inquiry: ${bizName}`,
          text: `Dear ${enquiry.from_name},\n\n${replyText.trim()}\n\nBest regards,\n${bizName}\nRotaract Business Network`,
        });
      } catch (mailErr) {
        console.warn('Could not dispatch Resend notification email:', mailErr);
      }
    }

    revalidatePath('/business-dashboard/enquiries');
    return {
      success: true,
      sentAt: replyTimestamp,
      replyText: replyText.trim(),
    };
  } catch (error: any) {
    console.error('Error replying to enquiry:', error);
    return { success: false, error: error.message || 'Failed to dispatch reply.' };
  }
}

/**
 * 8. Compute Dashboard Analytics
 */
export async function getOwnerDashboardStatsAction(businessId: string): Promise<OwnerDashboardStats> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !(await verifyBusinessOwnership(supabase, businessId, user.id))) {
      return {
        profile_completeness: 0,
        profile_impressions: 0,
        impressions_change: 0,
        total_enquiries: 0,
        unread_enquiries: 0,
      };
    }

    const { data: business } = await supabase
      .from('businesses')
      .select('view_count, verification_level, description, logo_url, cover_image_url')
      .eq('id', businessId)
      .single();

    const { count: totalEnquiries } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', businessId);

    const { count: unreadEnquiries } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', businessId)
      .eq('status', 'new');

    // Completeness calculation
    let completeness = 40;
    if (business?.logo_url) completeness += 20;
    if (business?.cover_image_url) completeness += 15;
    if (business?.description && business.description.length > 50) completeness += 15;
    if (business?.verification_level && business.verification_level > 0) completeness += 10;

    return {
      profile_completeness: Math.min(completeness, 100),
      profile_impressions: business?.view_count || 0,
      impressions_change: 0,
      total_enquiries: totalEnquiries || 0,
      unread_enquiries: unreadEnquiries || 0,
    };
  } catch {
    return {
      profile_completeness: 0,
      profile_impressions: 0,
      impressions_change: 0,
      total_enquiries: 0,
      unread_enquiries: 0,
    };
  }
}

/**
 * 9. Fetch Owner Account & Security Settings
 */
export async function getOwnerAccountSettingsAction() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('id, full_name, email, phone, role, avatar_url')
      .eq('id', user.id)
      .single();

    const { data: rotaractProfile } = await supabase
      .from('rotaract_profiles')
      .select('rotary_id, club_name, district_number, role_in_club, is_active')
      .eq('user_id', user.id)
      .maybeSingle();

    const { data: business } = await supabase
      .from('businesses')
      .select(`
        id, name, slug, description, verification_level,
        category:categories!businesses_category_id_fkey(id, name, slug),
        location:business_locations(*),
        contact:business_contacts(*),
        products_services(*)
      `)
      .eq('owner_id', user.id)
      .maybeSingle();

    return {
      user: {
        id: user.id,
        email: user.email || profile?.email || '',
      },
      profile: profile || null,
      rotaractProfile: rotaractProfile || null,
      business: business || null,
    };
  } catch (error) {
    console.error('Error fetching owner account settings:', error);
    return null;
  }
}

/**
 * 10. Update Owner Profile Details (Name, Phone, Rotary Club, RID)
 */
export async function updateOwnerAccountSettingsAction(formData: {
  fullName: string;
  phone?: string;
  clubName?: string;
  rotaryId?: string;
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Unauthorized' };

    // 1. Update personal profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        full_name: formData.fullName.trim(),
        phone: formData.phone?.trim() || null,
      })
      .eq('id', user.id);

    if (profileError) throw profileError;

    // 2. Update rotaract profile if it exists or insert
    if (formData.clubName !== undefined || formData.rotaryId !== undefined) {
      const { data: existingRP } = await supabase
        .from('rotaract_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingRP) {
        await supabase
          .from('rotaract_profiles')
          .update({
            club_name: formData.clubName?.trim() || null,
            rotary_id: formData.rotaryId?.trim() || null,
          })
          .eq('user_id', user.id);
      } else {
        const { data: userBiz } = await supabase
          .from('businesses')
          .select('district_number')
          .eq('owner_id', user.id)
          .maybeSingle();

        await supabase.from('rotaract_profiles').insert({
          user_id: user.id,
          club_name: formData.clubName?.trim() || null,
          rotary_id: formData.rotaryId?.trim() || null,
          district_number: userBiz?.district_number || 0,
        });
      }
    }

    revalidatePath('/business-dashboard/settings');
    revalidatePath('/business-dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating account settings:', error);
    return { success: false, error: error.message || 'Failed to update settings' };
  }
}

/**
 * 11. Update Owner Account Password
 */
export async function updateOwnerPasswordAction(formData: {
  newPassword: string;
}) {
  try {
    if (!formData.newPassword || formData.newPassword.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long.' };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Unauthorized' };

    const { error } = await supabase.auth.updateUser({
      password: formData.newPassword,
    });

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error('Error updating password:', error);
    return { success: false, error: error.message || 'Failed to change password' };
  }
}
