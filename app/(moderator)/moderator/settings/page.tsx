"use client";

import { User, Shield, Lock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ModeratorSettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-foreground">District Moderator Account Settings</h1>
        <p className="text-xs text-muted-foreground mt-1">Manage your moderator credentials and district assignment preferences.</p>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <User className="w-4 h-4 text-[#D41367]" /> Moderator Profile
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Full Name</Label>
            <Input defaultValue="Sarah Chen" className="h-10 text-xs bg-warm-bg rounded-xl" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Moderator Role</Label>
            <Input defaultValue="District Representative (DRR)" className="h-10 text-xs bg-warm-bg rounded-xl" readOnly />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Assigned District</Label>
            <Input defaultValue="District 3220 (Sri Lanka)" className="h-10 text-xs bg-warm-bg rounded-xl" readOnly />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Contact Phone</Label>
            <Input defaultValue="+94 77 123 4567" className="h-10 text-xs bg-warm-bg rounded-xl" />
          </div>
        </div>
      </div>

      <Button className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-11 px-8 text-xs font-bold gap-2 shadow-md">
        <Save className="w-4 h-4" /> Save Account Settings
      </Button>
    </div>
  );
}
