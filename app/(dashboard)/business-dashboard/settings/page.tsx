"use client";

import { useState, useEffect } from "react";
import {
  User,
  Lock,
  Save,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ShieldAlert,
  Key,
  Download,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getOwnerAccountSettingsAction,
  updateOwnerAccountSettingsAction,
  updateOwnerPasswordAction,
} from "@/app/actions/owner";

export default function OwnerSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  // Profile data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rotaryId, setRotaryId] = useState("");
  const [clubName, setClubName] = useState("");
  const [districtNumber, setDistrictNumber] = useState("");
  const [isActiveMember, setIsActiveMember] = useState(false);

  // Business export data snapshot
  const [fullSettingsData, setFullSettingsData] = useState<any>(null);

  // Password state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Feedback states
  const [profileFeedback, setProfileFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [passwordFeedback, setPasswordFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getOwnerAccountSettingsAction();
        if (data) {
          setFullSettingsData(data);
          setEmail(data.user?.email || data.profile?.email || "");
          setFullName(data.profile?.full_name || "");
          setPhone(data.profile?.phone || "");
          setRotaryId(data.rotaractProfile?.rotary_id || "");
          setClubName(data.rotaractProfile?.club_name || "");
          const bizDistrict = (data.business as any)?.district_number;
          setDistrictNumber(data.rotaractProfile?.district_number ? String(data.rotaractProfile.district_number) : (bizDistrict ? String(bizDistrict) : "Not Assigned"));
          setIsActiveMember(!!data.rotaractProfile?.is_active);
        }
      } catch (err) {
        console.error("Failed to load settings data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileFeedback(null);

    if (!fullName.trim()) {
      setProfileFeedback({ type: "error", message: "Full Name is required." });
      return;
    }

    try {
      setSavingProfile(true);
      const res = await updateOwnerAccountSettingsAction({
        fullName: fullName.trim(),
        phone: phone.trim(),
        clubName: clubName.trim(),
        rotaryId: rotaryId.trim(),
      });

      if (res.success) {
        setProfileFeedback({
          type: "success",
          message: "Profile preferences updated successfully!",
        });
        setTimeout(() => setProfileFeedback(null), 4000);
      } else {
        setProfileFeedback({
          type: "error",
          message: res.error || "Failed to update profile settings.",
        });
      }
    } catch {
      setProfileFeedback({
        type: "error",
        message: "An unexpected error occurred while saving profile.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordFeedback(null);

    if (!newPassword || newPassword.length < 8) {
      setPasswordFeedback({
        type: "error",
        message: "Password must be at least 8 characters long.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordFeedback({
        type: "error",
        message: "New passwords do not match.",
      });
      return;
    }

    try {
      setChangingPassword(true);
      const res = await updateOwnerPasswordAction({ newPassword });

      if (res.success) {
        setPasswordFeedback({
          type: "success",
          message: "Password updated successfully!",
        });
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordFeedback(null), 4000);
      } else {
        setPasswordFeedback({
          type: "error",
          message: res.error || "Failed to update password.",
        });
      }
    } catch {
      setPasswordFeedback({
        type: "error",
        message: "An error occurred while updating password.",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleExportData = () => {
    const exportPayload = {
      exported_at: new Date().toISOString(),
      account: {
        email,
        full_name: fullName,
        phone,
        rotary_id: rotaryId,
        rotaract_club: clubName,
        district: districtNumber,
      },
      business: fullSettingsData?.business || null,
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const slug = fullSettingsData?.business?.slug || "business";
    a.download = `${slug}-profile-export.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getInitials = (name: string) => {
    if (!name.trim()) return "BO";
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse max-w-[1600px] mx-auto pb-12">
        <div className="h-24 bg-slate-200 rounded-2xl w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-slate-200 rounded-2xl w-full" />
          <div className="h-96 bg-slate-200 rounded-2xl w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* Toast Alert */}
      {profileFeedback && (
        <div
          className={`fixed bottom-6 right-6 z-50 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 ${
            profileFeedback.type === "success" ? "bg-slate-900" : "bg-rose-600"
          }`}
        >
          {profileFeedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-white shrink-0" />
          )}
          <span>{profileFeedback.message}</span>
        </div>
      )}

      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white font-bold text-xl flex items-center justify-center shadow-xs shrink-0">
            {getInitials(fullName)}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Account &amp; Security Settings
              </h1>
              <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
                Primary Business Owner
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Manage your verified Rotaract member credentials and login security.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isActiveMember && rotaryId ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Rotary ID Verified</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Rotaract Member</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ================= CARD 1: PERSONAL & ROTARACT DETAILS ================= */}
        <form
          onSubmit={handleProfileSubmit}
          className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-[#D41367]" /> Personal &amp; Rotaract Profile
            </h2>
            <span className="text-xs text-slate-400 font-normal">Member Details</span>
          </div>

          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">
                Full Name *
              </Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rtr. John Doe"
                className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">
                  Email Address
                </Label>
                <Input
                  value={email}
                  readOnly
                  disabled
                  className="h-10 text-xs sm:text-sm bg-slate-100/70 border-slate-200 rounded-xl text-slate-600 font-medium cursor-not-allowed"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">
                  Direct Phone Number
                </Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+94 77 123 4567"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">
                  Rotary Member ID (RID)
                </Label>
                <Input
                  value={rotaryId}
                  onChange={(e) => setRotaryId(e.target.value)}
                  placeholder="e.g. RID-3220-1234"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">
                  Rotary District
                </Label>
                <Input
                  value={`District ${districtNumber}`}
                  readOnly
                  disabled
                  className="h-10 text-xs sm:text-sm bg-slate-100/70 border-slate-200 rounded-xl text-slate-600 font-semibold cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">
                Home Rotaract / Rotary Club
              </Label>
              <Input
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                placeholder="e.g. Your Rotaract / Rotary Club"
                className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <Button
              type="submit"
              disabled={savingProfile}
              className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-10 px-6 text-xs sm:text-sm font-semibold gap-2 shadow-xs cursor-pointer"
            >
              {savingProfile ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {savingProfile ? "Saving..." : "Save Profile Details"}
            </Button>
          </div>
        </form>

        {/* ================= CARD 2: SECURITY & ACCESS CONTROL ================= */}
        <form
          onSubmit={handlePasswordSubmit}
          className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#D41367]" /> Security &amp; Credentials
            </h2>
            <span className="text-xs text-slate-400 font-normal">Access Protection</span>
          </div>

          {passwordFeedback && (
            <div
              className={`p-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 ${
                passwordFeedback.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-rose-50 text-rose-800 border border-rose-200"
              }`}
            >
              {passwordFeedback.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{passwordFeedback.message}</span>
            </div>
          )}

          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">
                New Password
              </Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                minLength={8}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">
                Confirm New Password
              </Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                minLength={8}
                required
              />
            </div>

            <div className="text-xs text-slate-400 font-normal flex items-center gap-1.5 pt-1">
              <Key className="w-3.5 h-3.5 text-slate-400" />
              <span>Passwords must contain a minimum of 8 characters.</span>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <Button
              type="submit"
              disabled={changingPassword || !newPassword}
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-10 px-6 text-xs sm:text-sm font-semibold gap-2 shadow-xs cursor-pointer"
            >
              {changingPassword ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              {changingPassword ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>

      {/* ================= CARD 3: DATA EXPORT & DANGER ZONE ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Download className="w-4 h-4 text-slate-600" /> Account Management &amp; Data
          </h2>
          <span className="text-xs text-slate-400 font-normal">Data Governance</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              Export Business Listing Data
            </h4>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Download an archival copy of your registered business details, catalogue offerings, and account profile in JSON format.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleExportData}
            className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold h-9.5 px-4 shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" /> Export Data
          </Button>
        </div>
      </div>
    </div>
  );
}
