"use client"

import { MessageCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const WHATSAPP_NUMBER = "5531998052003"
const WHATSAPP_MESSAGE = "Olá! Gostaria de solicitar um orçamento para um evento."

export function Hero() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://raw.githubusercontent.com/eduardokozerski/nossa-confraria-lp/1adbd949ebf5025afa16a9627e4ae7c1446e6c9f/public/images/hero-1.jpeg')`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Logo/Brand */}
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm">
            Desde 2018
          </p>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight text-balance">
            Transformamos momentos em{" "}
            <span className="text-primary italic">memórias inesquecíveis</span>
          </h1>

          {/* Subheadline */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-balance">
            Experiência gastronômica para casamentos, formaturas e eventos corporativos em Ponte Nova e região
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Button 
              asChild
              size="lg"
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium px-8 py-6 text-lg rounded-full gap-3 shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Solicitar orçamento no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#sobre" className="text-muted-foreground hover:text-primary transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  )
}
