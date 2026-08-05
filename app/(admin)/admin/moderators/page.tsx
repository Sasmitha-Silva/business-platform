"use client";

import { useState } from "react";
import { UserPlus, Search, Download, Filter, UserMinus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/verification-badge";
import { mockModeratorAssignments, mockUsers } from "@/lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ModeratorManagementPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("3220");
  const [roleFilter, setRoleFilter] = useState("all");

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Moderator Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Assign district-level moderators and oversee global role permissions.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* District Context Selector Card */}
        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-foreground text-lg text-crimson flex items-center gap-2">
            <span>🗺</span> District Context
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Select a district to view current moderators and assign new roles.
          </p>

          <div className="space-y-1.5 pt-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">ACTIVE DISTRICT</label>
            <Select value={selectedDistrict} onValueChange={(val) => setSelectedDistrict(val ?? "3220")}>
              <SelectTrigger className="w-full h-11 px-3 text-xs font-semibold bg-warm-bg border border-border rounded-xl">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl border border-border shadow-lg">
                <SelectItem value="3220">District 3220 - Colombo, Sri Lanka</SelectItem>
                <SelectItem value="9110">District 9110 - Lagos, Nigeria</SelectItem>
                <SelectItem value="9125">District 9125 - Abuja, Nigeria</SelectItem>
                <SelectItem value="3141">District 3141 - Mumbai, India</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 border-t border-border space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span>Capacity Status</span>
              <span className="text-crimson">3 / 5 Slots</span>
            </div>
            <div className="w-full h-2 bg-warm-bg rounded-full overflow-hidden">
              <div className="h-full bg-crimson w-3/5" />
            </div>
          </div>
        </div>

        {/* Current District Moderators Grid (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground text-lg flex items-center gap-2">
              <span>⚛</span> Current District Moderators
            </h2>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              Live Updates
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            {mockUsers.slice(1, 4).map((mod) => (
              <div key={mod.id} className="p-4 rounded-2xl bg-warm-bg border border-border/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-crimson to-crimson-dark text-white font-bold text-xs flex items-center justify-center">
                    {mod.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">{mod.name}</p>
                    <p className="text-[10px] text-muted-foreground">Joined 2022 · Tier: Gold</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full text-muted-foreground hover:text-red-600">
                  <UserMinus className="w-4 h-4" />
                </Button>
              </div>
            ))}

            {/* Available Slot Card */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-border flex items-center justify-center text-center text-muted-foreground">
              <p className="text-xs font-semibold">Available Slot</p>
            </div>
          </div>
        </div>
      </div>

      {/* Member Directory Table */}
      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-foreground text-lg">Member Directory</h2>
            <p className="text-xs text-muted-foreground">Manage roles and assign moderator status to verified members.</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={roleFilter} onValueChange={(val) => setRoleFilter(val ?? "all")}>
              <SelectTrigger className="rounded-xl text-xs font-bold gap-2 border-border bg-white h-9 px-3">
                <Filter className="w-3.5 h-3.5" />
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl border border-border shadow-lg">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="rounded-xl text-xs gap-2 border-border bg-white">
              <Download className="w-3.5 h-3.5" /> Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4">MEMBER</th>
                <th className="py-3 px-4">ROLE</th>
                <th className="py-3 px-4">DISTRICT</th>
                <th className="py-3 px-4">VERIFICATION</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {mockUsers.map((user, idx) => (
                <tr key={user.id} className="hover:bg-warm-bg/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 text-crimson font-bold flex items-center justify-center text-xs">
                        {user.name.split(" ").map(n=>n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{user.name}</p>
                        <p className="text-[10px] text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        user.role === "super_admin"
                          ? "bg-blue-600 text-white"
                          : user.role === "moderator"
                          ? "bg-amber-500 text-white"
                          : "bg-pink-100 text-crimson"
                      }`}
                    >
                      {user.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">3220 (Colombo)</td>
                  <td className="py-3.5 px-4">
                    <VerificationBadge level={idx % 3 + 1} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button variant="ghost" size="sm" className="text-crimson font-bold text-xs hover:bg-pink-50 rounded-xl">
                      {user.role === "moderator" ? "Manage" : "Assign Mod"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
