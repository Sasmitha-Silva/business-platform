"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  UserPlus,
  UserMinus,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  X,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ModeratorItem {
  id: string;
  name: string;
  email: string;
  district: string;
  club: string;
  role: string;
  assignedAt: string;
}

const initialModerators: ModeratorItem[] = [
  {
    id: "1",
    name: "Ptr. Dilshan Wickremasinghe",
    email: "dilshan@rotaract3220.org",
    district: "3220",
    club: "Rotaract Club of Colombo Central",
    role: "District Representative (DRR)",
    assignedAt: "Feb 15, 2024",
  },
  {
    id: "2",
    name: "Rtr. Sarah Chen",
    email: "sarah@rotaract3220.org",
    district: "3220",
    club: "Rotaract Club of Colombo Downtown",
    role: "District Director",
    assignedAt: "Mar 10, 2024",
  },
  {
    id: "3",
    name: "Rtr. Samuel Omondi",
    email: "samuel@rotaract9212.org",
    district: "9212",
    club: "Rotaract Club of Nairobi Central",
    role: "District Secretariat",
    assignedAt: "Mar 01, 2024",
  },
  {
    id: "4",
    name: "Rtr. Ayodeji Balogun",
    email: "ayodeji@rotaract9110.org",
    district: "9110",
    club: "Rotaract Club of Lagos Metro",
    role: "District Representative",
    assignedAt: "Jun 12, 2024",
  },
  {
    id: "5",
    name: "Rtr. Priya Sharma",
    email: "priya@rotaract3141.org",
    district: "3141",
    club: "Rotaract Club of Mumbai Central",
    role: "District Director",
    assignedAt: "Jul 05, 2024",
  },
];

export default function AdminModeratorsPage() {
  const [moderators, setModerators] = useState<ModeratorItem[]>(initialModerators);
  const [selectedDistrict, setSelectedDistrict] = useState("3220");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assigneeName, setAssigneeName] = useState("");
  const [assigneeEmail, setAssigneeEmail] = useState("");
  const [assigneeRole, setAssigneeRole] = useState("District Moderator");
  const [assigneeClub, setAssigneeClub] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentDistrictMods = moderators.filter((m) => m.district === selectedDistrict);

  const handleAssignModerator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigneeName.trim() || !assigneeEmail.trim()) return;

    const newMod: ModeratorItem = {
      id: `mod-${Date.now()}`,
      name: assigneeName.trim(),
      email: assigneeEmail.trim(),
      district: selectedDistrict,
      club: assigneeClub.trim() || `Rotaract Club of District ${selectedDistrict}`,
      role: assigneeRole,
      assignedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    setModerators([...moderators, newMod]);
    setAssigneeName("");
    setAssigneeEmail("");
    setAssigneeClub("");
    setShowAssignModal(false);
    showToast(`Appointed ${newMod.name} to District ${selectedDistrict}.`);
  };

  const handleRemoveModerator = (id: string, name: string) => {
    setModerators(moderators.filter((m) => m.id !== id));
    showToast(`Revoked moderator appointment for ${name}.`);
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

      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              District Moderator Administration
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              {moderators.length} Active Officers
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Appoint verified Rotaract leaders to review compliance claims and maintain directory integrity.
          </p>
        </div>
      </div>

      {/* Appoint Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Appoint District Moderator</h3>
                  <p className="text-xs text-slate-500 font-normal">Assign reviewing officer to District {selectedDistrict}.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAssignModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAssignModerator} className="space-y-3.5">
              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Officer Name *</Label>
                <Input
                  required
                  value={assigneeName}
                  onChange={(e) => setAssigneeName(e.target.value)}
                  placeholder="e.g. Rtr. Sarah Perera"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Email Address *</Label>
                <Input
                  type="email"
                  required
                  value={assigneeEmail}
                  onChange={(e) => setAssigneeEmail(e.target.value)}
                  placeholder="sarah@rotaract3220.org"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Designation / Role</Label>
                <Input
                  value={assigneeRole}
                  onChange={(e) => setAssigneeRole(e.target.value)}
                  placeholder="e.g. District Rotaract Representative (DRR)"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Home Rotaract Club</Label>
                <Input
                  value={assigneeClub}
                  onChange={(e) => setAssigneeClub(e.target.value)}
                  placeholder="Rotaract Club of Colombo North"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAssignModal(false)}
                  className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-9.5 px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold h-9.5 px-5 shadow-xs"
                >
                  Confirm Appointment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 2-COLUMN WORKSPACE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* District Selector Card (1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D41367]" /> District Context
            </h2>
            <span className="text-xs text-slate-400 font-normal">Active Selection</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Select a target Rotary International district to view allocated moderators and review capacity.
          </p>

          <div className="space-y-2 pt-1">
            {[
              { id: "3220", label: "District 3220 — Sri Lanka & Maldives" },
              { id: "3141", label: "District 3141 — Mumbai, India" },
              { id: "9212", label: "District 9212 — Kenya & East Africa" },
              { id: "9110", label: "District 9110 — Lagos, Nigeria" },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDistrict(d.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                  selectedDistrict === d.id
                    ? "bg-pink-50/80 border-[#D41367] text-[#D41367] shadow-2xs"
                    : "bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>{d.label}</span>
                {selectedDistrict === d.id && <CheckCircle2 className="w-4 h-4 text-[#D41367]" />}
              </button>
            ))}
          </div>

          {/* Capacity Progress */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600">Review Capacity</span>
              <span className="text-[#D41367]">{currentDistrictMods.length} / 5 Slots</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D41367] rounded-full transition-all"
                style={{ width: `${(currentDistrictMods.length / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Current District Moderators (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                District {selectedDistrict} Active Moderators
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Moderators assigned to review claims within this district.
              </p>
            </div>
            <Button
              onClick={() => setShowAssignModal(true)}
              className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold gap-1.5 h-9 px-3.5 shadow-xs cursor-pointer shrink-0"
            >
              <UserPlus className="w-4 h-4" />
              <span>Appoint Moderator</span>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5 pt-1">
            {currentDistrictMods.map((mod) => (
              <div
                key={mod.id}
                className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 flex items-start justify-between gap-3 hover:bg-slate-50 transition-colors"
              >
                <div className="min-w-0 space-y-0.5">
                  <p className="font-bold text-xs sm:text-sm text-slate-900 truncate">{mod.name}</p>
                  <p className="text-xs text-slate-500 truncate font-normal">{mod.email}</p>
                  <p className="text-xs text-[#D41367] font-semibold pt-0.5 truncate">{mod.club}</p>
                </div>
                <button
                  type="button"
                  title="Revoke Moderator"
                  onClick={() => handleRemoveModerator(mod.id, mod.name)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                >
                  <UserMinus className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* Empty Slot Placeholder */}
            {currentDistrictMods.length < 5 && (
              <div
                onClick={() => setShowAssignModal(true)}
                className="p-4 rounded-xl border border-dashed border-slate-200 hover:border-pink-300 flex flex-col items-center justify-center text-center text-slate-400 hover:text-[#D41367] bg-slate-50/30 hover:bg-pink-50/30 transition-all cursor-pointer min-h-[96px] group"
              >
                <Plus className="w-5 h-5 mx-auto text-slate-400 group-hover:text-[#D41367] group-hover:scale-110 transition-transform mb-1" />
                <p className="text-xs font-semibold">Available Moderator Slot</p>
                <p className="text-[11px] text-slate-400">Click to appoint officer</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
