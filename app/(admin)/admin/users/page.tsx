"use client";

import { Users, Search, Filter, Shield, UserCheck, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const userList = [
  { id: "1", name: "Anand Vardhan", email: "anand@lumina.com", role: "Business Owner", district: "District 3220", status: "Active", rotaryId: "ROT-3220-8841" },
  { id: "2", name: "Sarah Chen", email: "sarah@nexus.com", role: "District Moderator", district: "District 3220", status: "Active", rotaryId: "ROT-3220-1042" },
  { id: "3", name: "Dr. Rohan Shah", email: "rohan@apex.com", role: "Business Owner", district: "District 3141", status: "Active", rotaryId: "ROT-3141-9920" },
  { id: "4", name: "Marcus Vance", email: "marcus@bloom.com", role: "Business Owner", district: "District 9110", status: "Suspended", rotaryId: "ROT-9110-3312" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User & Member Directory Management</h1>
          <p className="text-xs text-muted-foreground mt-1">Global member registry, role assignments, and Rotary ID status.</p>
        </div>
        <Button className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs font-bold gap-2">
          + Add New Member
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4">MEMBER NAME</th>
                <th className="py-3 px-4">ROLE</th>
                <th className="py-3 px-4">DISTRICT</th>
                <th className="py-3 px-4">ROTARY ID</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {userList.map((u) => (
                <tr key={u.id} className="hover:bg-warm-bg/50">
                  <td className="py-4 px-4">
                    <p className="font-bold text-foreground">{u.name}</p>
                    <p className="text-[10px] text-muted-foreground">{u.email}</p>
                  </td>
                  <td className="py-4 px-4 font-semibold text-foreground">{u.role}</td>
                  <td className="py-4 px-4 text-muted-foreground">{u.district}</td>
                  <td className="py-4 px-4 font-mono text-xs text-[#D41367]">{u.rotaryId}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button variant="ghost" size="icon" className="w-7 h-7"><MoreVertical className="w-4 h-4" /></Button>
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
