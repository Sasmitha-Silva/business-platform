'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendWelcomeEmail } from '@/lib/email/resend';
import { revalidatePath } from 'next/cache';

export interface RegisterBusinessInput {
  // Step 1: Member Credentials
  fullName: string;
  email: string;
  phone: string;
  clubName: string;
  district: string;
  memberId: string;
  password: string;

  // Step 2: Enterprise Info
  businessName: string;
  tagline?: string;
  sector: string;
  description: string;
  logoUrl?: string;
  bannerUrl?: string;

  // Step 3: Location & Contact
  city: string;
  country: string;
  address: string;
  businessEmail: string;
  businessPhone: string;

  // Step 4: Social Channels
  website?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  whatsapp?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function registerBusinessAction(input: RegisterBusinessInput) {
  try {
    // 0. Server-side Input Validation
    if (!input.fullName?.trim()) return { success: false, error: 'Full legal name is required.' };
    if (!input.email?.trim() || !input.email.includes('@')) return { success: false, error: 'A valid email address is required.' };
    if (!input.password || input.password.length < 6) return { success: false, error: 'Password must be at least 6 characters long.' };
    if (!input.phone?.trim()) return { success: false, error: 'Phone number is required.' };
    if (!input.memberId?.trim()) return { success: false, error: 'Rotary Member ID is required.' };
    if (!input.businessName?.trim()) return { success: false, error: 'Enterprise name is required.' };
    if (!input.city?.trim()) return { success: false, error: 'Operating city is required.' };

    const supabase = await createClient();
    const adminSupabase = createAdminClient();

    let userId: string;

    // 1. Create or ensure Auth User using Admin Client
    const { data: createdUser, error: adminCreateError } = await adminSupabase.auth.admin.createUser({
      email: input.email.trim(),
      password: input.password,
      email_confirm: true,
      user_metadata: {
        full_name: input.fullName.trim(),
        role: 'owner',
      },
    });

    if (adminCreateError) {
      // If user already exists, try signing in with the provided password
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: input.email.trim(),
        password: input.password,
      });

      if (signInError || !signInData.user) {
        return {
          success: false,
          error: adminCreateError.message.includes('already registered')
            ? 'This email is already registered. Please login or use a different email.'
            : adminCreateError.message,
        };
      }
      userId = signInData.user.id;
    } else {
      userId = createdUser.user.id;
      // Establish session in user client
      await supabase.auth.signInWithPassword({
        email: input.email.trim(),
        password: input.password,
      });
    }

    const districtNum = parseInt(input.district.replace(/\D/g, ''), 10) || 3220;

    // 2. Ensure Profile exists in public.profiles
    await adminSupabase.from('profiles').upsert({
      id: userId,
      email: input.email.trim(),
      full_name: input.fullName.trim(),
      phone: input.phone?.trim() || null,
      role: 'owner',
      avatar_url: input.logoUrl || null,
      is_active: true,
    });

    // 3. Create Rotaract Profile
    await adminSupabase.from('rotaract_profiles').upsert({
      user_id: userId,
      club_name: input.clubName,
      district_number: districtNum,
      rotary_id: input.memberId?.trim() || null,
      is_active_member: true,
    });

    // 4. Find Category ID
    let categoryId = 'c1000000-0000-0000-0000-000000000004'; // Default Technology
    const { data: matchedCategory } = await supabase
      .from('categories')
      .select('id')
      .ilike('name', `%${input.sector.split('&')[0].trim()}%`)
      .limit(1)
      .maybeSingle();

    if (matchedCategory) {
      categoryId = matchedCategory.id;
    }

    // 5. Generate unique slug
    let baseSlug = slugify(input.businessName);
    if (!baseSlug) baseSlug = `biz-${Date.now()}`;

    // Check for existing slug
    const { data: existingBiz } = await supabase
      .from('businesses')
      .select('id')
      .eq('slug', baseSlug)
      .maybeSingle();

    const finalSlug = existingBiz ? `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}` : baseSlug;

    // 6. Insert Business record
    const { data: business, error: bizError } = await supabase
      .from('businesses')
      .insert({
        owner_id: userId,
        name: input.businessName.trim(),
        slug: finalSlug,
        tagline: input.tagline?.trim() || null,
        category_id: categoryId,
        business_type: ['service_provider'],
        description: input.description.trim(),
        logo_url: input.logoUrl || null,
        cover_image_url: input.bannerUrl || null,
        status: 'pending_review',
        verification_level: 0,
        district_number: districtNum,
      })
      .select()
      .single();

    if (bizError || !business) {
      console.error('Failed to create business record:', bizError);
      return {
        success: false,
        error: bizError?.message || 'Failed to save business details',
      };
    }

    // 7. Insert Business Location
    await supabase.from('business_locations').insert({
      business_id: business.id,
      city: input.city.trim(),
      country: input.country.trim() || 'Sri Lanka',
      address: input.address?.trim() || `${input.city}, ${input.country}`,
      state: 'Western',
      district: input.district,
    });

    // 8. Insert Business Contact & Social Channels
    await supabase.from('business_contacts').insert({
      business_id: business.id,
      email: input.businessEmail?.trim() || input.email.trim(),
      mobile: input.businessPhone?.trim() || input.phone.trim(),
      website: input.website?.trim() || null,
      whatsapp: input.whatsapp?.trim() || null,
      social_links: {
        linkedin: input.linkedin?.trim() || undefined,
        instagram: input.instagram?.trim() || undefined,
        facebook: input.facebook?.trim() || undefined,
        twitter: input.twitter?.trim() || undefined,
      },
    });

    // 9. Dispatch Welcome Email via Resend in background
    try {
      await sendWelcomeEmail({
        to: input.email.trim(),
        fullName: input.fullName.trim(),
        businessName: input.businessName.trim(),
      });
    } catch (e) {
      console.error('Non-critical email dispatch failure:', e);
    }

    revalidatePath('/directory');
    revalidatePath('/business-dashboard');

    return {
      success: true,
      businessId: business.id,
      slug: finalSlug,
      redirectTo: '/business-dashboard',
    };
  } catch (error: any) {
    console.error('Register business error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during registration.',
    };
  }
}
