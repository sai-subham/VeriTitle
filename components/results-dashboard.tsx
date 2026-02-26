"use client"

import { useEffect, useState } from "react"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Globe,
  BarChart3,
  FileWarning,
} from "lucide-react"

interface SimilarTitle {
  title: string
  similarity: number
}

interface Results {
  score: number
  semanticScore: number
  similarTitles: SimilarTitle[]
  flaggedWords: string[]
  crossLingual: boolean
  complianceStatus: "approved" | "needs_review" | "rejected"
}

function CircularProgress({ value, size = 120 }: { value: number; size?: number }) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedValue / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100)
    return () => clearTimeout(timer)
  }, [value])

  const getColor = () => {
    if (value >= 70) return "oklch(0.75 0.15 145)"
    if (value >= 40) return "oklch(0.8 0.15 85)"
    return "oklch(0.65 0.2 30)"
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="circular-progress" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="oklch(0.2 0.02 260)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-foreground">{animatedValue}%</span>
        <span className="text-[10px] text-muted-foreground">Probability</span>
      </div>
    </div>
  )
}

function ComplianceBadge({ status }: { status: Results["complianceStatus"] }) {
  const config = {
    approved: {
      label: "Approved",
      icon: CheckCircle,
      className: "border-chart-4/30 bg-chart-4/10 text-chart-4",
    },
    needs_review: {
      label: "Needs Review",
      icon: AlertTriangle,
      className: "border-chart-5/30 bg-chart-5/10 text-chart-5",
    },
    rejected: {
      label: "Rejected",
      icon: XCircle,
      className: "border-destructive/30 bg-destructive/10 text-destructive",
    },
  }

  const { label, icon: Icon, className } = config[status]

  return (
    <div className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${className}`}>
      <Icon className="h-4 w-4" />
      {label}
    </div>
  )
}

export function ResultsDashboard({ results }: { results: Results }) {
  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        AI Analysis Results
      </h3>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Verification Score */}
        <div className="glass rounded-xl p-6 flex flex-col items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Verification Score
          </span>
          <CircularProgress value={results.score} />
          <ComplianceBadge status={results.complianceStatus} />
        </div>

        {/* Similar Titles */}
        <div className="glass rounded-xl p-6 md:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Similar Titles Found
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {results.similarTitles.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 px-4 py-2.5"
              >
                <span className="text-sm text-foreground">{item.title}</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${item.similarity}%`,
                        backgroundColor:
                          item.similarity > 80
                            ? "oklch(0.65 0.2 30)"
                            : item.similarity > 60
                            ? "oklch(0.8 0.15 85)"
                            : "oklch(0.75 0.15 145)",
                      }}
                    />
                  </div>
                  <span className="min-w-[36px] text-right text-xs font-mono text-muted-foreground">
                    {item.similarity}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {/* Flagged Words */}
        <div className="glass rounded-xl p-5">
          <div className="mb-3 flex items-center gap-2">
            <FileWarning className="h-4 w-4 text-chart-5" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Flagged Words
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.flaggedWords.map((word) => (
              <span
                key={word}
                className="rounded-md border border-chart-5/30 bg-chart-5/10 px-3 py-1 text-xs font-medium text-chart-5"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Cross-Lingual */}
        <div className="glass rounded-xl p-5">
          <div className="mb-3 flex items-center gap-2">
            <Globe className="h-4 w-4 text-accent" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Cross-Lingual Match
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full ${
                results.crossLingual ? "bg-chart-5" : "bg-chart-4"
              }`}
            />
            <span className="text-sm font-medium text-foreground">
              {results.crossLingual
                ? "Similar meaning detected"
                : "No cross-lingual match"}
            </span>
          </div>
        </div>

        {/* Semantic Score */}
        <div className="glass rounded-xl p-5">
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Semantic Similarity
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-foreground">
              {results.semanticScore.toFixed(2)}
            </span>
            <div className="flex-1">
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-1000"
                  style={{ width: `${results.semanticScore * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
