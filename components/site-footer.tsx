export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="container mx-auto grid items-center justify-between gap-4 px-6 py-8 md:flex">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} FluxPulse AI. All rights reserved.</p>
        <div className="text-xs text-muted-foreground">Built for real-time monitoring and AI-driven predictions.</div>
      </div>
    </footer>
  )
}
