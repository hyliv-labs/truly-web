const REPO_URL = "https://github.com/hyliv-labs/truly-extension";

const links = [
  { label: "How it works", href: "#how" },
  { label: "Privacy", href: "#privacy" },
  { label: "Source", href: REPO_URL, external: true },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <a
          href="#top"
          className="rounded-sm text-2xl font-normal tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:text-3xl"
        >
          Truly
        </a>

        <nav
          aria-label="Primary"
          className="flex items-center gap-5 text-base font-normal md:gap-10 md:text-2xl"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="rounded-sm transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
