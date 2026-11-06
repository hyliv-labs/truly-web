const REPO_URL = "https://github.com/hyliv-labs/truly-extension";

export function Hero() {
  return (
    <section className="isolate relative flex min-h-screen flex-col justify-center px-6 md:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-[15%] -top-[20%] h-[80vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,var(--color-accent),transparent)] opacity-30 blur-3xl" />
        <div className="absolute -bottom-[25%] left-[-10%] h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,var(--color-accent),transparent)] opacity-15 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <h1 className="max-w-4xl text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="text-muted">(truly)</span> confidential perps
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
          Truly funds each Lighter trade from Privacy Pools through a fresh
          owner address. One trade, one address, never reused.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#how"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            How it works
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-foreground/25 px-6 py-3 text-sm font-medium transition-colors hover:border-foreground/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            View source
          </a>
        </div>
      </div>

      <a
        href="#how"
        aria-label="Scroll to how it works"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-3 text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-safe:animate-bounce"
      >
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
