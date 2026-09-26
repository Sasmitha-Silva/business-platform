"use client";

import { useState } from "react";
import { Send, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { submitEnquiryAction } from "@/app/actions/directory";

interface EnquiryFormProps {
  businessId?: string;
  businessName?: string;
  onSubmit?: (data: { name: string; contact: string; message: string }) => void;
}

export function EnquiryForm({ businessId, businessName, onSubmit }: EnquiryFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.trim())) {
      setErrorMessage("Please enter a valid email address (e.g. name@domain.com).");
      return;
    }

    setIsSending(true);
    setErrorMessage(null);

    try {
      if (businessId) {
        const res = await submitEnquiryAction({
          businessId,
          fromName: name.trim(),
          fromContact: contact.trim(),
          message: message.trim(),
        });

        if (!res.success) {
          throw new Error(res.error || "Failed to send inquiry. Please try again.");
        }
      }
      onSubmit?.({ name, contact, message });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setContact("");
        setMessage("");
      }, 3500);
    } catch (err: any) {
      console.error("Failed to send inquiry:", err);
      setErrorMessage(err.message || "Failed to submit your inquiry. Please try again later.");
    } finally {
      setIsSending(false);
    }
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

      {errorMessage && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="inquiry-name" className="text-xs font-bold text-slate-700">Your Name</Label>
        <Input
          id="inquiry-name"
          placeholder="e.g. John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border-slate-200 text-xs"
          disabled={isSending}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="inquiry-contact" className="text-xs font-bold text-slate-700">Email Address *</Label>
        <Input
          id="inquiry-contact"
          type="email"
          placeholder="e.g. name@domain.com"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="rounded-xl border-slate-200 text-xs"
          disabled={isSending}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="inquiry-message" className="text-xs font-bold text-slate-700">Inquiry Details</Label>
        <Textarea
          id="inquiry-message"
          placeholder="Describe your requirements or questions"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="rounded-xl border-slate-200 text-xs resize-none"
          disabled={isSending}
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isSending}
        className="w-full bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs font-bold h-10 shadow-xs cursor-pointer gap-2"
      >
        {isSending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Inquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            <span>Send Inquiry</span>
          </>
        )}
      </Button>
    </form>
  );
}
