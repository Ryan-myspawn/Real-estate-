import { useEffect, useRef, useState } from "react";
import { MODELS } from "../data";

type V = "A" | "B";
type Stop = { src: string; kicker: string; title: string; body: string };

const SEQ_A: Stop[] = [
  {
    src: "/stills/int-stair-hall.jpg",
    kicker: "Step inside",
    title: "The double-height entry",
    body: "Champagne light, a floating oak stair behind glass, and seven metres of air above the marble.",
  },
  {
    src: "/stills/int-great-room.jpg",
    kicker: "Ground floor",
    title: "The great room",
    body: "Living and dining in one long room that opens the full width of the garden.",
  },
  {
    src: "/stills/int-kitchen.jpg",
    kicker: "Ground floor",
    title: "The island kitchen",
    body: "A marble waterfall island, brass over glass pendants, and seats for the whole conversation.",
  },
  {
    src: "/stills/gal-master.jpg",
    kicker: "First floor",
    title: "The master suite",
    body: "A backlit headboard wall, a dressing room behind walnut, and the horizon at the foot of the bed.",
  },
  {
    src: "/stills/gal-bath.jpg",
    kicker: "First floor",
    title: "The master bath",
    body: "Book-matched marble under a skylight — brass, stone and morning light.",
  },
  {
    src: "/stills/int-terrace.jpg",
    kicker: "The roof",
    title: "Evenings on the deck",
    body: "String lights, planted decks and the Bangalore North treeline going soft at dusk.",
  },
];

const SEQ_B: Stop[] = [
  {
    src: "/stills/gal-foyer.jpg",
    kicker: "Step inside",
    title: "The walnut foyer",
    body: "One gold door, warm walnut walls and polished stone underfoot — the whole house in a first impression.",
  },
  {
    src: "/stills/gal-family.jpg",
    kicker: "Living",
    title: "The everything room",
    body: "A timber-coffered ceiling, a full media wall, and garden light from the glazed face.",
  },
  {
    src: "/stills/int-garden-dining.jpg",
    kicker: "Dining",
    title: "Dinner by the garden",
    body: "Eight seats under blown-glass pendants, sliding walls open to the lawn.",
  },
  {
    src: "/stills/gal-dark-kitchen.jpg",
    kicker: "Kitchen",
    title: "Black, marble & brass",
    body: "The chef's kitchen — a marble island long enough to seat five, framed in black and brass.",
  },
  {
    src: "/stills/gal-bedroom.jpg",
    kicker: "Bedrooms",
    title: "Rest, properly",
    body: "A backlit headboard, linen layers, and sheers that turn afternoon light to honey.",
  },
  {
    src: "/stills/int-balcony.jpg",
    kicker: "Outside",
    title: "The garden evenings",
    body: "A planted edge, a daybed, and the valley breathing beyond the rail.",
  },
];

const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

export default function EnterVilla({
  model,
  setModel,
}: {
  model: V;
  setModel: (m: V) => void;
}) {
  const seq = model === "A" ? SEQ_A : SEQ_B;
  const N = seq.length;
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let mx = 0;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / innerWidth - 0.5;
    };
    if (fine) addEventListener("mousemove", onMove, { passive: true });

    let lastIdx = -1;
    const frame = () => {
      const el = wrapRef.current;
      if (el) {
        const total = el.offsetHeight - innerHeight;
        const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / Math.max(1, total)));
        const t = p * (N - 1);
        const i = Math.min(N - 2, Math.floor(t));
        const f = t - i;
        const x = ease(Math.max(0, (f - 0.55) / 0.45)); // crossfade window
        for (let j = 0; j < N; j++) {
          const node = layerRefs.current[j];
          if (!node) continue;
          if (j === i) {
            // active image dollies forward as you "walk" into it
            node.style.opacity = String(1 - x);
            node.style.transform = `scale(${1.04 + f * 0.16}) translate3d(${mx * -12}px, 0, 0)`;
            node.style.zIndex = "1";
          } else if (j === i + 1) {
            node.style.opacity = String(j === N - 1 && f >= 1 ? 1 : x);
            node.style.transform = `scale(${0.96 + x * 0.08}) translate3d(${mx * -8}px, 0, 0)`;
            node.style.zIndex = "2";
          } else {
            node.style.opacity = "0";
            node.style.zIndex = "0";
          }
        }
        const idx = f > 0.55 ? i + 1 : i;
        if (idx !== lastIdx) {
          lastIdx = idx;
          setActive(idx);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      if (fine) removeEventListener("mousemove", onMove);
    };
  }, [N, reduced, model]);

  const stop = seq[active] ?? seq[0];

  if (reduced) {
    // Static fallback: plain full-bleed sections
    return (
      <section id="walkthrough" className="bg-char">
        {seq.map((s) => (
          <div key={s.src} className="relative h-[92svh] overflow-hidden">
            <img src={s.src} alt={s.title} loading="lazy" className="grade h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-char to-transparent p-10">
              <p className="text-[10px] uppercase tracking-micro text-champ">{s.kicker}</p>
              <p className="mt-2 font-display text-3xl font-light text-bone">{s.title}</p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section id="walkthrough" className="relative bg-char">
      <div ref={wrapRef} style={{ height: `${N * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* image layers */}
          {seq.map((s, j) => (
            <div
              key={`${model}-${s.src}`}
              ref={(n) => (layerRefs.current[j] = n)}
              className="absolute -inset-4 will-change-transform"
              style={{ opacity: j === 0 ? 1 : 0 }}
            >
              <img
                src={s.src}
                alt={s.title}
                className="grade h-full w-full object-cover"
                loading={j < 2 ? "eager" : "lazy"}
              />
            </div>
          ))}

          {/* cinematic grading + vignette */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-char/85 via-transparent to-char/45" />
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{ background: "radial-gradient(120% 100% at 50% 50%, transparent 62%, rgba(15,15,15,0.5) 100%)" }}
          />

          {/* header row */}
          <div className="absolute inset-x-0 top-0 z-20 px-6 pt-20 sm:px-12">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
              <p className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-micro text-champ">
                <span className="h-px w-10 bg-champ/50" />
                Walk the villa
              </p>
              <div className="flex items-center gap-1 rounded-full border border-bone/20 bg-char/45 p-1 backdrop-blur-md">
                {(Object.keys(MODELS) as V[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setModel(k)}
                    aria-pressed={model === k}
                    className={`rounded-full px-4 py-2 text-[11px] font-medium tracking-wide transition-all duration-500 ease-lux ${
                      model === k ? "bg-champ text-char" : "text-bone/60 hover:text-bone"
                    }`}
                  >
                    {MODELS[k].name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* room caption */}
          <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-14 sm:px-12">
            <div className="mx-auto flex max-w-6xl items-end justify-between gap-8">
              <div key={`${model}-${active}`} className="max-w-lg animate-[fadeup_0.7s_cubic-bezier(0.22,1,0.36,1)]">
                <p className="text-[10px] font-medium uppercase tracking-micro text-champ">
                  {stop.kicker}
                </p>
                <h3 className="mt-2 font-display text-3xl font-light leading-tight text-bone sm:text-5xl">
                  {stop.title}
                </h3>
                <p className="mt-3 max-w-md text-[13px] font-light leading-relaxed text-bone/70 sm:text-sm">
                  {stop.body}
                </p>
              </div>
              {/* progress rail */}
              <div className="hidden flex-col items-end gap-2.5 sm:flex">
                {seq.map((s, j) => (
                  <div key={s.src} className="flex items-center gap-3">
                    <span
                      className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
                        j === active ? "text-champ" : "text-bone/25"
                      }`}
                    >
                      {j === active ? s.title : ""}
                    </span>
                    <span
                      className={`block h-px transition-all duration-500 ${
                        j === active ? "w-10 bg-champ" : "w-5 bg-bone/25"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* scroll hint on first stop */}
          <div
            className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-[9px] uppercase tracking-micro text-bone/50 transition-opacity duration-700"
            style={{ opacity: active === 0 ? 1 : 0 }}
          >
            Keep scrolling — you're walking through
          </div>
        </div>
      </div>
    </section>
  );
}
