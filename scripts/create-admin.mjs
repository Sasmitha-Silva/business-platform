import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, anonKey);
const supabaseAdmin = createClient(supabaseUrl, serviceKey);

async function createAdmin(email = 'admin@rbn.org', password = 'AdminPassword123!', fullName = 'Sasmitha Silva') {
  console.log(`Creating/Promoting admin user: ${email}...`);

  // 1. Sign up user via Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: 'super_admin',
      },
    },
  });

  const userId = authData?.user?.id;

  if (userId) {
    await supabaseAdmin.auth.admin.updateUserById(userId, {
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role: 'super_admin',
      },
    });
  }

  // 2. Fetch or update profile
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  const targetId = userId || profile?.id;

  if (targetId) {
    const { error: upsertError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: targetId,
        full_name: fullName,
        email: email,
        role: 'super_admin',
        is_active: true,
      });

    if (upsertError) {
      console.error('Failed to set profile role:', upsertError);
    } else {
      console.log('✅ Super Admin account ready!');
      console.log('-------------------------------------------');
      console.log(`Email:    ${email}`);
      console.log(`Password: ${password}`);
      console.log(`Name:     ${fullName}`);
      console.log(`Role:     super_admin`);
      console.log('-------------------------------------------');
    }
  }
}

createAdmin();
