import { useState } from "react";
import Experience from "./villa/Experience";
import { BRAND, SUB, DEVELOPER, LOCATION } from "./config";

export default function App() {
  const [model, setModel] = useState<"A" | "B">("A");
  return (
    <div className="relative h-screen overflow-hidden bg-cream">
      {/* Header */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-start justify-between px-6 py-5">
          <div className="pointer-events-auto">
            <p className="font-display text-3xl font-semibold lowercase tracking-[0.08em] text-ink">
              {BRAND}
            </p>
            <p className="-mt-1 text-[11px] italic tracking-[0.2em] text-brass">
              {SUB}
            </p>
            <p className="mt-1 hidden text-[10px] uppercase tracking-[0.18em] text-ink-mute sm:block">
              {DEVELOPER} · {LOCATION}
            </p>
          </div>
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-ink/15 bg-cream/90 p-1 shadow-sm backdrop-blur">
            <button
              onClick={() => setModel("A")}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                model === "A" ? "bg-ink text-cream" : "text-ink-mute hover:text-ink"
              }`}
            >
              Model A+ · 3000 ft²
            </button>
            <button
              onClick={() => setModel("B")}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                model === "B" ? "bg-ink text-cream" : "text-ink-mute hover:text-ink"
              }`}
            >
              Model B · 1600 ft²
            </button>
          </div>
        </div>
      </header>

      {/* Scroll hint */}
      <div className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-ink-mute">
        scroll to walk the villa
      </div>

      <Experience key={model} variant={model} />
    </div>
  );
}
