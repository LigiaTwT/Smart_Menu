"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, QrCode, FileDown, Smartphone, Check } from "lucide-react";

export default function Inicio() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-background pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      {/* Background Decorative Blur Circles */}
      <div className="absolute top-1/4 left-1/10 -z-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute top-1/3 right-1/10 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/10 left-1/3 -z-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">

          {/* Left Text Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            {/* Promo Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center self-start gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold text-accent mb-6 shadow-sm">
              <Sparkles size={14} />
              <span className="font-bebas tracking-wider text-sm">NOVO EDITOR INTELIGENTE v2.0</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-bebas text-5xl font-bold tracking-wide text-primary sm:text-6xl lg:text-7xl leading-tight mb-6"
            >
              Crie cardápios <span className="text-accent underline decoration-wavy decoration-1 underline-offset-4">incríveis</span> sem precisar ser designer.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/80 font-sans leading-relaxed mb-8 max-w-lg"
            >
              Organize pratos, gere QR Codes dinâmicos e exporte PDFs profissionais em minutos. O Smart Menu alinha grades e tipografias automaticamente para você.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8"
            >
              <Link href="/cadastrar" className="flex-1 sm:flex-initial">
                <Button className="w-full sm:w-auto rounded-full bg-accent hover:bg-accent/90 px-8 py-6 text-base font-semibold text-white shadow-xl shadow-accent/20 border-0 hover:translate-y-[-2px] active:translate-y-[0px] transition-all flex items-center justify-center gap-2 group">
                  Criar meu cardápio
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/entrar" className="flex-1 sm:flex-initial">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto rounded-full border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/5 hover:border-primary px-8 py-6 text-base font-semibold text-primary transition-all"
                >
                  Explorar modelos
                </Button>
              </Link>
            </motion.div>

            {/* Micro Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 border-t border-border/15 pt-6 max-w-md"
            >
              <div className="flex flex-col">
                <span className="font-bebas text-2xl text-accent">+10k</span>
                <span className="text-xs text-foreground/60">Negócios ativos</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bebas text-2xl text-accent">100%</span>
                <span className="text-xs text-foreground/60">Responsivo e Autônomo</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bebas text-2xl text-accent">PDF e QR</span>
                <span className="text-xs text-foreground/60">Geração Instantânea</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.2 }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            {/* Main Editor Mockup Window */}
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl bg-card border border-border/20 shadow-2xl overflow-hidden glassmorphism flex flex-col">

              {/* Mockup Title bar */}
              <div className="flex items-center gap-2 border-b border-border/10 px-4 py-3 bg-muted/40">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="mx-auto text-xs text-foreground/40 font-mono tracking-wider">editor.smartmenu.com.br</div>
              </div>

              {/* Mockup App Body */}
              <div className="flex-1 grid grid-cols-12 gap-3 p-3 bg-[#EEEEEE]/90">

                {/* Simulated Editor Left Panel */}
                <div className="col-span-4 rounded-lg bg-white border border-border/5 px-2.5 py-3 flex flex-col gap-2.5 shadow-sm">
                  <div className="h-2 w-12 rounded bg-primary/20" />
                  <div className="h-6 w-full rounded bg-primary/5 border border-primary/10 flex items-center px-2">
                    <div className="h-2 w-16 rounded bg-primary/30" />
                  </div>
                  <div className="h-14 w-full rounded border border-border/15 p-1 flex gap-1.5">
                    <div className="h-full aspect-square rounded bg-accent/20 overflow-hidden relative">
                      <Image src="/logo-orance.svg" alt="prato" fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-1">
                      <div className="h-2 w-10 rounded bg-primary/30" />
                      <div className="h-1.5 w-16 rounded bg-primary/10" />
                    </div>
                  </div>
                  <div className="h-2 w-8 rounded bg-primary/20 mt-1" />
                  <div className="flex flex-col gap-1.5">
                    <div className="h-5 w-full rounded bg-muted flex items-center px-1.5 justify-between">
                      <div className="h-1.5 w-12 rounded bg-foreground/30" />
                      <div className="h-2.5 w-5 rounded-full bg-accent" />
                    </div>
                    <div className="h-5 w-full rounded bg-muted flex items-center px-1.5 justify-between">
                      <div className="h-1.5 w-14 rounded bg-foreground/30" />
                      <div className="h-2.5 w-5 rounded-full bg-primary/20" />
                    </div>
                  </div>
                </div>

                {/* Simulated Live Preview (Middle) */}
                <div className="col-span-8 rounded-lg bg-[#EEEEEE] border border-border/10 p-4 shadow-sm flex flex-col overflow-hidden relative group">
                  <div className="absolute top-2 right-2 bg-accent/10 border border-accent/20 px-2 py-0.5 rounded text-[8px] font-bold text-accent animate-pulse">LIVE</div>

                  {/* Restaurant Info Header */}
                  <div className="text-center mb-3">
                    <h4 className="font-sans text-xs font-bold text-primary">Café Grão & Prosa</h4>
                    <p className="text-[7px] text-foreground/50">Alameda das Flores, 142 • Pinheiros</p>
                  </div>

                  {/* Menu Category */}
                  <div className="mb-2">
                    <div className="text-[8px] font-bebas text-accent tracking-wider border-b border-accent/15 pb-0.5 mb-1.5">CAFÉS ESPECIAIS</div>
                    <div className="flex justify-between items-start gap-1">
                      <div>
                        <h5 className="font-sans text-[9px] font-bold text-primary leading-none">Cappuccino Italiano</h5>
                        <p className="text-[6px] text-foreground/60 leading-tight">Espresso duplo, leite vaporizado cremoso e raspas de cacau.</p>
                      </div>
                      <span className="font-bebas text-[9px] text-accent">R$ 14,90</span>
                    </div>
                  </div>

                  {/* Menu Category 2 */}
                  <div>
                    <div className="text-[8px] font-bebas text-accent tracking-wider border-b border-accent/15 pb-0.5 mb-1.5">BRUNCH & SALGADOS</div>
                    <div className="flex justify-between items-start gap-1">
                      <div>
                        <h5 className="font-sans text-[9px] font-bold text-primary leading-none">Croissant de Frutas Vermelhas</h5>
                        <p className="text-[6px] text-foreground/60 leading-tight">Massa folhada artesanal com recheio de geleia.</p>
                      </div>
                      <span className="font-bebas text-[9px] text-accent">R$ 18,00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Smartphone Floating Mockup */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" as const }}
              className="absolute -bottom-6 -left-4 w-40 aspect-[9/19] rounded-[24px] bg-primary border-4 border-primary shadow-2xl overflow-hidden hidden sm:block"
            >
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-3.5 rounded-full bg-black z-20 flex items-center justify-center">
                <div className="h-1 w-4 rounded-full bg-white/20" />
              </div>
              <div className="relative w-full h-full bg-[#EEEEEE] p-3 pt-6 flex flex-col font-sans">
                <div className="mx-auto w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center mb-1 overflow-hidden relative">
                  <Image src="/logo-black.png" alt="logo" fill className="object-cover scale-110" />
                </div>
                <div className="text-[7px] font-bold text-center text-primary leading-none">Grão & Prosa</div>
                <div className="text-[5px] text-center text-foreground/60 mb-2 leading-none">Café & Bistrô</div>

                <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                  <div className="rounded bg-white/80 p-1 flex gap-1 items-center border border-border/5">
                    <div className="w-5 h-5 rounded bg-amber-900/10 overflow-hidden relative">
                      <Image src="/comidas/croissant-especial.png" alt="croissant" fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[6px] font-bold text-primary truncate leading-none">Croissant Especial</div>
                      <div className="text-[5px] text-accent font-bebas">R$ 18,00</div>
                    </div>
                  </div>
                  <div className="rounded bg-white/80 p-1 flex gap-1 items-center border border-border/5">
                    <div className="w-5 h-5 rounded bg-amber-900/10 overflow-hidden relative">
                      <Image src="/comidas/toast-canastra.png" alt="toast" fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[6px] font-bold text-primary truncate leading-none">Toast Canastra</div>
                      <div className="text-[5px] text-accent font-bebas">R$ 24,50</div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto pt-1 border-t border-border/10 flex justify-between items-center text-[5px] text-foreground/40 font-mono">
                  <span>graoeprosa.smartmenu.menu</span>
                  <Smartphone size={8} />
                </div>
              </div>
            </motion.div>

            {/* Floating QR Code Badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" as const, delay: 0.5 }}
              className="absolute top-8 -right-6 rounded-2xl bg-white border border-border/15 p-3.5 shadow-xl flex items-center gap-3.5 z-20 hover:scale-105 transition-transform"
            >
              <div className="rounded-lg bg-accent/10 p-2 text-accent">
                <QrCode size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-bebas tracking-wide text-xs text-accent">QR CODE AUTOMÁTICO</span>
                <span className="text-[10px] text-primary/60 font-medium">Escanear na Mesa</span>
              </div>
            </motion.div>

            {/* Floating PDF Badge */}
            <motion.div
              animate={{ x: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" as const, delay: 1 }}
              className="absolute -bottom-8 right-8 rounded-xl bg-primary text-white border border-primary/20 px-4 py-2.5 shadow-xl flex items-center gap-2 z-20"
            >
              <FileDown size={16} className="text-accent" />
              <span className="font-bebas text-xs tracking-wider">EXPORTAR PDF IMPRESSO</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
