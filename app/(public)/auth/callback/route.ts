import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Successfully authenticated via email link, redirect to desired destination (e.g. /auth/reset-password)
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If code exchange failed or expired
  return NextResponse.redirect(`${origin}/auth/login?error=Invalid+or+expired+reset+link`);
}
