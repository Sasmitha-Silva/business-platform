"use client";

import { MessageSquare, Mail, Phone, Clock, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const enquiries = [
  { id: "1", sender: "Rtr. Michael Fernandez", company: "Apex Global Solutions", message: "Interested in enterprise cloud infrastructure audit services for our platform.", date: "Today, 10:45 AM", status: "New" },
  { id: "2", sender: "Rtr. Alisha Fernandez", company: "Studio Bloom Design", message: "Looking for a technical API integration partner for our visual design platform.", date: "Yesterday, 3:20 PM", status: "In Progress" },
  { id: "3", sender: "Rtr. Priya Sharma", company: "Tech Innovations", message: "Requesting NDA & quote for custom cross-platform mobile app development project.", date: "July 16, 2026", status: "Closed" },
];

export default function OwnerEnquiriesPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customer Enquiries</h1>
          <p className="text-xs text-muted-foreground mt-1">Direct business leads and messages submitted via your profile page.</p>
        </div>
        <Button className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs font-bold gap-2">
          <Filter className="w-4 h-4" /> Filter Messages
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        <div className="space-y-3">
          {enquiries.map((e) => (
            <div key={e.id} className="p-4 rounded-2xl border border-border bg-warm-bg/50 hover:bg-pink-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-foreground">{e.sender}</span>
                  <span className="text-xs text-muted-foreground">({e.company})</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${e.status === 'New' ? 'bg-pink-100 text-[#D41367]' : 'bg-slate-100 text-slate-700'}`}>
                    {e.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{e.message}</p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {e.date}</p>
              </div>
              <Button size="sm" className="bg-[#D41367] text-white text-xs rounded-xl font-bold self-start sm:self-center">
                Reply Lead
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
