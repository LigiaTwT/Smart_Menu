"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMenu, MenuItem, MenuCategory, MenuProject } from "@/components/MenuContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Smartphone,
  FileDown,
  Plus,
  Trash2,
  Check,
  Eye,
  Sliders,
  ChevronDown,
  Type,
  Palette,
  Layout,
  Globe,
  DollarSign,
  Info,
  BadgeAlert,
  Save,
  Undo,
  Copy,
  Upload,
  Pencil
} from "lucide-react";

export default function Editar() {
  const router = useRouter();
  const { activeProject, setActiveProject, updateProject, projects } = useMenu();

  // If no active project, select the first one, or redirect to /casa
  useEffect(() => {
    if (!activeProject) {
      if (projects.length > 0) {
        setActiveProject(projects[0]);
      } else {
        router.push("/casa");
      }
    }
  }, [activeProject, projects, router, setActiveProject]);

  // Tab State
  const [activeControlTab, setActiveControlTab] = useState<"info" | "itens" | "design" | "export">("info");
  
  // Preview Mode
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "print">("mobile");

  // Form Local State Syncs
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // New Item Temporary State
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [newItemBadge, setNewItemBadge] = useState("");
  const [newItemImage, setNewItemImage] = useState("");

  // New Category State
  const [newCatName, setNewCatName] = useState("");

  if (!activeProject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
        <div className="text-center">
          <div className="h-10 w-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-primary/60 font-semibold">Carregando editor...</p>
        </div>
      </div>
    );
  }

  // Update Helper
  const handleUpdateInfo = (key: string, value: any) => {
    updateProject(activeProject.id, {
      restaurantInfo: {
        ...activeProject.restaurantInfo,
        [key]: value
      }
    });
  };

  // Update Design Helper
  const handleUpdateDesign = (key: string, value: any) => {
    updateProject(activeProject.id, {
      design: {
        ...activeProject.design,
        [key]: value
      }
    });
  };

  // Add Category
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    const newCat: MenuCategory = {
      id: `cat-${Date.now()}`,
      name: newCatName
    };
    updateProject(activeProject.id, {
      categories: [...activeProject.categories, newCat]
    });
    setNewCatName("");
  };

  // Remove Category
  const handleRemoveCategory = (catName: string) => {
    const updatedCats = activeProject.categories.filter((c) => c.name !== catName);
    const updatedItems = activeProject.items.filter((i) => i.category !== catName);
    updateProject(activeProject.id, {
      categories: updatedCats,
      items: updatedItems
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItemImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Start editing item
  const handleStartEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setNewItemTitle(item.title);
    setNewItemPrice(item.price.toString());
    setNewItemDesc(item.description || "");
    setNewItemCategory(item.category);
    setNewItemBadge(item.badge || "");
    setNewItemImage(item.image || "");
  };

  // Cancel editing item
  const handleCancelEditItem = () => {
    setEditingItem(null);
    setNewItemTitle("");
    setNewItemPrice("");
    setNewItemDesc("");
    setNewItemCategory("");
    setNewItemBadge("");
    setNewItemImage("");
  };

  // Add or Edit Item
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle || !newItemPrice || !newItemCategory) return;
    
    if (editingItem) {
      // Edit Mode
      const updatedItems = activeProject.items.map((item) => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            title: newItemTitle,
            price: parseFloat(newItemPrice),
            description: newItemDesc,
            category: newItemCategory,
            badge: newItemBadge || undefined,
            image: newItemImage || undefined
          };
        }
        return item;
      });

      updateProject(activeProject.id, {
        items: updatedItems
      });

      setEditingItem(null);
    } else {
      // Add Mode
      const newItem: MenuItem = {
        id: `item-${Date.now()}`,
        title: newItemTitle,
        price: parseFloat(newItemPrice),
        description: newItemDesc,
        category: newItemCategory,
        badge: newItemBadge || undefined,
        image: newItemImage || [
          "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop"
        ][Math.floor(Math.random() * 4)]
      };

      updateProject(activeProject.id, {
        items: [...activeProject.items, newItem]
      });
    }

    // Reset Form
    setNewItemTitle("");
    setNewItemPrice("");
    setNewItemDesc("");
    setNewItemBadge("");
    setNewItemImage("");
  };

  // Remove Item
  const handleRemoveItem = (itemId: string) => {
    const updatedItems = activeProject.items.filter((i) => i.id !== itemId);
    updateProject(activeProject.id, {
      items: updatedItems
    });
    if (editingItem && editingItem.id === itemId) {
      handleCancelEditItem();
    }
  };

  // Trigger browser print
  const handlePrint = () => {
    if (previewDevice !== "print") {
      setPreviewDevice("print");
      setTimeout(() => {
        window.print();
      }, 150);
    } else {
      window.print();
    }
  };

  // Design mapping helper values
  const colorPresets = {
    "teal-terracotta": {
      bg: "bg-[#fafaf9]",
      textPrimary: "text-[#1a2d3e]",
      accent: "text-[#e87c3e]",
      border: "border-[#e87c3e]/20",
      accentBg: "bg-[#e87c3e]",
      accentText: "text-white",
      badgeBg: "bg-[#e87c3e]/10 text-[#e87c3e]",
      accentBorder: "border-[#e87c3e]"
    },
    "olive-cream": {
      bg: "bg-[#fafaf9]",
      textPrimary: "text-[#2e3b30]",
      accent: "text-[#6e8574]",
      border: "border-[#6e8574]/20",
      accentBg: "bg-[#6e8574]",
      accentText: "text-white",
      badgeBg: "bg-[#6e8574]/10 text-[#6e8574]",
      accentBorder: "border-[#6e8574]"
    },
    "charcoal-gold": {
      bg: "bg-[#111111]",
      textPrimary: "text-white",
      accent: "text-[#d4af37]",
      border: "border-[#d4af37]/20",
      accentBg: "bg-[#d4af37]",
      accentText: "text-black",
      badgeBg: "bg-[#d4af37]/10 text-[#d4af37]",
      accentBorder: "border-[#d4af37]"
    },
    "sunset-rose": {
      bg: "bg-[#fdf8f5]",
      textPrimary: "text-[#4a1c1c]",
      accent: "text-[#c86b6b]",
      border: "border-[#c86b6b]/20",
      accentBg: "bg-[#c86b6b]",
      accentText: "text-white",
      badgeBg: "bg-[#c86b6b]/10 text-[#c86b6b]",
      accentBorder: "border-[#c86b6b]"
    }
  };

  const fontsMapping = {
    inter: "font-sans",
    serif: "font-serif",
    bebas: "font-bebas"
  };

  const styleColors = colorPresets[activeProject.design.colorPreset] || colorPresets["teal-terracotta"];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      
      {/* Dynamic inline stylesheet for print overriding */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body, html, main, #root {
            background: transparent !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            overflow: hidden !important;
          }
          aside, header, nav, button, .no-print {
            display: none !important;
          }
          .print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 20mm !important;
            box-sizing: border-box !important;
            transform: none !important;
          }
          .print-area .absolute.inset-4 {
            top: 10mm !important;
            left: 10mm !important;
            right: 10mm !important;
            bottom: 10mm !important;
          }
        }
      `}} />

      {/* 1. Header (No Print) */}
      <header className="h-20 bg-primary text-white px-8 flex items-center justify-between no-print relative z-20 shadow-md">
        <div className="flex items-center gap-3">
          <Link href="/casa">
            <button className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all">
              <ArrowLeft size={18} />
            </button>
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-white/50 tracking-wider font-mono">Editando Cardápio</span>
            <input
              type="text"
              value={activeProject.name}
              onChange={(e) => updateProject(activeProject.id, { name: e.target.value })}
              className="bg-transparent border-0 outline-none text-sm font-bold text-white focus:bg-white/5 px-2 py-0.5 rounded w-52 placeholder:text-white/40"
            />
          </div>
        </div>

        {/* Live Auto-saving indicator */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Salvo no navegador
          </span>

          <div className="flex gap-2">
            <Button
              onClick={() => updateProject(activeProject.id, { status: activeProject.status === "publicado" ? "rascunho" : "publicado" })}
              className={`rounded-lg text-xs font-bold px-4 py-2 border-0 ${
                activeProject.status === "publicado" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-accent hover:bg-accent/90 text-white"
              }`}
            >
              {activeProject.status === "publicado" ? "Publicado" : "Publicar"}
            </Button>
          </div>
        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT CONTROLS PANEL (No Print) */}
        <aside className="w-[420px] bg-card text-foreground border-r border-border/10 flex flex-col justify-between no-print relative z-10 shadow-lg transition-colors duration-300">
          
          {/* Tabs header */}
          <div className="grid grid-cols-4 border-b border-border/10">
            {[
              { id: "info", label: "Dados", icon: <Info size={14} /> },
              { id: "itens", label: "Pratos", icon: <Plus size={14} /> },
              { id: "design", label: "Design", icon: <Sliders size={14} /> },
              { id: "export", label: "Exportar", icon: <FileDown size={14} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveControlTab(tab.id as any)}
                className={`py-4 flex flex-col items-center justify-center gap-1.5 text-[10px] uppercase font-bold tracking-wider border-b-2 transition-all cursor-pointer ${
                  activeControlTab === tab.id
                    ? "border-accent text-accent bg-accent/5"
                    : "border-transparent text-foreground/50 hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form scroll container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* ABA 1: INFO RESTAURANTE */}
            {activeControlTab === "info" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent pb-2 border-b border-border/5">
                  <Sparkles size={16} />
                  <h3 className="font-serif text-base font-bold text-foreground">Branding & Contatos</h3>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/75">Nome Comercial</label>
                  <input
                    type="text"
                    value={activeProject.restaurantInfo.name}
                    onChange={(e) => handleUpdateInfo("name", e.target.value)}
                    className="w-full bg-[#f4ece3]/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-xs font-medium text-foreground outline-none focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">WhatsApp / Fone</label>
                    <input
                      type="text"
                      value={activeProject.restaurantInfo.phone}
                      onChange={(e) => handleUpdateInfo("phone", e.target.value)}
                      className="w-full bg-[#f4ece3]/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-xs font-medium text-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">Instagram Link</label>
                    <input
                      type="text"
                      value={activeProject.restaurantInfo.instagram}
                      onChange={(e) => handleUpdateInfo("instagram", e.target.value)}
                      className="w-full bg-[#f4ece3]/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-xs font-medium text-foreground outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/75">Endereço do Local</label>
                  <input
                    type="text"
                    value={activeProject.restaurantInfo.address}
                    onChange={(e) => handleUpdateInfo("address", e.target.value)}
                    className="w-full bg-[#f4ece3]/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-xs font-medium text-foreground outline-none focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/75">Horário</label>
                  <input
                    type="text"
                    value={activeProject.restaurantInfo.hours}
                    onChange={(e) => handleUpdateInfo("hours", e.target.value)}
                    className="w-full bg-[#f4ece3]/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-xs font-medium text-foreground outline-none focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/75">Descrição Curta</label>
                  <textarea
                    rows={3}
                    value={activeProject.restaurantInfo.description}
                    onChange={(e) => handleUpdateInfo("description", e.target.value)}
                    className="w-full bg-[#f4ece3]/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-xs font-medium text-foreground outline-none focus:border-accent font-sans"
                  />
                </div>
              </div>
            )}

            {/* ABA 2: CATEGORIAS & ITENS */}
            {activeControlTab === "itens" && (
              <div className="space-y-6">
                
                {/* 1. Add Category Form */}
                <div className="bg-[#f4ece3]/30 dark:bg-muted/20 rounded-2xl p-4 border border-border/5 text-left transition-colors duration-300">
                  <h4 className="text-xs font-bold text-foreground/80 uppercase tracking-wider mb-3">Nova Categoria</h4>
                  <form onSubmit={handleAddCategory} className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      placeholder="Ex: Entradas, Hambúrgueres"
                      className="flex-1 bg-muted/30 focus:bg-card border border-border/15 rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-accent"
                    />
                    <Button type="submit" className="rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-xs border-0 px-3 py-2 flex items-center justify-center cursor-pointer">
                      <Plus size={14} />
                    </Button>
                  </form>
                </div>

                {/* 2. Add Dishes Form */}
                <div className="bg-[#f4ece3]/30 dark:bg-muted/20 rounded-2xl p-4 border border-border/5 text-left transition-colors duration-300">
                  <h4 className="text-xs font-bold text-foreground/80 uppercase tracking-wider mb-3">
                    {editingItem ? `Editar Prato: ${editingItem.title}` : "Adicionar Novo Prato"}
                  </h4>
                  {activeProject.categories.length === 0 ? (
                    <p className="text-[10px] text-red-500 font-semibold">Crie uma categoria acima primeiro!</p>
                  ) : (
                    <form onSubmit={handleAddItem} className="space-y-3">
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2">
                          <input
                            type="text"
                            required
                            value={newItemTitle}
                            onChange={(e) => setNewItemTitle(e.target.value)}
                            placeholder="Nome do prato"
                            className="w-full bg-muted/30 focus:bg-card border border-border/15 rounded-xl px-3 py-2.5 text-xs font-medium text-foreground outline-none focus:border-accent"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            step="0.01"
                            required
                            value={newItemPrice}
                            onChange={(e) => setNewItemPrice(e.target.value)}
                            placeholder="Preço (R$)"
                            className="w-full bg-muted/30 focus:bg-card border border-border/15 rounded-xl px-3 py-2.5 text-xs font-medium text-foreground outline-none focus:border-accent font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <select
                            required
                            value={newItemCategory}
                            onChange={(e) => setNewItemCategory(e.target.value)}
                            className="w-full bg-muted/30 focus:bg-card border border-border/15 rounded-xl px-3 py-2.5 text-xs font-medium text-foreground outline-none focus:border-accent"
                          >
                            <option value="">Categoria...</option>
                            {activeProject.categories.map((c) => (
                              <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <select
                            value={newItemBadge}
                            onChange={(e) => setNewItemBadge(e.target.value)}
                            className="w-full bg-muted/30 focus:bg-card border border-border/15 rounded-xl px-3 py-2.5 text-xs font-medium text-foreground outline-none focus:border-accent"
                          >
                            <option value="">Selo Destaque...</option>
                            <option value="Mais Vendido">Mais Vendido</option>
                            <option value="Vegano">Vegano</option>
                            <option value="Picante">Picante</option>
                            <option value="Chef's Choice">Chef's Choice</option>
                            <option value="Artesanal">Artesanal</option>
                          </select>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={newItemDesc}
                        onChange={(e) => setNewItemDesc(e.target.value)}
                        placeholder="Ingredientes e descrição"
                        className="w-full bg-muted/30 focus:bg-card border border-border/15 rounded-xl px-3 py-2.5 text-xs font-medium text-foreground outline-none focus:border-accent"
                      />

                      {/* Upload de Imagem do Prato */}
                      <div className="flex flex-col gap-1.5 text-left font-sans">
                        <label className="text-[10px] font-semibold text-foreground/75">Foto do Prato</label>
                        
                        {!newItemImage ? (
                          <div className="relative border-2 border-dashed border-border/15 bg-muted/20 hover:bg-muted/40 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            <Upload size={18} className="text-accent mb-1.5" />
                            <span className="text-[10px] text-foreground font-bold">Escolher Foto da Galeria</span>
                            <span className="text-[8px] text-foreground/45 mt-0.5">PNG, JPG ou WEBP</span>
                          </div>
                        ) : (
                          <div className="border border-border/10 bg-muted/30 rounded-xl p-2.5 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="relative h-10 w-10 rounded-lg overflow-hidden border border-border/5 flex-shrink-0">
                                <img
                                  src={newItemImage}
                                  alt="Foto selecionada"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="text-[10px] font-bold text-foreground truncate">Imagem Carregada</div>
                                <div className="text-[8px] text-emerald-500 font-semibold flex items-center gap-0.5">
                                  Pronto para inserir
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setNewItemImage("")}
                              className="text-[9px] font-bold text-red-500 hover:underline px-2 cursor-pointer"
                            >
                              Remover
                            </button>
                          </div>
                        )}
                        
                        {/* Quick Examples selector (for convenience) */}
                        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5">
                          <span className="text-[9px] text-foreground/40 font-semibold whitespace-nowrap">Galeria Demo:</span>
                          {[
                            { id: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop", label: "Burguer" },
                            { id: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop", label: "Pizza" },
                            { id: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop", label: "Doce" },
                            { id: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop", label: "Sushi" }
                          ].map((img) => (
                            <button
                              key={img.id}
                              type="button"
                              onClick={() => setNewItemImage(img.id)}
                              className={`px-2 py-0.5 rounded text-[8px] uppercase font-bold border transition-all cursor-pointer ${
                                newItemImage === img.id
                                  ? "border-accent bg-accent/5 text-accent"
                                  : "border-border/15 bg-card text-foreground/50"
                              }`}
                            >
                              {img.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-xs py-3 border-0 cursor-pointer">
                          {editingItem ? "Salvar Alterações" : "Inserir Prato no Cardápio"}
                        </Button>
                        {editingItem && (
                          <Button
                            type="button"
                            onClick={handleCancelEditItem}
                            className="rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-xs py-3 px-4 border border-border/10 cursor-pointer"
                          >
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </form>
                  )}
                </div>

                {/* 3. Items list accordion */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Itens Cadastrados</h4>
                  
                  {activeProject.categories.map((cat) => {
                    const catItems = activeProject.items.filter((i) => i.category === cat.name);
                    const isExpanded = expandedCategory === cat.id;
                    
                    return (
                      <div key={cat.id} className="border border-border/10 rounded-xl overflow-hidden">
                        {/* Accordion header */}
                        <div
                          onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                          className="bg-muted/40 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-muted transition-colors"
                        >
                          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                            {cat.name}
                            <span className="bg-accent/15 text-accent text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                              {catItems.length}
                            </span>
                          </span>
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleRemoveCategory(cat.name)}
                              className="text-foreground/30 hover:text-red-500 transition-colors p-1 cursor-pointer"
                              title="Excluir Categoria"
                            >
                              <Trash2 size={12} />
                            </button>
                            <ChevronDown size={14} className={`text-foreground/45 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          </div>
                        </div>

                        {/* Accordion body */}
                        {isExpanded && (
                          <div className="bg-card p-3 space-y-2 border-t border-border/5">
                            {catItems.length === 0 ? (
                              <p className="text-[10px] text-foreground/40 italic p-2 text-center">Nenhum prato cadastrado.</p>
                            ) : (
                              catItems.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border-b border-border/5 pb-2 last:border-0 last:pb-0 text-xs">
                                  <div className="min-w-0 pr-4">
                                    <div className="font-bold text-foreground flex items-center gap-1">
                                      {item.title}
                                      {item.badge && <span className="bg-accent/10 text-accent text-[8px] px-1.5 py-0.2 rounded font-bold">{item.badge}</span>}
                                    </div>
                                    <div className="text-[10px] text-accent font-mono mt-0.5">R$ {item.price.toFixed(2)}</div>
                                  </div>
                                  <div className="flex items-center gap-1.5 flex-shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => handleStartEditItem(item)}
                                      className="text-foreground/30 hover:text-accent p-1 transition-colors cursor-pointer"
                                      title="Editar Prato"
                                    >
                                      <Pencil size={12} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveItem(item.id)}
                                      className="text-foreground/30 hover:text-red-500 p-1 transition-colors cursor-pointer"
                                      title="Excluir Prato"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* ABA 3: DESIGN & ESTILOS */}
            {activeControlTab === "design" && (
              <div className="space-y-6 text-left">
                
                {/* Templates Selector */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1">
                    <Layout size={14} /> Temas de Layout
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "premium", label: "Editorial Premium" },
                      { id: "minimalista", label: "Modern Minimalist" },
                      { id: "rustico", label: "Rústico / Orgânico" },
                      { id: "dark", label: "Tokyo Dark Lounge" },
                      { id: "retro", label: "Artisan Retro" },
                      { id: "moderno", label: "SaaS Modern Clean" }
                    ].map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => handleUpdateDesign("template", tpl.id)}
                        className={`p-3 text-left border rounded-xl transition-all cursor-pointer ${
                          activeProject.design.template === tpl.id
                            ? "border-accent bg-accent/5 text-accent font-bold"
                            : "border-border/15 bg-card text-foreground/75 hover:border-accent/40"
                        }`}
                      >
                        <span className="text-[10px] tracking-wide block">{tpl.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color presets Selector */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1">
                    <Palette size={14} /> Paletas Gastronômicas
                  </h4>
                  <div className="space-y-2">
                    {[
                      { id: "teal-terracotta", label: "Azul Petróleo & Terracota", preview: "bg-[#1a2d3e] border-[#e87c3e]" },
                      { id: "olive-cream", label: "Creme Quente & Oliva Suave", preview: "bg-[#6e8574] border-[#fafaf9]" },
                      { id: "charcoal-gold", label: "Carvão Metálico & Ouro", preview: "bg-[#111111] border-[#d4af37]" },
                      { id: "sunset-rose", label: "Terracota Rose & Sunset", preview: "bg-[#c86b6b] border-[#fdf8f5]" }
                    ].map((palette) => (
                      <button
                        key={palette.id}
                        onClick={() => handleUpdateDesign("colorPreset", palette.id)}
                        className={`w-full flex items-center justify-between p-3 border rounded-xl transition-all cursor-pointer ${
                          activeProject.design.colorPreset === palette.id
                            ? "border-accent bg-accent/5 font-bold"
                            : "border-border/15 bg-card hover:border-accent/40"
                        }`}
                      >
                        <span className="text-xs text-foreground">{palette.label}</span>
                        <div className={`h-4 w-10 rounded border ${palette.preview}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fonts choices */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1">
                    <Type size={14} /> Fontes Tipográficas
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "serif", label: "Serif (DM Display)", preview: "font-serif" },
                      { id: "inter", label: "Sans (Inter UI)", preview: "font-sans" },
                      { id: "bebas", label: "Retro (Bebas)", preview: "font-bebas" }
                    ].map((font) => (
                      <button
                        key={font.id}
                        onClick={() => handleUpdateDesign("fontFamily", font.id)}
                        className={`p-3 text-center border rounded-xl transition-all cursor-pointer ${
                          activeProject.design.fontFamily === font.id
                            ? "border-accent bg-accent/5 text-accent font-bold"
                            : "border-border/15 bg-card text-foreground/60 hover:border-accent/40"
                        }`}
                      >
                        <span className={`text-base block mb-0.5 ${font.preview}`}>Aa</span>
                        <span className="text-[9px] uppercase tracking-wider block font-sans">{font.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Size slider */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Tamanho da Fonte</h4>
                  <div className="flex gap-2">
                    {["sm", "md", "lg"].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleUpdateDesign("fontSize", size)}
                        className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                          activeProject.design.fontSize === size
                            ? "border-accent bg-accent/5 text-accent"
                            : "border-border/15 bg-card text-foreground/50"
                        }`}
                      >
                        {size === "sm" ? "Pequena" : size === "md" ? "Média" : "Grande"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid Layout settings */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Layout do Grid</h4>
                  <div className="flex gap-2">
                    {[
                      { id: "single", label: "Coluna Única" },
                      { id: "grid", label: "Grade Dupla" }
                    ].map((layout) => (
                      <button
                        key={layout.id}
                        onClick={() => handleUpdateDesign("layoutType", layout.id)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          activeProject.design.layoutType === layout.id
                            ? "border-accent bg-accent/5 text-accent"
                            : "border-border/15 bg-card text-foreground/50"
                        }`}
                      >
                        {layout.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ABA 4: EXPORTAR */}
            {activeControlTab === "export" && (
              <div className="space-y-6 text-left">
                
                {/* 1. PDF PRINT */}
                <div className="bg-[#f4ece3]/40 dark:bg-muted/20 rounded-2xl p-5 border border-border/10 transition-colors duration-300">
                  <FileDown className="text-accent mb-3" size={24} />
                  <h4 className="font-serif text-sm font-bold text-foreground mb-2">Exportar PDF Impresso</h4>
                  <p className="text-xs text-foreground/60 leading-relaxed mb-4">
                    Imprima diretamente ou salve como PDF. O Smart Menu formata as quebras de páginas, alinhamentos e fundos automaticamente para uma impressão física em alta qualidade.
                  </p>
                  <Button
                    onClick={handlePrint}
                    className="w-full rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-xs py-5 border-0 shadow shadow-accent/20 cursor-pointer"
                  >
                    Imprimir / Exportar PDF
                  </Button>
                </div>

                {/* 2. QR Code Share */}
                <div className="bg-card border border-border/10 rounded-2xl p-5 text-center flex flex-col items-center transition-colors duration-300">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/cardapio/${activeProject.id}`}
                    alt="QR Code"
                    className="w-28 h-28 mb-3 bg-[#fafaf9] dark:bg-white p-2 border border-border/5 rounded-xl object-contain"
                  />
                  <h4 className="font-serif text-sm font-bold text-foreground mb-1">QR Code da Mesa</h4>
                  <p className="text-[10px] text-foreground/50 leading-relaxed max-w-xs mb-4">
                    Os clientes escaneiam este código com a câmera do celular para abrir o cardápio interativo online.
                  </p>
                  
                  {/* Public Link Copy link */}
                  <div className="w-full flex items-center bg-[#f4ece3]/30 dark:bg-muted/30 border border-border/10 rounded-xl p-2.5 text-xs text-foreground/75">
                    <span className="truncate flex-1 font-mono text-[9px] pr-2">http://localhost:3000/cardapio/{activeProject.id}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`http://localhost:3000/cardapio/${activeProject.id}`);
                        alert("Link público copiado com sucesso!");
                      }}
                      className="text-accent hover:underline font-semibold flex items-center gap-0.5 flex-shrink-0 cursor-pointer"
                    >
                      <Copy size={10} /> Copiar
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Quick Stats footer under editor */}
          <div className="p-4 bg-muted/40 border-t border-border/10 flex items-center justify-between text-[10px] font-semibold text-foreground/60 font-sans">
            <span>{activeProject.items.length} Pratos inseridos</span>
            <span className="uppercase text-[9px] font-bold text-accent bg-accent/5 px-2 py-0.5 rounded">
              {activeProject.design.template}
            </span>
          </div>

        </aside>

        {/* CENTER LIVE PREVIEW PANEL */}
        <main className="flex-1 bg-[#eae0d5] dark:bg-[#25211E] overflow-y-auto flex flex-col items-center p-8 no-scrollbar relative transition-colors duration-300">
          
          {/* Preview control headers */}
          <div className="w-full max-w-lg mb-6 flex justify-between items-center no-print">
            <span className="text-xs font-bold text-foreground/50 flex items-center gap-1 font-sans">
              <Eye size={12} /> Pré-visualização Dinâmica
            </span>
            
            {/* Toggle mobile / print A4 */}
            <div className="bg-white/80 dark:bg-card/80 backdrop-blur border border-border/10 rounded-xl p-1 flex gap-1 shadow-sm transition-colors duration-300">
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  previewDevice === "mobile" ? "bg-accent text-white shadow-sm" : "text-primary/70 hover:bg-muted"
                }`}
              >
                <Smartphone size={12} /> Celular
              </button>
              <button
                onClick={() => setPreviewDevice("print")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  previewDevice === "print" ? "bg-accent text-white shadow-sm" : "text-primary/70 hover:bg-muted"
                }`}
              >
                <FileDown size={12} /> Folha A4
              </button>
            </div>
          </div>

          {/* DYNAMIC CANVAS WRAPPER */}
          <div className="w-full flex justify-center items-start">
            
            <AnimatePresence mode="wait">
              {/* MOBILE DEVICE CONTAINER */}
              {previewDevice === "mobile" ? (
                <motion.div
                  key="preview-mobile"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-80 aspect-[9/19] rounded-[40px] bg-primary border-[12px] border-primary shadow-2xl overflow-hidden relative"
                >
                  {/* Smartphone dynamic notch */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-black z-30 flex items-center justify-center">
                    <div className="h-1 w-6 rounded-full bg-white/20" />
                  </div>
                  
                  {/* Mobile Screen Contents (Uses Selected design configurations) */}
                  <div className={`w-full h-full overflow-y-auto p-4 pt-10 flex flex-col font-sans transition-all duration-300 relative ${styleColors.bg} ${styleColors.textPrimary}`}>
                    
                    {/* Header */}
                    <div className="text-center mb-6">
                      {/* Simulated Logo icon */}
                      {activeProject.restaurantInfo.logo ? (
                        <div className="relative h-12 w-12 rounded-full overflow-hidden mx-auto mb-2 border border-border/5">
                          <img
                            src={activeProject.restaurantInfo.logo}
                            alt="Logo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2 ${styleColors.accentBg} ${styleColors.accentText}`}>
                          {activeProject.restaurantInfo.name.substring(0,2).toUpperCase()}
                        </div>
                      )}
                      <h2 className={`font-serif text-lg font-bold leading-tight ${fontsMapping[activeProject.design.fontFamily]}`}>
                        {activeProject.restaurantInfo.name}
                      </h2>
                      <p className="text-[9px] opacity-60 leading-snug mt-1 max-w-[80%] mx-auto font-sans">
                        {activeProject.restaurantInfo.description}
                      </p>
                    </div>

                    {/* Separator line */}
                    <div className={`border-b mb-6 ${styleColors.border}`} />

                    {/* Categories Listing */}
                    <div className="space-y-6 flex-1">
                      {activeProject.categories.map((cat) => {
                        const items = activeProject.items.filter((i) => i.category === cat.name);
                        if (items.length === 0) return null;

                        return (
                          <div key={cat.id} className="space-y-4">
                            {/* Category Title */}
                            <h3 className={`text-xs font-bebas uppercase tracking-widest pb-1 border-b border-dashed ${styleColors.accent} ${styleColors.border}`}>
                              {cat.name}
                            </h3>

                            {/* Dishes List */}
                            <div className={activeProject.design.layoutType === "grid" ? "grid grid-cols-2 gap-3" : "space-y-3"}>
                              {items.map((item) => (
                                <div key={item.id} className={`flex flex-col gap-1.5 justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 relative`}>
                                  
                                  {/* Item Badge */}
                                  {item.badge && (
                                    <span className={`absolute -top-1.5 left-2.5 text-[7px] font-bold uppercase px-1.5 py-0.2 rounded ${styleColors.accentBg} ${styleColors.accentText}`}>
                                      {item.badge}
                                    </span>
                                  )}

                                  {item.image && (
                                    <div className={`relative w-full rounded-lg overflow-hidden border border-white/5 ${
                                      activeProject.design.layoutType === "grid" ? "h-16" : "h-24"
                                    }`}>
                                      <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  )}

                                  <div className="text-left">
                                    <div className="flex justify-between items-baseline gap-2">
                                      <h4 className={`text-[10px] font-bold leading-snug truncate ${fontsMapping[activeProject.design.fontFamily]}`}>
                                        {item.title}
                                      </h4>
                                    </div>
                                    <p className="text-[8px] opacity-60 leading-tight mt-0.5">
                                      {item.description}
                                    </p>
                                  </div>
                                  
                                  <div className={`text-[10px] font-bebas text-right font-semibold ${styleColors.accent}`}>
                                    R$ {item.price.toFixed(2)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer Address */}
                    <div className="pt-6 mt-6 border-t border-dashed border-primary/10 text-center text-[7px] opacity-40 leading-snug">
                      <p>{activeProject.restaurantInfo.address}</p>
                      <p className="mt-0.5">{activeProject.restaurantInfo.hours}</p>
                    </div>

                  </div>
                </motion.div>
              ) : (
                /* PRINTABLE A4 PAGE CONTAINER */
                <motion.div
                  key="preview-print"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  id="print-menu-canvas"
                  className={`w-[595px] min-h-[842px] bg-white border border-border/10 shadow-2xl p-12 text-left transition-all duration-300 print-area relative ${styleColors.bg} ${styleColors.textPrimary}`}
                >
                  {/* Decorative background border */}
                  <div className={`absolute inset-4 border-2 pointer-events-none rounded ${styleColors.accentBorder}`} style={{ borderStyle: "double", borderWidth: "3px" }} />
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    
                    {/* Header */}
                    <div className="text-center mt-6 mb-10">
                      {activeProject.restaurantInfo.logo ? (
                        <div className="relative h-12 w-12 rounded-full overflow-hidden mx-auto mb-3 shadow-md border border-border/5">
                          <img
                            src={activeProject.restaurantInfo.logo}
                            alt="Logo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-base mx-auto mb-3 shadow-md ${styleColors.accentBg} ${styleColors.accentText}`}>
                          {activeProject.restaurantInfo.name.substring(0,2).toUpperCase()}
                        </div>
                      )}
                      <h1 className={`font-serif text-3xl font-bold tracking-wide ${fontsMapping[activeProject.design.fontFamily]} ${styleColors.textPrimary}`}>
                        {activeProject.restaurantInfo.name}
                      </h1>
                      <p className="text-xs opacity-70 italic max-w-md mx-auto mt-2 leading-relaxed">
                        {activeProject.restaurantInfo.description}
                      </p>
                      
                      <div className="flex justify-center items-center gap-4 text-[9px] opacity-50 mt-3 font-mono">
                        <span>WhatsApp: {activeProject.restaurantInfo.phone}</span>
                        <span>•</span>
                        <span>Insta: {activeProject.restaurantInfo.instagram}</span>
                      </div>
                    </div>

                    {/* Categories and Grid layout */}
                    <div className="space-y-8 flex-1">
                      {activeProject.categories.map((cat) => {
                        const items = activeProject.items.filter((i) => i.category === cat.name);
                        if (items.length === 0) return null;

                        return (
                          <div key={cat.id} className="space-y-4">
                            {/* Category Title */}
                            <h3 className={`font-bebas text-lg tracking-widest pb-1.5 border-b border-solid text-center ${styleColors.accent} ${styleColors.accentBorder}`} style={{ borderWidth: "1px" }}>
                              {cat.name}
                            </h3>

                            {/* Items container layout */}
                            <div className={activeProject.design.layoutType === "grid" ? "grid grid-cols-2 gap-x-8 gap-y-4" : "space-y-4"}>
                              {items.map((item) => (
                                <div key={item.id} className="group relative flex flex-col justify-between">
                                  <div>
                                    {item.image && (
                                      <div className={`relative w-full rounded-lg overflow-hidden mb-2 border border-border/10 ${
                                        activeProject.design.layoutType === "grid" ? "h-24" : "h-32"
                                      }`}>
                                        <img
                                          src={item.image}
                                          alt={item.title}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    )}

                                    <div className="flex justify-between items-baseline gap-4 mb-0.5">
                                      <h4 className={`text-sm font-bold flex items-center gap-1.5 leading-snug ${fontsMapping[activeProject.design.fontFamily]}`}>
                                        {item.title}
                                        {item.badge && (
                                          <span className="bg-[#e87c3e]/10 text-[#e87c3e] text-[8px] px-1.5 py-0.2 rounded font-bold">
                                            {item.badge}
                                          </span>
                                        )}
                                      </h4>
                                      <span className={`font-bebas text-sm font-bold ${styleColors.accent}`}>
                                        {item.price.toFixed(2)}
                                      </span>
                                    </div>
                                    <p className="text-xs opacity-60 leading-relaxed pr-8">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* A4 Page Footer */}
                    <div className="pt-8 mt-12 border-t border-border/10 flex justify-between items-center text-[9px] opacity-40 font-mono">
                      <span>{activeProject.restaurantInfo.address}</span>
                      <span>{activeProject.restaurantInfo.hours}</span>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </main>

      </div>

    </div>
  );
}
