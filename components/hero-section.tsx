"use client"

import { Shield, ChevronDown } from "lucide-react"

interface HeroSectionProps {
  onCtaClick: () => void
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Radial gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.65 0.2 250 / 0.08), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">
            Press Registrar General of India
          </span>
        </div>

        <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <span className="glow-text-blue">VeriTitle</span>{" "}
          <span className="text-accent">AI</span>
        </h1>

        <p className="text-lg font-medium tracking-wide text-secondary-foreground md:text-xl">
          Automated Semantic & Regulatory Compliance Engine
        </p>

        <p className="max-w-xl text-pretty text-muted-foreground">
          Instantly verify publication titles with AI-powered similarity and
          compliance validation against 160,000+ existing titles.
        </p>

        <button
          onClick={onCtaClick}
          className="group mt-4 flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 animate-pulse-glow"
        >
          Verify Title Now
          <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </button>

        <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-chart-4" />
            160K+ Titles Indexed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Multi-Language Support
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Real-Time Validation
          </span>
        </div>
      </div>
    </section>
  )
}
