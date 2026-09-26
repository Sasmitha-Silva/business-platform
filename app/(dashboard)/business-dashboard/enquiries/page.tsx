"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Clock,
  Search,
  CheckCircle2,
  Building2,
  Tag,
  Send,
  ExternalLink,
  MessageSquare,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getOwnerBusinessAction,
  getOwnerEnquiriesAction,
  updateEnquiryStatusAction,
  replyToOwnerEnquiryAction,
} from "@/app/actions/owner";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface ExtendedEnquiry {
  id: string;
  business_id: string;
  from_name: string;
  from_contact: string;
  from_organization?: string;
  phone?: string;
  message: string;
  service_requested?: string;
  status: "new" | "read" | "replied";
  created_at: string;
  replies?: Array<{
    id: string;
    text: string;
    sent_at: string;
  }>;
}

const quickTemplates = [
  "Thank you for contacting us! We would love to discuss your project requirements.",
  "We have received your enquiry and our technical team is reviewing specifications.",
  "Let's schedule a 15-minute discovery call to review timeline and pricing.",
];

function parseEnquiryMessage(rawMessage: string): {
  originalMessage: string;
  replies: Array<{ id: string; text: string; sent_at: string }>;
} {
  if (!rawMessage) return { originalMessage: "", replies: [] };
  const delimiterRegex = /\n\n--- \[Owner Reply • ([^\]]+)\]:\n/g;
  const parts = rawMessage.split(delimiterRegex);

  const originalMessage = parts[0] ? parts[0].trim() : rawMessage;
  const replies: Array<{ id: string; text: string; sent_at: string }> = [];

  for (let i = 1; i < parts.length; i += 2) {
    const rawDate = parts[i];
    const replyText = parts[i + 1];
    if (replyText) {
      const d = new Date(rawDate);
      const sent_at = isNaN(d.getTime())
        ? rawDate
        : d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
      replies.push({
        id: `reply-${i}`,
        text: replyText.trim(),
        sent_at,
      });
    }
  }

  return { originalMessage, replies };
}

export default function OwnerEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<ExtendedEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [businessSlug, setBusinessSlug] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [sendingReplyId, setSendingReplyId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const biz = await getOwnerBusinessAction();
        if (biz) {
          setBusinessSlug(biz.slug);
          const rawEnquiries = await getOwnerEnquiriesAction(biz.id);
          const mapped: ExtendedEnquiry[] = (rawEnquiries || []).map((e: any) => {
            const parsed = parseEnquiryMessage(e.message || "");
            return {
              id: e.id,
              business_id: e.business_id,
              from_name: e.from_name,
              from_contact: e.from_contact,
              from_organization: e.from_organization || "",
              phone: e.phone || "",
              message: parsed.originalMessage,
              service_requested: e.service_requested || "",
              status: e.status || "new",
              created_at: new Date(e.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
              replies: parsed.replies,
            };
          });
          setEnquiries(mapped);
        }
      } catch (err) {
        console.error("Failed to load enquiries:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtered inquiries
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.from_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.from_organization && e.from_organization.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (e.service_requested && e.service_requested.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "in_progress" || statusFilter === "read"
        ? e.status === "read"
        : e.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // KPI Counters
  const totalCount = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === "new").length;
  const inProgressCount = enquiries.filter((e) => e.status === "read").length;
  const resolvedCount = enquiries.filter((e) => e.status === "replied").length;

  const handleUpdateStatus = async (id: string, newStatus: ExtendedEnquiry["status"]) => {
    try {
      setEnquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      await updateEnquiryStatusAction({
        enquiryId: id,
        status: newStatus as any,
      });
      showToast(`Lead marked as ${newStatus.replace("_", " ").toUpperCase()}`);
    } catch (err) {
      console.error("Error updating lead status:", err);
    }
  };

  const handleSendReply = async (id: string, recipientName: string, recipientContact: string) => {
    const draftText = replyDrafts[id];
    if (!draftText?.trim()) return;

    try {
      setSendingReplyId(id);
      const res = await replyToOwnerEnquiryAction({
        enquiryId: id,
        replyText: draftText.trim(),
      });

      if (res.success) {
        const formattedDate = new Date(res.sentAt || Date.now()).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        const newReply = {
          id: `rep-${Date.now()}`,
          text: draftText.trim(),
          sent_at: formattedDate,
        };

        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: "replied",
                  replies: [...(item.replies || []), newReply],
                }
              : item
          )
        );

        setReplyDrafts((prev) => ({ ...prev, [id]: "" }));
        showToast(`Reply dispatched and recorded for ${recipientName}`);
      } else {
        showToast(res.error || "Failed to dispatch reply.");
      }
    } catch (err) {
      console.error("Error sending reply:", err);
      showToast("An error occurred while saving your reply.");
    } finally {
      setSendingReplyId(null);
    }
  };

  const handleCopyEmail = (id: string, email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= HEADER SECTION ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Customer Inquiries
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              {totalCount} Total Leads
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Manage prospect communications and track lead conversion pipeline.
          </p>
        </div>

        {/* Quick Stats Strip */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-pink-50/80 border border-pink-100/80 text-xs sm:text-sm">
            <span className="font-semibold text-slate-700">New Leads:</span>
            <span className="font-bold text-[#D41367]">{newCount}</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50/80 border border-amber-100/80 text-xs sm:text-sm">
            <span className="font-semibold text-slate-700">In Progress:</span>
            <span className="font-bold text-amber-700">{inProgressCount}</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-100/80 text-xs sm:text-sm">
            <span className="font-semibold text-slate-700">Resolved:</span>
            <span className="font-bold text-emerald-700">{resolvedCount}</span>
          </div>
        </div>
      </div>

      {/* ================= SEARCH & STATUS FILTER TOOLBAR ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads, sender, district..."
            className="pl-9.5 h-9.5 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: "all", label: "All Leads" },
            { id: "new", label: "New" },
            { id: "read", label: "In Progress / Read" },
            { id: "replied", label: "Replied / Closed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 cursor-pointer transition-all ${statusFilter === tab.id
                  ? "bg-[#D41367] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================= INQUIRIES STREAM ================= */}
      {/* ================= INQUIRIES LIST / ACCORDION ================= */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-5 w-44 rounded-md" />
                    <Skeleton className="h-3.5 w-64 rounded-md" />
                  </div>
                  <Skeleton className="h-8 w-24 rounded-xl" />
                </div>
                <Skeleton className="h-4 w-full rounded-md" />
              </div>
            ))}
          </div>
        ) : enquiries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#D41367] flex items-center justify-center mx-auto border border-pink-100">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">No Inquiries Received Yet</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              When prospective clients, partners, or fellow Rotaractors submit inquiries from your public profile page, they will arrive here in real time.
            </p>
            {businessSlug && (
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold h-9 px-4 gap-1.5"
                  asChild
                >
                  <Link href={`/business/${businessSlug}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Public Profile</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#D41367] flex items-center justify-center mx-auto border border-pink-100">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">No Inquiries Match Filters</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              No prospect messages matched your active search query or status filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
              }}
              className="rounded-xl text-xs sm:text-sm font-semibold mt-2 h-9 px-4"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          filteredEnquiries.map((enq) => {
            const isExpanded = expandedId === enq.id;

            return (
              <div
                key={enq.id}
                className={`bg-white rounded-2xl border transition-all duration-200 shadow-2xs overflow-hidden ${enq.status === "new"
                    ? "border-pink-200/90 hover:border-[#D41367]"
                    : "border-slate-200 hover:border-slate-300"
                  }`}
              >
                {/* Main Card Header Bar */}
                <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Sender Profile */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {enq.from_name}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                          enq.status === "new"
                            ? "bg-pink-100 text-[#D41367]"
                            : enq.status === "read"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {enq.status === "new"
                          ? "New Inquiry"
                          : enq.status === "read"
                          ? "Read"
                          : "Replied"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal flex items-center gap-1.5 truncate">
                      <Building2 className="w-3.5 h-3.5 text-[#D41367] shrink-0" />
                      <span>{enq.from_organization || "Rotaract Network Member"}</span>
                    </p>
                  </div>

                  {/* Metadata & Actions */}
                  <div className="flex flex-wrap items-center gap-3 justify-between md:justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    {enq.service_requested && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium border border-slate-200">
                        <Tag className="w-3 h-3 text-[#D41367]" />
                        <span>{enq.service_requested}</span>
                      </span>
                    )}

                    <span className="text-xs text-slate-400 font-normal flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{enq.created_at}</span>
                    </span>

                    <Button
                      size="sm"
                      onClick={() => setExpandedId(isExpanded ? null : enq.id)}
                      className={`rounded-xl text-xs sm:text-sm font-semibold h-9 px-4 shadow-xs cursor-pointer transition-all ${isExpanded
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-[#D41367] text-white hover:bg-[#B80E56]"
                        }`}
                    >
                      <span>{isExpanded ? "Close Details" : "View & Reply"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
                    </Button>
                  </div>
                </div>

                {/* Excerpt if closed */}
                {!isExpanded && (
                  <div className="px-5 pb-4 pt-0">
                    <p className="text-xs sm:text-sm text-slate-600 font-normal line-clamp-1">
                      {enq.message}
                    </p>
                  </div>
                )}

                {/* Expanded Details Pane */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 bg-slate-50/40">
                    {/* Contact Channels Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white rounded-xl border border-slate-200">
                      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Mail className="w-3.5 h-3.5 text-[#D41367]" />
                          <span className="font-semibold">{enq.from_contact}</span>
                        </div>
                        {enq.phone && (
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <Phone className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-semibold">{enq.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${enq.from_contact}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-pink-50 hover:text-[#D41367] text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email</span>
                        </a>
                        {enq.phone && (
                          <a
                            href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-semibold transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                        <button
                          onClick={() => handleCopyEmail(enq.id, enq.from_contact)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                        >
                          {copiedId === enq.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === enq.id ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Full Message Body */}
                    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Message Content
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 font-normal leading-relaxed whitespace-pre-wrap">
                        {enq.message}
                      </p>
                    </div>

                    {/* Status Controller */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <span className="font-semibold text-slate-700">Set Status:</span>
                        <button
                          onClick={() => handleUpdateStatus(enq.id, "new")}
                          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${enq.status === "new"
                              ? "bg-pink-100 text-[#D41367] border border-pink-200"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                          New
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(enq.id, "read")}
                          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${enq.status === "read"
                              ? "bg-blue-100 text-blue-800 border border-blue-200"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                          Mark Read
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(enq.id, "replied")}
                          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${enq.status === "replied"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                          Mark Replied
                        </button>
                      </div>
                    </div>

                    {/* Reply History if any */}
                    {enq.replies && enq.replies.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 block">Sent Responses:</span>
                        {enq.replies.map((r) => (
                          <div key={r.id} className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm space-y-1">
                            <div className="flex items-center justify-between font-semibold text-emerald-800">
                              <span>Your Reply</span>
                              <span className="text-emerald-600 font-normal text-xs">{r.sent_at}</span>
                            </div>
                            <p className="text-emerald-950 font-normal leading-relaxed">{r.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quick Response Composer */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">Direct Reply Composer</span>
                        <div className="flex items-center gap-1.5 overflow-x-auto">
                          <span className="text-xs font-medium text-slate-400">Templates:</span>
                          {quickTemplates.map((t, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setReplyDrafts({ ...replyDrafts, [enq.id]: t })}
                              className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 hover:border-[#D41367] hover:text-[#D41367] text-xs font-medium transition-colors"
                            >
                              {t.substring(0, 24)}...
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="relative">
                        <textarea
                          rows={3}
                          value={replyDrafts[enq.id] || ""}
                          onChange={(e) => setReplyDrafts({ ...replyDrafts, [enq.id]: e.target.value })}
                          placeholder={`Write a response to ${enq.from_name}`}
                          className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#D41367] focus:ring-2 focus:ring-pink-100 transition-all resize-none placeholder:text-slate-400"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          disabled={!replyDrafts[enq.id]?.trim() || sendingReplyId === enq.id}
                          onClick={() => handleSendReply(enq.id, enq.from_name, enq.from_contact)}
                          className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold h-9 px-4 gap-1.5 shadow-xs disabled:opacity-40 cursor-pointer"
                        >
                          {sendingReplyId === enq.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Send className="w-3.5 h-3.5" />
                          )}
                          <span>{sendingReplyId === enq.id ? "Dispatching..." : "Dispatch Reply"}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
