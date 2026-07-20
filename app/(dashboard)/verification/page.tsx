import Link from "next/link";
import { AlertTriangle, Upload, Lock, FileText, CheckCircle, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerificationUploadsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Required Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">
            To maintain the integrity of the Rotaract Business Network, we require verified legal documentation. Please resolve any issues with failed submissions below.
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-semibold shrink-0">
          <AlertTriangle className="w-4 h-4" /> Action Required: 2 Re-uploads
        </div>
      </div>

      {/* 3 Document Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Card 1: GST Certificate */}
        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-pink-50 text-crimson flex items-center justify-center font-bold">
                📄
              </div>
              <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full flex items-center gap-1">
                ⚠️ Review Failed
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-foreground">GST Certificate</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Government Issued Goods and Services Tax Registration (Form REG-06).
              </p>
            </div>

            {/* Reviewer Feedback Box */}
            <div className="bg-red-50/60 border-l-4 border-red-500 rounded-r-2xl p-4 space-y-1">
              <p className="text-[10px] font-bold text-red-800 uppercase tracking-wider">REVIEWER FEEDBACK</p>
              <p className="text-xs text-red-900/80 italic leading-relaxed">
                &quot;The uploaded document is blurry. Please re-scan the original certificate in high resolution (300 DPI) ensuring all corners are visible.&quot;
              </p>
            </div>
          </div>

          {/* Re-upload Area */}
          <div className="border-2 border-dashed border-pink-200 rounded-2xl p-6 text-center hover:bg-pink-50/40 transition-colors cursor-pointer space-y-2">
            <Upload className="w-6 h-6 text-crimson mx-auto" />
            <p className="text-xs font-bold text-crimson">Click to Re-upload</p>
            <p className="text-[10px] text-muted-foreground">PDF, JPG up to 5MB</p>
          </div>
        </div>

        {/* Card 2: DRR Letter */}
        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                🏛
              </div>
              <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full flex items-center gap-1">
                ⚠️ Review Failed
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-foreground">DRR Letter</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                District Rotaract Representative authorization letter for current year.
              </p>
            </div>

            {/* Reviewer Feedback Box */}
            <div className="bg-red-50/60 border-l-4 border-red-500 rounded-r-2xl p-4 space-y-1">
              <p className="text-[10px] font-bold text-red-800 uppercase tracking-wider">REVIEWER FEEDBACK</p>
              <p className="text-xs text-red-900/80 italic leading-relaxed">
                &quot;The letter provided is for the 2022-23 R.I. year. Please upload the authorization letter for the current 2023-24 tenure.&quot;
              </p>
            </div>
          </div>

          {/* Update Area */}
          <div className="border-2 border-dashed border-amber-200 rounded-2xl p-6 text-center hover:bg-amber-50/40 transition-colors cursor-pointer space-y-2">
            <Upload className="w-6 h-6 text-amber-700 mx-auto" />
            <p className="text-xs font-bold text-amber-800">Update Document</p>
            <p className="text-[10px] text-muted-foreground">PDF only</p>
          </div>
        </div>

        {/* Card 3: Udyam Registry */}
        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                🏬
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full flex items-center gap-1">
                ⏳ In Review
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-foreground">Udyam Registry</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                MSME Registration Certificate from Ministry of Micro, Small & Medium Enterprises.
              </p>
            </div>

            {/* Attached file preview */}
            <div className="bg-warm-bg rounded-2xl p-3 border border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-crimson" />
                <div>
                  <p className="text-xs font-semibold text-foreground truncate max-w-[120px]">udyam_cert_final.pdf</p>
                  <p className="text-[10px] text-muted-foreground">Uploaded 2 days ago</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground cursor-pointer hover:text-crimson">👁</span>
            </div>
          </div>

          {/* Locked State Button */}
          <Button disabled className="w-full bg-slate-100 text-slate-400 border border-slate-200 rounded-2xl py-3 text-xs font-bold">
            <Lock className="w-3.5 h-3.5 mr-1" /> Document Locked
          </Button>
        </div>
      </div>

      {/* Need Assistance Card */}
      <div className="bg-pink-50/60 border border-pink-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h3 className="font-bold text-foreground text-lg">Need assistance with verification?</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-lg">
            Our verification team is available to help you navigate the documentation process. Gold and Silver tier members get priority review within 24 hours.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Button className="bg-crimson hover:bg-crimson-dark text-white rounded-2xl px-6 py-2.5 text-xs font-bold gap-2">
            Contact Support
          </Button>
          <Button variant="outline" className="rounded-2xl border-crimson text-crimson hover:bg-pink-50 px-6 py-2.5 text-xs font-bold">
            View Guidelines
          </Button>
        </div>
      </div>
    </div>
  );
}
