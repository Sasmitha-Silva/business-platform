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
      <h3 className="font-semibold text-foreground">Send an Enquiry</h3>
      <div className="space-y-2">
        <Label htmlFor="enquiry-name" className="text-sm">Your Name</Label>
        <Input
          id="enquiry-name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="enquiry-contact" className="text-sm">Email or Phone</Label>
        <Input
          id="enquiry-contact"
          placeholder="you@example.com"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="enquiry-message" className="text-sm">Message</Label>
        <Textarea
          id="enquiry-message"
          placeholder="How can we help?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-crimson hover:bg-crimson-dark text-white rounded-xl"
      >
        Send Message
      </Button>
    </form>
  );
}
