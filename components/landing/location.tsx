"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { MapPin, Instagram, Phone } from "lucide-react"

export function Location() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section id="localizacao" className="py-32 bg-secondary/30">
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
            Localização
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-balance">
            Venha nos{" "}
            <span className="text-primary italic">conhecer</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-1">Endereço</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Rua da Cerâmica, 49<br />
                    Bairro Fortaleza<br />
                    Ponte Nova, MG
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-1">WhatsApp</h3>
                  <a 
                    href="https://wa.me/5531998052003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    (31) 99805-2003
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-1">Instagram</h3>
                  <a 
                    href="https://instagram.com/nossaconfrariabuffet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    @nossaconfrariabuffet
                  </a>
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div className="pt-8 border-t border-border">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Atendemos Ponte Nova e toda a região, incluindo Mariana, Ouro Preto e rota até Belo Horizonte. 
                Entre em contato para mais informações sobre deslocamento.
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="relative aspect-square lg:aspect-auto bg-card border border-border overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.7834395555043!2d-42.90944492392407!3d-20.41506398103968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa4c0786d67cdf9%3A0x6d86f7e2a84b0c9a!2sR.%20da%20Cer%C3%A2mica%2C%2049%20-%20Fortaleza%2C%20Ponte%20Nova%20-%20MG%2C%2035430-099!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
