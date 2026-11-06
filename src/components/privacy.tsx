const hides = [
  "Which address funded which Lighter account",
  "Links between one trade and the next",
  "Reused browser sessions across owners",
];

const doesNot = [
  "Positions are public. Truly hides who trades, not what is traded.",
  "Lighter still sees your IP address.",
  "Timing and trade size can still be signals.",
  "A compromised browser sees everything.",
];

export function Privacy() {
  return (
    <section
      id="privacy"
      aria-labelledby="privacy-heading"
      className="border-t border-foreground/10 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Privacy
        </p>
        <h2
          id="privacy-heading"
          className="mt-4 max-w-2xl text-3xl font-medium tracking-tight md:text-5xl"
        >
          Clear about what it hides, and what it doesn&apos;t.
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="text-sm font-medium uppercase tracking-widest text-foreground">
              Truly hides
            </h3>
            <ul className="mt-6 divide-y divide-foreground/10 border-t border-foreground/10">
              {hides.map((item) => (
                <li key={item} className="py-5 text-base text-foreground/85">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-widest text-muted">
              Truly does not
            </h3>
            <ul className="mt-6 divide-y divide-foreground/10 border-t border-foreground/10">
              {doesNot.map((item) => (
                <li key={item} className="py-5 text-base text-foreground/60">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
