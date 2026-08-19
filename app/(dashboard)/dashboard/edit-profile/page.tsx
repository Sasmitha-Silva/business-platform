"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/image-uploader";
import { mockBusinesses } from "@/lib/mock-data";

// Initial mock state from the first business
const defaultBusiness = mockBusinesses[0];

export default function BusinessEditProfilePage() {
  const [activeTab, setActiveTab] = useState<"media" | "services" | "products" | "overview">("media");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Business state
  const [businessInfo, setBusinessInfo] = useState({
    name: defaultBusiness.name,
    category: defaultBusiness.category?.name || "Technology & Software",
    tagline: defaultBusiness.tagline || "",
    description: defaultBusiness.description || "",
    yearEstablished: defaultBusiness.year_established || 2021,
    logoUrl: defaultBusiness.logo_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80",
    coverUrl: defaultBusiness.cover_image_url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    phone: defaultBusiness.contact?.mobile || "+91 9876543210",
    email: defaultBusiness.contact?.email || "info@lumina.com",
    address: defaultBusiness.location?.address || "123 Tech Park, Road No. 12",
    pincode: defaultBusiness.location?.pincode || "500034",
    primaryLocation: "Hyderabad, District 3150, India",
    additionalLocations: ["Kandy Regional Hub", "Dubai Office"],
    socialLinks: {
      linkedin: "https://linkedin.com/company/lumina",
      instagram: "https://instagram.com/lumina",
      facebook: "https://facebook.com/lumina",
      twitter: "https://twitter.com/lumina",
      whatsapp: "+919876543210",
    },
  });

  const [newDashLocationInput, setNewDashLocationInput] = useState("");

  const handleAddDashLocation = () => {
    if (newDashLocationInput.trim()) {
      setBusinessInfo((prev) => ({
        ...prev,
        additionalLocations: [...prev.additionalLocations, newDashLocationInput.trim()],
      }));
      setNewDashLocationInput("");
      triggerSaveNotification();
    }
  };

  const handleRemoveDashLocation = (index: number) => {
    setBusinessInfo((prev) => ({
      ...prev,
      additionalLocations: prev.additionalLocations.filter((_, i) => i !== index),
    }));
    triggerSaveNotification();
  };

  // Gallery photos state
  const [galleryImages, setGalleryImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  ]);

  // Services state
  const [services, setServices] = useState([
    {
      id: "srv-1",
      name: "Custom Enterprise Software & Web Apps",
      description: "Scalable full-stack Next.js and Cloud architecture tailored for global enterprises.",
      price: "$1,500 - $10,000",
      serviceArea: "Pan India & International",
      icon: "Code",
    },
    {
      id: "srv-2",
      name: "UI/UX Product Design & Prototyping",
      description: "Human-centric digital interface design system with high-fidelity interactive prototypes.",
      price: "$800 - $3,500",
      serviceArea: "International",
      icon: "Palette",
    },
  ]);

  // Products state
  const [products, setProducts] = useState([
    {
      id: "prd-1",
      name: "Rotaract Member Management SaaS",
      price: "$499/year",
      description: "Automated member verification, district event passes, and annual dues collection platform.",
      tags: ["SaaS", "Rotary", "Automation"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "prd-2",
      name: "Smart Business Card NFC Tags",
      price: "$29 / pack",
      description: "Instant contactless profile sharing for Rotaract network events and B2B conferences.",
      tags: ["Hardware", "NFC", "Networking"],
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    },
  ]);

  // Modals / Editors state
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ name: "", description: "", price: "", serviceArea: "Pan India" });

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", tags: "", imageUrl: "" });

  const triggerSaveNotification = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleSaveOverview = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSaveNotification();
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
    triggerSaveNotification();
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name.trim()) return;
    setServices([
      ...services,
      {
        id: `srv-${Date.now()}`,
        name: newService.name,
        description: newService.description,
        price: newService.price || "Custom Quote",
        serviceArea: newService.serviceArea,
        icon: "Briefcase",
      },
    ]);
    setNewService({ name: "", description: "", price: "", serviceArea: "Pan India" });
    setShowAddService(false);
    triggerSaveNotification();
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
    triggerSaveNotification();
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;
    setProducts([
      ...products,
      {
        id: `prd-${Date.now()}`,
        name: newProduct.name,
        price: newProduct.price || "Contact for Pricing",
        description: newProduct.description,
        tags: newProduct.tags ? newProduct.tags.split(",").map((t) => t.trim()) : ["Featured"],
        imageUrl: newProduct.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
      },
    ]);
    setNewProduct({ name: "", price: "", description: "", tags: "", imageUrl: "" });
    setShowAddProduct(false);
    triggerSaveNotification();
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    triggerSaveNotification();
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
              href={`/business/${defaultBusiness.slug || "lumina-digital-solutions"}`}
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
                    <Label className="text-xs font-semibold text-slate-700">Service Scope / Region</Label>
                    <Input
                      value={newService.serviceArea}
                      onChange={(e) => setNewService({ ...newService, serviceArea: e.target.value })}
                      placeholder="e.g. Pan India / International"
                      className="text-xs bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
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
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div key={srv.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-pink-200 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{srv.name}</h4>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-pink-50 text-[#D41367] shrink-0 border border-pink-100/80">
                      {srv.price}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{srv.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs sm:text-sm">
                  <span className="text-xs text-slate-500 font-normal">Scope: {srv.serviceArea}</span>
                  <button
                    onClick={() => handleDeleteService(srv.id)}
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
                      <p className="text-xs sm:text-sm text-slate-500 font-normal">Add product details, price, and thumbnail photo.</p>
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
                        placeholder="e.g. Executive Blazer Pin"
                        className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs sm:text-sm font-semibold text-slate-700">Unit Price</Label>
                      <Input
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="e.g. $15 per unit"
                        className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs sm:text-sm font-semibold text-slate-700">Tags (Comma Separated)</Label>
                    <Input
                      value={newProduct.tags}
                      onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
                      placeholder="e.g. Merchandise, Rotary, Popular"
                      className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs sm:text-sm font-semibold text-slate-700">Product Description</Label>
                    <textarea
                      rows={2}
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Key specifications, sizing, or product details..."
                      className="w-full text-xs sm:text-sm p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#D41367] focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  <ImageUploader
                    label="Upload Product Photo"
                    value={newProduct.imageUrl}
                    onChange={(url) => setNewProduct({ ...newProduct, imageUrl: url })}
                    heightClass="h-24"
                  />

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
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((prd) => (
              <div key={prd.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between group hover:border-pink-200 transition-all">
                <div className="relative w-full h-40 bg-slate-100">
                  <Image src={prd.imageUrl} alt={prd.name} fill unoptimized className="object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#D41367] font-semibold text-xs px-2.5 py-0.5 rounded-md shadow-xs border border-slate-100">
                    {prd.price}
                  </span>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{prd.name}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">{prd.description}</p>

                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {prd.tags.map((t, idx) => (
                        <span key={idx} className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => handleDeleteProduct(prd.id)}
                      className="text-red-500 hover:text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
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
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">Industry Sector / Category</Label>
              <Input
                value={businessInfo.category}
                onChange={(e) => setBusinessInfo({ ...businessInfo, category: e.target.value })}
                className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">Tagline / Slogan</Label>
              <Input
                value={businessInfo.tagline}
                onChange={(e) => setBusinessInfo({ ...businessInfo, tagline: e.target.value })}
                placeholder="e.g. Empowering Rotaract Brands with Next-Gen SaaS"
                className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">Year Established</Label>
              <Input
                type="number"
                value={businessInfo.yearEstablished}
                onChange={(e) => setBusinessInfo({ ...businessInfo, yearEstablished: Number(e.target.value) })}
                className="text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl h-9.5 focus:bg-white"
              />
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
