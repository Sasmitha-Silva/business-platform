"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  const [topic, setTopic] = useState("Verification Status Inquiry");

  return (
    <div className="bg-[#FAF6F4] min-h-screen pb-16 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#D41367] uppercase tracking-wider">GET IN TOUCH</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mt-1">
            We&apos;re Here to Help
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Have questions about directory listing, verification tiers, or district partnerships? Contact our support team.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Details Cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-border shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#D41367] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm">Email Support</h3>
                <p className="text-xs text-muted-foreground mt-0.5">support@rotaractnetwork.org</p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1">Response within 24 hours</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-border shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm">District Helpdesk</h3>
                <p className="text-xs text-muted-foreground mt-0.5">+91 11 2345 6789</p>
                <p className="text-[10px] text-muted-foreground font-semibold mt-1">Mon-Fri: 9 AM - 6 PM IST</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-border shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0050A2] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm">Global Secretariat</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Rotary International Center, District 3220 Secretariat, Colombo.</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-border shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-foreground">Send a Message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Your Name</label>
                  <input type="text" placeholder="John Doe" className="w-full h-11 px-4 text-xs bg-warm-bg border border-border rounded-xl outline-none" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Email Address</label>
                  <input type="email" placeholder="john@company.com" className="w-full h-11 px-4 text-xs bg-warm-bg border border-border rounded-xl outline-none" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Subject / Topic</label>
                <Select value={topic} onValueChange={(val) => setTopic(val || "Verification Status Inquiry")}>
                  <SelectTrigger className="w-full h-11 px-4 text-xs bg-warm-bg border border-border rounded-xl font-medium text-foreground">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-xl border border-border shadow-lg">
                    <SelectItem value="Verification Status Inquiry">Verification Status Inquiry</SelectItem>
                    <SelectItem value="District Partnership">District Partnership</SelectItem>
                    <SelectItem value="Technical Support">Technical Support</SelectItem>
                    <SelectItem value="General Question">General Question</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Message</label>
                <textarea rows={4} placeholder="How can we assist you?" className="w-full p-4 text-xs bg-warm-bg border border-border rounded-xl outline-none" required />
              </div>

              <Button type="submit" className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-11 text-xs font-bold gap-2 px-8 shadow-md">
                Send Message <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
