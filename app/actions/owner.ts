'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type {
  Business,
  ProductService,
  VerificationDocType,
  VerificationDocument,
  Enquiry,
  EnquiryStatus,
  OwnerDashboardStats,
} from '@/lib/types';

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

    // 1. Update business
    const updateData: any = {
      name: formData.name.trim(),
      tagline: formData.tagline?.trim() || null,
      description: formData.description.trim(),
      year_established: formData.yearEstablished || null,
      logo_url: formData.logoUrl || null,
      cover_image_url: formData.coverImageUrl || null,
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

    const { error: bizError } = await supabase
      .from('businesses')
      .update(updateData)
      .eq('id', formData.businessId)
      .eq('owner_id', user.id);

    if (bizError) throw bizError;

    // 2. Upsert location
    await supabase.from('business_locations').upsert({
      business_id: formData.businessId,
      city: formData.city.trim(),
      state: formData.state?.trim() || 'Western',
      country: formData.country?.trim() || 'Sri Lanka',
      district: formData.district?.trim() || 'Colombo',
      address: formData.address.trim(),
      pincode: formData.pincode?.trim() || null,
      maps_link: formData.mapsLink?.trim() || null,
    });

    // 3. Upsert contacts
    await supabase.from('business_contacts').upsert({
      business_id: formData.businessId,
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      alt_mobile: formData.altMobile?.trim() || null,
      website: formData.website?.trim() || null,
      whatsapp: formData.whatsapp?.trim() || null,
      social_links: formData.socialLinks || {},
    });

    revalidatePath('/business-dashboard');
    revalidatePath('/directory');

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

    const { data: doc, error } = await supabase
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

    if (error) throw error;

    revalidatePath('/business-dashboard/verification');
    return { success: true, document: doc };
  } catch (error: any) {
    console.error('Error submitting verification doc:', error);
    return { success: false, error: error.message || 'Failed to submit document' };
  }
}

/**
 * 6. Fetch Business Enquiries / Leads Inbox
 */
export async function getOwnerEnquiriesAction(businessId: string): Promise<Enquiry[]> {
  try {
    const supabase = await createClient();

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
 * 8. Compute Dashboard Analytics
 */
export async function getOwnerDashboardStatsAction(businessId: string): Promise<OwnerDashboardStats> {
  try {
    const supabase = await createClient();

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
