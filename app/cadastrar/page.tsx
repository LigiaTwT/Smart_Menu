"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMenu } from "@/components/MenuContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Lock,
  Store,
  Sparkles,
  Coffee,
  Flame,
  Pizza,
  Fish,
  Cake
} from "lucide-react";

type RestaurantType = "cafeteria" | "hamburgueria" | "pizzaria" | "sushi" | "doceria";

export default function Cadastrar() {
  const router = useRouter();
  const { createProject } = useMenu();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantType, setRestaurantType] = useState<RestaurantType>("cafeteria");

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    }
  };

  const handleCompleteOnboarding = () => {
    setLoading(true);
    setStep(3);

    // Simulate onboarding setup and project seed
    setTimeout(() => {
      // Create project of chosen type
      createProject(restaurantName || `Menu ${restaurantName}`, restaurantType);
      
      // Navigate to dashboard
      router.push("/casa");
    }, 2200);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground font-sans px-4 py-12 relative overflow-hidden transition-colors duration-300">
      
      {/* Background blurs */}
      <div className="absolute top-1/10 left-1/10 h-72 w-72 rounded-full bg-accent/5 blur-3xl -z-10" />
      <div className="absolute bottom-1/10 right-1/10 h-96 w-96 rounded-full bg-primary/5 blur-3xl -z-10" />

      {/* Back button */}
      {step < 3 && (
        <button
          onClick={() => (step === 2 ? setStep(1) : router.push("/"))}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-xs font-semibold text-primary/70 hover:text-accent transition-colors bg-white/80 backdrop-blur-md py-2 px-4 rounded-full border border-border/10 shadow-sm"
        >
          <ArrowLeft size={14} />
          {step === 2 ? "Voltar ao passo anterior" : "Voltar ao início"}
        </button>
      )}

      {/* Onboarding Box */}
      <div className="w-full max-w-xl bg-card border border-border/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative transition-colors duration-300">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent rounded-t-3xl" />
        
        {/* Logo and Progress Indicator */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative overflow-hidden">
              <Image
                src="/logo-orance.svg"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
            <span className="font-bebas text-2xl tracking-wider text-foreground">
              Smart<span className="text-accent font-sans font-bold text-sm tracking-normal ml-0.5">Menu</span>
            </span>
          </Link>
          
          {step < 3 && (
            <div className="text-xs font-semibold text-foreground/50 font-mono">
              PASSO <span className="text-accent">{step}</span> DE 2
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          
          {/* STEP 1: Account Info */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 text-left">
                <h1 className="font-bebas text-3xl sm:text-4xl font-bold text-foreground tracking-wide">
                  Crie sua conta profissional
                </h1>
                <p className="text-sm text-foreground/60 mt-1">
                  Primeiro, precisamos das suas informações básicas de acesso.
                </p>
              </div>

              <form onSubmit={handleNextStep} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/75">Seu Nome Completo</label>
                  <div className="relative flex items-center bg-muted/20 dark:bg-muted/30 border border-border/15 rounded-xl focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10 transition-all">
                    <User size={16} className="text-foreground/40 absolute left-4" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-0 py-3.5 pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-foreground/30 font-medium"
                      placeholder="Como podemos te chamar?"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/75">E-mail Profissional</label>
                  <div className="relative flex items-center bg-muted/20 dark:bg-muted/30 border border-border/15 rounded-xl focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10 transition-all">
                    <Mail size={16} className="text-foreground/40 absolute left-4" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-0 py-3.5 pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-foreground/30 font-medium"
                      placeholder="contato@seurestaurante.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/75">Senha</label>
                  <div className="relative flex items-center bg-muted/20 dark:bg-muted/30 border border-border/15 rounded-xl focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10 transition-all">
                    <Lock size={16} className="text-foreground/40 absolute left-4" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border-0 py-3.5 pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-foreground/30 font-medium"
                      placeholder="Mínimo de 6 caracteres"
                      minLength={6}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-sm py-6 mt-3 shadow-lg shadow-accent/20 border-0 flex items-center justify-center gap-2 group transition-all"
                >
                  Continuar onboarding
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              <div className="text-center text-xs text-foreground/50 border-t border-border/10 pt-6 mt-6">
                Já possui acesso?{" "}
                <Link href="/entrar" className="font-semibold text-accent hover:underline">
                  Fazer login agora
                </Link>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Restaurant branding */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 text-left">
                <h1 className="font-bebas text-3xl sm:text-4xl font-bold text-foreground tracking-wide">
                  Sobre o seu negócio
                </h1>
                <p className="text-sm text-foreground/60 mt-1">
                  Defina o nome e segmento do seu negócio para gerarmos o template perfeito.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/75">Nome do Estabelecimento</label>
                  <div className="relative flex items-center bg-muted/20 dark:bg-muted/30 border border-border/15 rounded-xl focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10 transition-all">
                    <Store size={16} className="text-foreground/40 absolute left-4" />
                    <input
                      type="text"
                      required
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                      className="w-full bg-transparent border-0 py-3.5 pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-foreground/30 font-medium"
                      placeholder="Ex: Cantina do Chef, Café da Vila"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/75">Segmento Gastronômico</label>
                  
                  {/* segment cards grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      { id: "cafeteria", label: "Café", icon: <Coffee size={20} /> },
                      { id: "hamburgueria", label: "Burguer", icon: <Flame size={20} /> },
                      { id: "pizzaria", label: "Pizza", icon: <Pizza size={20} /> },
                      { id: "sushi", label: "Sushi", icon: <Fish size={20} /> },
                      { id: "doceria", label: "Doceria", icon: <Cake size={20} /> }
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setRestaurantType(type.id as RestaurantType)}
                        className={`flex flex-col items-center justify-center gap-2 border rounded-xl p-3.5 transition-all text-center cursor-pointer ${
                          restaurantType === type.id
                            ? "border-accent bg-accent/5 text-accent font-semibold shadow-sm"
                            : "border-border/15 bg-card text-foreground/70 hover:border-accent/40 hover:bg-accent/5"
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${restaurantType === type.id ? "bg-accent/10 text-accent" : "bg-muted text-primary/50"}`}>
                          {type.icon}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleCompleteOnboarding}
                  disabled={!restaurantName}
                  className="rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-sm py-6 mt-4 shadow-lg shadow-accent/20 border-0 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Finalizar e criar cardápio
                  <ArrowRight size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Seeding Simulation */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="relative mb-6">
                <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent animate-bounce">
                  <Sparkles size={32} />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-md animate-pulse -z-10" />
              </div>
              
              <h2 className="font-bebas text-3xl font-bold text-foreground tracking-wide mb-2">
                Criando o seu Smart Menu...
              </h2>
              <p className="text-sm text-foreground/60 max-w-xs leading-relaxed mb-6 font-sans">
                Estamos formatando as grades, selecionando as fontes recomendadas e gerando seu QR Code inicial para o segmento de <strong>{restaurantType.toUpperCase()}</strong>.
              </p>
              
              {/* Progress animation */}
              <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" as const }}
                  className="h-full bg-accent"
                />
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}