"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Store, Heart, Zap } from "lucide-react";

export default function Sobre() {
  const fanContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const card1Variants = {
    hidden: { y: -80, opacity: 0, rotate: 0 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 14,
      transition: { type: "spring" as const, stiffness: 120, damping: 14 }
    }
  };

  const card2Variants = {
    hidden: { y: -80, opacity: 0, rotate: 0 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 27,
      transition: { type: "spring" as const, stiffness: 120, damping: 14 }
    }
  };

  const card3Variants = {
    hidden: { y: -80, opacity: 0, rotate: 0 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 40,
      transition: { type: "spring" as const, stiffness: 120, damping: 14 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section
      id="sobre"
      className="relative bg-[#EEEEEE] py-24 lg:py-32 overflow-hidden border-y border-border/10"
    >
      {/* Decorative background element */}
      <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-background/20 backdrop-blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">

          {/* Left Column: Overlapping Gastronomy Layout (Fan/Leque) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fanContainerVariants}
            className="lg:col-span-6 relative h-[520px] w-full max-w-md mx-auto lg:max-w-none flex items-center justify-start pl-0 overflow-visible"
          >
            {/* Card 1 (Back-most) */}
            <motion.div
              variants={card1Variants}
              style={{ originX: 0, originY: 1 }}
              className="absolute left-0 top-4 w-[280px] h-[410px] rounded-2xl overflow-hidden shadow-xl z-0"
            >
              <div className="absolute inset-0 bg-primary/20 z-10" />
              <Image
                src="/menu-blue.jpg"
                alt="Cardápio Azul"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Card 2 (Middle) */}
            <motion.div
              variants={card2Variants}
              style={{ originX: 0, originY: 1 }}
              className="absolute left-0 top-4 w-[280px] h-[410px] rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <div className="absolute inset-0 bg-primary/10 z-10" />
              <Image
                src="/menu-pink.jpg"
                alt="Cardápio Rosa"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Card 3 (Front-most) */}
            <motion.div
              variants={card3Variants}
              style={{ originX: 0, originY: 1 }}
              className="absolute left-0 top-4 w-[280px] h-[410px] rounded-2xl overflow-hidden shadow-2xl z-20"
            >
              <div className="absolute inset-0 bg-primary/5 z-10" />
              <Image
                src="/menu-red.jpg"
                alt="Cardápio Vermelho"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right Column: Storytelling Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariants}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="font-bebas text-accent tracking-wider text-sm mb-3">NOSSO PROPÓSITO</span>
            <h2 className="font-bebas text-4xl sm:text-5xl font-bold tracking-wide text-primary leading-tight mb-6">
              Acreditamos que todo negócio gastronômico merece um design de alto nível.
            </h2>
            <p className="text-foreground/80 font-sans leading-relaxed mb-8">
              Pequenos e médios empreendimentos gastam horas preciosas lutando contra ferramentas de design genéricas ou utilizando cardápios sem nenhuma harmonia visual. O <strong>Smart Menu</strong> foi criado para mudar isso.
            </p>

            {/* Features Row */}
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-accent mt-1">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-primary mb-1">Editor Inteligente Guidado</h4>
                  <p className="text-sm text-foreground/70">Você preenche as informações e insere as fotos, o sistema ajusta as grades, espaçamentos e a tipografia de forma perfeita.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 text-accent mt-1">
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-primary mb-1">Modernização Instantânea</h4>
                  <p className="text-sm text-foreground/70">Gere um link móvel premium e um QR Code para mesa imediatamente. Reduza os custos de impressão física e atualize pratos em segundos.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 text-accent mt-1">
                  <Heart size={20} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-primary mb-1">Foco na Experiência Acolhedora</h4>
                  <p className="text-sm text-foreground/70">Tanto a sua interface quanto o cardápio que o seu cliente lê são projetados para abrir o apetite e passar profissionalismo.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
