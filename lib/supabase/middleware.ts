import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Avoid writing logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Protect Dashboard Routes
  const isDashboardRoute =
    pathname.startsWith('/business-dashboard') ||
    pathname.startsWith('/moderator-dashboard') ||
    pathname.startsWith('/admin-dashboard');

  const isAuthRoute = pathname.startsWith('/auth');

  if (!user && isDashboardRoute) {
    // Redirect unauthenticated user to login
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  if (user && isAuthRoute) {
    // If user is already logged in and navigates to /auth/login or /auth/signup,
    // fetch their profile role and redirect to their appropriate dashboard
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const role = profile?.role || 'owner';
    let target = '/business-dashboard';
    if (role === 'super_admin') target = '/admin-dashboard';
    else if (role === 'moderator') target = '/moderator-dashboard';

    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url);
  }

  // Role-specific route gating
  if (user) {
    if (
      pathname.startsWith('/admin-dashboard') ||
      pathname.startsWith('/moderator-dashboard')
    ) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      const role = profile?.role;

      if (pathname.startsWith('/admin-dashboard') && role !== 'super_admin') {
        const url = request.nextUrl.clone();
        url.pathname = role === 'moderator' ? '/moderator-dashboard' : '/business-dashboard';
        return NextResponse.redirect(url);
      }

      if (
        pathname.startsWith('/moderator-dashboard') &&
        role !== 'moderator' &&
        role !== 'super_admin'
      ) {
        const url = request.nextUrl.clone();
        url.pathname = '/business-dashboard';
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
