import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        {/* Hero demonstration area */}
        <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1 text-xs font-medium text-muted">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            Smart Agriculture Marketplace · Bangladesh
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Direct Farm-to-Enterprise Agricultural Exchange
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Powered by IoT edge monitoring, satellite soil analytics, and transparent digital contracts across Bangladesh.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
