"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { 
  Clock, 
  Users, 
  Utensils, 
  TreePine, 
  Flame, 
  Award 
} from "lucide-react"

const differentials = [
  {
    icon: Clock,
    title: "Atendimento Ágil",
    description: "Resposta rápida e acessível",
  },
  {
    icon: Users,
    title: "Equipe Capacitada",
    description: "Cozinha e salão treinados",
  },
  {
    icon: Utensils,
    title: "Cardápio Completo",
    description: "Variedade e sofisticação",
  },
  {
    icon: TreePine,
    title: "Espaço com Bosque",
    description: "Cerimônias ao ar livre",
  },
  {
    icon: Flame,
    title: "Buffet de Fogo",
    description: "Diferencial exclusivo",
  },
  {
    icon: Award,
    title: "Histórico de Sucesso",
    description: "Anos de experiência",
  },
]

export function Differentials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section id="diferenciais" className="py-32 bg-background">
      <div 
        ref={ref}
        className={cn(
          "container mx-auto px-6 transition-all duration-1000",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm">
            Por que nos escolher
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-balance">
            Diferenciais que fazem a{" "}
            <span className="text-primary italic">diferença</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {differentials.map((item, index) => (
            <div 
              key={item.title}
              className={cn(
                "group p-8 bg-card border border-border text-center hover:border-primary/50 transition-all duration-500",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
