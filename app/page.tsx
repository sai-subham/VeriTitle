"use client"

import { useRef } from "react"
import { NeuralBackground } from "@/components/neural-background"
import { HeroSection } from "@/components/hero-section"
import { VerificationPanel } from "@/components/verification-panel"
import { WorkflowSection } from "@/components/workflow-section"
import { FeaturesSection } from "@/components/features-section"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  const verifyRef = useRef<HTMLElement>(null)

  const scrollToVerify = () => {
    verifyRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <NeuralBackground />

      {/* Top gradient */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[1] h-40"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.13 0.02 260), transparent)",
        }}
        aria-hidden="true"
      />

      <main>
        <HeroSection onCtaClick={scrollToVerify} />
        <VerificationPanel ref={verifyRef} />
        <WorkflowSection />
        <FeaturesSection />
      </main>

      <SiteFooter />
    </div>
  )
}
