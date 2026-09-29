"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Mail, ArrowRight, Heart } from "lucide-react";
import { Button } from "../ui/button";

export default function Rodape() {
  return (
    <footer className="bg-primary text-white border-t border-white/5 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/5">
          
          {/* Logo & About Column */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2 group self-start">
              <div className="relative overflow-hidden">
                <Image
                  src="/logo-orance.svg"
                  alt="Logo Smart Menu"
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <span className="font-bebas text-2xl tracking-wider text-white leading-none">
                Smart<span className="text-accent font-sans font-bold text-base tracking-normal ml-0.5">Menu</span>
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed font-sans max-w-xs">
              A plataforma food tech definitiva para restaurantes, cafeterias e docerias criarem cardápios digitais e impressos premium em minutos.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all text-white/70">
                <Instagram size={16} />
              </Link>
              <Link href="#" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all text-white/70">
                <Facebook size={16} />
              </Link>
              <Link href="#" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all text-white/70">
                <Twitter size={16} />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 flex flex-col gap-4 font-sans">
            <h4 className="font-bebas text-accent text-sm tracking-wider">Navegação</h4>
            <div className="flex flex-col gap-2.5 text-sm text-white/70">
              <Link href="#inicio" className="hover:text-white transition-colors">Início</Link>
              <Link href="#sobre" className="hover:text-white transition-colors">Sobre Nós</Link>
              <Link href="#beneficios" className="hover:text-white transition-colors">Benefícios</Link>
              <Link href="/cadastrar" className="hover:text-white transition-colors">Criar Menu</Link>
            </div>
          </div>

          {/* Templates/Features Column */}
          <div className="lg:col-span-2 flex flex-col gap-4 font-sans">
            <h4 className="font-bebas text-accent text-sm tracking-wider">Templates</h4>
            <div className="flex flex-col gap-2.5 text-sm text-white/70">
              <Link href="/entrar" className="hover:text-white transition-colors">Hamburgueria</Link>
              <Link href="/entrar" className="hover:text-white transition-colors">Cafeteria</Link>
              <Link href="/entrar" className="hover:text-white transition-colors">Pizzaria</Link>
              <Link href="/entrar" className="hover:text-white transition-colors">Sushi & Gourmet</Link>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 flex flex-col gap-4 font-sans">
            <h4 className="font-bebas text-accent text-sm tracking-wider">Inscreva-se</h4>
            <p className="text-sm text-white/70 leading-relaxed">Receba dicas de marketing gastronômico e novidades da nossa plataforma diretamente no seu e-mail.</p>
            <div className="flex items-stretch gap-2 bg-white/5 border border-white/10 rounded-full p-1 max-w-sm mt-1">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="bg-transparent border-0 outline-none text-white px-4 text-xs flex-1 min-w-0 placeholder:text-white/40"
              />
              <Button className="rounded-full bg-accent hover:bg-accent/90 text-white font-semibold text-xs py-3 px-4 shadow border-0">
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-white/40">
          <div>
            &copy; {new Date().getFullYear()} Smart Menu S.A. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1.5">
            Feito com <Heart size={10} className="text-accent fill-accent" /> para empreendedores gastronômicos.
          </div>
        </div>

      </div>
    </footer>
  );
}