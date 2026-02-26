"use client"

import { Globe, AudioLines, Layers } from "lucide-react"

const FEATURES = [
  {
    icon: Globe,
    title: "Cross-Lingual Semantic Detection",
    description:
      "Detects similar meanings across Hindi, Bengali, Tamil, Telugu and English using multilingual NLP models.",
  },
  {
    icon: AudioLines,
    title: "Phonetic Similarity Matching",
    description:
      'Identifies phonetically similar titles like "Namaskar" vs "Namascar" using Soundex and metaphone algorithms.',
  },
  {
    icon: Layers,
    title: "Conceptual Theme Mapping",
    description:
      'Maps conceptual themes such as "Morning", "Evening", and "Dawn" to detect overlapping publication identities.',
  },
]

export function FeaturesSection() {
  return (
    <section className="relative z-10 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Innovation Highlights
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Cutting-edge AI capabilities that set VeriTitle apart
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group glass rounded-2xl p-6 transition-all hover:border-primary/30 hover:glow-blue"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 transition-colors group-hover:bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
