"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ExtendedEnquiry {
  id: string;
  business_id: string;
  from_name: string;
  from_contact: string;
  from_organization?: string;
  phone?: string;
  message: string;
  service_requested?: string;
  status: "new" | "in_progress" | "replied" | "closed";
  created_at: string;
  replies?: Array<{
    id: string;
    text: string;
    sent_at: string;
  }>;
}

const initialEnquiries: ExtendedEnquiry[] = [
  {
    id: "enq-1",
    business_id: "biz-1",
    from_name: "Rtr. Michael Fernandez",
    from_contact: "michael@apex-global.com",
    phone: "+61 412 345 678",
    from_organization: "Rotaract Club of Sydney Harbour (Dist 9675)",
    message: "Interested in enterprise cloud infrastructure audit services for our platform. We are scaling our cross-border logistics app and need a comprehensive security & performance review before Q4 launch.",
    service_requested: "Software Consulting",
    status: "new",
    created_at: "Today, 10:45 AM",
    replies: [],
  },
  {
    id: "enq-2",
    business_id: "biz-1",
    from_name: "Rtr. Alisha Fernandez",
    from_contact: "alisha@studiobloom.design",
    phone: "+91 98450 12345",
    from_organization: "Rotaract Club of Bangalore West (Dist 3190)",
    message: "Looking for a technical API integration partner for our visual design platform. Would like to know your standard hourly rates or milestone packages for backend Node.js / Python engineers.",
    service_requested: "API Integration",
    status: "replied",
    created_at: "Yesterday, 3:20 PM",
    replies: [
      {
        id: "rep-1",
        text: "Hi Alisha, thank you for reaching out! We sent our standard rate card and integration case studies to your email.",
        sent_at: "Yesterday, 4:15 PM",
      },
    ],
  },
  {
    id: "enq-3",
    business_id: "biz-1",
    from_name: "Rtr. Marcus Reed",
    from_contact: "marcus@founderhouse.co",
    phone: "+94 77 123 4567",
    from_organization: "Rotaract District 3220 Secretariat",
    message: "Need custom web portal development for our upcoming District Assembly. We require attendee registration, QR ticket check-ins, and workshop schedule management.",
    service_requested: "Web Development",
    status: "in_progress",
    created_at: "July 24, 2026",
    replies: [],
  },
  {
    id: "enq-4",
    business_id: "biz-1",
    from_name: "Rtr. Priya Sharma",
    from_contact: "priya@techinnovations.in",
    phone: "+91 91234 56789",
    from_organization: "Rotaract Club of Delhi Central (Dist 3011)",
    message: "Requesting NDA & quote for custom cross-platform mobile app development. We have Figma wireframes ready and are evaluating vendor capabilities.",
    service_requested: "App Development",
    status: "new",
    created_at: "July 19, 2026",
    replies: [],
  },
  {
    id: "enq-5",
    business_id: "biz-1",
    from_name: "Rtr. David Wilson",
    from_contact: "david@wilsonenterprises.com",
    phone: "+1 415 555 0192",
    from_organization: "Rotary Club of Colombo East",
    message: "Inquiring about cybersecurity vulnerability audit services for our firm's fintech product lines.",
    service_requested: "Security Audit",
    status: "closed",
    created_at: "July 17, 2026",
    replies: [
      {
        id: "rep-2",
        text: "Completed initial scoping call. Client opted for annual retainer program.",
        sent_at: "July 18, 2026",
      },
    ],
  },
];

const quickTemplates = [
  "Thank you for contacting us! We would love to discuss your project requirements.",
  "We have received your enquiry and our technical team is reviewing specifications.",
  "Let's schedule a 15-minute discovery call to review timeline and pricing.",
];

export default function OwnerEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<ExtendedEnquiry[]>(initialEnquiries);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filtered inquiries
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.from_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.from_organization && e.from_organization.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (e.service_requested && e.service_requested.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ? true : e.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // KPI Counters
  const totalCount = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === "new").length;
  const inProgressCount = enquiries.filter((e) => e.status === "in_progress").length;
  const resolvedCount = enquiries.filter((e) => e.status === "replied" || e.status === "closed").length;

  const handleUpdateStatus = (id: string, newStatus: ExtendedEnquiry["status"]) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    showToast(`Lead marked as ${newStatus.replace("_", " ").toUpperCase()}`);
  };

  const handleSendReply = (id: string, recipientName: string) => {
    const draftText = replyDrafts[id];
    if (!draftText?.trim()) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      text: draftText.trim(),
      sent_at: "Just now",
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
    showToast(`Reply dispatched to ${recipientName}`);
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
            { id: "in_progress", label: "In Progress" },
            { id: "replied", label: "Replied / Closed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 cursor-pointer transition-all ${
                statusFilter === tab.id
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
      <div className="space-y-4">
        {filteredEnquiries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#D41367] flex items-center justify-center mx-auto border border-pink-100">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">No Inquiries Found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              No prospect messages matched your active search or status filters.
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
                className={`bg-white rounded-2xl border transition-all duration-200 shadow-2xs overflow-hidden ${
                  enq.status === "new"
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
                            : enq.status === "in_progress"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {enq.status === "new"
                          ? "New Inquiry"
                          : enq.status === "in_progress"
                          ? "In Progress"
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
                      className={`rounded-xl text-xs sm:text-sm font-semibold h-9 px-4 shadow-xs cursor-pointer transition-all ${
                        isExpanded
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
                          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${
                            enq.status === "new"
                              ? "bg-pink-100 text-[#D41367] border border-pink-200"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          New
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(enq.id, "in_progress")}
                          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${
                            enq.status === "in_progress"
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(enq.id, "replied")}
                          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${
                            enq.status === "replied"
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
                          placeholder={`Write a response to ${enq.from_name}...`}
                          className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#D41367] focus:ring-2 focus:ring-pink-100 transition-all resize-none placeholder:text-slate-400"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          disabled={!replyDrafts[enq.id]?.trim()}
                          onClick={() => handleSendReply(enq.id, enq.from_name)}
                          className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold h-9 px-4 gap-1.5 shadow-xs disabled:opacity-40 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch Reply</span>
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
