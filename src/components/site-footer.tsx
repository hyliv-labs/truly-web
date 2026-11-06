const REPO_URL = "https://github.com/hyliv-labs/truly-extension";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-medium tracking-tight">truly</span>
          <p className="max-w-md text-sm text-muted">
            Early build, not production ready. MIT licensed.
          </p>
        </div>

        <nav aria-label="Footer" className="flex items-center gap-6 text-sm">
          <a
            href="#how"
            className="rounded-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            How it works
          </a>
          <a
            href="#privacy"
            className="rounded-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Privacy
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Source
          </a>
        </nav>
      </div>
    </footer>
  );
}
