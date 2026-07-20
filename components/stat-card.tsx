import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon?: LucideIcon;
  label: string;
  value: string | number;
  subtext?: string;
  change?: number;
  changeLabel?: string;
  accentColor?: string;
  className?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  change,
  changeLabel,
  accentColor,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden",
        className
      )}
    >
      {accentColor && (
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
          style={{ background: accentColor }}
        />
      )}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          {Icon && (
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: accentColor ? `${accentColor}15` : "var(--accent)" }}
            >
              <Icon className="w-5 h-5" style={{ color: accentColor || "var(--crimson)" }} />
            </div>
          )}
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtext && (
            <p className="text-xs text-muted-foreground">{subtext}</p>
          )}
        </div>
        {change !== undefined && (
          <span
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full",
              change >= 0
                ? "text-emerald-700 bg-emerald-50"
                : "text-red-700 bg-red-50"
            )}
          >
            {change >= 0 ? "↗" : "↘"} {change >= 0 ? "+" : ""}
            {change}%{changeLabel ? ` ${changeLabel}` : ""}
          </span>
        )}
      </div>
    </div>
  );
}
