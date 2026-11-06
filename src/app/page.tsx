import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Privacy } from "@/components/privacy";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <main id="top" className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <Hero />
      <HowItWorks />
      <Privacy />
    </main>
  );
}
