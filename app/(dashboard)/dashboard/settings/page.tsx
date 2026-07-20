"use client";

import { useState } from "react";
import { User, Building2, Lock, Bell, Save, Shield } from "lucide-react";
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
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Account & Business Settings</h1>
        <p className="text-xs text-muted-foreground mt-1">Manage your account credentials, notifications, and business profile preferences.</p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center justify-between">
          <span>✓ Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details */}
        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-[#D41367]" /> Personal Profile
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Full Name</Label>
              <Input defaultValue="Rtr. Anand Vardhan Sharma" className="h-10 text-xs bg-warm-bg rounded-xl" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Work Email</Label>
              <Input defaultValue="anand@luminadigital.in" className="h-10 text-xs bg-warm-bg rounded-xl" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Rotary ID Number</Label>
              <Input defaultValue="RID-3141-8841" className="h-10 text-xs bg-warm-bg rounded-xl" readOnly />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Home Club Name</Label>
              <Input defaultValue="Rotaract Club of Mumbai Central" className="h-10 text-xs bg-warm-bg rounded-xl" />
            </div>
          </div>
        </div>

        {/* Password & Security */}
        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#D41367]" /> Security & Credentials
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">New Password</Label>
              <Input type="password" placeholder="••••••••" className="h-10 text-xs bg-warm-bg rounded-xl" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Confirm New Password</Label>
              <Input type="password" placeholder="••••••••" className="h-10 text-xs bg-warm-bg rounded-xl" />
            </div>
          </div>
        </div>

        <Button type="submit" className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-11 px-8 text-xs font-bold gap-2 shadow-md">
          <Save className="w-4 h-4" /> Save Settings
        </Button>
      </form>
    </div>
  );
}
