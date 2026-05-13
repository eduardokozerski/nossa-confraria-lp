"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import Image from "next/image";

const services = [
  {
    title: "Buffet Tradicional",
    description:
      "16 entradas volantes e jantar completo. Mesas de sustentação opcionais (mineira, antepasto e fast food), contratadas à parte.",
    image:
      "https://raw.githubusercontent.com/eduardokozerski/nossa-confraria-lp/1adbd949ebf5025afa16a9627e4ae7c1446e6c9f/public/images/services-food-cold-1.jpeg",
  },
  {
    title: "Buffet de Fogo",
    description:
      "American Barbecue, fogo de chão e parrilla. Um diferencial único na região.",
    image:
      "https://raw.githubusercontent.com/eduardokozerski/nossa-confraria-lp/1adbd949ebf5025afa16a9627e4ae7c1446e6c9f/public/images/services-food-bbq-1.jpeg",
  },
  {
    title: "Espaço Próprio",
    description:
      "Ambiente exclusivo com bosque para cerimônias, perfeito para seu evento dos sonhos.",
    image:
      "https://raw.githubusercontent.com/eduardokozerski/nossa-confraria-lp/refs/heads/main/public/images/services-venue-1.jpg",
  },
];

const eventTypes = [
  { name: "Casamentos", icon: "💒" },
  { name: "Formaturas", icon: "🎓" },
  { name: "Eventos Corporativos", icon: "🏢" },
  { name: "Aniversários", icon: "🎂" },
  { name: "Confraternizações", icon: "🥂" },
];

export function Services() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="servicos" className="py-32 bg-secondary/30">
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-6 transition-all duration-1000",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
      >
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm">
            Nossos Serviços
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-balance">
            Gastronomia de excelência para{" "}
            <span className="text-primary italic">cada ocasião</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={cn(
                "group relative overflow-hidden bg-card border border-border transition-all duration-500 hover:border-primary/50",
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-8 space-y-3">
                <h3 className="font-serif text-2xl text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Event Types */}
        <div className="text-center">
          <p className="text-muted-foreground mb-8 uppercase tracking-wider text-sm">
            Atendemos diversos tipos de eventos
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {eventTypes.map((event) => (
              <div
                key={event.name}
                className="px-6 py-3 bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <span className="text-foreground">{event.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
