import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { WIZARD_STEPS } from "@/lib/constants";

interface StepperProps {
  currentStep: number;
  className?: string;
}

export function Stepper({ currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {WIZARD_STEPS.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        const isLast = index === WIZARD_STEPS.length - 1;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step Circle + Label */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all relative",
                  isCompleted
                    ? "bg-crimson border-crimson text-white"
                    : isActive
                    ? "bg-white border-crimson text-crimson shadow-md shadow-crimson/20"
                    : "bg-white border-border text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
                {isActive && (
                  <div className="absolute -inset-1 rounded-full border-2 border-crimson/30 animate-pulse-soft" />
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium mt-2 whitespace-nowrap",
                  isActive ? "text-crimson" : isCompleted ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting Line */}
            {!isLast && (
              <div
                className={cn(
                  "w-16 sm:w-24 lg:w-32 h-0.5 mx-2 -mt-5 transition-colors",
                  isCompleted ? "bg-crimson" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
