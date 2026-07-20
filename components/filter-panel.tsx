"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterSection {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  searchable?: boolean;
}

interface FilterPanelProps {
  sections: FilterSection[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (sectionId: string, value: string, checked: boolean) => void;
  onClearAll: () => void;
  className?: string;
}

export function FilterPanel({
  sections,
  activeFilters,
  onFilterChange,
  onClearAll,
  className,
}: FilterPanelProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

  const totalActive = Object.values(activeFilters).flat().length;

  const toggleSection = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={cn("bg-card rounded-2xl border border-border p-5", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-foreground">FILTERS</h3>
        {totalActive > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs font-semibold text-crimson hover:text-crimson-dark transition-colors"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      {/* Sections */}
      <div className="space-y-5">
        {sections.map((section) => {
          const isOpen = !collapsed[section.id];
          const searchTerm = searchTerms[section.id] || "";
          const filteredOptions = section.searchable && searchTerm
            ? section.options.filter((o) =>
                o.label.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : section.options;

          return (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full text-left mb-3"
              >
                <span className="text-sm font-semibold text-foreground">
                  {section.label}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              {isOpen && (
                <div className="space-y-2">
                  {section.searchable && (
                    <Input
                      type="text"
                      placeholder={`Search ${section.label.toLowerCase()}...`}
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerms((prev) => ({
                          ...prev,
                          [section.id]: e.target.value,
                        }))
                      }
                      className="h-8 text-xs mb-2"
                    />
                  )}
                  {filteredOptions.map((option) => {
                    const isChecked = activeFilters[section.id]?.includes(
                      option.value
                    );
                    return (
                      <label
                        key={option.value}
                        className="flex items-center gap-2.5 cursor-pointer group"
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={(checked) =>
                            onFilterChange(
                              section.id,
                              option.value,
                              checked as boolean
                            )
                          }
                          className="data-[state=checked]:bg-crimson data-[state=checked]:border-crimson"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}

              <div className="border-t border-border mt-4" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Active filter chips
interface FilterChipsProps {
  filters: { id: string; label: string }[];
  onRemove: (id: string) => void;
}

export function FilterChips({ filters, onRemove }: FilterChipsProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <span
          key={filter.id}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-crimson/5 border border-crimson/20 text-crimson text-xs font-medium rounded-full"
        >
          {filter.label}
          <button
            onClick={() => onRemove(filter.id)}
            className="hover:bg-crimson/10 rounded-full p-0.5 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  );
}
