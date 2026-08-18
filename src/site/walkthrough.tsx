import { Suspense, lazy } from "react";
import { Reveal, useInView } from "./fx";
import { MODELS } from "../data";

const Experience = lazy(() => import("../villa/Experience"));

export default function Walkthrough({
  model,
  setModel,
}: {
  model: "A" | "B";
  setModel: (m: "A" | "B") => void;
}) {
  // Mount the WebGL scene only once the section approaches the viewport.
  const { ref, inView } = useInView<HTMLDivElement>("600px 0px");

  return (
    <section id="plan" className="bg-char px-0 pb-28 pt-28 sm:pb-36 sm:pt-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-micro text-champ">
            <span className="h-px w-10 bg-champ/40" />
            The plan, in 3D
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <Reveal delay={120}>
            <h2 className="font-display text-4xl font-light leading-[1.1] text-bone sm:text-5xl">
              See how the rooms
              <br />
              <span className="italic text-champ">sit together.</span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex items-center gap-1 rounded-full border border-champ/20 bg-char-soft p-1">
              {(Object.keys(MODELS) as ("A" | "B")[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setModel(k)}
                  aria-pressed={model === k}
                  className={`rounded-full px-5 py-2.5 text-[12px] font-medium tracking-wide transition-all duration-500 ease-lux ${
                    model === k
                      ? "bg-champ text-char"
                      : "text-bone/50 hover:text-bone"
                  }`}
                >
                  {MODELS[k].name} · {MODELS[k].area.replace(" sq ft", " ft²")}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={320}>
          <p className="mt-6 max-w-md text-[13px] font-light leading-relaxed text-bone/45">
            An interactive dollhouse of the plan — scroll inside the frame and
            the shell fades away floor by floor, from the entrance to the
            {model === "A" ? " roof deck" : " garden pavilion"}. Finishes are
            indicative; the photography above sets the intent.
          </p>
        </Reveal>
      </div>

      <div ref={ref} className="mx-auto mt-10 max-w-[1600px] px-3 sm:px-6">
        <div className="relative h-[86svh] overflow-hidden rounded-sm border border-champ/15">
          {inView ? (
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center bg-char-soft">
                  <p className="font-display text-lg italic text-champ/70">
                    Preparing the walkthrough…
                  </p>
                </div>
              }
            >
              <Experience key={model} variant={model} />
            </Suspense>
          ) : (
            <div className="h-full bg-char-soft" />
          )}
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-char/60 px-4 py-1.5 text-[9px] uppercase tracking-micro text-bone/70 backdrop-blur">
            Scroll inside the frame
          </div>
        </div>
      </div>
    </section>
  );
}
