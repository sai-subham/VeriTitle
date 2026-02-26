"use client"

import { User, GitCompare, Brain, ShieldCheck, ArrowRight } from "lucide-react"

const STEPS = [
  {
    icon: User,
    label: "User Input",
    description: "Title submitted",
  },
  {
    icon: GitCompare,
    label: "String Matching",
    description: "Levenshtein & Jaro-Winkler",
  },
  {
    icon: Brain,
    label: "NLP Analysis",
    description: "Semantic embedding comparison",
  },
  {
    icon: ShieldCheck,
    label: "Rule Validation",
    description: "Regulatory compliance check",
  },
]

export function WorkflowSection() {
  return (
    <section className="relative z-10 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            How the AI Engine Works
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Multi-stage verification pipeline for maximum accuracy
          </p>
        </div>

        {/* Desktop Flow */}
        <div className="hidden items-center justify-between md:flex">
          {STEPS.map((step, idx) => (
            <div key={step.label} className="flex items-center">
              <div className="group flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-secondary/50 transition-all group-hover:border-primary/50 group-hover:glow-blue">
                  <step.icon className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <ArrowRight className="mx-4 h-5 w-5 shrink-0 text-primary/50" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Flow */}
        <div className="flex flex-col gap-4 md:hidden">
          {STEPS.map((step, idx) => (
            <div key={step.label} className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-4 glass rounded-xl px-6 py-4 w-full">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/5">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <ArrowRight className="h-4 w-4 rotate-90 text-primary/40" />
              )}
            </div>
          ))}
        </div>

        {/* Final Decision */}
        <div className="mt-8 flex justify-center">
          <div className="glass-strong rounded-2xl px-8 py-4 glow-blue">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 animate-pulse rounded-full bg-chart-4" />
              <span className="text-sm font-semibold text-foreground">
                Final Decision Score Generated
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
