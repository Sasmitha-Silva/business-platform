"use client";

import { useState } from "react";
import {
  User,
  Lock,
  Save,
  CheckCircle2,
  ShieldCheck,
  Key,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OwnerSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* Toast Alert */}
      {saved && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Account &amp; security preferences saved successfully!</span>
        </div>
      )}

      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white font-bold text-xl flex items-center justify-center shadow-xs shrink-0">
            AS
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Account &amp; Security Settings
              </h1>
              <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
                Primary Business Owner
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Manage your verified Rotaract member credentials and login security.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Rotary ID Verified</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* ================= CARD 1: PERSONAL & ROTARACT DETAILS ================= */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-[#D41367]" /> Personal &amp; Rotaract Profile
              </h2>
              <span className="text-xs text-slate-400 font-normal">Account Member Details</span>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Full Name *</Label>
                <Input
                  defaultValue="Rtr. Anand Vardhan Sharma"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">Work Email Address</Label>
                  <Input
                    defaultValue="anand@luminadigital.in"
                    className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">Direct Phone Number</Label>
                  <Input
                    defaultValue="+91 98200 12345"
                    className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">Rotary Member ID (RID)</Label>
                  <Input
                    defaultValue="RID-3141-8841"
                    readOnly
                    className="h-10 text-xs sm:text-sm bg-slate-100/70 border-slate-200 rounded-xl text-slate-600 font-semibold cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">Rotary District</Label>
                  <Input
                    defaultValue="District 3141"
                    readOnly
                    className="h-10 text-xs sm:text-sm bg-slate-100/70 border-slate-200 rounded-xl text-slate-600 font-semibold cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Home Rotaract / Rotary Club</Label>
                <Input
                  defaultValue="Rotaract Club of Mumbai Central"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* ================= CARD 2: SECURITY & ACCESS CONTROL ================= */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#D41367]" /> Security &amp; Credentials
              </h2>
              <span className="text-xs text-slate-400 font-normal">Access Protection</span>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Current Password</Label>
                <Input
                  type="password"
                  placeholder="Enter current password"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">New Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">Confirm New Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div className="text-xs text-slate-400 font-normal flex items-center gap-1.5 pt-2">
                <Key className="w-3.5 h-3.5 text-slate-400" />
                <span>Last password change: July 12, 2026 (Active IP: Mumbai, IN)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CARD 3: DATA EXPORT & DANGER ZONE ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Download className="w-4 h-4 text-slate-600" /> Account Management &amp; Data
            </h2>
            <span className="text-xs text-slate-400 font-normal">Data Governance</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Export Business Listing Data</h4>
              <p className="text-xs text-slate-500 font-normal mt-0.5">Download a copy of your products, inquiries, and profile analytics in JSON format.</p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const data = { business: "Lumina Digital Solutions", exported_at: new Date().toISOString() };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "business-listing-export.json";
                a.click();
              }}
              className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold h-9.5 px-4 shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export Data
            </Button>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="submit"
            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-10 px-7 text-xs sm:text-sm font-semibold gap-2 shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
