"use client"

import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "5531998052003"
const WHATSAPP_MESSAGE = "Olá! Gostaria de solicitar um orçamento para um evento."

export function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-lg shadow-[#25D366]/30 transition-all hover:scale-110 animate-in fade-in slide-in-from-bottom-4 duration-700"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  )
}
