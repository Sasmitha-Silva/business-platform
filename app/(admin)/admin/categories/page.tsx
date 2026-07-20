"use client";

import { useState } from "react";
import { Plus, GripVertical, ChevronDown, ChevronRight, ToggleLeft, ToggleRight, RotateCcw, Info, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { mockCategories } from "@/lib/mock-data";

export default function CategoryManagerPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "cat-4": true });

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Category Manager</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organize and manage the directory hierarchy for the Rotaract Business Network.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold gap-2 shadow-md">
          <Plus className="w-4 h-4" /> Create Parent Category
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Directory Tree Card (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h2 className="font-bold text-foreground text-lg text-crimson">Directory Tree</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg"><RotateCcw className="w-4 h-4 text-muted-foreground" /></Button>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {categories.slice(0, 5).map((cat) => {
              const isCatExpanded = expanded[cat.id];
              return (
                <div key={cat.id} className="space-y-2">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-warm-bg border border-border/80 hover:bg-pink-50/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-muted-foreground/50 cursor-grab" />
                      <button onClick={() => toggleExpand(cat.id)} className="p-0.5 text-muted-foreground hover:text-foreground">
                        {isCatExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                      <span className="font-bold text-sm text-foreground">{cat.name}</span>
                      <span className="text-[10px] font-semibold text-muted-foreground bg-white border border-border px-2 py-0.5 rounded-full">
                        {cat.children?.length || 0} Items
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch checked={cat.is_active} />
                    </div>
                  </div>

                  {/* Sub-categories */}
                  {isCatExpanded && cat.children && (
                    <div className="pl-8 space-y-2 border-l-2 border-pink-200 ml-4 py-1">
                      {cat.children.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between p-3 rounded-xl bg-white border border-border hover:bg-warm-bg/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <GripVertical className="w-3.5 h-3.5 text-muted-foreground/50 cursor-grab" />
                            <span className="text-xs font-semibold text-foreground">{sub.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch checked={sub.is_active} />
                            <Button variant="ghost" size="icon" className="w-6 h-6"><MoreVertical className="w-3 h-3" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Stats & Info */}
        <div className="space-y-6">
          {/* 2 Metric Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-crimson rounded-3xl p-5 text-white shadow-md">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">TOTAL CATEGORIES</p>
              <p className="text-3xl font-extrabold mt-2">42</p>
            </div>
            <div className="bg-amber-500 rounded-3xl p-5 text-white shadow-md">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/80">ACTIVE NOW</p>
              <p className="text-3xl font-extrabold mt-2">38</p>
            </div>
          </div>

          {/* Tree Logic Info */}
          <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <Info className="w-4 h-4 text-crimson" /> Tree Logic
            </h3>
            <div className="space-y-3 text-xs text-muted-foreground">
              <p className="flex items-start gap-2">
                <span className="text-crimson font-bold">ℹ</span> Drag handles allow reordering within the same level of hierarchy.
              </p>
              <p className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">⚠️</span> Inactivating a parent category will hide all its sub-categories from the public directory.
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✨</span> Click &apos;Add Sub-category&apos; to nest a new industrial segment under a primary category.
              </p>
            </div>
          </div>

          {/* Recent Changes Activity Feed */}
          <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">RECENT CHANGES</h3>
            <div className="space-y-3 text-xs">
              <div className="border-l-2 border-crimson pl-3 py-0.5">
                <p className="font-bold text-foreground">AI Category Added</p>
                <p className="text-[10px] text-muted-foreground">By Admin · 2 hours ago</p>
              </div>
              <div className="border-l-2 border-amber-500 pl-3 py-0.5">
                <p className="font-bold text-foreground">Reordered: Software</p>
                <p className="text-[10px] text-muted-foreground">By Sarah L. · 5 hours ago</p>
              </div>
              <div className="border-l-2 border-slate-400 pl-3 py-0.5">
                <p className="font-bold text-foreground">Deactivated: Old Retail</p>
                <p className="text-[10px] text-muted-foreground">By System · Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
