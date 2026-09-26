import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const rawNext = searchParams.get('next') ?? '/';
  // SEC-011: Prevent open redirects by enforcing safe local path
  const safeNext =
    rawNext.startsWith('/') && !rawNext.startsWith('//') && !rawNext.includes('\\')
      ? rawNext
      : '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Successfully authenticated via email link, redirect to desired destination (e.g. /auth/reset-password)
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  // If code exchange failed or expired
  return NextResponse.redirect(`${origin}/auth/login?error=Invalid+or+expired+reset+link`);
}
