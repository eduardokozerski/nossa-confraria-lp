"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

export function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section id="sobre" className="py-32 bg-background">
      <div 
        ref={ref}
        className={cn(
          "container mx-auto px-6 transition-all duration-1000",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm">
              Nossa História
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-balance">
              Da paixão pela gastronomia à{" "}
              <span className="text-primary italic">arte de receber</span>
            </h2>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Tudo começou com jantares temáticos mensais, organizados pelo recém formado 
                em gastronomia Caio Corcini, movido pela paixão de reunir pessoas ao redor 
                de uma mesa bem servida.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                O que começou como personal chef se transformou em pequenos eventos íntimos 
                — batizados, casamentos — até se tornar o que somos hoje: um buffet completo, 
                com espaço próprio e bosque exclusivo para cerimônias.
              </p>
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-primary" />
                  <span className="text-primary font-serif text-lg italic">Receptividade</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-primary" />
                  <span className="text-primary font-serif text-lg italic">Qualidade</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-primary" />
                  <span className="text-primary font-serif text-lg italic">Entrega</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card border border-border p-8 text-center">
                <p className="font-serif text-5xl md:text-6xl text-primary mb-2">7+</p>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">Anos de experiência</p>
              </div>
              <div className="bg-card border border-border p-8 text-center">
                <p className="font-serif text-5xl md:text-6xl text-primary mb-2">500+</p>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">Eventos realizados</p>
              </div>
              <div className="bg-card border border-border p-8 text-center col-span-2">
                <p className="font-serif text-5xl md:text-6xl text-primary mb-2">100%</p>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">Dedicação em cada detalhe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
