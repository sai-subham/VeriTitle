"use client"

import { useState, forwardRef } from "react"
import { Search, Loader2, Zap } from "lucide-react"
import { ResultsDashboard } from "./results-dashboard"
import { useToast } from "@/hooks/use-toast"

const LANGUAGES = [
  "English",
  "Hindi",
  "Bengali",
  "Tamil",
  "Telugu",
]

export const VerificationPanel = forwardRef<HTMLElement>(function VerificationPanel(_props, ref) {
  const [title, setTitle] = useState("")
  const [language, setLanguage] = useState("English")
  const [isVerifying, setIsVerifying] = useState(false)
  const [results, setResults] = useState<any>(null)
  const { toast } = useToast()

  const handleVerify = async () => {
    if (!title.trim()) return
    setIsVerifying(true)
    setResults(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      const response = await fetch(`${apiUrl}/api/verify-title`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, language }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to verify title")
      }

      const data = await response.json()

      // Map backend VerificationResponse to Results expected by ResultsDashboard
      setResults({
        score: Math.round(data.verificationProbability),
        semanticScore: data.semanticScore / 100, // Frontend expects 0 to 1 scaling based on design
        similarTitles: data.similarTitles.map((t: any) => ({
          title: t.name,
          similarity: t.score
        })),
        flaggedWords: data.flaggedWords,
        // The current backend doesn't output crossLingual explicitly, so default it 
        crossLingual: false,
        complianceStatus: data.complianceStatus === "Needs Review" ? "needs_review" : data.complianceStatus.toLowerCase()
      })

    } catch (err: any) {
      toast({
        title: "Error Verification Failed",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
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
        {results && <ResultsDashboard results={results} />}
      </div>
    </section>
  )
})
