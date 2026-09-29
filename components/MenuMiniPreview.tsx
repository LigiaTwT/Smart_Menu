"use client";

import React from "react";
import { MenuProject, DEFAULT_TEMPLATES } from "@/components/MenuContext";

interface MenuMiniPreviewProps {
  project?: MenuProject;
  templateId?: string;
}

export function MenuMiniPreview({ project, templateId }: MenuMiniPreviewProps) {
  // Determine which project/design to use
  let name = "Menu";
  let logo = "";
  let design = { fontFamily: "inter", colorPreset: "teal-terracotta", layoutType: "list" };
  let categories: string[] = ["Entradas", "Pratos Principais", "Sobremesas"];
  let items: { title: string; price: number; category: string }[] = [
    { title: "Prato Especial", price: 29.90, category: "Pratos Principais" },
    { title: "Bebida Gelada", price: 8.50, category: "Entradas" },
  ];

  if (project) {
    name = project.restaurantInfo.name;
    logo = project.restaurantInfo.logo || "";
    design = project.design;
    categories = project.categories.map((c) => c.name);
    items = project.items.map((i) => ({ title: i.title, price: i.price, category: i.category }));
  } else if (templateId && DEFAULT_TEMPLATES[templateId]) {
    const tpl = DEFAULT_TEMPLATES[templateId];
    name = tpl.restaurantInfo.name;
    logo = tpl.restaurantInfo.logo || "";
    design = tpl.design;
    categories = tpl.categories.map((c) => c.name);
    items = tpl.items.map((i) => ({ title: i.title, price: i.price, category: i.category }));
  }

  // Fallbacks
  if (categories.length === 0) categories = ["Menu"];
  if (items.length === 0) items = [{ title: "Item Demo", price: 10.0, category: categories[0] }];

  // Color preset mapping
  const colorPresets = {
    "teal-terracotta": {
      bg: "bg-[#fafaf9]",
      textPrimary: "text-[#1a2d3e]",
      accent: "text-[#e87c3e]",
      accentBg: "bg-[#e87c3e]",
      accentText: "text-white",
      cardBg: "bg-white border-black/[0.03]",
      pillActive: "bg-[#e87c3e] text-white",
      pillInactive: "bg-[#f4ece3]/60 text-[#1a2d3e]/70"
    },
    "olive-cream": {
      bg: "bg-[#fafaf9]",
      textPrimary: "text-[#2e3b30]",
      accent: "text-[#6e8574]",
      accentBg: "bg-[#6e8574]",
      accentText: "text-white",
      cardBg: "bg-white border-black/[0.03]",
      pillActive: "bg-[#6e8574] text-white",
      pillInactive: "bg-[#f4ece3]/60 text-[#2e3b30]/70"
    },
    "charcoal-gold": {
      bg: "bg-[#111111]",
      textPrimary: "text-white/95",
      accent: "text-[#d4af37]",
      accentBg: "bg-[#d4af37]",
      accentText: "text-black",
      cardBg: "bg-[#1a1a1a] border-white/5",
      pillActive: "bg-[#d4af37] text-black",
      pillInactive: "bg-white/5 text-white/70"
    },
    "sunset-rose": {
      bg: "bg-[#fdf8f5]",
      textPrimary: "text-[#4a1c1c]",
      accent: "text-[#c86b6b]",
      accentBg: "bg-[#c86b6b]",
      accentText: "text-white",
      cardBg: "bg-white border-black/[0.03]",
      pillActive: "bg-[#c86b6b] text-white",
      pillInactive: "bg-[#fdf8f5]/80 text-[#4a1c1c]/70"
    }
  };

  const fontsMapping = {
    inter: "font-sans",
    serif: "font-serif",
    bebas: "font-bebas"
  };

  const colors = colorPresets[design.colorPreset as keyof typeof colorPresets] || colorPresets["teal-terracotta"];
  const fontClass = fontsMapping[design.fontFamily as keyof typeof fontsMapping] || "font-sans";

  return (
    <div className="w-full h-44 bg-neutral-100/60 flex items-start justify-center relative group-hover:bg-neutral-200/50 transition-colors duration-300 overflow-hidden select-none border-b border-border/5">
      {/* Smartphone frame container */}
      <div className="w-[230px] h-[320px] rounded-[30px] bg-zinc-950 border-[6px] border-zinc-950 shadow-lg overflow-hidden relative flex flex-col mt-2 transform origin-top transition-all duration-300 group-hover:scale-[1.02] group-hover:translate-y-[-4px]">
        
        {/* Notch */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-18 h-2.5 rounded-full bg-black z-30 flex items-center justify-center">
          <div className="h-[2px] w-5 rounded-full bg-white/20" />
        </div>

        {/* Screen Content */}
        <div className={`w-full h-full overflow-y-auto pt-6 px-3.5 pb-6 flex flex-col scrollbar-hide text-left leading-normal ${colors.bg} ${colors.textPrimary}`}>
          
          {/* Logo / Header */}
          <div className="text-center mb-2.5 mt-0.5 flex flex-col items-center">
            {logo ? (
              <div className="relative w-8 h-8 rounded-full overflow-hidden mb-1 border border-black/5">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[9px] mb-1 ${colors.accentBg} ${colors.accentText}`}>
                {name.substring(0, 2).toUpperCase()}
              </div>
            )}
            <h1 className={`text-[11px] font-bold tracking-tight truncate max-w-full ${fontClass}`}>
              {name}
            </h1>
            <div className="h-[1.5px] w-6 bg-current opacity-20 mt-1 rounded" />
          </div>

          {/* Categories Horizontal scrollbar */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5 mb-2.5">
            {categories.slice(0, 3).map((cat, i) => (
              <span
                key={i}
                className={`text-[7px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                  i === 0 ? colors.pillActive : colors.pillInactive
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Dishes List */}
          <div className="space-y-2 flex-1">
            {/* Category title */}
            <div className={`text-[8px] font-bold uppercase tracking-wider pb-0.5 border-b border-dashed border-current/10 ${colors.accent}`}>
              {categories[0]}
            </div>

            {/* Dishes list */}
            <div className={design.layoutType === "grid" ? "grid grid-cols-2 gap-1.5" : "space-y-1.5"}>
              {items.slice(0, design.layoutType === "grid" ? 4 : 2).map((item, idx) => (
                <div key={idx} className={`p-2 rounded-[8px] border flex flex-col justify-between ${colors.cardBg}`}>
                  <div className="min-w-0">
                    <h4 className={`text-[8.5px] font-bold truncate leading-snug ${fontClass}`}>{item.title}</h4>
                    <p className="text-[6.5px] opacity-60 line-clamp-1 mt-0.5 leading-none">
                      Delicioso prato preparado na hora
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-1.5 pt-1 border-t border-black/[0.03]">
                    <span className={`text-[7.5px] font-bold ${colors.accent}`}>R$ {item.price.toFixed(1)}</span>
                    <span className={`w-3.5 h-3.5 rounded-full ${colors.accentBg} ${colors.accentText} flex items-center justify-center text-[6px] font-bold`}>+</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
