"use client";

import { useState } from "react";
import {
  Shield,
  Settings,
  Server,
  Key,
  Save,
  CheckCircle2,
  Database,
  Lock,
  Globe,
  Sliders,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [requireDRR, setRequireDRR] = useState(true);
  const [requireMSME, setRequireMSME] = useState(true);
  const [allowPublicInquiries, setAllowPublicInquiries] = useState(true);

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
          <span>Super Admin system policies saved successfully!</span>
        </div>
      )}

      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Global Platform Governance &amp; Configuration
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              System Core
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Configure global network policies, document verification rules, Cloudflare R2 bucket parameters, and API webhooks.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Core Engines Operational</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* ================= CARD 1: STORAGE & CDN ================= */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Server className="w-4 h-4 text-[#D41367]" /> Cloudflare R2 Document Vault
              </h2>
              <span className="text-xs text-slate-400 font-normal">Encrypted Storage</span>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">R2 Storage Bucket Name</Label>
                <Input
                  defaultValue="rotaract-network-documents-prod"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Custom Public CDN Domain</Label>
                <Input
                  defaultValue="https://cdn.rotaractnetwork.org"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Max File Size Limit (MB)</Label>
                <Input
                  defaultValue="15"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* ================= CARD 2: GLOBAL VERIFICATION RULES ================= */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#D41367]" /> Accreditation Policy Engine
              </h2>
              <span className="text-xs text-slate-400 font-normal">Compliance Rules</span>
            </div>

            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Mandatory DRR Endorsement for Gold</h4>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">Enforces active Rotary Year District Representative sign-off.</p>
                </div>
                <Switch checked={requireDRR} onCheckedChange={setRequireDRR} />
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Government MSME / Udyam Registry</h4>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">Require national registration certificate for Tier 3 verification.</p>
                </div>
                <Switch checked={requireMSME} onCheckedChange={setRequireMSME} />
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Public Buyer Direct Messaging</h4>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">Allow non-logged in prospective clients to submit inquiries.</p>
                </div>
                <Switch checked={allowPublicInquiries} onCheckedChange={setAllowPublicInquiries} />
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
            <Save className="w-4 h-4" /> Save System Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
