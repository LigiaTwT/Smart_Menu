"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMenu } from "@/components/MenuContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Lock,
  CheckCircle2,
  Building,
  Phone,
  Instagram,
  MapPin,
  Clock,
  FileText
} from "lucide-react";

export default function MinhaConta() {
  const router = useRouter();
  const { userProfile, updateUserProfile } = useMenu();

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  
  const [editPhone, setEditPhone] = useState("");
  const [editInstagram, setEditInstagram] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editHours, setEditHours] = useState("");
  const [editDescription, setEditDescription] = useState("");
  
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync state with global context & localStorage on mount
  useEffect(() => {
    if (userProfile) {
      setEditName(userProfile.name);
      setEditEmail(userProfile.email);
    }

    const savedEst = localStorage.getItem("smartmenu_establishment");
    if (savedEst) {
      try {
        const parsed = JSON.parse(savedEst);
        setEditPhone(parsed.phone || "");
        setEditInstagram(parsed.instagram || "");
        setEditAddress(parsed.address || "");
        setEditHours(parsed.hours || "");
        setEditDescription(parsed.description || "");
      } catch (e) {
        setEditPhone("(11) 98765-4321");
        setEditInstagram("@graoeprosa");
        setEditAddress("Alameda das Flores, 142 - Pinheiros, São Paulo");
        setEditHours("Terça a Domingo — 08:00 às 20:00");
        setEditDescription("Cafés especiais moídos na hora, brunch artesanal e doceria fina em um ambiente acolhedor no coração da cidade.");
      }
    } else {
      setEditPhone("(11) 98765-4321");
      setEditInstagram("@graoeprosa");
      setEditAddress("Alameda das Flores, 142 - Pinheiros, São Paulo");
      setEditHours("Terça a Domingo — 08:00 às 20:00");
      setEditDescription("Cafés especiais moídos na hora, brunch artesanal e doceria fina em um ambiente acolhedor no coração da cidade.");
    }
  }, [userProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name: editName, email: editEmail });
    if (editPassword) {
      localStorage.setItem("smartmenu_password", editPassword);
    }

    const estData = {
      phone: editPhone,
      instagram: editInstagram,
      address: editAddress,
      hours: editHours,
      description: editDescription,
    };
    localStorage.setItem("smartmenu_establishment", JSON.stringify(estData));
    
    // Show success feedback animation
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      {/* Header */}
      <header className="h-20 bg-card border-b border-border/10 px-8 flex items-center justify-between sticky top-0 z-20 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <Link href="/casa">
            <button className="text-foreground/60 hover:text-foreground p-2 rounded-xl hover:bg-muted transition-all flex items-center justify-center cursor-pointer">
              <ArrowLeft size={18} />
            </button>
          </Link>
          <div className="h-4 w-px bg-border/20" />
          <h1 className="font-bebas text-2xl tracking-wide">Minha Conta</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 max-w-2xl w-full mx-auto flex flex-col justify-center">
        {/* Success Alert Banner */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl p-4 mb-6 flex items-center gap-3"
            >
              <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={20} />
              <div className="text-xs font-semibold">
                Alterações salvas com sucesso!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-card border border-border/10 rounded-3xl p-6 md:p-8 transition-colors duration-300 shadow-sm">
          <div className="flex flex-col items-center text-center mb-6 pb-6 border-b border-border/10">
            <div className="h-16 w-16 rounded-2xl bg-accent/15 flex items-center justify-center text-accent text-2xl font-bold mb-3 border border-accent/20">
              {userProfile.avatarInitials}
            </div>
            <h2 className="font-sans text-lg font-bold leading-none text-foreground">{userProfile.name}</h2>
            <p className="text-xs text-foreground/50 mt-2">{userProfile.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seção 1: Dados de Acesso */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-accent uppercase tracking-wider border-b border-border/10 pb-2">
                Dados de Acesso (Conta)
              </h3>
              
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-foreground/75 flex items-center gap-1.5">
                  <Building size={13} />
                  Nome da Empresa / Marca
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-muted/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all font-sans"
                  placeholder="Ex: Cafeteria Grão & Prosa"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-bold text-foreground/75 flex items-center gap-1.5">
                    <Mail size={13} />
                    Endereço de E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-muted/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all font-sans"
                    placeholder="contato@restaurante.com.br"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-bold text-foreground/75 flex items-center gap-1.5">
                    <Lock size={13} />
                    Nova Senha (deixe em branco para não alterar)
                  </label>
                  <input
                    type="password"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    className="w-full bg-muted/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all font-sans"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Seção 2: Dados do Estabelecimento */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold text-accent uppercase tracking-wider border-b border-border/10 pb-2">
                Dados do Estabelecimento
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-bold text-foreground/75 flex items-center gap-1.5">
                    <Phone size={13} />
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-muted/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all font-sans"
                    placeholder="(11) 98765-4321"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-bold text-foreground/75 flex items-center gap-1.5">
                    <Instagram size={13} />
                    Instagram Link
                  </label>
                  <input
                    type="text"
                    value={editInstagram}
                    onChange={(e) => setEditInstagram(e.target.value)}
                    className="w-full bg-muted/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all font-sans"
                    placeholder="@graoeprosa"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-foreground/75 flex items-center gap-1.5">
                  <MapPin size={13} />
                  Endereço Físico
                </label>
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="w-full bg-muted/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all font-sans"
                  placeholder="Ex: Alameda das Flores, 142 - Pinheiros, São Paulo"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-foreground/75 flex items-center gap-1.5">
                  <Clock size={13} />
                  Horário de Funcionamento
                </label>
                <input
                  type="text"
                  value={editHours}
                  onChange={(e) => setEditHours(e.target.value)}
                  className="w-full bg-muted/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all font-sans"
                  placeholder="Ex: Terça a Domingo — 08:00 às 20:00"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-foreground/75 flex items-center gap-1.5">
                  <FileText size={13} />
                  Apresentação / Descrição Curta
                </label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full bg-muted/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all font-sans"
                  placeholder="Descreva o seu estabelecimento..."
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-xs py-5 border-0 shadow-lg shadow-accent/15 transition-all cursor-pointer"
              >
                Salvar Alterações
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
