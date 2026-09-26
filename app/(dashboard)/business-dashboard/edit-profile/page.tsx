"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Camera,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Save,
  Check,
  Package,
  Wrench,
  ImageIcon,
  Info,
  ExternalLink,
  X,
  Tag,
  DollarSign,
  Globe,
  Briefcase,
  Layers,
  ChevronDown,
  Sparkles,
  Rocket,
  Truck,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/image-uploader";
import { cn, formatCurrencyPrice, getCurrencySymbol } from "@/lib/utils";
import {
  getOwnerBusinessAction,
  updateOwnerBusinessAction,
  saveProductServiceAction,
  deleteProductServiceAction,
} from "@/app/actions/owner";
import { getCategoriesAction } from "@/app/actions/directory";
import type { Business, Category } from "@/lib/types";
import {
  getCachedDashboardData,
  setCachedDashboardData,
} from "@/lib/cache/admin-cache";

interface FormCustomDropdownProps {
  value: string;
  options: { label: string; value: string; description?: string }[];
  onChange: (val: string) => void;
  placeholder?: string;
}

function FormCustomDropdown({ value, options, onChange, placeholder }: FormCustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center justify-between px-3.5 h-9.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer bg-slate-50 border-slate-200 text-slate-800 hover:bg-white hover:border-slate-300",
          open && "ring-2 ring-pink-100 border-[#D41367] bg-white shadow-xs"
        )}
      >
        <span className="truncate">{selected ? selected.label : placeholder || "Select..."}</span>
        <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ml-2", open && "rotate-180 text-[#D41367]")} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-xl p-1.5 z-50 space-y-0.5 animate-in fade-in zoom-in-95 duration-150 max-h-60 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer",
                  isSelected
                    ? "bg-pink-50 text-[#D41367] font-bold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div>
                  <p className="leading-snug">{opt.label}</p>
                  {opt.description && <p className="text-[10px] text-slate-400 font-normal">{opt.description}</p>}
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#D41367] shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const serviceScopeOptions = [
  { value: "local", label: "Local (City & Immediate Area)", description: "Direct local community" },
  { value: "state", label: "State / Provincial Area", description: "Regional province jurisdiction" },
  { value: "nationwide", label: "Nationwide (All Districts)", description: "Across all districts" },
  { value: "international", label: "International (Global Clients)", description: "Cross-border & export trade" },
];

export default function BusinessEditProfilePage() {
  const cachedBiz = getCachedDashboardData<Business>("owner_biz");
  const [activeTab, setActiveTab] = useState<"media" | "services" | "products" | "overview">("media");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [rawBusiness, setRawBusiness] = useState<Business | null>(cachedBiz || null);
  const [isLoading, setIsLoading] = useState(!cachedBiz);
  const [dbCategories, setDbCategories] = useState<Category[]>([]);

  // Business state
  const [businessInfo, setBusinessInfo] = useState({
    id: cachedBiz?.id || "",
    slug: cachedBiz?.slug || "",
    name: cachedBiz?.name || "",
    categoryId: cachedBiz?.category_id || (cachedBiz?.category as any)?.id || "",
    subcategoryId: cachedBiz?.subcategory_id || (cachedBiz?.subcategory as any)?.id || "",
    businessType: ((cachedBiz?.business_type as any) || ["service_provider"]) as (
      | "manufacturer"
      | "trader"
      | "service_provider"
      | "exporter"
      | "importer"
      | "franchise"
    )[],
    category: cachedBiz?.category?.name || "General Enterprise",
    tagline: cachedBiz?.tagline || "",
    description: cachedBiz?.description || "",
    yearEstablished: cachedBiz?.year_established || 2024,
    logoUrl: cachedBiz?.logo_url || "",
    coverUrl: cachedBiz?.cover_image_url || "",
    isWomenOwned: cachedBiz?.is_women_owned || false,
    isStartup: cachedBiz?.is_startup || false,
    onlineDelivery: cachedBiz?.online_delivery || false,
    franchiseAvailable: cachedBiz?.franchise_available || false,
    phone: cachedBiz?.contact?.mobile || "",
    email: cachedBiz?.contact?.email || "",
    address: cachedBiz?.location?.address || "",
    city: cachedBiz?.location?.city || "",
    district: cachedBiz?.location?.district || "3220",
    country: cachedBiz?.location?.country || "",
    pincode: (cachedBiz?.location as any)?.postal_code || cachedBiz?.location?.pincode || "",
    primaryLocation: cachedBiz?.location ? `${cachedBiz.location.city || ""}, District ${cachedBiz.district_number || "3220"}` : "",
    additionalLocations: [] as string[],
    socialLinks: {
      linkedin: (cachedBiz?.contact?.social_links as any)?.linkedin || "",
      instagram: (cachedBiz?.contact?.social_links as any)?.instagram || "",
      facebook: (cachedBiz?.contact?.social_links as any)?.facebook || "",
      twitter: (cachedBiz?.contact?.social_links as any)?.twitter || "",
      whatsapp: cachedBiz?.contact?.whatsapp || "",
    },
  });

  const [newDashLocationInput, setNewDashLocationInput] = useState("");

  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState<{
    name: string;
    description: string;
    price: string;
    serviceArea: "local" | "state" | "nationwide" | "international";
  }>({
    name: "",
    description: "",
    price: "",
    serviceArea: "nationwide",
  });
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", tags: "" });

  const handleAddDashLocation = () => {
    if (!newDashLocationInput.trim()) return;
    setBusinessInfo((prev) => ({
      ...prev,
      additionalLocations: [...prev.additionalLocations, newDashLocationInput.trim()],
    }));
    setNewDashLocationInput("");
    triggerSaveNotification();
  };

  const handleRemoveDashLocation = (index: number) => {
    setBusinessInfo((prev) => ({
      ...prev,
      additionalLocations: prev.additionalLocations.filter((_, i) => i !== index),
    }));
    triggerSaveNotification();
  };

  useEffect(() => {
    async function loadData() {
      try {
        if (!cachedBiz) {
          setIsLoading(true);
        }
        const [biz, cats] = await Promise.all([
          getOwnerBusinessAction(),
          getCategoriesAction(),
        ]);

        if (cats && cats.length > 0) {
          setDbCategories(cats);
        }

        if (biz) {
          setRawBusiness(biz);
          setCachedDashboardData("owner_biz", biz);
          setBusinessInfo({
            id: biz.id,
            slug: biz.slug,
            name: biz.name,
            categoryId: biz.category_id || (biz.category as any)?.id || (cats?.[0]?.id || ""),
            subcategoryId: biz.subcategory_id || (biz.subcategory as any)?.id || "",
            businessType: ((biz.business_type as any) || ["service_provider"]),
            category: biz.category?.name || cats?.[0]?.name || "General Enterprise",
            tagline: biz.tagline || "",
            description: biz.description || "",
            yearEstablished: biz.year_established || 2024,
            logoUrl: biz.logo_url || "",
            coverUrl: biz.cover_image_url || "",
            isWomenOwned: biz.is_women_owned || false,
            isStartup: biz.is_startup || false,
            onlineDelivery: biz.online_delivery || false,
            franchiseAvailable: biz.franchise_available || false,
            phone: biz.contact?.mobile || "",
            email: biz.contact?.email || "",
            address: biz.location?.address || "",
            city: biz.location?.city || "",
            district: biz.location?.district || "",
            country: biz.location?.country || "",
            pincode: (biz.location as any)?.postal_code || biz.location?.pincode || "",
            primaryLocation: `${biz.location?.city || "National"}, Dist ${biz.rotaract_profile?.district_number || "3220"}`,
            additionalLocations: [],
            socialLinks: {
              linkedin: (biz.contact?.social_links as any)?.linkedin || "",
              instagram: (biz.contact?.social_links as any)?.instagram || "",
              facebook: (biz.contact?.social_links as any)?.facebook || "",
              twitter: (biz.contact?.social_links as any)?.twitter || "",
              whatsapp: biz.contact?.whatsapp || "",
            },
          });

          const prods = biz.products_services || [];
          const srvList = prods
            .filter((p) => p.type === "service")
            .map((s) => ({
              ...s,
              price: formatCurrencyPrice(s.price_from, biz.location?.country) || "Custom Quote",
              serviceArea: s.service_area ? s.service_area.charAt(0).toUpperCase() + s.service_area.slice(1) : "Nationwide",
            }));
          const prdList = prods
            .filter((p) => p.type === "product")
            .map((p) => ({
              ...p,
              price: formatCurrencyPrice(p.price_from, biz.location?.country) || "Custom Quote",
            }));

          setServices(srvList);
          setProducts(prdList);
        }
      } catch (err) {
        console.error("Failed to load business profile:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const triggerSaveNotification = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleSaveOverview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessInfo.id) return;
    try {
      await updateOwnerBusinessAction({
        businessId: businessInfo.id,
        name: businessInfo.name,
        tagline: businessInfo.tagline,
        description: businessInfo.description,
        yearEstablished: Number(businessInfo.yearEstablished) || undefined,
        categoryId: businessInfo.categoryId || undefined,
        subcategoryId: businessInfo.subcategoryId || undefined,
        businessType: businessInfo.businessType,
        isWomenOwned: businessInfo.isWomenOwned,
        isStartup: businessInfo.isStartup,
        onlineDelivery: businessInfo.onlineDelivery,
        franchiseAvailable: businessInfo.franchiseAvailable,
        logoUrl: businessInfo.logoUrl,
        coverImageUrl: businessInfo.coverUrl,
        city: businessInfo.city || "Colombo",
        address: businessInfo.address || "Main Street",
        pincode: businessInfo.pincode,
        email: businessInfo.email,
        mobile: businessInfo.phone,
        whatsapp: businessInfo.socialLinks.whatsapp,
        socialLinks: businessInfo.socialLinks,
      });
      triggerSaveNotification();
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
    triggerSaveNotification();
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name.trim() || !businessInfo.id) return;
    try {
      const res = await saveProductServiceAction({
        businessId: businessInfo.id,
        name: newService.name.trim(),
        type: "service",
        description: newService.description.trim(),
        priceFrom: parseFloat(newService.price.replace(/[^0-9.]/g, "")) || undefined,
        serviceArea: newService.serviceArea,
      });
      if (res.success && res.product) {
        setServices([
          ...services,
          {
            ...res.product,
            price: formatCurrencyPrice(newService.price, businessInfo.country) || "Custom Quote",
            serviceArea: newService.serviceArea ? newService.serviceArea.charAt(0).toUpperCase() + newService.serviceArea.slice(1) : "Nationwide",
          },
        ]);
      }
      setNewService({ name: "", description: "", price: "", serviceArea: "nationwide" });
      setShowAddService(false);
      triggerSaveNotification();
    } catch (err) {
      console.error("Failed to add service:", err);
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      await deleteProductServiceAction(id);
      setServices(services.filter((s) => s.id !== id));
      triggerSaveNotification();
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim() || !businessInfo.id) return;
    try {
      const tagsList = newProduct.tags ? newProduct.tags.split(",").map((t) => t.trim()) : ["Featured"];
      const res = await saveProductServiceAction({
        businessId: businessInfo.id,
        name: newProduct.name.trim(),
        type: "product",
        description: newProduct.description.trim(),
        priceFrom: parseFloat(newProduct.price.replace(/[^0-9.]/g, "")) || undefined,
        tags: tagsList,
      });
      if (res.success && res.product) {
        setProducts([
          ...products,
          {
            ...res.product,
            price: formatCurrencyPrice(newProduct.price, businessInfo.country) || "Custom Quote",
            tags: tagsList,
          },
        ]);
      }
      setNewProduct({ name: "", price: "", description: "", tags: "" });
      setShowAddProduct(false);
      triggerSaveNotification();
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProductServiceAction(id);
      setProducts(products.filter((p) => p.id !== id));
      triggerSaveNotification();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-16">
      {/* ================= HEADER BANNER ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white font-bold text-xl flex items-center justify-center shadow-xs shrink-0">
            {businessInfo.name ? businessInfo.name.charAt(0) : "L"}
          </div>
          <div className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Manage Business Profile &amp; Listings
              </h1>
              <span className="px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] font-semibold text-xs border border-pink-100/60">
                {businessInfo.category || "Technology"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              Update your business branding, showcase gallery, active services, and product catalog visible in the directory.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 gap-2 h-9.5 px-3.5"
            asChild
          >
            <Link
              href={`/business/${businessInfo.slug || "lumina-digital-solutions"}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>Public View</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Toast Notification */}
      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between shadow-2xs animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Business details updated successfully! Changes are live on your profile.</span>
          </div>
          <button onClick={() => setSavedSuccess(false)} className="text-emerald-600 hover:text-emerald-800 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("media")}
          className={`flex items-center gap-2 px-4.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "media"
              ? "bg-[#D41367] text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-pink-50 hover:text-[#D41367] border border-slate-200"
          }`}
        >
          <Camera className="w-4 h-4" /> Media &amp; Images
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={`flex items-center gap-2 px-4.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "services"
              ? "bg-[#D41367] text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-pink-50 hover:text-[#D41367] border border-slate-200"
          }`}
        >
          <Wrench className="w-4 h-4" /> Services ({services.length})
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-4.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "products"
              ? "bg-[#D41367] text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-pink-50 hover:text-[#D41367] border border-slate-200"
          }`}
        >
          <Package className="w-4 h-4" /> Products ({products.length})
        </button>

        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-4.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "overview"
              ? "bg-[#D41367] text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-pink-50 hover:text-[#D41367] border border-slate-200"
          }`}
        >
          <Building2 className="w-4 h-4" /> Business Overview
        </button>
      </div>

      {/* ================= TAB 1: MEDIA & IMAGES ================= */}
      {activeTab === "media" && (
        <div className="space-y-6">
          {/* Logo & Cover Image Editor */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Business Logo Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#D41367]" /> Business Logo
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">Displayed on directory cards and headers.</p>
              </div>

              <ImageUploader
                label="Click or Drag file to Upload Logo"
                value={businessInfo.logoUrl}
                onChange={(url) => setBusinessInfo({ ...businessInfo, logoUrl: url })}
                heightClass="h-32"
              />
            </div>

            {/* Cover Banner Image Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#D41367]" /> Cover Hero Banner
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">Main banner header on your public business page.</p>
              </div>

              <ImageUploader
                label="Click or Drag file to Upload Cover Photo"
                value={businessInfo.coverUrl}
                onChange={(url) => setBusinessInfo({ ...businessInfo, coverUrl: url })}
                heightClass="h-32"
              />
            </div>
          </div>

          {/* Photo Gallery Showcase */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#D41367]" /> Showcase Photo Gallery
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                  Upload photos of your office, team, work samples, or facility.
                </p>
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {/* Image Upload Tile */}
              <div className="aspect-video">
                <ImageUploader
                  value=""
                  onChange={(url) => setGalleryImages([...galleryImages, url])}
                  heightClass="h-full"
                />
              </div>

              {galleryImages.map((img, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100 shadow-xs">
                  <Image src={img} alt={`Gallery ${idx}`} fill unoptimized className="object-cover transition-transform group-hover:scale-105" />
                  <button
                    onClick={() => handleRemoveGalleryImage(idx)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={triggerSaveNotification}
              className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-10 px-6 text-xs sm:text-sm font-semibold gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" /> Save Media Settings
            </Button>
          </div>
        </div>
      )}

      {/* ================= TAB 2: SERVICES CATALOG ================= */}
      {activeTab === "services" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#D41367]" /> Active Services Offered
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                List key professional services your business provides to buyers and Rotaract members.
              </p>
            </div>
            <Button
              onClick={() => setShowAddService(true)}
              className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold gap-2 shrink-0 h-9.5 px-4 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Add New Service
            </Button>
          </div>

          {/* Add Service Modal */}
          {showAddService && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-lg w-full space-y-4 shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200 relative">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100/80 shrink-0">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Add New Service</h3>
                      <p className="text-xs text-slate-500 font-normal">Specify pricing, description, and service scope.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddService(false)}
                    className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleAddService} className="space-y-3.5">
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-slate-700">Service Title *</Label>
                      <Input
                        required
                        value={newService.name}
                        onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                        placeholder="e.g. Corporate Legal Advisory"
                        className="text-xs bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-slate-700">Estimated Price / Rate</Label>
                      <Input
                        value={newService.price}
                        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                        placeholder="e.g. $500 / Project"
                        className="text-xs bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-slate-700">Service Scope / Target Region</Label>
                    <FormCustomDropdown
                      value={newService.serviceArea}
                      options={serviceScopeOptions}
                      onChange={(val) => setNewService({ ...newService, serviceArea: val as any })}
                      placeholder="Select target region..."
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-slate-700">Service Description</Label>
                    <textarea
                      rows={3}
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      placeholder="Describe deliverables, approach, and scope..."
                      className="w-full text-xs p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#D41367] focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddService(false)}
                      className="rounded-xl text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-9 px-4"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs font-semibold h-9 px-5 shadow-xs"
                    >
                      Save Service
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Services List Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((srv) => (
              <div key={srv.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-[#D41367]/40 hover:shadow-md transition-all group space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-2xs">
                      <Wrench className="w-3.5 h-3.5 text-pink-400" />
                      <span>Service</span>
                    </div>
                    <span className="bg-pink-50 text-[#D41367] font-black text-xs px-2.5 py-1 rounded-lg shadow-2xs border border-pink-200/60">
                      {srv.price}
                    </span>
                  </div>
                  <div className="space-y-1 pt-0.5">
                    <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-[#D41367] transition-colors">{srv.name}</h4>
                    {srv.description && (
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">{srv.description}</p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/80 font-medium">
                    <Globe className="w-3 h-3 text-[#D41367]" />
                    <span>{srv.serviceArea}</span>
                  </span>
                  <button
                    onClick={() => handleDeleteService(srv.id)}
                    className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: PRODUCTS CATALOG ================= */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#D41367]" /> Products Catalog
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Display physical goods, packaged software, merchandise, or product listings.
              </p>
            </div>
            <Button
              onClick={() => setShowAddProduct(true)}
              className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold gap-2 shrink-0 h-9.5 px-4 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Add Product
            </Button>
          </div>

          {/* Add Product Modal */}
          {showAddProduct && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-lg w-full space-y-4 shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200 relative">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#D41367] flex items-center justify-center border border-pink-100/80 shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">Add New Product</h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-normal">Add product details, pricing, and tag keywords.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-3.5">
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <Label className="text-xs sm:text-sm font-semibold text-slate-700">Product Name *</Label>
                      <Input
                        required
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="e.g. ERP Software Suite"
                        className="rounded-xl border-slate-200 text-xs sm:text-sm h-9.5"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs sm:text-sm font-semibold text-slate-700">Price (Starting / Fixed)</Label>
                      <Input
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="e.g. 99 or On Quote"
                        className="rounded-xl border-slate-200 text-xs sm:text-sm h-9.5"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs sm:text-sm font-semibold text-slate-700">Description</Label>
                    <textarea
                      rows={3}
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Key specifications, deliverables, warranties, or compatibility..."
                      className="w-full text-xs sm:text-sm p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#D41367] focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs sm:text-sm font-semibold text-slate-700">Keywords / Tags (Comma separated)</Label>
                    <Input
                      value={newProduct.tags}
                      onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
                      placeholder="e.g. Cloud, Scalable, Analytics"
                      className="rounded-xl border-slate-200 text-xs sm:text-sm h-9.5"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddProduct(false)}
                      className="rounded-xl text-xs sm:text-sm font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-9.5 px-4"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold h-9.5 px-5 shadow-xs"
                    >
                      Save Product
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Products List Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((prd) => (
              <div key={prd.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-[#D41367]/40 hover:shadow-md transition-all group space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-2xs">
                      <Package className="w-3.5 h-3.5 text-pink-400" />
                      <span>Product</span>
                    </div>
                    <span className="bg-pink-50 text-[#D41367] font-black text-xs px-2.5 py-1 rounded-lg shadow-2xs border border-pink-200/60">
                      {prd.price}
                    </span>
                  </div>
                  <div className="space-y-1 pt-0.5">
                    <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-[#D41367] transition-colors">{prd.name}</h4>
                    {prd.description && (
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">{prd.description}</p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => handleDeleteProduct(prd.id)}
                    className="text-red-500 hover:text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: BUSINESS OVERVIEW & LOCATIONS ================= */}
      {activeTab === "overview" && (
        <form onSubmit={handleSaveOverview} className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#D41367]" /> Core Business Profile Details
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              General business identity details shown across search engines and directory listings.
            </p>
          </div>

          {/* Business Core Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">Official Business Name *</Label>
              <Input
                required
                value={businessInfo.name}
                onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">Tagline / Slogan</Label>
              <Input
                value={businessInfo.tagline}
                onChange={(e) => setBusinessInfo({ ...businessInfo, tagline: e.target.value })}
                placeholder="e.g. Empowering Rotaract Brands with Next-Gen Solutions"
                className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
              />
            </div>
          </div>

          {/* Database-backed Industry Category & Subcategory Custom Dropdowns */}
          <div className="grid sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">Primary Industry Category (From Database) *</Label>
              <FormCustomDropdown
                value={businessInfo.categoryId}
                options={dbCategories
                  .filter((c) => !c.parent_id)
                  .map((c) => ({
                    value: c.id,
                    label: c.name,
                    description: `Category / ${c.slug}`,
                  }))}
                onChange={(catId) => {
                  const chosen = dbCategories.find((c) => c.id === catId);
                  setBusinessInfo((prev) => ({
                    ...prev,
                    categoryId: catId,
                    category: chosen ? chosen.name : prev.category,
                    subcategoryId: "",
                  }));
                }}
                placeholder="Select category from database..."
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">Industry Subcategory (Optional)</Label>
              {dbCategories.some((c) => c.parent_id === businessInfo.categoryId) ? (
                <FormCustomDropdown
                  value={businessInfo.subcategoryId}
                  options={[
                    { value: "", label: "General (No Specific Subcategory)", description: "List under broad category" },
                    ...dbCategories
                      .filter((c) => c.parent_id === businessInfo.categoryId)
                      .map((c) => ({
                        value: c.id,
                        label: c.name,
                        description: `Subcategory / ${c.slug}`,
                      })),
                  ]}
                  onChange={(subId) => setBusinessInfo((prev) => ({ ...prev, subcategoryId: subId }))}
                  placeholder="Select subcategory..."
                />
              ) : (
                <div className="h-9.5 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-xs flex items-center">
                  <span>No subcategories for this sector</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">Year Established</Label>
              <Input
                type="number"
                value={businessInfo.yearEstablished}
                onChange={(e) => setBusinessInfo({ ...businessInfo, yearEstablished: Number(e.target.value) })}
                className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">Primary Operating City &amp; District</Label>
              <Input
                value={businessInfo.primaryLocation}
                onChange={(e) => setBusinessInfo({ ...businessInfo, primaryLocation: e.target.value })}
                className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
              />
            </div>
          </div>

          {/* Commercial Classification Types */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <Label className="text-xs sm:text-sm font-semibold text-slate-700">Commercial Operating Classifications</Label>
            <p className="text-xs text-slate-500">Select one or more classifications that define your business model:</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { value: "service_provider", label: "Service Provider" },
                { value: "manufacturer", label: "Manufacturer" },
                { value: "trader", label: "Trader / Distributor" },
                { value: "exporter", label: "Exporter" },
                { value: "importer", label: "Importer" },
                { value: "franchise", label: "Franchise" },
              ].map((opt) => {
                const isSelected = businessInfo.businessType.includes(opt.value as any);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      const cur = businessInfo.businessType;
                      const next = isSelected
                        ? cur.filter((t) => t !== opt.value)
                        : [...cur, opt.value as any];
                      setBusinessInfo((prev) => ({ ...prev, businessType: next.length > 0 ? next : ["service_provider"] }));
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5",
                      isSelected
                        ? "bg-pink-50 border-[#D41367] text-[#D41367] shadow-2xs font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#D41367]" />}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Enterprise Badges & Accreditations */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <Label className="text-xs sm:text-sm font-semibold text-slate-700">Enterprise Accreditations &amp; Capabilities</Label>
            <p className="text-xs text-slate-500">Enable badges to showcase commercial capabilities in the Rotaract directory:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setBusinessInfo((prev) => ({ ...prev, isWomenOwned: !prev.isWomenOwned }))}
                className={cn(
                  "p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer",
                  businessInfo.isWomenOwned
                    ? "bg-purple-50/60 border-purple-300 text-purple-900"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">Women-Owned Enterprise</p>
                    <p className="text-[10px] text-slate-500">Certified women-led or founded entity</p>
                  </div>
                </div>
                <div className={cn("w-5 h-5 rounded-md border flex items-center justify-center", businessInfo.isWomenOwned ? "bg-[#D41367] border-[#D41367] text-white" : "border-slate-300 bg-white")}>
                  {businessInfo.isWomenOwned && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setBusinessInfo((prev) => ({ ...prev, isStartup: !prev.isStartup }))}
                className={cn(
                  "p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer",
                  businessInfo.isStartup
                    ? "bg-indigo-50/60 border-indigo-300 text-indigo-900"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">High-Growth Startup</p>
                    <p className="text-[10px] text-slate-500">Innovative early-stage venture</p>
                  </div>
                </div>
                <div className={cn("w-5 h-5 rounded-md border flex items-center justify-center", businessInfo.isStartup ? "bg-[#D41367] border-[#D41367] text-white" : "border-slate-300 bg-white")}>
                  {businessInfo.isStartup && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setBusinessInfo((prev) => ({ ...prev, onlineDelivery: !prev.onlineDelivery }))}
                className={cn(
                  "p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer",
                  businessInfo.onlineDelivery
                    ? "bg-emerald-50/60 border-emerald-300 text-emerald-900"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">Direct Delivery &amp; Shipping</p>
                    <p className="text-[10px] text-slate-500">Nationwide/local fulfillment ready</p>
                  </div>
                </div>
                <div className={cn("w-5 h-5 rounded-md border flex items-center justify-center", businessInfo.onlineDelivery ? "bg-[#D41367] border-[#D41367] text-white" : "border-slate-300 bg-white")}>
                  {businessInfo.onlineDelivery && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setBusinessInfo((prev) => ({ ...prev, franchiseAvailable: !prev.franchiseAvailable }))}
                className={cn(
                  "p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer",
                  businessInfo.franchiseAvailable
                    ? "bg-amber-50/60 border-amber-300 text-amber-900"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">Franchise &amp; Expansion Open</p>
                    <p className="text-[10px] text-slate-500">Open for regional dealership &amp; partners</p>
                  </div>
                </div>
                <div className={cn("w-5 h-5 rounded-md border flex items-center justify-center", businessInfo.franchiseAvailable ? "bg-[#D41367] border-[#D41367] text-white" : "border-slate-300 bg-white")}>
                  {businessInfo.franchiseAvailable && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs sm:text-sm font-semibold text-slate-700">Business Overview &amp; Bio</Label>
            <textarea
              rows={3}
              value={businessInfo.description}
              onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
              className="w-full text-xs sm:text-sm p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#D41367] focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Contact Details & Address */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#D41367]" /> Contact &amp; Physical Address
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Direct phone, email, and registered headquarters address.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Business Phone Number</Label>
                <Input
                  value={businessInfo.phone}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                  className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Business Email Address</Label>
                <Input
                  type="email"
                  value={businessInfo.email}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                  className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Registered Address</Label>
                <Input
                  value={businessInfo.address}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                  className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs sm:text-sm font-semibold text-slate-700">Pincode / Zip</Label>
                <Input
                  value={businessInfo.pincode}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, pincode: e.target.value })}
                  className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Places of Operation */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#D41367]" /> Primary &amp; Additional Operating Hubs
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Main operating center and regional branch offices.
              </p>
            </div>

            <div className="space-y-1">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">Primary Operating City &amp; District</Label>
              <Input
                value={businessInfo.primaryLocation}
                onChange={(e) => setBusinessInfo({ ...businessInfo, primaryLocation: e.target.value })}
                className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">Additional Operating Branches / Hubs</Label>

              <div className="flex gap-2">
                <Input
                  value={newDashLocationInput}
                  onChange={(e) => setNewDashLocationInput(e.target.value)}
                  placeholder="e.g. Kandy Regional Branch, Dubai Sales Office"
                  className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl flex-1 h-9.5 focus:bg-white"
                />
                <Button
                  type="button"
                  onClick={handleAddDashLocation}
                  className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs sm:text-sm font-semibold gap-1 px-4 h-9.5 shadow-xs shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Branch
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {businessInfo.additionalLocations.map((loc, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium border border-slate-200"
                  >
                    {loc}
                    <button
                      type="button"
                      onClick={() => handleRemoveDashLocation(idx)}
                      className="hover:text-red-600 ml-1 text-slate-400 cursor-pointer transition-colors"
                      title="Remove branch"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <Button
              type="submit"
              className="bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl h-10 px-6 text-xs sm:text-sm font-semibold gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" /> Save Overview &amp; Locations
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
