"use client"

import { useState, forwardRef } from "react"
import { Search, Loader2, Zap } from "lucide-react"
import { ResultsDashboard } from "./results-dashboard"

const LANGUAGES = [
  "English",
  "Hindi",
  "Bengali",
  "Tamil",
  "Telugu",
]

const MOCK_RESULTS = {
  score: 82,
  semanticScore: 0.76,
  similarTitles: [
    { title: "The Daily Herald", similarity: 89 },
    { title: "Herald Tribune", similarity: 74 },
    { title: "Daily News Herald", similarity: 68 },
    { title: "The Morning Herald", similarity: 61 },
  ],
  flaggedWords: ["Herald", "Daily"],
  crossLingual: true,
  complianceStatus: "needs_review" as const,
}

export const VerificationPanel = forwardRef<HTMLElement>(function VerificationPanel(_props, ref) {
  const [title, setTitle] = useState("")
  const [language, setLanguage] = useState("English")
  const [isVerifying, setIsVerifying] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleVerify = async () => {
    if (!title.trim()) return
    setIsVerifying(true)
    setShowResults(false)

    // Simulate AI processing
    await new Promise((r) => setTimeout(r, 3000))

    setIsVerifying(false)
    setShowResults(true)
  }

  return (
    <section ref={ref} className="relative z-10 px-4 py-20" id="verify">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Title Verification
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter a proposed publication title to check against the national
            registry
          </p>
        </div>

        {/* Glass Card */}
        <div className="glass-strong rounded-2xl p-6 md:p-8">
          <div className="flex flex-col gap-4">
            {/* Title Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter proposed publication title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                className="w-full rounded-xl border border-border bg-secondary/50 py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Language Select */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="flex-1 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                aria-label="Select language"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang} className="bg-card text-card-foreground">
                    {lang}
                  </option>
                ))}
              </select>

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={!title.trim() || isVerifying}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 glow-blue"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Verify
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Scanning Animation */}
          {isVerifying && (
            <div className="mt-6 overflow-hidden rounded-xl border border-primary/20 bg-secondary/30 p-6">
              <div className="relative flex flex-col items-center gap-4">
                <div className="relative h-24 w-full overflow-hidden rounded-lg">
                  {/* Scan line */}
                  <div className="absolute inset-x-0 h-0.5 bg-primary/80 animate-scan" />
                  <div className="flex h-full items-center justify-center">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-primary animate-node-pulse" />
                      <span className="text-sm font-medium text-primary">
                        AI Engine Processing
                      </span>
                      <div
                        className="h-3 w-3 rounded-full bg-accent animate-node-pulse"
                        style={{ animationDelay: "0.5s" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>String Matching...</span>
                  <span>NLP Analysis...</span>
                  <span>Cross-lingual Check...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {showResults && <ResultsDashboard results={MOCK_RESULTS} />}
      </div>
    </section>
  )
})
