import Image from "next/image";

export function Hero() {
  return (
    <section className="isolate relative flex min-h-screen flex-col overflow-hidden px-6 md:px-10">
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/45 via-black/10 to-transparent"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center pt-24">
        <h1 className="max-w-[14ch] text-[clamp(3rem,min(10vw,13vh),8.5rem)] font-normal leading-[1.05] tracking-tight text-white">
          (truly) confidential perps.
        </h1>
      </div>

      <a
        href="#how"
        aria-label="Scroll to how it works"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full p-3 text-white transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <svg
          aria-hidden="true"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M24 6v36M10 28l14 14 14-14" />
        </svg>
      </a>
    </section>
  );
}
