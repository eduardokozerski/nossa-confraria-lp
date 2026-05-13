"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const WHATSAPP_NUMBER = "5531998052003"
const WHATSAPP_MESSAGE = "Olá! Gostaria de solicitar um orçamento para um evento."

export function CTA() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section className="py-32 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-background rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-background rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div 
        ref={ref}
        className={cn(
          "container mx-auto px-6 relative z-10 transition-all duration-1000",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-primary-foreground text-balance">
            Pronto para criar memórias inesquecíveis?
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
            Entre em contato agora e receba um orçamento personalizado para o seu evento. 
            Nossa equipe está pronta para transformar seu sonho em realidade.
          </p>
          <div className="pt-4">
            <Button 
              asChild
              size="lg"
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium px-10 py-7 text-lg rounded-full gap-3 shadow-lg shadow-background/20 transition-all hover:scale-105"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-6 h-6" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
