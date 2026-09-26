-- Migration: Add missing DELETE policy for verification_documents
-- Allows business owners to delete their own uploaded verification documents, and super admins to manage them.

DO $$
BEGIN
    DROP POLICY IF EXISTS "Owners and Admins can delete verification docs" ON public.verification_documents;
    
    CREATE POLICY "Owners and Admins can delete verification docs"
    ON public.verification_documents FOR DELETE
    USING (
        public.is_business_owner(business_id)
        OR public.is_super_admin()
    );
END $$;
