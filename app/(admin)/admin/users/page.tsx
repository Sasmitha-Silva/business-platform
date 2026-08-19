"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  UserCheck,
  MoreVertical,
  Plus,
  CheckCircle2,
  Lock,
  UserX,
  X,
  Building2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Business Owner" | "District Moderator" | "Super Admin";
  district: string;
  status: "Active" | "Suspended";
  rotaryId: string;
}

const initialUsers: AdminUser[] = [
  {
    id: "1",
    name: "Rtr. Anand Vardhan Sharma",
    email: "anand@luminadigital.in",
    role: "Business Owner",
    district: "District 3220",
    status: "Active",
    rotaryId: "RID-3220-8841",
  },
  {
    id: "2",
    name: "Rtr. Sarah Chen",
    email: "sarah@rotaract3220.org",
    role: "District Moderator",
    district: "District 3220",
    status: "Active",
    rotaryId: "RID-3220-1042",
  },
  {
    id: "3",
    name: "Dr. Rtr. Rohan Shah",
    email: "rohan@apexdental.com",
    role: "Business Owner",
    district: "District 3141",
    status: "Active",
    rotaryId: "RID-3141-9920",
  },
  {
    id: "4",
    name: "Rtr. Marcus Vance",
    email: "marcus@bloomstudio.com",
    role: "Business Owner",
    district: "District 9110",
    status: "Suspended",
    rotaryId: "RID-9110-3312",
  },
  {
    id: "5",
    name: "Rtn. Kanishka De Silva",
    email: "kanishka@rotaractglobal.org",
    role: "Super Admin",
    district: "District 3220",
    status: "Active",
    rotaryId: "RID-3220-0001",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<AdminUser["role"]>("Business Owner");
  const [newUserDistrict, setNewUserDistrict] = useState("District 3220");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Status toggle confirmation modal
  const [statusModalUser, setStatusModalUser] = useState<AdminUser | null>(null);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.rotaryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" ? true : u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const confirmStatusToggle = () => {
    if (!statusModalUser) return;
    const isSuspending = statusModalUser.status === "Active";
    setUsers((prev) =>
      prev.map((u) =>
        u.id === statusModalUser.id ? { ...u, status: isSuspending ? "Suspended" : "Active" } : u
      )
    );
    showToast(
      isSuspending
        ? `Account for ${statusModalUser.name} has been suspended.`
        : `Account for ${statusModalUser.name} has been reactivated.`
    );
    setStatusModalUser(null);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser: AdminUser = {
      id: `u-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      district: newUserDistrict,
      status: "Active",
      rotaryId: `RID-${Date.now().toString().slice(-4)}`,
    };

    setUsers([newUser, ...users]);
    setNewUserName("");
    setNewUserEmail("");
    setShowAddModal(false);
    showToast(`Member ${newUser.name} enrolled.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= SUSPEND / ACTIVATE CONFIRMATION MODAL ================= */}
      {statusModalUser && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    statusModalUser.status === "Active"
                      ? "bg-red-50 text-red-600 border-red-100"
                      : "bg-emerald-50 text-emerald-600 border-emerald-100"
                  }`}
                >
                  {statusModalUser.status === "Active" ? (
                    <UserX className="w-4 h-4" />
                  ) : (
                    <UserCheck className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {statusModalUser.status === "Active" ? "Suspend Member Account" : "Reactivate Member Account"}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal">Security &amp; access status change.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStatusModalUser(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Member:</span>
                <span className="font-bold text-slate-900">{statusModalUser.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="text-slate-700">{statusModalUser.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Platform Role:</span>
                <span className="font-semibold text-slate-800">{statusModalUser.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rotary ID:</span>
                <span className="font-mono text-[#D41367]">{statusModalUser.rotaryId}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              {statusModalUser.status === "Active"
                ? "Suspending this account will immediately revoke portal access and hide any associated directory listings until reinstated."
                : "Reactivating this account will restore full portal access and re-publish associated verified business listings."}
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStatusModalUser(null)}
                className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-9.5 px-4"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={confirmStatusToggle}
                className={`rounded-xl text-xs sm:text-sm font-semibold h-9.5 px-5 shadow-xs text-white ${
                  statusModalUser.status === "Active"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {statusModalUser.status === "Active" ? "Confirm Suspension" : "Confirm Reactivation"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              User &amp; Member Registry
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              {users.length} Enrolled Members
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Global member registry, role authorizations, district assignments, and Rotary ID accreditation.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold gap-2 h-9.5 px-4 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Enroll Member</span>
          </Button>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100 shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Enroll New Member</h3>
                  <p className="text-xs text-slate-500 font-normal">Add a Rotaract member or business owner.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3.5">
              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Full Name *</Label>
                <Input
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Rtr. Dilshan Wickramasinghe"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Email Address *</Label>
                <Input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="dilshan@example.com"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">Role</Label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as AdminUser["role"])}
                    className="h-10 w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 outline-none focus:bg-white focus:border-[#D41367]"
                  >
                    <option value="Business Owner">Business Owner</option>
                    <option value="District Moderator">District Moderator</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">District</Label>
                  <Input
                    value={newUserDistrict}
                    onChange={(e) => setNewUserDistrict(e.target.value)}
                    placeholder="District 3220"
                    className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-9.5 px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold h-9.5 px-5 shadow-xs"
                >
                  Enroll Member
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= SEARCH & ROLE FILTER TOOLBAR ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, rotary ID..."
            className="pl-9.5 h-9.5 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: "all", label: "All Members" },
            { id: "Business Owner", label: "Business Owners" },
            { id: "District Moderator", label: "Moderators" },
            { id: "Super Admin", label: "Admins" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRoleFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 cursor-pointer transition-all ${
                roleFilter === tab.id
                  ? "bg-[#D41367] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MEMBERS TABLE ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-5">Member Name</th>
                <th className="py-3.5 px-5">Platform Role</th>
                <th className="py-3.5 px-5">District</th>
                <th className="py-3.5 px-5">Rotary ID</th>
                <th className="py-3.5 px-5">Account Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No members matched your search or role filter.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-5">
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900">{u.name}</p>
                        <p className="text-xs text-slate-500 font-normal">{u.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                          u.role === "Super Admin"
                            ? "bg-purple-100 text-purple-800 border border-purple-200"
                            : u.role === "District Moderator"
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-semibold text-slate-700">{u.district}</td>
                    <td className="py-4 px-5 font-mono text-xs font-semibold text-[#D41367]">{u.rotaryId}</td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                          u.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-rose-100 text-rose-800 border border-rose-200"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setStatusModalUser(u)}
                        className={`h-8 text-xs font-semibold rounded-xl cursor-pointer ${
                          u.status === "Active"
                            ? "text-red-600 hover:bg-red-50"
                            : "text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        {u.status === "Active" ? "Suspend" : "Activate"}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
