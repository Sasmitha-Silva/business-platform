import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

interface VerificationBadgeProps {
  level: number; // 0, 1, 2, 3
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const tierConfig = {
  0: { label: "Unverified", badge: "", bgClass: "bg-gray-100 text-gray-500", dotClass: "bg-gray-400", iconColor: "text-gray-400" },
  1: { label: "Bronze Tier", badge: "BRONZE TIER", bgClass: "bg-amber-50 text-amber-700 border border-amber-200", dotClass: "bg-amber-500", iconColor: "text-amber-600" },
  2: { label: "Silver Tier", badge: "SILVER TIER", bgClass: "bg-slate-50 text-slate-600 border border-slate-200", dotClass: "bg-slate-400", iconColor: "text-slate-500" },
  3: { label: "Gold Tier", badge: "GOLD TIER", bgClass: "bg-yellow-50 text-yellow-700 border border-yellow-200", dotClass: "bg-yellow-500", iconColor: "text-yellow-600" },
} as const;

export function VerificationBadge({
  level,
  size = "md",
  showLabel = true,
  className,
}: VerificationBadgeProps) {
  const config = tierConfig[level as keyof typeof tierConfig] || tierConfig[0];

  if (level === 0 && !showLabel) return null;

  const sizeClasses = {
    sm: "text-[10px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3 py-1.5 gap-1.5",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full whitespace-nowrap",
        config.bgClass,
        sizeClasses[size],
        className
      )}
    >
      {level > 0 && <ShieldCheck className={cn(iconSizes[size], config.iconColor)} />}
      {showLabel && <span>{config.badge || config.label}</span>}
    </span>
  );
}
