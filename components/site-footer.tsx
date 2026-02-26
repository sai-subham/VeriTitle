import { Shield } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border/50 px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            VeriTitle AI
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
          <span>
            Built by{" "}
            <span className="font-medium text-secondary-foreground">
              ERROR 404 Team
            </span>
          </span>
          <span>
            SYNCHRONIZE 4.0 &mdash; February 26, 2026
          </span>
          <span>
            Powered by AI-ML Stack (Python, FastAPI, PyTorch/TensorFlow)
          </span>
        </div>
      </div>
    </footer>
  )
}
