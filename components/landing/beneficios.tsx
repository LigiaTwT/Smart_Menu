"use client";

import { motion } from "framer-motion";
import {
  QrCode,
  FileText,
  Sliders,
  Eye,
  LayoutGrid,
  Smartphone,
  CheckCircle,
  FileDown,
  Sparkles
} from "lucide-react";
import Image from "next/image";

export default function Beneficios() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  const benefits = [
    {
      icon: <QrCode className="h-6 w-6 text-accent" />,
      title: "QR Code Inteligente",
      description: "Gere códigos exclusivos para colar nas mesas. Seu cliente aponta a câmera e acessa o cardápio no navegador do celular, sem baixar aplicativos."
    },
    {
      icon: <FileDown className="h-6 w-6 text-accent" />,
      title: "Exportação em PDF Premium",
      description: "Imprima seus cardápios com qualidade gráfica. O layout ajusta as quebras de página automaticamente, gerando um documento pronto para impressão."
    },
    {
      icon: <Sliders className="h-6 w-6 text-accent" />,
      title: "Editor Guiado Inteligente",
      description: "Sem arrastar caixas de texto ou tentar alinhar imagens manualmente. Você digita as informações e o editor estrutura o design perfeito."
    },
    {
      icon: <Eye className="h-6 w-6 text-accent" />,
      title: "Preview em Tempo Real",
      description: "Cada alteração de prato, preço, cor ou estilo de fonte reflete instantaneamente no mockup central do editor, eliminando adivinhações."
    },
    {
      icon: <LayoutGrid className="h-6 w-6 text-accent" />,
      title: "Templates Gastronômicos",
      description: "Coleções com identidades visuais exclusivas desenvolvidas por designers especialistas em hamburguerias, cafeterias, sushis e bistrôs."
    },
    {
      icon: <Smartphone className="h-6 w-6 text-accent" />,
      title: "Experiência Mobile Impecável",
      description: "Cardápio digital 100% responsivo que funciona como um app. Navegação fluida por categorias que acelera o pedido na mesa."
    }
  ];

  return (
    <section
      id="beneficios"
      className="relative bg-background py-24 lg:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-bebas text-accent tracking-wider text-sm mb-3 inline-block">FUNCIONALIDADES E BENEFÍCIOS</span>
          <h2 className="font-bebas text-4xl sm:text-5xl font-bold tracking-wide text-primary leading-tight mb-4">
            Tudo o que você precisa para destacar seus pratos e vender mais.
          </h2>
          <p className="text-foreground/70 font-sans leading-relaxed">
            Unimos a praticidade de um sistema automatizado com a sofisticação visual de revistas gastronômicas. Crie cardápios incríveis em minutos.
          </p>
        </div>

        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="rounded-2xl border border-border/10 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-accent/20 hover:translate-y-[-4px] group"
            >
              <div className="rounded-xl bg-[#EEEEEE] w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                {benefit.icon}
              </div>
              <h3 className="font-sans text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed font-sans">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Highlight 1: The Live Layout Automation Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <span className="font-bebas text-accent tracking-wider text-sm mb-3 inline-block">DESIGN AUTOMÁTICO</span>
            <h3 className="font-bebas text-4xl font-bold tracking-wide text-primary mb-6 leading-tight">
              Sua única preocupação é criar receitas incríveis.
            </h3>
            <p className="text-foreground/70 leading-relaxed font-sans mb-8">
              No Canva, você perde tempo tentando alinhar descrições, ajustar fontes e reordenar pratos quando o cardápio cresce. No Smart Menu, as grades e colunas se calculam e se reajustam dinamicamente. Se você remove uma sobremesa, o layout reorganiza o grid instantaneamente para manter o visual premium impecável.
            </p>
            <div className="flex flex-col gap-3 font-sans">
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-accent flex-shrink-0" />
                <span className="text-sm text-foreground/80 font-medium">Alinhamento perfeito de preços em colunas separadas</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-accent flex-shrink-0" />
                <span className="text-sm text-foreground/80 font-medium">Cálculo de margens e quebra automática de páginas para impressão</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-accent flex-shrink-0" />
                <span className="text-sm text-foreground/80 font-medium">Contraste de cores calibrado para garantir leitura perfeita na luz do dia</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 relative aspect-[4/3] rounded-2xl bg-card border border-border/10 shadow-xl overflow-hidden glassmorphism flex flex-col p-4 bg-gradient-to-br from-[#11224E]/5 to-[#F87B1B]/5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent -z-10" />
            <div className="text-xs font-mono text-primary/40 mb-3 border-b border-border/10 pb-2 flex justify-between items-center">
              <span>Layout inteligente em ação</span>
              <span className="flex items-center gap-1"><Sparkles size={10} className="text-accent" /> Automação</span>
            </div>

            {/* Split layout comparison */}
            <div className="flex-1 grid grid-cols-2 gap-4 items-stretch">
              {/* Left Side: Input Panel */}
              <div className="rounded-lg bg-white border border-border/10 p-3 flex flex-col justify-between text-left text-[9px] shadow-sm">
                <div>
                  <div className="font-semibold text-primary mb-2 border-b border-border/5 pb-1">Novo Prato</div>
                  <div className="space-y-1.5">
                    <div>
                      <div className="text-[7px] text-foreground/50">Nome do prato</div>
                      <div className="bg-muted px-1.5 py-1 rounded text-primary font-medium">Pizza Calzone Especial</div>
                    </div>
                    <div>
                      <div className="text-[7px] text-foreground/50">Preço</div>
                      <div className="bg-muted px-1.5 py-1 rounded text-accent font-mono font-bold">R$ 54,00</div>
                    </div>
                    <div>
                      <div className="text-[7px] text-foreground/50">Descrição</div>
                      <div className="bg-muted px-1.5 py-1 rounded text-primary leading-snug">Recheado com ricota fresca, muçarela, salame italiano picante e manjericão.</div>
                    </div>
                  </div>
                </div>
                <div className="h-5 w-full bg-accent hover:bg-accent/90 rounded text-white flex items-center justify-center font-bold text-[8px] cursor-pointer">
                  Salvar Produto
                </div>
              </div>

              {/* Right Side: Live Auto-aligned Output */}
              <div className="rounded-lg bg-[#EEEEEE] border border-border/10 p-3.5 shadow-sm flex flex-col relative justify-center text-left">
                <div className="text-[7px] font-bold text-accent font-bebas mb-2 tracking-wider">PIZZAS DO FORNO</div>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-start gap-1">
                    <div className="max-w-[80%]">
                      <h5 className="font-sans text-[8.5px] font-bold text-primary leading-none">Pizza Margherita D.O.C.</h5>
                      <p className="text-[5.5px] text-foreground/60 leading-tight mt-0.5">Molho de tomate San Marzano, búfala e manjericão.</p>
                    </div>
                    <span className="font-bebas text-[8.5px] text-accent">52,00</span>
                  </div>

                  <div className="flex justify-between items-start gap-1 border-t border-border/5 pt-2 relative">
                    <div className="absolute -top-1 left-0 bg-accent text-white text-[5px] font-bold px-1 rounded animate-pulse">NOVO</div>
                    <div className="max-w-[80%]">
                      <h5 className="font-sans text-[8.5px] font-bold text-primary leading-none">Pizza Calzone Especial</h5>
                      <p className="text-[5.5px] text-foreground/60 leading-tight mt-0.5">Recheado com ricota, muçarela, salame italiano picante e manjericão.</p>
                    </div>
                    <span className="font-bebas text-[8.5px] text-accent">54,00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight 2: Mobile Experience & QR Code */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Visual background elements */}
            <div className="absolute w-72 h-72 rounded-full bg-accent/5 -z-10 blur-xl" />

            <div className="relative flex gap-6 items-end">
              {/* QR Code Card mockup */}
              <div className="bg-white border border-border/15 p-5 rounded-2xl shadow-xl flex flex-col items-center text-center max-w-[160px] translate-y-[-40px] hover:scale-105 transition-transform duration-300">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/cardapio/demo"
                  alt="QR Code Demo"
                  className="w-24 h-24 mb-3 object-contain"
                />
                <span className="font-bebas text-xs text-primary tracking-wider">MESA 12</span>
                <span className="text-[8px] text-foreground/50 leading-none">Escanear para ver cardápio</span>
              </div>

              {/* Mobile Phone Mockup */}
              <div className="w-52 aspect-[9/19] rounded-[28px] bg-primary border-[6px] border-primary shadow-2xl overflow-hidden">
                <div className="relative w-full h-full bg-[#EEEEEE] p-4 flex flex-col justify-between">
                  {/* Speaker and Camera notch */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-black flex items-center justify-center">
                    <div className="h-0.5 w-5 rounded-full bg-white/20" />
                  </div>

                  {/* Content */}
                  <div className="mt-4 flex-1 flex flex-col font-sans overflow-hidden">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-sans text-[10px] font-bold text-primary">Bella Italia</h4>
                      <div className="rounded-full bg-accent/10 px-2 py-0.5 text-[6px] font-bold text-accent">MESA 12</div>
                    </div>

                    {/* Horizontal Category pills */}
                    <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-2 mb-2">
                      <span className="bg-accent text-white text-[6px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">Pizzas</span>
                      <span className="bg-muted text-primary text-[6px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">Massas</span>
                      <span className="bg-muted text-primary text-[6px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">Bebidas</span>
                    </div>

                    <div className="space-y-2 flex-1 overflow-y-auto scrollbar-hide">
                      <div className="rounded-lg bg-white p-2 shadow-sm border border-border/5 flex gap-2">
                        <div className="w-10 h-10 rounded bg-[#EEEEEE] relative overflow-hidden flex-shrink-0">
                          <Image src="/comidas/pizza-margherita.png" alt="pizza" fill className="object-cover" />
                        </div>
                        <div>
                          <div className="text-[7.5px] font-bold text-primary leading-none">Pizza Margherita</div>
                          <p className="text-[5.5px] text-foreground/50 leading-tight mt-0.5">Tomate San Marzano, búfala, manjericão.</p>
                          <div className="text-[7px] font-bold text-accent mt-1">R$ 52,00</div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-white p-2 shadow-sm border border-border/5 flex gap-2">
                        <div className="w-10 h-10 rounded bg-[#EEEEEE] relative overflow-hidden flex-shrink-0">
                          <Image src="/comidas/pasta-carbonara.png" alt="carbonara" fill className="object-cover" />
                        </div>
                        <div>
                          <div className="text-[7.5px] font-bold text-primary leading-none">Carbonara Italiana</div>
                          <p className="text-[5.5px] text-foreground/50 leading-tight mt-0.5">Guanciale crocante, gema de ovo, pecorino.</p>
                          <div className="text-[7px] font-bold text-accent mt-1">R$ 58,00</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-border/10 text-center text-[5.5px] text-foreground/40 font-mono">
                    bellaitalia.smartmenu.com.br
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <span className="font-bebas text-accent tracking-wider text-sm mb-3 inline-block">EXPERIÊNCIA DO CLIENTE</span>
            <h3 className="font-serif text-3xl font-bold text-primary mb-6 leading-tight">
              Mesa modernizada, pedidos ágeis, clientes felizes.
            </h3>
            <p className="text-foreground/70 leading-relaxed font-sans mb-8">
              O cardápio digital do Smart Menu não é um PDF gigante que exige zoom para ler. É um web app leve e ultrarrápido, otimizado para celulares. Seu cliente consegue navegar facilmente por categorias bem divididas, ler as descrições e decidir o pedido muito mais rápido, liberando o garçom e acelerando o giro das mesas do seu salão.
            </p>
            <div className="flex flex-col gap-3 font-sans">
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-accent flex-shrink-0" />
                <span className="text-sm text-foreground/80 font-medium">Acesso instantâneo sem baixar nenhum aplicativo</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-accent flex-shrink-0" />
                <span className="text-sm text-foreground/80 font-medium">Filtro instantâneo de pratos por categoria</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-accent flex-shrink-0" />
                <span className="text-sm text-foreground/80 font-medium">Atualização de pratos e preços em tempo real diretamente da sua tela</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
