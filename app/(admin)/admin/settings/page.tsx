"use client";

import { Shield, Settings, Server, Key, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Super Admin System Settings</h1>
        <p className="text-xs text-muted-foreground mt-1">Configure global network policies, Cloudflare R2 bucket parameters, and email hooks.</p>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <Server className="w-4 h-4 text-[#D41367]" /> Cloudflare R2 File Storage Configuration
        </h2>
        <div className="space-y-3 text-xs">
          <div className="space-y-1">
            <Label className="text-xs font-semibold">R2 Storage Bucket Name</Label>
            <Input defaultValue="rotaract-network-documents" className="h-10 text-xs bg-warm-bg rounded-xl" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Custom Public CDN Domain</Label>
            <Input defaultValue="https://cdn.rotaractnetwork.org" className="h-10 text-xs bg-warm-bg rounded-xl" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#D41367]" /> Global Verification Rules
        </h2>
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 bg-warm-bg rounded-xl border border-border">
            <div>
              <p className="font-bold text-foreground">Require DRR Endorsement for Gold Tier</p>
              <p className="text-[10px] text-muted-foreground">Enforces official District Representative verification letters.</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#D41367]" />
          </div>
        </div>
      </div>

      <Button className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-11 px-8 text-xs font-bold gap-2 shadow-md">
        <Save className="w-4 h-4" /> Save System Settings
      </Button>
    </div>
  );
}
