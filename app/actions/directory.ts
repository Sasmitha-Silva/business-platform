'use server';

import { createClient } from '@/lib/supabase/server';
import { sendNewEnquiryEmail } from '@/lib/email/resend';
import type { Business, Category, DirectoryFilters, PaginatedResponse } from '@/lib/types';

/**
 * 1. Fetch Paginated Directory Businesses with Filters & Search
 */
export async function getBusinessesAction(
  filters: DirectoryFilters = {}
): Promise<PaginatedResponse<Business>> {
  try {
    const supabase = await createClient();

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
      `,
        { count: 'exact' }
      )
      .eq('status', 'approved');

    // 1. Text Search across name, tagline, description
    if (filters.search?.trim()) {
      const term = `%${filters.search.trim()}%`;
      query = query.or(`name.ilike.${term},tagline.ilike.${term},description.ilike.${term}`);
    }

    // 2. Category & Subcategory Filter
    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id);
    }
    if (filters.subcategory_id) {
      query = query.eq('subcategory_id', filters.subcategory_id);
    }

    // 3. District Filter
    if (filters.district) {
      const distNum = parseInt(filters.district.replace(/\D/g, ''), 10);
      if (!isNaN(distNum)) {
        query = query.eq('district_number', distNum);
      }
    }

    // 4. Verification Tier Filter
    if (filters.verification_tier && filters.verification_tier.length > 0) {
      const levels: number[] = [];
      if (filters.verification_tier.includes('level_1')) levels.push(1);
      if (filters.verification_tier.includes('level_2') || filters.verification_tier.includes('level_3')) levels.push(2, 3);
      if (levels.length > 0) {
        query = query.in('verification_level', levels);
      }
    }

    // 5. Special Flags
    if (filters.is_women_owned) query = query.eq('is_women_owned', true);
    if (filters.is_startup) query = query.eq('is_startup', true);
    if (filters.online_delivery) query = query.eq('online_delivery', true);
    if (filters.franchise_available) query = query.eq('franchise_available', true);

    // 6. Sorting
    if (filters.sort_by === 'newest') {
      query = query.order('created_at', { ascending: false });
    } else if (filters.sort_by === 'verification_tier') {
      query = query.order('verification_level', { ascending: false });
    } else if (filters.sort_by === 'established') {
      query = query.order('year_established', { ascending: true });
    } else {
      query = query
        .order('is_featured', { ascending: false })
        .order('verification_level', { ascending: false })
        .order('created_at', { ascending: false });
    }

    // 7. Pagination
    const page = filters.page || 1;
    const perPage = filters.per_page || 12;
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error || !data) {
      if (error) console.error('Error in getBusinessesAction:', error);
      return {
        data: [],
        total: 0,
        page,
        per_page: perPage,
        total_pages: 0,
      };
    }

    const formattedData = data.map((b: any) => ({
      ...b,
      location: Array.isArray(b.location) ? b.location[0] || null : b.location,
      contact: Array.isArray(b.contact) ? b.contact[0] || null : b.contact,
      rotaract_profile: Array.isArray(b.owner?.rotaract_profile)
        ? b.owner?.rotaract_profile[0] || null
        : b.owner?.rotaract_profile || null,
    }));

    return {
      data: formattedData as unknown as Business[],
      total: count || formattedData.length,
      page,
      per_page: perPage,
      total_pages: Math.ceil((count || formattedData.length) / perPage),
    };
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return {
      data: [],
      total: 0,
      page: 1,
      per_page: 12,
      total_pages: 0,
    };
  }
}

/**
 * 2. Fetch Single Business by Slug & Increment Impressions
 */
export async function getBusinessBySlugAction(slug: string): Promise<Business | null> {
  try {
    const supabase = await createClient();

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
        )
      `
      )
      .eq('slug', slug)
      .single();

    if (error || !business) {
      if (error) console.error('Error in getBusinessBySlugAction:', error);
      return null;
    }

    // Atomically increment impression counter in background
    try {
      await supabase.rpc('increment_business_views', { target_slug: slug });
    } catch {
      // Silent catch for views counter
    }

    const formatted = {
      ...business,
      location: Array.isArray((business as any).location) ? (business as any).location[0] || null : (business as any).location,
      contact: Array.isArray((business as any).contact) ? (business as any).contact[0] || null : (business as any).contact,
      rotaract_profile: Array.isArray((business as any).owner?.rotaract_profile)
        ? (business as any).owner?.rotaract_profile[0] || null
        : (business as any).owner?.rotaract_profile || null,
      owner: (business as any).owner ? {
        ...(business as any).owner,
        name: (business as any).owner.full_name || (business as any).owner.name || 'Enterprise Founder',
      } : null,
    };

    return formatted as unknown as Business;
  } catch (error) {
    console.error('Error fetching business by slug:', error);
    return null;
  }
}

/**
 * 3. Fetch All Active Categories with Subcategories
 */
export async function getCategoriesAction(): Promise<Category[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.error('Supabase categories error:', error);
      return [];
    }

    // Live business counts per category
    const { data: bizList } = await supabase
      .from('businesses')
      .select('category_id, subcategory_id')
      .eq('status', 'approved');

    const catCountMap: Record<string, number> = {};
    if (bizList) {
      for (const b of bizList) {
        if (b.category_id) {
          catCountMap[b.category_id] = (catCountMap[b.category_id] || 0) + 1;
        }
        if (b.subcategory_id) {
          catCountMap[b.subcategory_id] = (catCountMap[b.subcategory_id] || 0) + 1;
        }
      }
    }

    // Assemble parent-child tree
    const rootCategories = data.filter((c) => !c.parent_id);
    const subCategories = data.filter((c) => !!c.parent_id);

    const categoryTree: Category[] = rootCategories.map((root) => {
      const subs = subCategories
        .filter((sub) => sub.parent_id === root.id)
        .map((sub) => ({
          ...sub,
          business_count: catCountMap[sub.id] || 0,
        }));
      return {
        ...root,
        business_count: catCountMap[root.id] || 0,
        children: subs,
      };
    });

    return categoryTree;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * 4. Submit Customer Lead / Direct Enquiry
 */
export async function submitEnquiryAction(formData: {
  businessId: string;
  fromName: string;
  fromContact: string;
  fromOrganization?: string;
  serviceRequested?: string;
  message: string;
}) {
  try {
    const supabase = await createClient();

    // 1. Insert into enquiries table
    const { data: enquiry, error: insertError } = await supabase
      .from('enquiries')
      .insert({
        business_id: formData.businessId,
        from_name: formData.fromName.trim(),
        from_contact: formData.fromContact.trim(),
        from_organization: formData.fromOrganization?.trim() || null,
        service_requested: formData.serviceRequested?.trim() || null,
        message: formData.message.trim(),
        status: 'new',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to save enquiry in DB:', insertError);
    }

    // 2. Fetch business owner email to dispatch alert
    const { data: business } = await supabase
      .from('businesses')
      .select('name, owner:profiles!businesses_owner_id_fkey(full_name, email), contact:business_contacts(email)')
      .eq('id', formData.businessId)
      .single();

    if (business) {
      const recipientEmail =
        (business.contact as any)?.email || (business.owner as any)?.email;
      const ownerName = (business.owner as any)?.full_name || 'Business Owner';

      if (recipientEmail) {
        await sendNewEnquiryEmail({
          to: recipientEmail,
          ownerName,
          businessName: business.name,
          fromName: formData.fromName,
          fromContact: formData.fromContact,
          fromOrganization: formData.fromOrganization,
          serviceRequested: formData.serviceRequested,
          message: formData.message,
        });
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error in submitEnquiryAction:', error);
    return { success: false, error: error.message || 'Failed to submit enquiry' };
  }
}
