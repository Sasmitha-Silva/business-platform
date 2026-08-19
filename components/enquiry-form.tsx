"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EnquiryFormProps {
  businessName?: string;
  onSubmit?: (data: { name: string; contact: string; message: string }) => void;
}

export function EnquiryForm({ businessName, onSubmit }: EnquiryFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ name, contact, message });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setContact("");
      setMessage("");
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
          <Send className="w-5 h-5 text-emerald-600" />
        </div>
        <p className="font-semibold text-foreground">Message Sent!</p>
        <p className="text-sm text-muted-foreground mt-1">
          {businessName ? `${businessName} will` : "They'll"} get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-bold text-base text-foreground">Send an Inquiry</h3>
      <div className="space-y-2">
        <Label htmlFor="inquiry-name" className="text-xs font-bold text-slate-700">Your Name</Label>
        <Input
          id="inquiry-name"
          placeholder="e.g. John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border-slate-200 text-xs"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="inquiry-contact" className="text-xs font-bold text-slate-700">Email or Phone</Label>
        <Input
          id="inquiry-contact"
          placeholder="you@example.com"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="rounded-xl border-slate-200 text-xs"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="inquiry-message" className="text-xs font-bold text-slate-700">Inquiry Details</Label>
        <Textarea
          id="inquiry-message"
          placeholder="Describe your requirements or questions..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="rounded-xl border-slate-200 text-xs resize-none"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs font-bold h-10 shadow-xs"
      >
        Send Inquiry
      </Button>
    </form>
  );
}
