import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Rotaract Business Network",
  description: "Privacy policy and data protection standards of the Rotaract Business Network.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAF6F4] min-h-screen pb-16 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#D41367] uppercase tracking-wider">LEGAL & COMPLIANCE</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-muted-foreground">Last updated: July 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-border shadow-sm space-y-6 text-xs text-foreground/80 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">1. Data Collection & Purpose</h2>
            <p>
              Rotaract Business Network collects information required for member directory verification, including business registration details (GST, Udyam, DRR certificates), Rotary ID numbers, and contact details provided during profile registration.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">2. Verification Document Storage</h2>
            <p>
              Sensitive compliance documents (GST certificates, DRR verification letters) are encrypted and stored in secure cloud object storage. Access is strictly restricted to assigned District Moderators and Super Administrators.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">3. Directory Visibility Settings</h2>
            <p>
              Business owners retain control over which contact details (email, phone, WhatsApp) are publicly visible on their directory listing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">4. Data Sharing & Third Parties</h2>
            <p>
              We do not sell, rent, or trade member data to third-party advertisers. Information is only processed to deliver network services, directory listings, and verification reviews.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
