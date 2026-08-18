import { useState } from "react";
import {
  ArrowRight,
  Bath,
  BedDouble,
  MapPin,
  Phone,
  Ruler,
  Search,
} from "lucide-react";
import { BRAND, TAGLINE, CITY, PHONE, EMAIL } from "./config";
import { PROPERTIES, STATS } from "./data";

export default function App() {
  const [query, setQuery] = useState("");
  const shown = PROPERTIES.filter(
    (p) =>
      !query.trim() ||
      (p.title + " " + p.neighborhood).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-2xl font-semibold tracking-tight">
            {BRAND}<span className="text-brass">.</span>
          </span>
          <nav className="hidden gap-8 text-sm font-medium text-ink-mute sm:flex">
            <a href="#listings" className="hover:text-ink">Listings</a>
            <a href="#about" className="hover:text-ink">Why {BRAND}</a>
            <a href="#contact" className="hover:text-ink">Contact</a>
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-ink-soft"
          >
            Book a viewing
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_400px_at_85%_-10%,rgba(176,141,62,0.15),transparent)]" />
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 lg:pt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brass">
            {CITY} · boutique brokerage
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Find the place your{" "}
            <span className="italic text-pine">life happens</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-mute">
            {TAGLINE} Homes chosen with care, numbers explained honestly, and
            guidance without pressure — from people who live here too.
          </p>

          {/* Search */}
          <div className="mt-10 flex max-w-xl items-center gap-2 rounded-2xl border border-ink/10 bg-white p-2 shadow-[0_18px_50px_-20px_rgba(20,24,31,0.25)]">
            <Search className="ml-3 h-5 w-5 shrink-0 text-ink-mute" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by neighborhood or listing name…"
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-ink-mute/60"
            />
            <a
              href="#listings"
              className="flex items-center gap-1.5 rounded-xl bg-pine px-5 py-2.5 text-sm font-medium text-cream transition hover:brightness-110"
            >
              Browse <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="about" className="border-y border-ink/10 bg-sand/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-semibold text-pine">{s.value}</p>
              <p className="mt-1 text-sm text-ink-mute">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brass">
              Curated this week
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
              Featured listings
            </h2>
          </div>
          <p className="hidden text-sm text-ink-mute sm:block">
            {shown.length} of {PROPERTIES.length} homes
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_14px_40px_-24px_rgba(20,24,31,0.35)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(20,24,31,0.4)]"
            >
              <div className="relative h-52" style={{ background: p.art }}>
                {p.tag && (
                  <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold text-pine">
                    {p.tag}
                  </span>
                )}
                <span className="absolute bottom-4 right-4 rounded-full bg-ink/80 px-3 py-1 text-sm font-semibold text-cream">
                  {p.price}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-mute">
                  <MapPin className="h-3.5 w-3.5" /> {p.neighborhood}, {CITY}
                </p>
                <div className="mt-4 flex gap-5 border-t border-ink/10 pt-4 text-sm text-ink-mute">
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="h-4 w-4" /> {p.beds} bd
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath className="h-4 w-4" /> {p.baths} ba
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Ruler className="h-4 w-4" /> {p.sqft} ft²
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        {shown.length === 0 && (
          <p className="mt-10 text-ink-mute">
            Nothing matches "{query}" — try a neighborhood like “Zilker”.
          </p>
        )}
      </section>

      {/* CTA */}
      <section id="contact" className="bg-ink text-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Tell us what home means to you.
            </h2>
            <p className="mt-3 max-w-md text-cream/70">
              A 20-minute call, no scripts, no pressure. We’ll tell you honestly
              if now isn’t your moment.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-2 rounded-full bg-brass px-6 py-3 font-medium text-ink transition hover:bg-brass-soft"
            >
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="text-sm text-cream/70 hover:text-cream">
              {EMAIL}
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10 py-8 text-center text-sm text-ink-mute">
        © {new Date().getFullYear()} {BRAND} Real Estate · {CITY}
      </footer>
    </div>
  );
}
