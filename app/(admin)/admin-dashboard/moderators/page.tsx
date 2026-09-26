"use client";

import { useState, useEffect, useRef } from "react";
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
  Search,
  Globe,
  ChevronDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getModeratorsAdminAction,
  createOrAssignModeratorAdminAction,
  removeModeratorAssignmentAction,
  getDistrictsAction,
} from "@/app/actions/admin";

interface ModeratorItem {
  id: string;
  name: string;
  email: string;
  district: string;
  club: string;
  role: string;
  assignedAt: string;
}

import {
  getCachedDashboardData,
  setCachedDashboardData,
} from "@/lib/cache/admin-cache";

interface DistrictOption {
  district_number: number;
  name: string;
  region: string;
  country: string;
}

export default function AdminModeratorsPage() {
  const cachedMods = getCachedDashboardData<ModeratorItem[]>("admin_moderators_list");
  const cachedDistricts = getCachedDashboardData<DistrictOption[]>("admin_districts_list");

  const [moderators, setModerators] = useState<ModeratorItem[]>(cachedMods || []);
  const [districts, setDistricts] = useState<DistrictOption[]>(cachedDistricts || []);
  const [selectedDistrict, setSelectedDistrict] = useState("3220");

  // Custom dropdown state (Top Bar)
  const [isTopDropdownOpen, setIsTopDropdownOpen] = useState(false);
  const [topSearch, setTopSearch] = useState("");
  const topDropdownRef = useRef<HTMLDivElement>(null);

  // Custom dropdown state (Modal)
  const [isModalDropdownOpen, setIsModalDropdownOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState("");
  const modalDropdownRef = useRef<HTMLDivElement>(null);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assigneeName, setAssigneeName] = useState("");
  const [assigneeEmail, setAssigneeEmail] = useState("");
  const [assigneeRole, setAssigneeRole] = useState("District Moderator");
  const [assigneeClub, setAssigneeClub] = useState("");
  const [modalDistrict, setModalDistrict] = useState("3220");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!cachedMods);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (topDropdownRef.current && !topDropdownRef.current.contains(e.target as Node)) {
        setIsTopDropdownOpen(false);
      }
      if (modalDropdownRef.current && !modalDropdownRef.current.contains(e.target as Node)) {
        setIsModalDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function loadData() {
    try {
      if (!cachedMods) {
        setIsLoading(true);
      }
      const [modData, distData] = await Promise.all([
        getModeratorsAdminAction(),
        getDistrictsAction(),
      ]);
      const mapped = modData.map((item: any) => ({
        id: item.id,
        name: item.moderator?.full_name || "District Officer",
        email: item.moderator?.email || "moderator@rbn.org",
        district: String(item.district_number || "3220"),
        club: item.moderator?.rotaract_profile?.club_name || "",
        role: "District Moderator",
        assignedAt: item.assigned_at
          ? new Date(item.assigned_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
          : "Active",
      }));
      setModerators(mapped);
      setDistricts(distData);

      setCachedDashboardData("admin_moderators_list", mapped);
      setCachedDashboardData("admin_districts_list", distData);
    } catch (err) {
      console.error("Failed to load moderators/districts:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const currentDistrictMods = moderators.filter((m) => m.district === selectedDistrict);
  const currentDistrictObj = districts.find((d) => String(d.district_number) === selectedDistrict);
  const modalDistrictObj = districts.find((d) => String(d.district_number) === modalDistrict);

  // Filtered districts for top bar dropdown
  const filteredTopDistricts = districts.filter((d) => {
    const q = topSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      String(d.district_number).includes(q) ||
      d.name.toLowerCase().includes(q) ||
      d.region.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q)
    );
  });

  // Filtered districts for modal dropdown
  const filteredModalDistricts = districts.filter((d) => {
    const q = modalSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      String(d.district_number).includes(q) ||
      d.name.toLowerCase().includes(q) ||
      d.region.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q)
    );
  });

  const handleAssignModerator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigneeName.trim() || !assigneeEmail.trim()) return;

    try {
      setIsSubmitting(true);
      const res = await createOrAssignModeratorAdminAction({
        email: assigneeEmail.trim(),
        fullName: assigneeName.trim(),
        districtNumber: Number(modalDistrict),
        clubName: assigneeClub.trim() || undefined,
      });

      if (res.success) {
        showToast(`Appointed ${assigneeName.trim()} to District ${modalDistrict}.`);
        setAssigneeName("");
        setAssigneeEmail("");
        setAssigneeClub("");
        setShowAssignModal(false);
        await loadData();
      } else {
        alert("Failed to appoint moderator: " + res.error);
      }
    } catch (err: any) {
      console.error("Failed to appoint moderator:", err);
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveModerator = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to revoke moderator assignment for ${name}?`)) return;
    try {
      const res = await removeModeratorAssignmentAction(id);
      if (res.success) {
        showToast(`Revoked moderator appointment for ${name}.`);
        await loadData();
      } else {
        alert("Failed to remove moderator: " + res.error);
      }
    } catch (err) {
      console.error("Failed to remove moderator:", err);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
        {/* Header Skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-7 w-72 rounded-lg" />
              <Skeleton className="h-5 w-28 rounded-md" />
            </div>
            <Skeleton className="h-4 w-96 rounded-md" />
          </div>
        </div>

        {/* District Selector Control Bar Skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-xl space-y-2">
            <Skeleton className="h-4 w-44 rounded-md" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
          <div className="flex items-center gap-3 shrink-0 pt-1 md:pt-4">
            <div className="space-y-1 text-right hidden sm:block">
              <Skeleton className="h-4 w-32 rounded-md ml-auto" />
              <Skeleton className="h-3 w-40 rounded-md ml-auto" />
            </div>
            <Skeleton className="h-10 w-40 rounded-xl" />
          </div>
        </div>

        {/* Current District Moderators Grid Skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <Skeleton className="h-6 w-60 rounded-md" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <Skeleton className="h-4 w-48 rounded-md" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-36 rounded-md" />
                  <Skeleton className="h-4 w-14 rounded-md" />
                </div>
                <Skeleton className="h-3.5 w-48 rounded-md" />
                <Skeleton className="h-3.5 w-32 rounded-md" />
                <Skeleton className="h-3 w-28 rounded-md pt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            Appoint verified Rotaract leaders across global districts to audit compliance claims and maintain directory integrity.
          </p>
        </div>
      </div>

      {/* ================= MODAL: APPOINT MODERATOR ================= */}
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
                  <p className="text-xs text-slate-500 font-normal">Assign reviewing officer to a Rotaract district.</p>
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
              {/* Custom Searchable District Select inside Modal */}
              <div className="space-y-1.5" ref={modalDropdownRef}>
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Assigned District *</Label>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsModalDropdownOpen(!isModalDropdownOpen)}
                    className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-left focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] transition-all cursor-pointer"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        District {modalDistrict}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {modalDistrictObj?.region} ({modalDistrictObj?.country})
                      </p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isModalDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Popover Menu */}
                  {isModalDropdownOpen && (
                    <div
                      data-lenis-prevent="true"
                      className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-slate-200 shadow-xl z-50 p-2 space-y-2 animate-in fade-in zoom-in-95 duration-150 overscroll-contain"
                    >
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <Input
                          autoFocus
                          value={modalSearch}
                          onChange={(e) => setModalSearch(e.target.value)}
                          placeholder="Type to filter districts"
                          className="pl-8 h-8 text-xs bg-slate-50 border-slate-200 rounded-lg"
                        />
                      </div>

                      <div
                        data-lenis-prevent="true"
                        onWheel={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                        style={{ maxHeight: "240px", overflowY: "auto" }}
                        className="space-y-1 pr-1"
                      >
                        {filteredModalDistricts.length === 0 ? (
                          <p className="text-xs text-slate-400 py-3 text-center">No matching districts</p>
                        ) : (
                          filteredModalDistricts.map((d) => {
                            const isSelected = String(d.district_number) === modalDistrict;
                            return (
                              <button
                                key={d.district_number}
                                type="button"
                                onClick={() => {
                                  setModalDistrict(String(d.district_number));
                                  setIsModalDropdownOpen(false);
                                  setModalSearch("");
                                }}
                                className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${isSelected
                                    ? "bg-pink-50 text-[#D41367] font-bold"
                                    : "text-slate-700 hover:bg-slate-50"
                                  }`}
                              >
                                <div className="min-w-0 pr-2">
                                  <span className="font-bold block">District {d.district_number}</span>
                                  <span className="text-[11px] text-slate-500 truncate block">{d.region} ({d.country})</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#D41367] shrink-0" />}
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Officer Full Name *</Label>
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
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Home Rotaract Club (Optional)</Label>
                <Input
                  value={assigneeClub}
                  onChange={(e) => setAssigneeClub(e.target.value)}
                  placeholder="e.g. Rotaract Club of Colombo North"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => setShowAssignModal(false)}
                  className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-9.5 px-4 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold h-9.5 px-5 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Appointing" : "Confirm Appointment"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DISTRICT SELECTOR CONTROL BAR (CUSTOM SEARCHABLE COMBOBOX) ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-20">
        <div className="flex-1 max-w-xl space-y-1.5" ref={topDropdownRef}>
          <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#D41367]" />
            <span>Active Rotary / Rotaract District</span>
          </Label>

          <div className="relative">
            {/* Trigger Button */}
            <button
              type="button"
              onClick={() => setIsTopDropdownOpen(!isTopDropdownOpen)}
              className="w-full h-12 px-4 bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between text-left focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#D41367]/20 focus:border-[#D41367] transition-all cursor-pointer shadow-2xs group"
            >
              <div className="min-w-0 pr-2">
                <p className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                  District {selectedDistrict}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {currentDistrictObj ? `${currentDistrictObj.region} (${currentDistrictObj.country})` : "Global District"}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {currentDistrictMods.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {currentDistrictMods.length} {currentDistrictMods.length === 1 ? "Mod" : "Mods"}
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform ${isTopDropdownOpen ? "rotate-180" : ""}`} />
              </div>
            </button>

            {/* Dropdown Popover Menu */}
            {isTopDropdownOpen && (
              <div
                data-lenis-prevent="true"
                className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 p-2.5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150 overscroll-contain"
              >
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    autoFocus
                    value={topSearch}
                    onChange={(e) => setTopSearch(e.target.value)}
                    placeholder="Search by number, region, or country (e.g. 3220, Sri Lanka, Mumbai)"
                    className="pl-8.5 h-9 text-xs bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>

                <div
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  style={{ maxHeight: "280px", overflowY: "auto" }}
                  className="space-y-1 pr-1 overscroll-contain"
                >
                  {filteredTopDistricts.length === 0 ? (
                    <p className="text-xs text-slate-400 py-6 text-center">No matching districts found</p>
                  ) : (
                    filteredTopDistricts.map((d) => {
                      const isSelected = String(d.district_number) === selectedDistrict;
                      const modCount = moderators.filter((m) => m.district === String(d.district_number)).length;

                      return (
                        <button
                          key={d.district_number}
                          type="button"
                          onClick={() => {
                            setSelectedDistrict(String(d.district_number));
                            setModalDistrict(String(d.district_number));
                            setIsTopDropdownOpen(false);
                            setTopSearch("");
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${isSelected
                              ? "bg-pink-50/80 text-[#D41367] font-bold border border-pink-200/60"
                              : "text-slate-700 hover:bg-slate-50"
                            }`}
                        >
                          <div className="min-w-0 pr-2">
                            <span className="font-bold text-xs sm:text-sm block">District {d.district_number}</span>
                            <span className="text-[11px] text-slate-500 truncate block">{d.region} ({d.country})</span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {modCount > 0 && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D41367]/10 text-[#D41367]">
                                {modCount} {modCount === 1 ? "Mod" : "Mods"}
                              </span>
                            )}
                            {isSelected && <Check className="w-4 h-4 text-[#D41367] shrink-0" />}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 pt-1 md:pt-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900">
              {currentDistrictMods.length} of 5 Capacity Filled
            </p>
            <p className="text-[11px] text-slate-400">
              District {selectedDistrict} Reviewing Officers
            </p>
          </div>

          <Button
            onClick={() => {
              setModalDistrict(selectedDistrict);
              setShowAssignModal(true);
            }}
            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold gap-1.5 h-10 px-4 shadow-xs cursor-pointer shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Appoint Moderator</span>
          </Button>
        </div>
      </div>

      {/* ================= CURRENT DISTRICT MODERATORS WORKSPACE ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                District {selectedDistrict} Reviewing Officers
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-50 text-[#D41367] border border-pink-100">
                {currentDistrictMods.length} Assigned
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              {currentDistrictObj
                ? `${currentDistrictObj.region} - ${currentDistrictObj.country}`
                : `District ${selectedDistrict}`}
            </p>
          </div>
        </div>

        {/* Moderators Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentDistrictMods.length === 0 ? (
            <div className="sm:col-span-2 lg:col-span-3 py-12 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 space-y-3">
              <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto" />
              <div>
                <p className="text-sm font-bold text-slate-700">
                  No moderators appointed for District {selectedDistrict}
                </p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  Appoint a verified Rotaract leader to review compliance items and trust badge applications for this district.
                </p>
              </div>
              <Button
                onClick={() => {
                  setModalDistrict(selectedDistrict);
                  setShowAssignModal(true);
                }}
                className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold h-9 px-4 shadow-xs"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                <span>Appoint First Officer</span>
              </Button>
            </div>
          ) : (
            currentDistrictMods.map((mod) => (
              <div
                key={mod.id}
                className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 flex items-start justify-between gap-3 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-xs sm:text-sm text-slate-900 truncate">{mod.name}</p>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate font-normal">{mod.email}</p>
                  {mod.club ? (
                    <p className="text-xs text-[#D41367] font-semibold truncate">{mod.club}</p>
                  ) : (
                    <p className="text-[11px] text-slate-400 font-medium">District Officer</p>
                  )}
                  <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-200/60 font-normal">
                    Appointed: {mod.assignedAt}
                  </p>
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
            ))
          )}

          {/* Add Another Officer Slot */}
          {currentDistrictMods.length > 0 && currentDistrictMods.length < 5 && (
            <div
              onClick={() => {
                setModalDistrict(selectedDistrict);
                setShowAssignModal(true);
              }}
              className="p-4 rounded-xl border border-dashed border-slate-200 hover:border-pink-300 flex flex-col items-center justify-center text-center text-slate-400 hover:text-[#D41367] bg-slate-50/30 hover:bg-pink-50/30 transition-all cursor-pointer min-h-[110px] group"
            >
              <Plus className="w-5 h-5 mx-auto text-slate-400 group-hover:text-[#D41367] group-hover:scale-110 transition-transform mb-1" />
              <p className="text-xs font-semibold">Available Moderator Slot</p>
              <p className="text-[11px] text-slate-400">Click to appoint officer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

