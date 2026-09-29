"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/70 backdrop-blur-lg border-b border-border/15 py-3 shadow-md"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative overflow-hidden transition-transform group-hover:scale-105">
                <Image
                  src="/logo-orance.svg"
                  alt="Logo Smart Menu"
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain"
                />
              </div>
              <span className="font-bebas text-3xl tracking-wider text-primary transition-colors group-hover:text-accent leading-none">
                Smart<span className="text-accent font-sans font-bold text-lg tracking-normal ml-0.5">Menu</span>
              </span>
            </Link>

            {/* Menu Desktop */}
            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="/#inicio"
                onClick={(e) => handleScrollToSection(e, "inicio")}
                className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
              >
                Início
              </Link>
              <Link
                href="/#sobre"
                onClick={(e) => handleScrollToSection(e, "sobre")}
                className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
              >
                Sobre Nós
              </Link>
              <Link
                href="/#beneficios"
                onClick={(e) => handleScrollToSection(e, "beneficios")}
                className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
              >
                Benefícios
              </Link>
            </div>

            {/* Actions Desktop */}
            <div className="hidden items-center gap-4 md:flex">
              <Link href="/entrar">
                <Button
                  variant="ghost"
                  className="rounded-full px-5 text-sm font-semibold text-primary hover:text-accent hover:bg-accent/5 transition-all"
                >
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastrar">
                <Button className="rounded-full bg-accent hover:bg-accent/90 px-6 text-sm font-semibold text-white shadow-lg shadow-accent/20 border-0 hover:translate-y-[-1px] active:translate-y-[0px] transition-all">
                  Começar agora
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex p-2 text-primary md:hidden hover:text-accent transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-background/95 backdrop-blur-xl border-b border-border/10 py-6 px-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/#inicio"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleScrollToSection(e, "inicio");
                }}
                className="text-lg font-medium text-foreground py-2 border-b border-border/5 hover:text-accent transition-colors"
              >
                Início
              </Link>
              <Link
                href="/#sobre"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleScrollToSection(e, "sobre");
                }}
                className="text-lg font-medium text-foreground py-2 border-b border-border/5 hover:text-accent transition-colors"
              >
                Sobre Nós
              </Link>
              <Link
                href="/#beneficios"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleScrollToSection(e, "beneficios");
                }}
                className="text-lg font-medium text-foreground py-2 border-b border-border/5 hover:text-accent transition-colors"
              >
                Benefícios
              </Link>
              <div className="flex flex-col gap-3 mt-4">
                <Link href="/entrar" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-border bg-transparent text-primary hover:bg-accent/5 font-semibold py-5"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link href="/cadastrar" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full rounded-full bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg shadow-accent/20 py-5">
                    Começar agora
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
