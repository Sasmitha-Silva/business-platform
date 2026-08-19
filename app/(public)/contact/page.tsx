"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  ChevronDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TOPIC_OPTIONS = [
  "Verification Status Inquiry",
  "District Partnership & Moderation",
  "Business Listing Technical Support",
  "General Rotary Network Inquiries",
];

export default function ContactPage() {
  const [topic, setTopic] = useState("Verification Status Inquiry");
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="relative bg-white min-h-screen pb-16 pt-6 overflow-hidden animate-fade-in">
      {/* Background Precision Mesh Grid */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[500px] sm:w-[680px] h-[500px] sm:h-[680px]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(212, 19, 103, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(212, 19, 103, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(circle at top left, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at top left, black 30%, transparent 75%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] sm:w-[680px] h-[500px] sm:h-[680px]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(212, 19, 103, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(212, 19, 103, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(circle at bottom right, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at bottom right, black 30%, transparent 75%)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-pink-50/60 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Toast Alert */}
      {sent && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Your message has been dispatched to the District Secretariat.</span>
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ================= HERO HEADER BANNER ================= */}
        <div className="bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-2xs text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Get in Touch with Our Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-xl mx-auto">
            Have questions regarding directory accreditation, document compliance, or district partnership inquiries? We&apos;re here to assist.
          </p>
        </div>

        {/* ================= 2-COLUMN CONTACT LAYOUT ================= */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: Contact Channel Cards (1 col) */}
          <div className="space-y-4">
            <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center shrink-0 border border-pink-100/60">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Email Helpdesk</h3>
                <p className="text-xs text-slate-500 font-normal truncate">support@rotaractnetwork.org</p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium pt-1">
                  <Clock className="w-3 h-3" />
                  <span>Response within 24 hours</span>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100/80">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">District Helpdesk</h3>
                <p className="text-xs text-slate-500 font-normal">+94 77 123 4567</p>
                <p className="text-[11px] text-slate-400 font-normal pt-1">Mon–Fri: 9:00 AM – 6:00 PM</p>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 border border-slate-200">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Global Secretariat</h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  Rotary International District 3220 Secretariat, Colombo, Sri Lanka.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form (2 cols) */}
          <div className="lg:col-span-2 bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Send an Official Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Fill in your details below and our secretariat will respond promptly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">Your Full Name *</Label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rtr. Sarah Perera"
                    className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold text-slate-700">Official Email *</Label>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              {/* Subject Dropdown matching platform standards */}
              <div className="space-y-1.5 relative">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Subject / Inquiry Type</Label>
                <button
                  type="button"
                  onClick={() => setIsTopicOpen(!isTopicOpen)}
                  className="w-full h-10 px-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between font-medium text-slate-800 hover:bg-slate-100/70 transition-colors cursor-pointer outline-none focus:bg-white focus:border-[#D41367]"
                >
                  <span>{topic}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isTopicOpen ? "rotate-180 text-[#D41367]" : ""}`} />
                </button>

                {isTopicOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsTopicOpen(false)}
                    />
                    <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                      {TOPIC_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setTopic(opt);
                            setIsTopicOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer text-left ${
                            topic === opt
                              ? "bg-pink-50 text-[#D41367]"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <span>{opt}</span>
                          {topic === opt && <Check className="w-3.5 h-3.5 text-[#D41367]" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Message Content *</Label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide details about your query or district verification ticket..."
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#D41367] focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-slate-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-end pt-2">
                <Button
                  type="submit"
                  className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-10 px-6 text-xs sm:text-sm font-semibold gap-2 shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
