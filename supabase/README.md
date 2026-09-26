# Supabase Database Migrations & Seed Instructions

This directory contains the production database migrations, Row-Level Security (RLS) policies, and seed data for the **Rotaract Business Platform**.

---

## 📁 Migration Files

1. **`migrations/20260905_001_initial_schema.sql`**
   - Enables `uuid-ossp`, `pgcrypto`, and `pg_trgm` (fuzzy trigram search) extensions.
   - Defines all custom ENUM types (`user_role`, `business_status`, `verification_doc_type`, etc.).
   - Creates all 12 core tables with foreign keys and cascading rules.
   - Creates indexes (status, district, categories, GIN full-text search).
   - Creates the `on_auth_user_created` trigger for automatic profile generation on Supabase Auth signup.
   - Creates `increment_business_views` RPC function.

2. **`migrations/20260905_002_rls_policies.sql`**
   - Enables Row-Level Security (RLS) across all tables.
   - Implements `is_super_admin()`, `is_moderator()`, `is_moderator_for_district()`, and `is_business_owner()` security definer functions.
   - Sets up granular access control for Public visitors, Business Owners, District Moderators, and Super Admins.

3. **`seed.sql`**
   - Seeds the primary 8 Industry Categories and 39 Subcategories with slug hierarchy and sort ordering.

---

## 🚀 How to Apply Migrations

### Option A: Via Supabase Web Dashboard (Recommended for Quick Setup)
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) and open your project.
2. Click on **SQL Editor** in the left sidebar.
3. Open and run **`migrations/20260905_001_initial_schema.sql`**.
4. Open and run **`migrations/20260905_002_rls_policies.sql`**.
5. Open and run **`seed.sql`**.

### Option B: Via Supabase CLI
```bash
# Link your local project to Supabase
npx supabase link --project-ref your-project-ref

# Push migrations to your remote database
npx supabase db push

# (Optional) Seed the database
npx supabase db reset
```
