"use client";

import { useState } from "react";
import {
  User,
  ShieldCheck,
  Lock,
  Save,
  CheckCircle2,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ModeratorSettingsPage() {
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
          <span>District Moderator account settings saved successfully!</span>
        </div>
      )}

      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              District Moderator Profile &amp; Security
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              District 3220 Secretariat
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Manage your appointed moderator credentials, home club details, and verification alerts.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Active Commission (2026-27)</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* ================= CARD 1: MODERATOR PROFILE ================= */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-[#D41367]" /> Officer Profile
              </h2>
              <span className="text-xs text-slate-400 font-normal">District Credentials</span>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Full Name *</Label>
                <Input
                  defaultValue="Ptr. Dilshan Wickremasinghe"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">Official Email</Label>
                  <Input
                    defaultValue="dilshan@rotaract3220.org"
                    className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">Direct Contact</Label>
                  <Input
                    defaultValue="+94 77 123 4567"
                    className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">Assigned District</Label>
                  <Input
                    defaultValue="District 3220 (Sri Lanka & Maldives)"
                    readOnly
                    className="h-10 text-xs sm:text-sm bg-slate-100/70 border-slate-200 rounded-xl text-slate-600 font-semibold cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">Home Rotaract Club</Label>
                  <Input
                    defaultValue="Rotaract Club of Colombo Central"
                    className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ================= CARD 2: SECURITY & CREDENTIALS ================= */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#D41367]" /> Moderator Credentials
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
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">Confirm Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div className="text-xs text-slate-400 font-normal flex items-center gap-1.5 pt-2">
                <Key className="w-3.5 h-3.5 text-slate-400" />
                <span>Session signed in with District Secretariat MFA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="submit"
            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-10 px-7 text-xs sm:text-sm font-semibold gap-2 shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Account Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
