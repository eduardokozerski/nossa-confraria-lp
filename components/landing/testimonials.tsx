"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useState, useCallback, useEffect } from "react"

const testimonials = [
  {
    image: "https://raw.githubusercontent.com/eduardokozerski/nossa-confraria-lp/refs/heads/main/public/images/feedback-1.jpg",
    name: "Cliente Satisfeito",
    event: "Casamento",
  },
  {
    image: "https://raw.githubusercontent.com/eduardokozerski/nossa-confraria-lp/1adbd949ebf5025afa16a9627e4ae7c1446e6c9f/public/images/feedback-2.jpeg",
    name: "Cliente Satisfeito",
    event: "Evento Social",
  },
  {
    image: "https://raw.githubusercontent.com/eduardokozerski/nossa-confraria-lp/1adbd949ebf5025afa16a9627e4ae7c1446e6c9f/public/images/feedback-3.jpeg",
    name: "Cliente Satisfeito",
    event: "Formatura",
  },
  {
    image: "https://raw.githubusercontent.com/eduardokozerski/nossa-confraria-lp/1adbd949ebf5025afa16a9627e4ae7c1446e6c9f/public/images/feedback-4.jpeg",
    name: "Cliente Satisfeito",
    event: "Aniversário",
  },
  {
    image: "https://raw.githubusercontent.com/eduardokozerski/nossa-confraria-lp/1adbd949ebf5025afa16a9627e4ae7c1446e6c9f/public/images/feedback-5.jpeg",
    name: "Cliente Satisfeito",
    event: "Evento Corporativo",
  },
  {
    image: "https://raw.githubusercontent.com/eduardokozerski/nossa-confraria-lp/1adbd949ebf5025afa16a9627e4ae7c1446e6c9f/public/images/feedback-6.jpeg",
    name: "Cliente Satisfeito",
    event: "Confraternização",
  },
  {
    image: "https://raw.githubusercontent.com/eduardokozerski/nossa-confraria-lp/1adbd949ebf5025afa16a9627e4ae7c1446e6c9f/public/images/feedback-7.jpeg",
    name: "Cliente Satisfeito",
    event: "Celebração",
  },
  {
    image: "https://raw.githubusercontent.com/eduardokozerski/nossa-confraria-lp/1adbd949ebf5025afa16a9627e4ae7c1446e6c9f/public/images/feedback-8.jpeg",
    name: "Cliente Satisfeito",
    event: "Evento Especial",
  },
]

export function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(3)

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1)
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(3)
      }
    }

    updateSlidesPerView()
    window.addEventListener("resize", updateSlidesPerView)
    return () => window.removeEventListener("resize", updateSlidesPerView)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - slidesPerView)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }, [maxIndex])

  return (
    <section id="depoimentos" className="py-32 bg-background">
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-6 transition-all duration-1000",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm">
            Depoimentos
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-balance">
            O que nossos clientes{" "}
            <span className="text-primary italic">dizem</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={cn(
              "absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-card border border-border rounded-full transition-all duration-300",
              currentIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-primary hover:border-primary hover:text-background"
            )}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className={cn(
              "absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-card border border-border rounded-full transition-all duration-300",
              currentIndex >= maxIndex
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-primary hover:border-primary hover:text-background"
            )}
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden mx-4 lg:mx-0">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(calc(-${currentIndex * (100 / slidesPerView)}% - ${currentIndex * 24 / slidesPerView}px))`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex-shrink-0 group relative bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-500",
                    slidesPerView === 1 && "w-full",
                    slidesPerView === 2 && "w-[calc(50%-12px)]",
                    slidesPerView === 3 && "w-[calc(33.333%-16px)]"
                  )}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 z-10 text-primary/30">
                    <Quote className="w-10 h-10" />
                  </div>

                  {/* Image Container with black background */}
                  <div className="relative aspect-[3/4] bg-black flex items-center justify-center overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={`Depoimento - ${testimonial.event}`}
                      fill
                      className="object-contain"
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentIndex === index
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
