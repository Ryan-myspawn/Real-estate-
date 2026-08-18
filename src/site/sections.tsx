import { FormEvent, useState } from "react";
import { Counter, Reveal } from "./fx";
import {
  ADDRESS,
  AMENITY_GROUPS,
  CONTACTS,
  MODELS,
  NEARBY,
  PLOTS,
  RERA,
  STATS,
  WHATSAPP,
} from "../data";

function Kicker({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-4 text-[10px] font-medium uppercase tracking-micro ${
        dark ? "text-bronze" : "text-champ"
      }`}
    >
      <span className={`h-px w-10 ${dark ? "bg-bronze/50" : "bg-champ/40"}`} />
      {children}
    </p>
  );
}

/* ————— 02 · Introduction + stats ————— */
export function Intro() {
  return (
    <section id="story" className="bg-char-soft px-6 pb-28 pt-28 sm:pb-36 sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Kicker>The Pearl Island</Kicker>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-8 max-w-4xl font-display text-4xl font-light leading-[1.12] text-bone sm:text-5xl lg:text-6xl">
            Some addresses are bought.
            <br />
            <span className="italic text-champ">A few are kept.</span>
          </h2>
        </Reveal>
        <Reveal delay={260}>
          <p className="mt-9 max-w-xl text-[15px] font-light leading-[1.9] text-bone/55">
            Manidvipa is twenty acres of Bangalore North planned like a private
            island — tree-lined avenues, a clubhouse at its heart, gardens at
            its edges, and villa plots that wait patiently for houses worth
            keeping. BDA approved. RERA registered. Quietly under way at
            Mavallipura.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 130}>
              <div className="border-t border-champ/15 pt-6">
                <p className="font-display text-5xl font-light text-bone sm:text-6xl">
                  <Counter value={s.value} />
                  <span className="ml-1 font-display text-2xl italic text-champ">
                    {s.suffix}
                  </span>
                </p>
                <p className="mt-3 text-[13px] font-medium text-bone/85">{s.label}</p>
                <p className="mt-1 text-xs font-light leading-relaxed text-bone/40">
                  {s.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————— 03 · Vision & architecture ————— */
const MATERIALS = [
  { name: "Pearl render", hex: "#F1E9DC" },
  { name: "Smoked oak", hex: "#3E2F23" },
  { name: "Champagne gold", hex: "#B08D3E" },
  { name: "Sky glass", hex: "#8FB6C4" },
];

export function Vision() {
  return (
    <section id="vision" className="bg-bone px-6 py-28 text-char sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <Kicker dark>Vision &amp; architecture</Kicker>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-8 font-display text-4xl font-light leading-[1.1] sm:text-5xl">
              Built from light,
              <br />
              stone &amp; <span className="italic text-bronze">patience.</span>
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-8 max-w-md text-[15px] font-light leading-[1.9] text-char/60">
              The architecture keeps its voice low. Pearl-white volumes, one
              gold doorway, glazing the full width of the garden — nothing
              decorative, everything deliberate. Inside, rooms are drawn around
              how a family actually spends an evening, not how a brochure
              photographs one.
            </p>
          </Reveal>
          <Reveal delay={380}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {MATERIALS.map((m) => (
                <span key={m.name} className="flex items-center gap-3 text-xs text-char/60">
                  <span
                    className="h-6 w-6 rounded-full border border-char/10 shadow-inner"
                    style={{ background: m.hex }}
                  />
                  {m.name}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={480}>
            <p className="mt-12 border-l border-bronze/40 pl-6 font-display text-lg italic leading-relaxed text-char/70">
              “A villa should hold its ground in daylight and disappear into
              the evening.”
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5">
          <Reveal clip>
            <div className="group relative overflow-hidden rounded-sm">
              <img
                src="/stills/a-living.jpg"
                alt="Cutaway view of the Model A+ great room"
                loading="lazy"
                className="grade aspect-[16/10] w-full object-cover transition-transform duration-[1.6s] ease-lux group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-char/35 to-transparent opacity-60" />
              <p className="absolute bottom-4 left-5 text-[10px] uppercase tracking-micro text-bone/90">
                The great room · Model A+
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-5">
            <Reveal clip delay={150}>
              <div className="group relative overflow-hidden rounded-sm">
                <img
                  src="/stills/a-kitchen.jpg"
                  alt="Model A+ island kitchen and dining"
                  loading="lazy"
                  className="grade aspect-square w-full object-cover transition-transform duration-[1.6s] ease-lux group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-char/35 to-transparent opacity-60" />
                <p className="absolute bottom-3 left-4 text-[10px] uppercase tracking-micro text-bone/90">
                  Island kitchen
                </p>
              </div>
            </Reveal>
            <Reveal clip delay={280}>
              <div className="group relative overflow-hidden rounded-sm">
                <img
                  src="/stills/a-roofdeck.jpg"
                  alt="Model A+ pergola roof deck"
                  loading="lazy"
                  className="grade aspect-square w-full object-cover transition-transform duration-[1.6s] ease-lux group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-char/35 to-transparent opacity-60" />
                <p className="absolute bottom-3 left-4 text-[10px] uppercase tracking-micro text-bone/90">
                  Roof deck
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————— 04 · Residences ————— */
export function Residences({ onWalk }: { onWalk: (m: "A" | "B") => void }) {
  return (
    <section id="residences" className="bg-char px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Kicker>Concept residences</Kicker>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={120}>
            <h2 className="font-display text-4xl font-light leading-[1.1] text-bone sm:text-5xl">
              Two ways to live
              <br />
              on <span className="italic text-champ">the island.</span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="max-w-xs text-[13px] font-light leading-relaxed text-bone/45">
              Fully-furnished villa concepts, sized to Manidvipa's plots.
              Explore each one room by room in the 3D walkthrough below.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {(Object.keys(MODELS) as ("A" | "B")[]).map((key, i) => {
            const m = MODELS[key];
            return (
              <Reveal key={key} delay={i * 160}>
                <article className="group">
                  <div className="relative overflow-hidden rounded-sm">
                    <img
                      src={m.still}
                      alt={`${m.name} — ${m.epithet}`}
                      loading="lazy"
                      className="grade aspect-[16/11] w-full object-cover transition-transform duration-[1.8s] ease-lux group-hover:scale-[1.045]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-char via-char/10 to-transparent opacity-80" />
                    <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-champ transition-transform duration-700 ease-lux group-hover:scale-x-100" />
                    <div className="absolute bottom-6 left-7">
                      <p className="text-[10px] uppercase tracking-micro text-champ">
                        {m.epithet}
                      </p>
                      <p className="mt-2 font-display text-4xl font-light text-bone">
                        {m.name}
                      </p>
                    </div>
                    <p className="absolute right-7 top-6 font-display text-lg italic text-bone/80">
                      {m.area}
                    </p>
                  </div>

                  <div className="mt-7 grid grid-cols-3 gap-4 border-t border-champ/15 pt-6 text-[12px]">
                    <div>
                      <p className="text-bone/35">Configuration</p>
                      <p className="mt-1.5 font-medium text-bone/85">{m.config}</p>
                    </div>
                    <div>
                      <p className="text-bone/35">Sized for</p>
                      <p className="mt-1.5 font-medium text-bone/85">{m.plots}</p>
                    </div>
                    <div>
                      <p className="text-bone/35">Signature</p>
                      <p className="mt-1.5 font-medium text-bone/85">{m.signature}</p>
                    </div>
                  </div>

                  <p className="mt-5 max-w-lg text-[13px] font-light leading-[1.8] text-bone/50">
                    {m.story}
                  </p>

                  <button
                    onClick={() => onWalk(key)}
                    className="mt-6 inline-flex items-center gap-3 border-b border-champ/40 pb-1 text-[13px] font-medium tracking-wide text-champ transition-colors duration-500 hover:border-champ hover:text-bone"
                  >
                    Walk {m.name} in 3D
                    <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ————— 06 · Amenities & lifestyle ————— */
export function Amenities() {
  return (
    <>
      <section id="amenities" className="bg-bone px-6 py-28 text-char sm:py-36">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Kicker dark>Amenities &amp; lifestyle</Kicker>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-8 max-w-3xl font-display text-4xl font-light leading-[1.1] sm:text-5xl">
              A day on the island,
              <br />
              <span className="italic text-bronze">unhurried.</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {AMENITY_GROUPS.map((g, gi) => (
              <Reveal key={g.title} delay={gi * 150}>
                <div className="border-t border-char/10 pt-7">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-2xl font-light">{g.title}</h3>
                    <span className="text-[10px] uppercase tracking-micro text-bronze">
                      {g.note}
                    </span>
                  </div>
                  <ul className="mt-6 space-y-3.5">
                    {g.items.map((a, i) => (
                      <li
                        key={a}
                        className="flex items-baseline gap-4 text-[13.5px] font-light text-char/70"
                      >
                        <span className="font-display text-[11px] italic text-bronze/70">
                          {String(gi * 7 + i + 1).padStart(2, "0")}
                        </span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed cinematic band */}
      <section className="relative overflow-hidden bg-char">
        <img
          src="/stills/a-aerial.jpg"
          alt="Aerial view over the Model A+ villa and pool court"
          loading="lazy"
          className="grade h-[64vh] w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-char via-char/40 to-char" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <Reveal>
            <p className="max-w-3xl text-center font-display text-2xl font-light italic leading-[1.5] text-bone/90 sm:text-4xl">
              “Evenings arrive slowly here — down forty-foot avenues,
              across the labyrinth garden, up to a roof deck
              that keeps the last of the light.”
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ————— 07 · Location ————— */
export function LocationSection() {
  return (
    <section id="location" className="bg-char-soft px-6 py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <Reveal>
            <Kicker>Location &amp; connectivity</Kicker>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-8 font-display text-4xl font-light leading-[1.1] text-bone sm:text-5xl">
              North of the city.
              <br />
              <span className="italic text-champ">Ahead of it.</span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-md text-[15px] font-light leading-[1.9] text-bone/55">
              Mavallipura sits in Bangalore North's quiet green belt — beside
              its lake, minutes from Yelahanka, and on the growth line of the
              proposed Peripheral Ring Road and the Dr. K. Shivaram Karanth
              Layout. Close enough to arrive; far enough to exhale.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-10 divide-y divide-champ/15 border-y border-champ/15">
              {NEARBY.map((n) => (
                <div key={n.name} className="flex items-center justify-between py-4">
                  <span className="text-[14px] font-light text-bone/80">{n.name}</span>
                  <span className="text-[10px] uppercase tracking-micro text-champ/70">
                    {n.kind}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal clip delay={150}>
          <LocationMap />
        </Reveal>
      </div>
    </section>
  );
}

function LocationMap() {
  return (
    <div className="relative overflow-hidden rounded-sm border border-champ/15 bg-char p-2">
      <svg viewBox="0 0 640 520" className="w-full" role="img" aria-label="Indicative location map of Manidvipa at Mavallipura, Bangalore North">
        <rect width="640" height="520" fill="#121110" />
        {/* faint grid */}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`v${i}`} x1={i * 58} y1="0" x2={i * 58} y2="520" stroke="#C9B8A0" strokeOpacity="0.05" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 58} x2="640" y2={i * 58} stroke="#C9B8A0" strokeOpacity="0.05" />
        ))}
        {/* lake */}
        <path
          d="M112 128 C160 96 232 104 252 144 C272 184 224 224 168 216 C112 208 76 160 112 128 Z"
          fill="#8FB6C4"
          fillOpacity="0.16"
          stroke="#8FB6C4"
          strokeOpacity="0.35"
        />
        <text x="150" y="170" fill="#8FB6C4" fillOpacity="0.75" fontSize="11" fontStyle="italic" fontFamily="Fraunces, serif">
          Mavallipura Lake
        </text>
        {/* proposed PRR — dashed arc */}
        <path
          d="M40 470 C200 360 440 356 610 430"
          fill="none"
          stroke="#C9B8A0"
          strokeOpacity="0.5"
          strokeDasharray="7 8"
          strokeWidth="1.5"
        />
        <text x="352" y="352" fill="#C9B8A0" fillOpacity="0.7" fontSize="10" letterSpacing="2" fontFamily="Inter, sans-serif">
          PROPOSED PERIPHERAL RING ROAD
        </text>
        {/* road to Yelahanka */}
        <path d="M330 236 C420 250 500 280 588 276" fill="none" stroke="#C9B8A0" strokeOpacity="0.35" strokeWidth="1.2" />
        <circle cx="588" cy="276" r="4" fill="#C9B8A0" fillOpacity="0.8" />
        <text x="540" y="262" fill="#F7F4EF" fillOpacity="0.7" fontSize="11" fontFamily="Inter, sans-serif">
          Yelahanka
        </text>
        {/* Karanth layout */}
        <rect x="404" y="120" width="120" height="76" fill="none" stroke="#C9B8A0" strokeOpacity="0.3" strokeDasharray="3 4" />
        <text x="414" y="112" fill="#F7F4EF" fillOpacity="0.6" fontSize="10" fontFamily="Inter, sans-serif">
          Dr. K. Shivaram Karanth Layout
        </text>
        {/* Manidvipa marker */}
        <g transform="translate(312, 226)">
          <circle r="34" fill="#C9B8A0" fillOpacity="0.08" />
          <circle r="18" fill="#C9B8A0" fillOpacity="0.14" />
          <circle r="5.5" fill="#C9B8A0" />
          <text x="0" y="-46" textAnchor="middle" fill="#F7F4EF" fontSize="15" fontStyle="italic" fontFamily="Fraunces, serif">
            manidvipa
          </text>
          <text x="0" y="-30" textAnchor="middle" fill="#C9B8A0" fontSize="8.5" letterSpacing="2.5" fontFamily="Inter, sans-serif">
            MAVALLIPURA
          </text>
        </g>
      </svg>
      <div className="pulse-ring pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-[64%] rounded-full border border-champ/50" />
      <p className="px-4 py-3 text-[10px] font-light uppercase tracking-[0.2em] text-bone/30">
        Indicative map · not to scale
      </p>
    </div>
  );
}

/* ————— 08 · Register interest ————— */
export function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [plot, setPlot] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello D R Developers — I'd like to know more about Manidvipa (The Pearl Island), Mavallipura.` +
        (name ? ` I'm ${name}.` : "") +
        (plot ? ` Interested in a ${plot} plot.` : "") +
        (phone ? ` You can reach me on ${phone}.` : ""),
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank", "noopener");
    setSent(true);
  }

  return (
    <section id="register" className="bg-bone px-6 py-28 text-char sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal>
            <Kicker dark>Register interest</Kicker>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-8 font-display text-4xl font-light leading-[1.1] sm:text-5xl">
              Walk the island
              <br />
              <span className="italic text-bronze">in person.</span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-sm text-[15px] font-light leading-[1.9] text-char/60">
              Site visits are unhurried and by appointment. Leave a note and
              the team will call you — or reach them directly.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-10 space-y-3 text-[14px] font-light text-char/70">
              {CONTACTS.map((c) => (
                <p key={c}>
                  <a
                    href={`tel:+91${c.replace(/\s/g, "")}`}
                    className="border-b border-transparent transition-colors duration-300 hover:border-bronze hover:text-char"
                  >
                    +91 {c}
                  </a>
                </p>
              ))}
              <p className="pt-3 text-[13px] leading-relaxed text-char/45">{ADDRESS}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          {sent ? (
            <div className="flex h-full flex-col justify-center border border-bronze/25 bg-mist/40 p-10 text-center">
              <p className="font-display text-3xl font-light italic text-bronze">
                Thank you.
              </p>
              <p className="mx-auto mt-4 max-w-xs text-[14px] font-light leading-relaxed text-char/60">
                Your note is on its way over WhatsApp. If it didn't open,
                call +91 {CONTACTS[0]} — the team picks up.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="border border-char/10 bg-white/40 p-8 sm:p-10">
              <div className="space-y-8">
                <div>
                  <label htmlFor="rf-name" className="text-[10px] uppercase tracking-micro text-char/50">
                    Name
                  </label>
                  <input
                    id="rf-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="mt-2 w-full border-b border-char/20 bg-transparent pb-3 text-[15px] font-light outline-none transition-colors placeholder:text-char/25 focus:border-bronze"
                  />
                </div>
                <div>
                  <label htmlFor="rf-phone" className="text-[10px] uppercase tracking-micro text-char/50">
                    Phone
                  </label>
                  <input
                    id="rf-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputMode="tel"
                    placeholder="+91 ·····"
                    className="mt-2 w-full border-b border-char/20 bg-transparent pb-3 text-[15px] font-light outline-none transition-colors placeholder:text-char/25 focus:border-bronze"
                  />
                </div>
                <div>
                  <label htmlFor="rf-plot" className="text-[10px] uppercase tracking-micro text-char/50">
                    Plot preference
                  </label>
                  <select
                    id="rf-plot"
                    value={plot}
                    onChange={(e) => setPlot(e.target.value)}
                    className="mt-2 w-full appearance-none border-b border-char/20 bg-transparent pb-3 text-[15px] font-light text-char/80 outline-none transition-colors focus:border-bronze"
                  >
                    <option value="">Undecided — show me the island</option>
                    {PLOTS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="group mt-10 inline-flex w-full items-center justify-center gap-3 rounded-full bg-char px-8 py-4 text-[13px] font-medium tracking-wide text-bone transition-all duration-500 ease-lux hover:bg-bronze hover:text-char"
              >
                Send over WhatsApp
                <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">
                  →
                </span>
              </button>
              <p className="mt-4 text-center text-[11px] font-light text-char/35">
                Opens WhatsApp with your note pre-filled. Nothing is stored on
                this site.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ————— Footer ————— */
export function Footer() {
  return (
    <footer className="border-t border-champ/10 bg-char px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="font-display text-3xl font-light lowercase text-bone">manidvipa</p>
            <p className="mt-1 font-display text-sm italic text-champ">the pearl island</p>
          </div>
          <div className="text-right text-[12px] font-light leading-relaxed text-bone/40">
            <p>D R Developers · Dreamz Reality</p>
            <p>{ADDRESS}</p>
            <p>{CONTACTS.map((c) => `+91 ${c}`).join(" · ")}</p>
          </div>
        </div>
        <div className="hairline mt-10" />
        <p className="mt-6 text-[11px] font-light leading-[1.8] text-bone/30">
          RERA: {RERA} · BDA approved layout. The 3D walkthrough and all villa
          imagery are artistic, indicative furnishing concepts — not to scale;
          final plot dimensions and specifications per agreement. Peripheral
          Ring Road shown as proposed.
        </p>
      </div>
    </footer>
  );
}
