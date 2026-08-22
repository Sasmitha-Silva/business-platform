import { cn } from "@/lib/utils";
import { ShieldCheck, Award } from "lucide-react";

interface VerificationBadgeProps {
  level: number; // 0 = Unverified (no badge), 1 = GST Verified, 2 = DRR Verified (or 3 = DRR Verified)
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const badgeConfig = {
  0: { label: "Standard Listing", badge: "", bgClass: "", dotClass: "", iconColor: "" },
  1: {
    label: "GST Verified",
    badge: "GST Verified",
    bgClass: "bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs",
    dotClass: "bg-blue-500",
    iconColor: "text-blue-600",
  },
  2: {
    label: "DRR Verified",
    badge: "DRR Verified",
    bgClass: "bg-pink-50 text-[#D41367] border border-pink-200/90 shadow-2xs font-bold",
    dotClass: "bg-[#D41367]",
    iconColor: "text-[#D41367]",
  },
  3: {
    label: "DRR Verified",
    badge: "DRR Verified",
    bgClass: "bg-pink-50 text-[#D41367] border border-pink-200/90 shadow-2xs font-bold",
    dotClass: "bg-[#D41367]",
    iconColor: "text-[#D41367]",
  },
} as const;

export function VerificationBadge({
  level,
  size = "md",
  showLabel = true,
  className,
}: VerificationBadgeProps) {
  // If level is 0 or undefined, do not show any badge on normal listings
  if (!level || level === 0) return null;

  const config = badgeConfig[level as keyof typeof badgeConfig] || badgeConfig[1];

  const sizeClasses = {
    sm: "text-[10px] px-2 py-0.5 gap-1 font-semibold",
    md: "text-xs px-2.5 py-0.5 gap-1.5 font-semibold",
    lg: "text-sm px-3 py-1 gap-1.5 font-bold",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md whitespace-nowrap transition-colors",
        config.bgClass,
        sizeClasses[size],
        className
      )}
    >
      <ShieldCheck className={cn(iconSizes[size], config.iconColor, "shrink-0")} />
      {showLabel && <span>{config.badge || config.label}</span>}
    </span>
  );
}
