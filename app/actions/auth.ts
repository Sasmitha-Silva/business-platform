'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import type { UserRole } from '@/lib/types';

/**
 * 1. User Login with Email & Password
 */
export async function loginAction(formData: {
  email: string;
  password: string;
}) {
  try {
    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: formData.email.trim(),
      password: formData.password,
    });

    if (authError || !authData.user) {
      return {
        success: false,
        error: authError?.message || 'Invalid email or password',
      };
    }

    // Fetch user profile to determine role and redirect target
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, role, full_name, is_active')
      .eq('id', authData.user.id)
      .single();

    if (profile && !profile.is_active) {
      await supabase.auth.signOut();
      return {
        success: false,
        error: 'Your account has been deactivated. Please contact support.',
      };
    }

    const role: UserRole = profile?.role || 'owner';
    let redirectTo = '/business-dashboard';
    if (role === 'super_admin') redirectTo = '/admin-dashboard';
    else if (role === 'moderator') redirectTo = '/moderator-dashboard';

    revalidatePath('/', 'layout');

    return {
      success: true,
      user: authData.user,
      profile,
      role,
      redirectTo,
    };
  } catch (error: any) {
    console.error('Login action error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during login',
    };
  }
}

/**
 * 2. User Signup with Full Name, Email, Password & Rotaract Profile
 */
export async function signupAction(formData: {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  clubName?: string;
  districtNumber?: number;
  rotaryId?: string;
  role?: UserRole;
}) {
  try {
    const supabase = await createClient();

    const role = formData.role || 'owner';

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email.trim(),
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName.trim(),
          role,
        },
      },
    });

    if (authError || !authData.user) {
      return {
        success: false,
        error: authError?.message || 'Failed to create account',
      };
    }

    const userId = authData.user.id;

    // Upsert Profile
    await supabase.from('profiles').upsert({
      id: userId,
      email: formData.email.trim(),
      full_name: formData.fullName.trim(),
      phone: formData.phone || null,
      role,
      is_active: true,
    });

    // If Rotaract details are provided, insert rotaract_profiles record
    if (formData.clubName && formData.districtNumber) {
      await supabase.from('rotaract_profiles').upsert({
        user_id: userId,
        club_name: formData.clubName,
        district_number: formData.districtNumber,
        rotary_id: formData.rotaryId || null,
        is_active_member: true,
      });
    }

    let redirectTo = '/business-dashboard';
    if (role === 'super_admin') redirectTo = '/admin-dashboard';
    else if (role === 'moderator') redirectTo = '/moderator-dashboard';

    revalidatePath('/', 'layout');

    return {
      success: true,
      user: authData.user,
      role,
      redirectTo,
    };
  } catch (error: any) {
    console.error('Signup action error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during signup',
    };
  }
}

/**
 * 3. Sign Out
 */
export async function signoutAction() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    console.error('Signout action error:', error);
    return { success: false, error: error.message };
  }
}


/**
 * 5. Get Current User & Profile Info
 */
export async function getCurrentUserAction() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { user: null, profile: null, rotaractProfile: null };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    const { data: rotaractProfile } = await supabase
      .from('rotaract_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    return {
      user,
      profile,
      rotaractProfile,
    };
  } catch (error) {
    return { user: null, profile: null, rotaractProfile: null };
  }
}

/**
 * 6. Request Password Reset Link (Forgot Password)
 */
export async function requestPasswordResetAction(email: string) {
  try {
    const supabase = await createClient();
    const headerList = await headers();
    const origin =
      headerList.get('origin') ||
      headerList.get('referer') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000';

    let baseUrl = origin;
    try {
      const urlObj = new URL(origin);
      baseUrl = `${urlObj.protocol}//${urlObj.host}`;
    } catch {
      // fallback
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${baseUrl}/auth/callback?next=/auth/reset-password`,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to send reset link.' };
  }
}

/**
 * 7. Reset Password (Update Password with active recovery session)
 */
export async function resetPasswordAction(password: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to reset password.' };
  }
}
