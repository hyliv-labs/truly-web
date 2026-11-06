const REPO_URL = "https://github.com/hyliv-labs/truly-extension";

const links = [
  { label: "How it works", href: "#how" },
  { label: "Privacy", href: "#privacy" },
  { label: "Source", href: REPO_URL, external: true },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <a
          href="#top"
          className="rounded-sm text-lg font-medium tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          truly
        </a>

        <nav aria-label="Primary" className="flex items-center gap-6 text-sm md:gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="rounded-sm text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
