"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { X } from "lucide-react"

const galleryImages = [
  {
    src: "/images/gallery-venue-1.jpg",
    alt: "Espaço para eventos",
    category: "Espaço",
  },
  {
    src: "/images/gallery-food-bbq-1.jpeg",
    alt: "Buffet de churrasco",
    category: "Gastronomia",
  },
  {
    src: "/images/gallery-venue-2.jpg",
    alt: "Decoração elegante",
    category: "Espaço",
  },
  {
    src: "/images/gallery-food-bbq-2.jpeg",
    alt: "Cortes especiais",
    category: "Gastronomia",
  },
  {
    src: "/images/gallery-venue-3.jpg",
    alt: "Ambiente noturno",
    category: "Espaço",
  },
  {
    src: "/images/gallery-food-bbq-3.jpeg",
    alt: "Preparação no fogo",
    category: "Gastronomia",
  },
  {
    src: "/images/gallery-food-cold-1.jpeg",
    alt: "Entradas frias",
    category: "Gastronomia",
  },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <>
      <section id="galeria" className="py-32 bg-secondary/30">
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
              Galeria
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-balance">
              Momentos que contam{" "}
              <span className="text-primary italic">histórias</span>
            </h2>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "group relative aspect-square cursor-pointer overflow-hidden bg-card transition-all duration-500",
                  index === 0 && "md:col-span-2 md:row-span-2",
                  inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setSelectedImage(image.src)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-foreground font-serif text-lg">{image.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Imagem ampliada"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
