import { Instagram } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="relative h-12 w-40 md:h-14 md:w-48">
            <Image
              src="https://raw.githubusercontent.com/eduardokozerski/nossa-confraria-lp/refs/heads/main/public/images/logo-1.png"
              alt="Nossa Confraria Buffet"
              fill
              className="object-contain"
              priority
            />
          </a>

          {/* Social */}
          <a
            href="https://instagram.com/nossaconfrariabuffet"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span>@nossaconfrariabuffet</span>
          </a>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Nossa Confraria Buffet. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
