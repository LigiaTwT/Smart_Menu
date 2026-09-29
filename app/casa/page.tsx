"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMenu, MenuProject, DEFAULT_TEMPLATES } from "@/components/MenuContext";
import { MenuMiniPreview } from "@/components/MenuMiniPreview";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  LayoutGrid,
  FolderKanban,
  FileText,
  Trash2,
  Settings,
  LogOut,
  Search,
  Bell,
  Eye,
  Edit,
  ExternalLink,
  Copy,
  RotateCcw,
  Sparkles,
  QrCode,
  Smartphone,
  Phone,
  MapPin,
  Clock,
  Instagram,
  X,
  TrendingUp,
  BarChart3,
  Upload,
  Sun,
  Moon,
  User
} from "lucide-react";

type ActiveTab = "projetos" | "modelos" | "rascunhos" | "lixeira";

export default function Casa() {
  const router = useRouter();
  const {
    projects,
    trash,
    setActiveProject,
    createProject,
    updateProject,
    deleteProject,
    restoreProject,
    deletePermanently,
    restoreProjectBulk,
    deletePermanentlyBulk,
    deleteProjectBulk,
    updateProjectStatusBulk,
    duplicateProject,
    darkMode,
    setDarkMode,
    userProfile,
    updateUserProfile
  } = useMenu();

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileTab, setProfileTab] = useState<"preferences" | "account">("preferences");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  useEffect(() => {
    if (userProfile) {
      setEditName(userProfile.name);
      setEditEmail(userProfile.email);
    }
  }, [userProfile]);

  const [activeTab, setActiveTab] = useState<ActiveTab>("projetos");
  const [searchQuery, setSearchQuery] = useState("");
  const [trashSearchQuery, setTrashSearchQuery] = useState("");
  const [selectedTrashIds, setSelectedTrashIds] = useState<string[]>([]);
  const [rascunhosSearchQuery, setRascunhosSearchQuery] = useState("");
  const [selectedRascunhoIds, setSelectedRascunhoIds] = useState<string[]>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New Menu Form State
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuType, setNewMenuType] = useState<"cafeteria" | "hamburgueria" | "pizzaria" | "sushi" | "doceria">("cafeteria");

  // Notifications Mock
  const notifications = [
    { id: 1, text: "Cardápio principal atualizado com sucesso!", time: "5 min atrás" },
    { id: 2, text: "Novo QR Code escaneado na Mesa 8.", time: "15 min atrás" },
    { id: 3, text: "Parabéns! Seu menu atingiu 5.000 acessos.", time: "1 dia atrás" }
  ];

  // Stats Counters
  const activeMenus = projects.filter((p) => p.status === "publicado");
  const totalViews = projects.reduce((sum, p) => sum + p.viewsCount, 0);

  const [newMenuLogo, setNewMenuLogo] = useState("");

  // Handle Logo File Upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMenuLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Menu Creation from Modal
  const handleCreateMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuName) return;
    const newProj = createProject(newMenuName, newMenuType, newMenuLogo);
    setActiveProject(newProj);
    setCreateModalOpen(false);
    setNewMenuName("");
    setNewMenuLogo("");
    router.push("/editar");
  };

  // Handle Quick Edit
  const handleEditMenu = (proj: MenuProject) => {
    setActiveProject(proj);
    router.push("/editar");
  };

  // Trash Helper Actions
  const filteredTrash = trash.filter((project) =>
    project.name.toLowerCase().includes(trashSearchQuery.toLowerCase())
  );

  const toggleSelectAllTrash = () => {
    if (selectedTrashIds.length === filteredTrash.length) {
      setSelectedTrashIds([]);
    } else {
      setSelectedTrashIds(filteredTrash.map((p) => p.id));
    }
  };

  const toggleSelectTrashItem = (id: string) => {
    if (selectedTrashIds.includes(id)) {
      setSelectedTrashIds(selectedTrashIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedTrashIds([...selectedTrashIds, id]);
    }
  };

  const handleBulkRestore = () => {
    restoreProjectBulk(selectedTrashIds);
    setSelectedTrashIds([]);
  };

  const handleBulkDelete = () => {
    deletePermanentlyBulk(selectedTrashIds);
    setSelectedTrashIds([]);
  };

  // Rascunhos Helper Actions
  const filteredRascunhos = projects.filter(
    (project) =>
      project.status === "rascunho" &&
      project.name.toLowerCase().includes(rascunhosSearchQuery.toLowerCase())
  );

  const toggleSelectAllRascunhos = () => {
    if (selectedRascunhoIds.length === filteredRascunhos.length) {
      setSelectedRascunhoIds([]);
    } else {
      setSelectedRascunhoIds(filteredRascunhos.map((p) => p.id));
    }
  };

  const toggleSelectRascunhoItem = (id: string) => {
    if (selectedRascunhoIds.includes(id)) {
      setSelectedRascunhoIds(selectedRascunhoIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedRascunhoIds([...selectedRascunhoIds, id]);
    }
  };

  const handleBulkPublishRascunhos = () => {
    updateProjectStatusBulk(selectedRascunhoIds, "publicado");
    setSelectedRascunhoIds([]);
  };

  const handleBulkDeleteRascunhos = () => {
    deleteProjectBulk(selectedRascunhoIds);
    setSelectedRascunhoIds([]);
  };

  // Templates Showcase
  const templatesShowcase = [
    { id: "cafeteria", label: "Cafeteria Editorial", tag: "Premium", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop" },
    { id: "hamburgueria", label: "Retro Burger Shop", tag: "Neo-Retro", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop" },
    { id: "pizzaria", label: "Cantina Rústica", tag: "Artesanal", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop" },
    { id: "sushi", label: "Tokyo Noir Dark", tag: "Minimalista", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop" },
    { id: "doceria", label: "Ateliê Pastel Doce", tag: "Delicado", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans transition-colors duration-300">

      {/* 1. Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex-shrink-0 flex flex-col justify-between border-r border-sidebar-border relative z-10">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border flex items-center gap-2">
            <div className="relative overflow-hidden">
              <Image
                src="/logo-orance.svg"
                alt="Logo"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
            </div>
            <span className="font-bebas text-2xl tracking-wider text-sidebar-foreground leading-none">
              Smart<span className="text-accent font-sans font-bold text-base tracking-normal ml-0.5">Menu</span>
            </span>
          </div>

          {/* Quick Creator CTA */}
          <div className="px-4 py-6">
            <Button
              onClick={() => setCreateModalOpen(true)}
              className="w-full rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-xs py-5 border-0 flex items-center justify-center gap-2 shadow-lg shadow-accent/20 transition-all hover:translate-y-[-1px]"
            >
              <PlusCircle size={16} />
              CRIAR NOVO CARDÁPIO
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="px-2 space-y-1">
            {[
              { id: "projetos", label: "Meus Projetos", icon: <FolderKanban size={18} /> },
              { id: "modelos", label: "Modelos e Templates", icon: <LayoutGrid size={18} /> },
              { id: "rascunhos", label: "Rascunhos", icon: <FileText size={18} /> },
              { id: "lixeira", label: "Lixeira", icon: <Trash2 size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${activeTab === tab.id
                  ? "bg-sidebar-accent text-sidebar-foreground shadow-sm"
                  : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }`}
              >
                {tab.icon}
                {tab.label}
                {tab.id === "lixeira" && trash.length > 0 && (
                  <span className="ml-auto bg-sidebar-accent/40 text-sidebar-foreground text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {trash.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        {/* Header */}
        <header className="h-20 bg-card border-b border-border/10 px-8 flex items-center justify-between z-20 flex-shrink-0 transition-colors duration-300">

          {/* Title Area */}
          <div className="flex items-center gap-3">
            <h1 className="font-bebas text-3xl tracking-wide text-foreground">
              {activeTab === "projetos" && "Meus Projetos"}
              {activeTab === "modelos" && "Galeria de Modelos"}
              {activeTab === "rascunhos" && "Menus em Rascunho"}
              {activeTab === "lixeira" && "Itens Excluídos"}
            </h1>
          </div>

          {/* Actions (Search, Notification, Help) */}
          <div className="flex items-center gap-4">

            {/* Simulated Search */}
            <div className="relative flex items-center bg-muted/40 border border-border/10 rounded-full max-w-xs px-4 py-1.5 focus-within:border-accent transition-all">
              <Search size={14} className="text-foreground/40 mr-2" />
              <input
                type="text"
                placeholder="Pesquisar menus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 outline-none text-xs text-foreground placeholder:text-foreground/30 w-44 font-medium"
              />
            </div>

            {/* Notification Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative p-2 rounded-full hover:bg-muted text-foreground/75 transition-colors cursor-pointer"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-background animate-pulse" />
              </button>

              <AnimatePresence>
                {notificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-72 bg-card border border-border/20 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_15px_50px_rgba(0,0,0,0.6)] p-4 z-50 transition-colors duration-300"
                  >
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-border/5">
                      <span className="font-bebas text-xs text-accent">Notificações</span>
                      <button onClick={() => setNotificationOpen(false)} className="text-foreground/40 hover:text-foreground">
                        <X size={14} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {notifications.map((n) => (
                        <div key={n.id} className="text-xs leading-relaxed text-foreground/80 flex flex-col border-b border-border/5 pb-2 last:border-0 last:pb-0">
                          <span>{n.text}</span>
                          <span className="text-[9px] text-foreground/40 mt-1 font-mono">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick user avatar dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileModalOpen(!profileModalOpen)}
                className="h-9 w-9 rounded-full bg-[#11224E]/10 dark:bg-[#7293E8]/10 flex items-center justify-center text-[#11224E] dark:text-[#7293E8] font-bold text-xs border border-[#11224E]/20 dark:border-[#7293E8]/20 hover:bg-[#11224E]/20 dark:hover:bg-[#7293E8]/20 hover:scale-105 transition-all cursor-pointer"
                title="Minha Conta"
              >
                {userProfile.avatarInitials}
              </button>

              <AnimatePresence>
                {profileModalOpen && (
                  <>
                    {/* Transparent Click-outside Backdrop */}
                    <div
                      className="fixed inset-0 z-20 cursor-default"
                      onClick={() => setProfileModalOpen(false)}
                    />

                    {/* Dropdown Menu Container */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-card border border-border/25 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_15px_50px_rgba(0,0,0,0.6)] p-6 z-50 transition-colors duration-300"
                    >
                      {/* Close Button */}
                      <button
                        onClick={() => setProfileModalOpen(false)}
                        className="absolute top-4 right-4 text-foreground/45 hover:text-foreground transition-colors p-1 cursor-pointer"
                      >
                        <X size={16} />
                      </button>

                      <div className="flex flex-col mt-2">
                        {/* User Profile Card Header */}
                        <div className="flex items-center gap-4 w-full mb-5 text-left border-b border-border/10 pb-5">
                          <div className="h-14 w-14 rounded-2xl bg-[#11224E]/10 dark:bg-[#7293E8]/10 flex items-center justify-center text-[#11224E] dark:text-[#7293E8] text-xl font-bold border border-[#11224E]/20 dark:border-[#7293E8]/20 shadow-inner flex-shrink-0">
                            {userProfile.avatarInitials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-sans text-sm font-bold leading-snug truncate">{userProfile.name}</h3>
                            <p className="text-xs text-foreground/50 truncate mt-0.5">{userProfile.email}</p>
                          </div>
                        </div>

                        {/* Theme Selector (Claro/Escuro buttons) */}
                        <div className="grid grid-cols-2 gap-3 w-full mb-4">
                          <button
                            type="button"
                            onClick={() => setDarkMode(false)}
                            className={`py-3.5 flex items-center justify-center gap-2 border rounded-xl transition-all cursor-pointer text-xs font-semibold ${!darkMode
                                ? "border-[#11224E] bg-[#11224E]/5 text-[#11224E] font-bold dark:border-[#7293E8] dark:bg-[#7293E8]/10 dark:text-[#7293E8]"
                                : "border-border/15 bg-muted/20 text-foreground/60 hover:border-[#11224E]/40 dark:hover:border-[#7293E8]/40"
                              }`}
                          >
                            <Sun size={14} />
                            <span>Modo Claro</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDarkMode(true)}
                            className={`py-3.5 flex items-center justify-center gap-2 border rounded-xl transition-all cursor-pointer text-xs font-semibold ${darkMode
                                ? "border-[#11224E] bg-[#11224E]/5 text-[#11224E] font-bold dark:border-[#7293E8] dark:bg-[#7293E8]/10 dark:text-[#7293E8]"
                                : "border-border/15 bg-muted/20 text-foreground/60 hover:border-[#11224E]/40 dark:hover:border-[#7293E8]/40"
                              }`}
                          >
                            <Moon size={14} />
                            <span>Modo Escuro</span>
                          </button>
                        </div>

                        {/* Minha Conta button */}
                        <Link href="/minha-conta" className="w-full mb-3">
                          <Button
                            onClick={() => setProfileModalOpen(false)}
                            className="w-full rounded-xl bg-[#11224E] dark:bg-[#7293E8] hover:bg-[#11224E]/90 dark:hover:bg-[#7293E8]/90 text-white dark:text-[#080C16] font-semibold text-xs py-4 border-0 flex items-center justify-center gap-2 shadow-lg shadow-[#11224E]/15 dark:shadow-[#7293E8]/15 cursor-pointer animate-none"
                          >
                            <User size={14} />
                            MINHA CONTA
                          </Button>
                        </Link>

                        {/* Sair do Sistema button */}
                        <Link href="/" className="w-full">
                          <Button
                            onClick={() => setProfileModalOpen(false)}
                            className="w-full rounded-xl bg-red-500/10 hover:bg-red-500/15 text-red-600 dark:text-red-400 font-semibold text-xs py-4 border-0 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                          >
                            <LogOut size={14} />
                            SAIR DO SISTEMA
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Tabs Content */}
        <main className="flex-1 overflow-y-auto p-8">

          {/* TAB 1: MEUS PROJETOS */}
          {activeTab === "projetos" && (
            <div className="space-y-8">

              {/* Analytics Section */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                <div className="bg-card border border-border/10 rounded-2xl p-6 shadow-sm flex items-center justify-between transition-colors duration-300">
                  <div>
                    <span className="text-xs font-semibold text-foreground/50 font-sans">Total Acessos</span>
                    <h3 className="font-bebas text-3xl text-foreground mt-1">{totalViews.toLocaleString("pt-BR")}</h3>
                  </div>
                  <div className="rounded-xl bg-accent/10 p-3 text-accent">
                    <TrendingUp size={20} />
                  </div>
                </div>

                <div className="bg-card border border-border/10 rounded-2xl p-6 shadow-sm flex items-center justify-between transition-colors duration-300">
                  <div>
                    <span className="text-xs font-semibold text-foreground/50 font-sans">Mesa QR Codes</span>
                    <h3 className="font-bebas text-3xl text-foreground mt-1">{activeMenus.length * 8}</h3>
                    <span className="text-[10px] text-foreground/40 font-semibold mt-1 block">8 mesas por cardápio ativo</span>
                  </div>
                  <div className="rounded-xl bg-accent/10 p-3 text-accent">
                    <QrCode size={20} />
                  </div>
                </div>

                <div className="bg-card border border-border/10 rounded-2xl p-6 shadow-sm flex items-center justify-between transition-colors duration-300">
                  <div>
                    <span className="text-xs font-semibold text-foreground/50 font-sans">Menus Publicados</span>
                    <h3 className="font-bebas text-3xl text-foreground mt-1">{activeMenus.length} / {projects.length}</h3>
                    <span className="text-[10px] text-foreground/40 font-semibold mt-1 block">Online e prontos para leitura</span>
                  </div>
                  <div className="rounded-xl bg-accent/10 p-3 text-accent">
                    <Smartphone size={20} />
                  </div>
                </div>

                <div className="bg-card border border-border/10 rounded-2xl p-6 shadow-sm flex items-center justify-between transition-colors duration-300">
                  <div>
                    <span className="text-xs font-semibold text-foreground/50 font-sans">Tempo de Leitura</span>
                    <h3 className="font-bebas text-3xl text-foreground mt-1">3m 42s</h3>
                    <span className="text-[10px] text-foreground/40 font-semibold mt-1 block">Média de retenção por cliente</span>
                  </div>
                  <div className="rounded-xl bg-accent/10 p-3 text-accent">
                    <BarChart3 size={20} />
                  </div>
                </div>
              </div>

              {/* Quick Chart Info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-card border border-border/10 rounded-2xl p-6 shadow-sm transition-colors duration-300 lg:col-span-3">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-sans text-sm font-bold text-foreground">Leituras de QR Code diárias</h3>
                      <p className="text-xs text-foreground/50">Fluxo de acessos consolidado do restaurante</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-foreground/60">
                        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                        Mesa QR
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-foreground/60">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                        Site Direto
                      </div>
                    </div>
                  </div>

                  {/* SVG Chart */}
                  <div className="h-48 w-full relative">
                    <svg className="w-full h-full" viewBox="0 0 800 180" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="800" y2="30" stroke="rgba(0,0,0,0.04)" strokeDasharray="4 4" />
                      <line x1="0" y1="80" x2="800" y2="80" stroke="rgba(0,0,0,0.04)" strokeDasharray="4 4" />
                      <line x1="0" y1="130" x2="800" y2="130" stroke="rgba(0,0,0,0.04)" strokeDasharray="4 4" />
                      <line x1="0" y1="180" x2="800" y2="180" stroke="rgba(0,0,0,0.08)" />

                      {/* Chart Gradient Path Area */}
                      <defs>
                        <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F87B1B" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#F87B1B" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <path
                        d="M 10 160 Q 140 120 270 90 T 530 60 T 790 35 L 790 180 L 10 180 Z"
                        fill="url(#chart-grad)"
                      />

                      {/* Line path */}
                      <path
                        d="M 10 160 Q 140 120 270 90 T 530 60 T 790 35"
                        fill="none"
                        stroke="#F87B1B"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Dots on peak points */}
                      <circle cx="270" cy="90" r="5" fill="#F87B1B" stroke="#fff" strokeWidth="2.5" />
                      <circle cx="530" cy="60" r="5" fill="#F87B1B" stroke="#fff" strokeWidth="2.5" />
                      <circle cx="790" cy="35" r="5" fill="#F87B1B" stroke="#fff" strokeWidth="2.5" />
                    </svg>
                  </div>

                  {/* Chart Labels */}
                  <div className="flex justify-between items-center text-[10px] text-foreground/40 font-mono mt-3 border-t border-border/5 pt-3">
                    <span>Segunda</span>
                    <span>Terça</span>
                    <span>Quarta</span>
                    <span>Quinta</span>
                    <span>Sexta</span>
                    <span>Sábado</span>
                    <span>Domingo</span>
                  </div>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="space-y-4">
                <h3 className="font-bebas text-2xl tracking-wide text-foreground">Seus Cardápios</h3>

                {projects.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border/20 bg-card p-12 text-center flex flex-col items-center justify-center transition-colors duration-300">
                    <Smartphone size={36} className="text-foreground/20 mb-4" />
                    <h4 className="font-sans text-sm font-bold text-foreground">Nenhum cardápio ativo</h4>
                    <p className="text-xs text-foreground/50 max-w-xs mt-1">Crie seu primeiro menu ou use um de nossos templates prontos na barra lateral.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects
                      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((project) => (
                        <div
                          key={project.id}
                          className="bg-card border border-border/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                        >
                          <MenuMiniPreview project={project} />
                          <div className="p-6 flex flex-col justify-between flex-1">
                            <div>
                              {/* Card Header Info */}
                              <div className="flex justify-between items-start mb-3">
                                <span className={`text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${project.status === "publicado"
                                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                  : "bg-amber-50 text-amber-600 border border-amber-100"
                                  }`}>
                                  {project.status === "publicado" ? "Publicado" : "Rascunho"}
                                </span>
                                <span className="text-[10px] text-foreground/40 font-mono font-medium">{project.createdAt}</span>
                              </div>

                              {/* Menu Title and details */}
                              <h4 className="font-sans text-sm font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                                {project.name}
                              </h4>
                              <p className="text-xs text-foreground/60 font-sans mt-1 line-clamp-2">
                                {project.restaurantInfo.description}
                              </p>

                              {/* Template & Font quick badges */}
                              <div className="flex gap-2 flex-wrap mt-4">
                                <span className="bg-muted text-foreground/70 text-[9px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
                                  {project.design.template}
                                </span>
                                <span className="bg-muted text-foreground/70 text-[9px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
                                  {project.design.colorPreset}
                                </span>
                              </div>

                              {/* Quick Mini Stats */}
                              <div className="border-y border-border/5 py-3 my-4 flex items-center justify-between text-xs text-foreground/60 font-medium font-sans">
                                <span className="flex items-center gap-1.5">
                                  <Eye size={14} className="text-foreground/45" />
                                  <strong>{project.viewsCount}</strong> views
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <LayoutGrid size={14} className="text-foreground/45" />
                                  <strong>{project.items.length}</strong> itens
                                </span>
                              </div>
                            </div>

                            {/* Actions Buttons */}
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <Button
                                onClick={() => handleEditMenu(project)}
                                className="rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold text-xs py-4 border-0 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                              >
                                <Edit size={12} />
                                Editar
                              </Button>

                              <Link href={`/cardapio/${project.id}`} target="_blank" className="w-full">
                                <Button
                                  variant="outline"
                                  className="w-full rounded-lg border-border bg-card text-foreground hover:bg-accent/5 hover:border-accent text-xs font-semibold py-4 flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  <ExternalLink size={12} />
                                  Testar Link
                                </Button>
                              </Link>
                            </div>

                            {/* Hover action block */}
                            <div className="flex justify-between items-center border-t border-border/5 pt-3 mt-3">
                              <button
                                onClick={() => duplicateProject(project.id)}
                                className="text-[10px] font-semibold text-foreground/50 hover:text-accent flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Copy size={10} /> Duplicar
                              </button>
                              <button
                                onClick={() => deleteProject(project.id)}
                                className="text-[10px] font-semibold text-foreground/50 hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Trash2 size={10} /> Deletar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: MODELOS */}
          {activeTab === "modelos" && (
            <div className="space-y-8">
              <div className="mb-6 text-left">
                <h2 className="font-bebas text-2xl tracking-wide text-foreground">Selecione uma identidade pronta para o seu cardápio</h2>
                <p className="text-xs text-foreground/50 mt-1">Personalize totalmente as cores, pratos e imagens no passo seguinte.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {templatesShowcase.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="bg-card border border-border/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between duration-300"
                  >
                    {/* Template Card Preview Box */}
                    <div className="relative overflow-hidden">
                      <MenuMiniPreview templateId={tpl.id} />
                      <span className="absolute top-4 right-4 z-10 bg-accent text-white text-[8px] font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                        {tpl.tag}
                      </span>
                    </div>

                    {/* Card Content details */}
                    <div className="p-6">
                      <h4 className="font-sans text-sm font-bold text-foreground">{tpl.label}</h4>
                      <p className="text-xs text-foreground/60 font-sans mt-1">
                        Design otimizado com fontes e espaçamentos ideais para negócios do segmento de {tpl.id}.
                      </p>

                      <Button
                        onClick={() => {
                          const newProj = createProject(`Cardápio ${tpl.label}`, tpl.id);
                          setActiveProject(newProj);
                          router.push("/editar");
                        }}
                        className="w-full rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-xs py-5 mt-6 border-0 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Usar este template
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RASCUNHOS */}
          {activeTab === "rascunhos" && (
            <div className="space-y-6">
              {projects.filter((p) => p.status === "rascunho").length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-card border border-border/10 rounded-2xl p-4 transition-colors duration-300">
                  {/* Left Side: Selection and Actions */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={toggleSelectAllRascunhos}
                      className="px-3 py-1.5 rounded-xl border border-border/10 bg-muted/20 hover:bg-muted/40 text-xs font-semibold text-foreground transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filteredRascunhos.length > 0 && selectedRascunhoIds.length === filteredRascunhos.length}
                        onChange={() => { }} // handled by click
                        className="cursor-pointer rounded border-border/20 accent-accent h-3.5 w-3.5"
                      />
                      {filteredRascunhos.length > 0 && selectedRascunhoIds.length === filteredRascunhos.length ? "Desmarcar Todos" : "Selecionar Tudo"}
                    </button>

                    {selectedRascunhoIds.length > 0 && (
                      <div className="flex items-center gap-2 animate-fade-in">
                        <span className="text-xs text-foreground/50 font-medium mr-1">
                          {selectedRascunhoIds.length} selecionado{selectedRascunhoIds.length > 1 ? "s" : ""}
                        </span>
                        <button
                          onClick={handleBulkPublishRascunhos}
                          className="px-3 py-1.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer border-0"
                        >
                          Publicar
                        </button>
                        <button
                          onClick={handleBulkDeleteRascunhos}
                          className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/15 text-red-600 dark:text-red-400 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Trash2 size={12} /> Deletar
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Side: Search */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex items-center bg-muted/10 border border-border/10 rounded-xl px-3 py-1.5 w-full sm:w-80 focus-within:border-accent transition-all">
                      <Search size={12} className="text-foreground/40 mr-2" />
                      <input
                        type="text"
                        placeholder="Buscar nos rascunhos..."
                        value={rascunhosSearchQuery}
                        onChange={(e) => setRascunhosSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-xs text-foreground outline-none placeholder-foreground/30 font-sans"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.filter((p) => p.status === "rascunho").length === 0 ? (
                  <div className="col-span-3 rounded-2xl border border-dashed border-border/20 bg-card p-12 text-center flex flex-col items-center justify-center transition-colors duration-300">
                    <FileText size={36} className="text-foreground/20 mb-4" />
                    <h4 className="font-sans text-sm font-bold text-foreground">Nenhum rascunho em aberto</h4>
                    <p className="text-xs text-foreground/50 max-w-xs mt-1">Todos os seus cardápios criados estão publicados no momento.</p>
                  </div>
                ) : filteredRascunhos.length === 0 ? (
                  <div className="col-span-3 rounded-2xl border border-dashed border-border/20 bg-card p-12 text-center flex flex-col items-center justify-center transition-colors duration-300">
                    <Search size={36} className="text-foreground/20 mb-4" />
                    <h4 className="font-sans text-sm font-bold text-foreground">Nenhum item correspondente</h4>
                    <p className="text-xs text-foreground/50 max-w-xs mt-1">Não encontramos nenhum rascunho com o nome "{rascunhosSearchQuery}".</p>
                  </div>
                ) : (
                  filteredRascunhos.map((project) => {
                    const isSelected = selectedRascunhoIds.includes(project.id);
                    return (
                      <div
                        key={project.id}
                        onClick={() => toggleSelectRascunhoItem(project.id)}
                        className={`bg-card border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between duration-300 cursor-pointer relative select-none transition-all ${isSelected
                            ? "border-accent ring-2 ring-accent/10"
                            : "border-border/10 hover:border-border/20"
                          }`}
                      >
                        {/* Selection Checkbox */}
                        <div className="absolute top-4 right-4 z-30" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectRascunhoItem(project.id)}
                            className="cursor-pointer rounded border-border/20 accent-accent h-4 w-4"
                          />
                        </div>

                        <MenuMiniPreview project={project} />

                        <div className="p-6 flex flex-col justify-between flex-1">
                          <div>
                            <div className="flex justify-between items-center mb-3 pr-6">
                              <span className="text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                                Rascunho
                              </span>
                              <span className="text-[10px] text-foreground/40 font-mono font-medium">{project.createdAt}</span>
                            </div>
                            <h4 className="font-sans text-sm font-bold text-foreground">{project.name}</h4>
                            <p className="text-xs text-foreground/60 font-sans mt-1 line-clamp-2">{project.restaurantInfo.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-6" onClick={(e) => e.stopPropagation()}>
                            <Button
                              onClick={() => handleEditMenu(project)}
                              className="rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold text-xs py-4 border-0 cursor-pointer"
                            >
                              Editar
                            </Button>
                            <Button
                              onClick={() => updateProject(project.id, { status: "publicado" })}
                              className="rounded-lg bg-accent hover:bg-accent/90 text-white font-semibold text-xs py-4 border-0 cursor-pointer"
                            >
                              Publicar
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 4: LIXEIRA */}
          {activeTab === "lixeira" && (
            <div className="space-y-6">
              {trash.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-card border border-border/10 rounded-2xl p-4 transition-colors duration-300">
                  {/* Left Side: Selection and Actions */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={toggleSelectAllTrash}
                      className="px-3 py-1.5 rounded-xl border border-border/10 bg-muted/20 hover:bg-muted/40 text-xs font-semibold text-foreground transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filteredTrash.length > 0 && selectedTrashIds.length === filteredTrash.length}
                        onChange={() => { }} // handled by click
                        className="cursor-pointer rounded border-border/20 accent-accent h-3.5 w-3.5"
                      />
                      {filteredTrash.length > 0 && selectedTrashIds.length === filteredTrash.length ? "Desmarcar Todos" : "Selecionar Tudo"}
                    </button>

                    {selectedTrashIds.length > 0 && (
                      <div className="flex items-center gap-2 animate-fade-in">
                        <span className="text-xs text-foreground/50 font-medium mr-1">
                          {selectedTrashIds.length} selecionado{selectedTrashIds.length > 1 ? "s" : ""}
                        </span>
                        <button
                          onClick={handleBulkRestore}
                          className="px-3 py-1.5 rounded-xl bg-primary/5 hover:bg-primary/10 dark:bg-muted dark:hover:bg-muted/80 text-primary dark:text-foreground font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <RotateCcw size={12} /> Restaurar
                        </button>
                        <button
                          onClick={handleBulkDelete}
                          className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/15 text-red-600 dark:text-red-400 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Trash2 size={12} /> Excluir
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Side: Search */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex items-center bg-muted/10 border border-border/10 rounded-xl px-3 py-1.5 w-full sm:w-80 focus-within:border-accent transition-all">
                      <Search size={12} className="text-foreground/40 mr-2" />
                      <input
                        type="text"
                        placeholder="Buscar na lixeira..."
                        value={trashSearchQuery}
                        onChange={(e) => setTrashSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-xs text-foreground outline-none placeholder-foreground/30 font-sans"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trash.length === 0 ? (
                  <div className="col-span-3 rounded-2xl border border-dashed border-border/20 bg-card p-12 text-center flex flex-col items-center justify-center transition-colors duration-300">
                    <Trash2 size={36} className="text-foreground/20 mb-4" />
                    <h4 className="font-sans text-sm font-bold text-foreground">Sua lixeira está limpa</h4>
                    <p className="text-xs text-foreground/50 max-w-xs mt-1">Cardápios excluídos aparecerão aqui antes de serem excluídos permanentemente.</p>
                  </div>
                ) : filteredTrash.length === 0 ? (
                  <div className="col-span-3 rounded-2xl border border-dashed border-border/20 bg-card p-12 text-center flex flex-col items-center justify-center transition-colors duration-300">
                    <Search size={36} className="text-foreground/20 mb-4" />
                    <h4 className="font-sans text-sm font-bold text-foreground">Nenhum item correspondente</h4>
                    <p className="text-xs text-foreground/50 max-w-xs mt-1">Não encontramos nenhum cardápio com o nome "{trashSearchQuery}" na lixeira.</p>
                  </div>
                ) : (
                  filteredTrash.map((project) => {
                    const isSelected = selectedTrashIds.includes(project.id);
                    return (
                      <div
                        key={project.id}
                        onClick={() => toggleSelectTrashItem(project.id)}
                        className={`bg-card border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between duration-300 cursor-pointer relative select-none transition-all ${isSelected
                            ? "border-accent ring-2 ring-accent/10"
                            : "border-border/10 hover:border-border/20"
                          }`}
                      >
                        {/* Selection Checkbox */}
                        <div className="absolute top-4 right-4 z-30" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectTrashItem(project.id)}
                            className="cursor-pointer rounded border-border/20 accent-accent h-4 w-4"
                          />
                        </div>

                        <MenuMiniPreview project={project} />

                        <div className="p-6 flex flex-col justify-between flex-1">
                          <div>
                            <h4 className="font-sans text-sm font-bold text-foreground pr-6">{project.name}</h4>
                            <span className="text-[10px] text-foreground/40 font-mono font-medium block mt-1">Excluído recentemente</span>
                          </div>
                          <div className="space-y-2 mt-6" onClick={(e) => e.stopPropagation()}>
                            <Link href={`/cardapio/${project.id}`} target="_blank" className="w-full block">
                              <button className="w-full rounded-lg bg-muted/40 hover:bg-muted/70 border border-border/10 text-foreground font-semibold text-xs py-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                                <Eye size={12} /> Visualizar Cardápio
                              </button>
                            </Link>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => restoreProject(project.id)}
                                className="rounded-lg bg-primary/5 dark:bg-muted hover:bg-primary/10 dark:hover:bg-muted/80 text-primary dark:text-foreground font-semibold text-xs py-3 border-border flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                              >
                                <RotateCcw size={12} /> Restaurar
                              </button>
                              <button
                                onClick={() => deletePermanently(project.id)}
                                className="rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs py-3 border border-red-100 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                              >
                                <Trash2 size={12} /> Excluir
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}



        </main>
      </div>

      {/* 3. Modal: Criar Novo Cardápio */}
      <AnimatePresence>
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card text-foreground rounded-3xl p-6 sm:p-8 border border-border/10 shadow-2xl max-w-md w-full relative transition-colors duration-300"
            >
              {/* Close Button */}
              <button
                onClick={() => setCreateModalOpen(false)}
                className="absolute top-4 right-4 text-foreground/45 hover:text-foreground transition-colors p-1 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex gap-2.5 items-center mb-6">
                <div className="rounded-xl bg-accent/10 p-2 text-accent">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bebas text-2xl tracking-wide leading-none text-foreground">Criar Novo Cardápio</h3>
                  <span className="text-[10px] text-foreground/50">Configure seu cardápio do zero</span>
                </div>
              </div>

              <form onSubmit={handleCreateMenu} className="space-y-4">
                <div className="flex flex-col gap-1.5 text-left font-sans">
                  <label className="text-xs font-semibold text-foreground/75 font-sans">Nome do Projeto</label>
                  <input
                    type="text"
                    required
                    value={newMenuName}
                    onChange={(e) => setNewMenuName(e.target.value)}
                    className="w-full bg-muted/20 dark:bg-muted/30 border border-border/15 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-accent font-sans"
                    placeholder="Ex: Cardápio Festival Inverno"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left font-sans">
                  <label className="text-xs font-semibold text-foreground/75 font-sans">Logo do Estabelecimento</label>
                  {!newMenuLogo ? (
                    <div className="relative border-2 border-dashed border-border/15 bg-card hover:bg-muted/10 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <Upload size={18} className="text-accent mb-1.5" />
                      <span className="text-[10px] text-foreground font-bold">Escolher Imagem de Logo</span>
                      <span className="text-[8px] text-foreground/45 mt-0.5">PNG, JPG ou WEBP</span>
                    </div>
                  ) : (
                    <div className="border border-border/10 bg-card rounded-xl p-2.5 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative h-10 w-10 rounded-lg overflow-hidden border border-border/5 flex-shrink-0">
                          <img
                            src={newMenuLogo}
                            alt="Logo selecionada"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-bold text-foreground truncate font-sans">Logo Carregada</div>
                          <div className="text-[8px] text-emerald-500 font-semibold flex items-center gap-0.5 font-sans">
                            Pronto para criar
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNewMenuLogo("")}
                        className="text-[9px] font-bold text-red-500 hover:underline px-2 cursor-pointer"
                      >
                        Remover
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <label className="text-xs font-semibold text-foreground/75">Identidade recomendada por segmento</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "cafeteria", label: "Café" },
                      { id: "hamburgueria", label: "Burguer" },
                      { id: "pizzaria", label: "Pizza" },
                      { id: "sushi", label: "Sushi" },
                      { id: "doceria", label: "Doce" }
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setNewMenuType(type.id as any)}
                        className={`py-2 rounded-lg border text-[10px] uppercase font-semibold transition-all cursor-pointer ${newMenuType === type.id
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-border/15 bg-card text-foreground/70 hover:border-accent/40"
                          }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCreateModalOpen(false)}
                    className="flex-1 rounded-xl border-border bg-card text-foreground hover:bg-muted py-5 text-xs font-semibold cursor-pointer"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-xs py-5 border-0 shadow shadow-accent/20 cursor-pointer"
                  >
                    Criar e Editar
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>



    </div>
  );
}