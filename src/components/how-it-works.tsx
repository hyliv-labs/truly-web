const steps = [
  {
    title: "Derive",
    body: "A brand-new owner key for every trade. The index only ever goes up.",
  },
  {
    title: "Fund",
    body: "The Privacy Pools relayer funds that address, so none of your addresses pays.",
  },
  {
    title: "Trade",
    body: "Trade on Lighter with the extension as the connected wallet.",
  },
  {
    title: "Return",
    body: "Withdraw the balance and re-shield it. Gas is paid in USDC, so the owner never needs ETH.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-heading"
      className="px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          How it works
        </p>
        <h2
          id="how-heading"
          className="mt-4 max-w-2xl text-3xl font-medium tracking-tight md:text-5xl"
        >
          Every trade starts from a fresh address.
        </h2>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-6 bg-background p-8">
              <span className="font-mono text-xs text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-medium tracking-tight">{step.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
