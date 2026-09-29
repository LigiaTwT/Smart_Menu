"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMenu, MenuProject, DEFAULT_TEMPLATES } from "@/components/MenuContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Phone,
  MapPin,
  Clock,
  Instagram,
  ShoppingCart,
  Check,
  Plus,
  Minus,
  Sparkles,
  ChevronLeft
} from "lucide-react";

export default function CardapioPublico() {
  const params = useParams();
  const router = useRouter();
  const { projects } = useMenu();
  const [project, setProject] = useState<MenuProject | null>(null);
  
  // Shopping Cart Mock
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [cartOpen, setCartOpen] = useState(false);

  const id = params?.id as string;

  useEffect(() => {
    if (projects.length > 0) {
      const found = projects.find((p) => p.id === id);
      if (found) {
        setProject(found);
      } else {
        // Se for uma demonstração ou não encontrado, carregar cafeteria
        // para garantir que a tela nunca quebre e sempre mostre algo lindo
        setProject({
          id: "demo",
          name: "Demonstração Grão & Prosa",
          restaurantInfo: DEFAULT_TEMPLATES.cafeteria.restaurantInfo,
          categories: DEFAULT_TEMPLATES.cafeteria.categories,
          items: DEFAULT_TEMPLATES.cafeteria.items,
          design: DEFAULT_TEMPLATES.cafeteria.design,
          status: "publicado",
          createdAt: new Date().toLocaleDateString("pt-BR"),
          viewsCount: 100,
        });
      }
    }
  }, [id, projects]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
        <div className="text-center">
          <div className="h-10 w-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-primary/60 font-semibold font-sans">Carregando cardápio digital...</p>
        </div>
      </div>
    );
  }

  // Design helpers
  const colorPresets = {
    "teal-terracotta": {
      bg: "bg-[#fafaf9]",
      textPrimary: "text-[#1a2d3e]",
      accent: "text-[#e87c3e]",
      border: "border-[#e87c3e]/20",
      accentBg: "bg-[#e87c3e]",
      accentText: "text-white",
      badgeBg: "bg-[#e87c3e]/10 text-[#e87c3e]",
      cardBg: "bg-white border-border/10",
      pillActive: "bg-[#e87c3e] text-white",
      pillInactive: "bg-[#f4ece3]/40 text-[#1a2d3e]/70"
    },
    "olive-cream": {
      bg: "bg-[#fafaf9]",
      textPrimary: "text-[#2e3b30]",
      accent: "text-[#6e8574]",
      border: "border-[#6e8574]/20",
      accentBg: "bg-[#6e8574]",
      accentText: "text-white",
      badgeBg: "bg-[#6e8574]/10 text-[#6e8574]",
      cardBg: "bg-white border-border/10",
      pillActive: "bg-[#6e8574] text-white",
      pillInactive: "bg-[#f4ece3]/40 text-[#2e3b30]/70"
    },
    "charcoal-gold": {
      bg: "bg-[#111111]",
      textPrimary: "text-white",
      accent: "text-[#d4af37]",
      border: "border-[#d4af37]/20",
      accentBg: "bg-[#d4af37]",
      accentText: "text-black",
      badgeBg: "bg-[#d4af37]/10 text-[#d4af37]",
      cardBg: "bg-[#1a1a1a] border-white/5",
      pillActive: "bg-[#d4af37] text-black",
      pillInactive: "bg-white/5 text-white/70"
    },
    "sunset-rose": {
      bg: "bg-[#fdf8f5]",
      textPrimary: "text-[#4a1c1c]",
      accent: "text-[#c86b6b]",
      border: "border-[#c86b6b]/20",
      accentBg: "bg-[#c86b6b]",
      accentText: "text-white",
      badgeBg: "bg-[#c86b6b]/10 text-[#c86b6b]",
      cardBg: "bg-white border-border/10",
      pillActive: "bg-[#c86b6b] text-white",
      pillInactive: "bg-[#fdf8f5]/80 text-[#4a1c1c]/70"
    }
  };

  const fontsMapping = {
    inter: "font-sans",
    serif: "font-serif",
    bebas: "font-bebas"
  };

  const styleColors = colorPresets[project.design.colorPreset] || colorPresets["teal-terracotta"];

  // Cart operations
  const addToCart = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[itemId] > 1) {
        copy[itemId] -= 1;
      } else {
        delete copy[itemId];
      }
      return copy;
    });
  };

  const totalCartItems = Object.values(cart).reduce((sum, val) => sum + val, 0);
  const totalCartPrice = Object.entries(cart).reduce((sum, [itemId, qty]) => {
    const item = project.items.find((i) => i.id === itemId);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const getWhatsAppMessage = () => {
    let msg = `Olá! Gostaria de fazer um pedido em *${project.restaurantInfo.name}*:\n\n`;
    Object.entries(cart).forEach(([itemId, qty]) => {
      const item = project.items.find((i) => i.id === itemId);
      if (item) {
        msg += `• ${qty}x *${item.title}* - R$ ${(item.price * qty).toFixed(2)}\n`;
      }
    });
    msg += `\n*Total:* R$ ${totalCartPrice.toFixed(2)}`;
    return `https://api.whatsapp.com/send?phone=55${project.restaurantInfo.phone.replace(/\D/g, "")}&text=${encodeURIComponent(msg)}`;
  };

  const handleBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        router.back();
      } else {
        try {
          window.close();
        } catch (e) {}
        // Fallback if window.close() is blocked
        router.push("/casa");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] dark:bg-[#1E1B18] flex flex-col items-center justify-start py-8 px-4 font-sans transition-colors duration-300 pb-24 relative">
      
      {/* Back Link outside the card */}
      <div className="w-full max-w-md mb-6 flex justify-start no-print">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white dark:bg-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-700 text-foreground border border-border/10 px-5 py-2.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 duration-200 cursor-pointer"
        >
          <ChevronLeft size={14} />
          Voltar
        </button>
      </div>

      {/* Mobile Frame Container (centered, styled like a device/card) */}
      <div className={`w-full max-w-md flex flex-col px-6 py-8 rounded-[32px] border border-border/10 shadow-2xl relative transition-all ${styleColors.bg} ${styleColors.textPrimary}`}>

        {/* 1. BRAND HEADER */}
        <div className="text-center mb-8 flex flex-col items-center">
          
          {/* Logo circle */}
          {project.restaurantInfo.logo ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3 shadow-md border border-border/5">
              <img
                src={project.restaurantInfo.logo}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg mb-3 shadow-md ${styleColors.accentBg} ${styleColors.accentText}`}>
              {project.restaurantInfo.name.substring(0, 2).toUpperCase()}
            </div>
          )}
          
          <h1 className={`text-2xl font-bold tracking-tight ${fontsMapping[project.design.fontFamily]}`}>
            {project.restaurantInfo.name}
          </h1>
          
          <p className="text-xs opacity-75 mt-2 leading-relaxed text-center font-sans max-w-xs">
            {project.restaurantInfo.description}
          </p>

          {/* Contact and address pills */}
          <div className="flex flex-col gap-2 mt-4 text-[10px] opacity-70 w-full">
            <div className="flex items-center justify-center gap-1.5">
              <MapPin size={12} className={styleColors.accent} />
              <span>{project.restaurantInfo.address}</span>
            </div>
            <div className="flex items-center justify-center gap-4 mt-1 font-mono">
              <span className="flex items-center gap-1">
                <Phone size={10} className={styleColors.accent} /> {project.restaurantInfo.phone}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={10} className={styleColors.accent} /> {project.restaurantInfo.hours}
              </span>
            </div>
          </div>
        </div>

        {/* Separator line */}
        <div className={`border-b w-full mb-6 ${styleColors.border}`} />

        {/* 2. DYNAMIC HORIZONTAL CATEGORY PILLS */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-6 sticky top-0 bg-inherit py-2 z-10">
          {project.categories.map((cat) => {
            const items = project.items.filter((i) => i.category === cat.name);
            if (items.length === 0) return null;
            
            return (
              <a
                key={cat.id}
                href={`#cat-${cat.id}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${styleColors.pillInactive} hover:scale-105`}
              >
                {cat.name}
              </a>
            );
          })}
        </div>

        {/* 3. MENU DISHES GROUPED BY CATEGORY */}
        <div className="space-y-10">
          {project.categories.map((cat) => {
            const items = project.items.filter((i) => i.category === cat.name);
            if (items.length === 0) return null;

            return (
              <section key={cat.id} id={`cat-${cat.id}`} className="space-y-4 text-left scroll-mt-24">
                
                {/* Category Title Header */}
                <h3 className={`font-bebas text-lg tracking-widest pb-1 border-b border-dashed flex justify-between items-center ${styleColors.accent} ${styleColors.border}`}>
                  {cat.name}
                  <span className="text-[10px] font-sans font-bold opacity-50 uppercase">{items.length} itens</span>
                </h3>

                {/* Dishes list */}
                <div className={project.design.layoutType === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className={`rounded-2xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden transition-all ${styleColors.cardBg}`}
                    >
                      {/* Badge selection */}
                      {item.badge && (
                        <span className={`absolute -top-1 left-3 text-[8px] font-bold uppercase px-2 py-0.5 rounded shadow-sm ${styleColors.accentBg} ${styleColors.accentText}`}>
                          {item.badge}
                        </span>
                      )}

                      <div>
                        {/* Food Image mock if exists */}
                        {item.image && (
                          <div className={`relative w-full rounded-xl overflow-hidden mb-3 border border-border/5 ${
                            project.design.layoutType === "grid" ? "h-24" : "h-32"
                          }`}>
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                            />
                          </div>
                        )}

                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h4 className={`text-sm font-bold leading-snug ${fontsMapping[project.design.fontFamily]}`}>
                              {item.title}
                            </h4>
                            <p className="text-[11px] opacity-70 leading-relaxed mt-1 font-sans">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-border/5">
                        <span className="font-bebas text-base font-bold text-accent">
                          R$ {item.price.toFixed(2)}
                        </span>
                        
                        {/* Cart add button */}
                        <div className="flex items-center gap-1 bg-[#f4ece3]/50 border border-border/5 rounded-full p-0.5">
                          {cart[item.id] ? (
                            <>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-primary/70 hover:text-accent font-bold"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="text-xs font-bold font-mono px-2 text-primary">{cart[item.id]}</span>
                            </>
                          ) : null}
                          <button
                            onClick={() => addToCart(item.id)}
                            className="h-6 w-6 rounded-full bg-accent text-white flex items-center justify-center font-bold"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </section>
            );
          })}
        </div>

      </div>

      {/* 4. FLOATING SHOPPING CART BAR */}
      <AnimatePresence>
        {totalCartItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 inset-x-4 max-w-md mx-auto z-40"
          >
            <div
              onClick={() => setCartOpen(true)}
              className="bg-primary text-white rounded-2xl p-4 shadow-xl flex items-center justify-between cursor-pointer hover:bg-primary/95 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="relative rounded-xl bg-accent p-2.5 text-white">
                  <ShoppingCart size={18} />
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-primary text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {totalCartItems}
                  </span>
                </div>
                <div className="text-left font-sans">
                  <div className="text-xs font-semibold opacity-70">Ver meu pedido</div>
                  <div className="text-sm font-bold">R$ {totalCartPrice.toFixed(2)}</div>
                </div>
              </div>

              <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1 font-sans">
                FECHAR PEDIDO <Sparkles size={12} />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. SHOPPING CART DRAWER MODAL */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center no-print">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setCartOpen(false)} />
            
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-white text-primary rounded-t-[32px] p-6 max-w-md w-full shadow-2xl z-10 flex flex-col max-h-[80vh] overflow-y-auto"
            >
              {/* Header drawer */}
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-border/10">
                <div>
                  <h3 className="font-serif text-lg font-bold">Revisar Pedido</h3>
                  <p className="text-[10px] text-foreground/50">Enviar pedido diretamente pelo WhatsApp</p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="rounded-full bg-muted/40 p-2 text-foreground/60 hover:text-primary transition-colors"
                >
                  <Plus size={16} className="rotate-45" />
                </button>
              </div>

              {/* Cart items list */}
              <div className="space-y-4 flex-grow overflow-y-auto pr-1">
                {Object.entries(cart).map(([itemId, qty]) => {
                  const item = project.items.find((i) => i.id === itemId);
                  if (!item) return null;

                  return (
                    <div key={item.id} className="flex items-center justify-between border-b border-border/5 pb-3">
                      <div className="min-w-0 pr-4">
                        <h4 className="text-xs font-bold text-primary truncate leading-snug">{item.title}</h4>
                        <div className="text-[10px] text-accent font-mono mt-0.5">R$ {item.price.toFixed(2)}</div>
                      </div>
                      
                      {/* Quantity selector */}
                      <div className="flex items-center gap-2 border border-border/10 rounded-full p-0.5">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="h-6 w-6 rounded-full bg-muted/40 flex items-center justify-center text-primary/70 hover:text-accent font-bold"
                        >
                          <Minus size={8} />
                        </button>
                        <span className="text-[10px] font-bold font-mono px-1.5">{qty}</span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="h-6 w-6 rounded-full bg-accent text-white flex items-center justify-center font-bold"
                        >
                          <Plus size={8} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary and button */}
              <div className="mt-6 pt-4 border-t border-border/10 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-foreground/60">Subtotal do pedido</span>
                  <span className="font-bold font-mono">R$ {totalCartPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-foreground/60">Taxa de serviço</span>
                  <span className="text-emerald-500 font-bold">Grátis</span>
                </div>

                <div className="flex justify-between items-center border-t border-border/5 pt-3">
                  <span className="font-serif text-sm font-bold">Total Estimado</span>
                  <span className="font-bebas text-lg font-bold text-accent">R$ {totalCartPrice.toFixed(2)}</span>
                </div>

                {/* Send Order WhatsApp */}
                <a
                  href={getWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-2"
                >
                  <Button
                    className="w-full rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-xs py-5 border-0 shadow shadow-accent/20 flex items-center justify-center gap-1.5"
                  >
                    <Check size={14} /> Enviar Pedido via WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
