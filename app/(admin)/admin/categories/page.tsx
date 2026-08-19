"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  GripVertical,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Info,
  FolderTree,
  CheckCircle2,
  Layers,
  Edit3,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockCategories } from "@/lib/mock-data";

export default function CategoryManagerPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "cat-4": true, "cat-1": true });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDescription, setNewCatDescription] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, is_active: !cat.is_active } : cat))
    );
    showToast("Category status updated.");
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      slug: newCatName.toLowerCase().replace(/\s+/g, "-"),
      description: newCatDescription.trim() || "New Business Classification",
      is_active: true,
      children: [],
    };

    setCategories([newCat, ...categories]);
    setNewCatName("");
    setNewCatDescription("");
    setShowAddModal(false);
    showToast(`Category "${newCat.name}" created successfully.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalCategories = categories.length;
  const activeCount = categories.filter((c) => c.is_active).length;

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Directory Category Hierarchy
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
              {totalCategories} Sectors
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Manage public directory taxonomy, parent sectors, sub-categories, and industry classifications.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold gap-2 h-9.5 px-4 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </Button>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100 shrink-0">
                  <FolderTree className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">New Category</h3>
                  <p className="text-xs text-slate-500 font-normal">Add a root sector to directory taxonomy.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-3.5">
              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Category Name *</Label>
                <Input
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Healthcare &amp; Medical Devices"
                  className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Description</Label>
                <textarea
                  rows={2}
                  value={newCatDescription}
                  onChange={(e) => setNewCatDescription(e.target.value)}
                  placeholder="Brief taxonomy overview..."
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#D41367] focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-slate-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-9.5 px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold h-9.5 px-5 shadow-xs"
                >
                  Create Category
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 2-COLUMN TAXONOMY WORKSPACE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Directory Tree Card (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Taxonomy Structure
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Expand parents to view active sub-industries.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {activeCount} of {totalCategories} Active
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {categories.map((cat) => {
              const isCatExpanded = expanded[cat.id];
              const childCount = cat.children?.length || 0;

              return (
                <div key={cat.id} className="space-y-2">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 hover:bg-pink-50/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={() => toggleExpand(cat.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
                      >
                        {isCatExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                      <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {cat.name}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md shrink-0">
                        {childCount} {childCount === 1 ? "Sub-item" : "Sub-items"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <Switch
                        checked={cat.is_active}
                        onCheckedChange={() => handleToggleCategory(cat.id)}
                      />
                    </div>
                  </div>

                  {/* Sub-categories */}
                  {isCatExpanded && cat.children && cat.children.length > 0 && (
                    <div className="pl-6 space-y-1.5 border-l-2 border-pink-200 ml-5 py-1">
                      {cat.children.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-xs sm:text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D41367]" />
                            <span className="font-semibold text-slate-700">{sub.name}</span>
                          </div>
                          <span className="text-xs text-slate-400 font-normal">Active Sub-category</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Stats & Guidelines (1 col) */}
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-4.5 space-y-1.5 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">Total Sectors</span>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">{totalCategories}</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4.5 space-y-1.5 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">Live Active</span>
              <div className="text-2xl sm:text-3xl font-bold text-[#D41367]">{activeCount}</div>
            </div>
          </div>

          {/* Guidelines Info Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#D41367]" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900">Taxonomy Principles</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              Parent categories represent top-level global industries. Sub-items are automatically surfaced in directory multi-select filters and search auto-completion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
