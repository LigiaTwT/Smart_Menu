"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function Entrar() {
  const router = useRouter();
  const [email, setEmail] = useState("contato@restaurante.com.br");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simular autenticação rápida
    setTimeout(() => {
      router.push("/casa");
    }, 800);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-background font-sans overflow-hidden">

      {/* Back button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-xs font-semibold text-primary/70 hover:text-accent transition-colors bg-white/80 backdrop-blur-md py-2 px-4 rounded-full border border-border/10 shadow-sm"
      >
        <ArrowLeft size={14} />
        Voltar ao início
      </Link>

      {/* Left side: Login Form */}
      <div className="lg:col-span-5 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 relative bg-background">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent" />

        <div className="w-full max-w-sm mx-auto flex flex-col gap-8">

          {/* Brand header */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 group self-start">
              <div className="relative overflow-hidden">
                <Image
                  src="/logo-orance.svg"
                  alt="Logo"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <span className="font-bebas text-2xl tracking-wider text-primary">
                Smart<span className="text-accent font-sans font-bold text-sm tracking-normal ml-0.5">Menu</span>
              </span>
            </Link>
            <h1 className="font-bebas text-4xl font-bold text-primary tracking-wide mt-4">
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-foreground/60">
              Gerencie seus cardápios digitais e impressos premium.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-primary/70">Endereço de E-mail</label>
              <div className="relative flex items-center bg-white border border-border/15 rounded-xl shadow-sm focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10 transition-all">
                <Mail size={16} className="text-foreground/40 absolute left-4" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 py-3.5 pl-11 pr-4 text-sm text-primary outline-none placeholder:text-foreground/30 font-medium"
                  placeholder="exemplo@restaurante.com.br"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-primary/70">Senha de Acesso</label>
                <Link href="#" className="text-[10px] font-semibold text-accent hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative flex items-center bg-white border border-border/15 rounded-xl shadow-sm focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10 transition-all">
                <Lock size={16} className="text-foreground/40 absolute left-4" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-0 py-3.5 pl-11 pr-4 text-sm text-primary outline-none placeholder:text-foreground/30 font-medium"
                  placeholder="Sua senha secreta"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-sm py-6 mt-2 shadow-lg shadow-accent/20 border-0 flex items-center justify-center gap-2 group transition-all"
            >
              {loading ? (
                <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  Entrar no painel
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Create Account link */}
          <div className="text-center text-xs text-foreground/50 border-t border-border/10 pt-6">
            Não tem uma conta cadastrada?{" "}
            <Link href="/cadastrar" className="font-semibold text-accent hover:underline">
              Criar conta grátis
            </Link>
          </div>

        </div>
      </div>

      {/* Right side: Editorial Quote & Image */}
      <div className="lg:col-span-7 relative hidden lg:flex items-center justify-center bg-primary">
        {/* Gastronomy background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/img1.png"
            alt="Sushi Premium"
            fill
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        </div>

        {/* Ambient Blur circles */}
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-accent/20 blur-3xl z-10" />

        {/* Storytelling card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl mx-6 text-white text-left"
        >
          <div className="rounded-full bg-accent/20 w-8 h-8 flex items-center justify-center mb-6 text-accent">
            <Sparkles size={16} />
          </div>

          <h3 className="font-sans text-xl font-bold leading-snug mb-4">
            “O Smart Menu mudou o patamar do nosso negócio.”
          </h3>
          <p className="text-sm text-white/80 leading-relaxed font-sans mb-6">
            Antes, gastávamos fortunas imprimindo cardápios que desatualizavam em semanas. Agora, atualizamos pratos da estação em tempo real. E a qualidade visual do PDF de mesa é idêntica à de revistas de culinária. Nosso ticket médio cresceu 18% no primeiro mês.
          </p>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/30 overflow-hidden relative flex-shrink-0 border border-white/25">
              <Image src="/logo-black.png" alt="Chef logo" fill className="object-cover" />
            </div>
            <div>
              <div className="text-xs font-semibold">Chef Gabriel Souto</div>
              <div className="text-[10px] text-white/60">Fundador do Sakura Lounge</div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}