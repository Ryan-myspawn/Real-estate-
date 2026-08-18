import { useEffect, useRef } from "react";
import { Reveal } from "./fx";

/** Slow-drifting champagne dust motes on a 2D canvas. */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(2, devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    const N = 42;
    const ps = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.7,
      v: 0.006 + Math.random() * 0.014,
      p: Math.random() * Math.PI * 2,
      a: 0.12 + Math.random() * 0.3,
    }));

    let raf = 0;
    let running = true;
    let last = performance.now();
    const frame = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (running) {
        ctx.clearRect(0, 0, w, h);
        for (const m of ps) {
          m.y -= m.v * dt * 6;
          m.p += dt * 0.6;
          if (m.y < -0.05) {
            m.y = 1.05;
            m.x = Math.random();
          }
          const x = m.x * w + Math.sin(m.p) * 14;
          const y = m.y * h;
          ctx.beginPath();
          ctx.arc(x, y, m.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 184, 160, ${m.a})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Mouse parallax + scroll dissolve
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let mx = 0;
    let my = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    };
    if (fine) addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const frame = () => {
      const sc = Math.min(1, scrollY / innerHeight);
      if (bgRef.current)
        bgRef.current.style.transform = `translate3d(${mx * -14}px, ${my * -10}px, 0)`;
      if (glowRef.current)
        glowRef.current.style.transform = `translate3d(${mx * 40}px, ${my * 30}px, 0)`;
      if (contentRef.current) {
        contentRef.current.style.opacity = String(Math.max(0, 1 - sc * 1.6));
        contentRef.current.style.transform = `translate3d(${mx * 8}px, ${sc * -46 + my * 6}px, 0)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      if (fine) removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <header ref={rootRef} className="sticky top-0 z-0 h-[100svh] overflow-hidden bg-char">
      {/* Architectural plate */}
      <div ref={bgRef} className="absolute -inset-6 will-change-transform">
        <img
          src="/stills/a-hero.jpg"
          alt="Manidvipa Model A+ concept villa at dusk"
          className="kenburns grade h-full w-full object-cover"
        />
        {/* Dusk grading */}
        <div className="absolute inset-0 bg-gradient-to-b from-char/70 via-char/10 to-char" />
        <div className="absolute inset-0 bg-char/15 mix-blend-multiply" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 115%, transparent 55%, rgba(15,15,15,0.6) 100%)",
          }}
        />
      </div>

      {/* Soft light bloom that follows the cursor */}
      <div
        ref={glowRef}
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-soft-light will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(201,184,160,0.55) 0%, transparent 65%)",
        }}
      />

      <Particles />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center will-change-transform"
      >
        <Reveal delay={200}>
          <p className="text-[10px] font-medium uppercase tracking-micro text-champ/80 sm:text-[11px]">
            D&nbsp;R Developers · Dreamz Reality presents
          </p>
        </Reveal>
        <Reveal delay={420}>
          <h1 className="mt-7 font-display text-[17vw] font-light lowercase leading-[0.95] tracking-tight text-bone sm:text-[13vw] lg:text-[10rem]">
            manidvipa
          </h1>
        </Reveal>
        <Reveal delay={640}>
          <p className="mt-3 font-display text-xl italic text-champ sm:text-2xl">
            the pearl island
          </p>
        </Reveal>
        <Reveal delay={880}>
          <p className="mx-auto mt-8 max-w-md text-sm font-light leading-relaxed text-bone/60 sm:text-[15px]">
            Twenty acres, twenty-one guntas of BDA-approved villa plots —
            planned like a private island at Mavallipura, Bangalore North.
          </p>
        </Reveal>
        <Reveal delay={1100} className="mt-11 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#walkthrough"
            className="group inline-flex items-center gap-3 rounded-full bg-bone px-7 py-3.5 text-[13px] font-medium tracking-wide text-char transition-all duration-500 ease-lux hover:bg-champ"
          >
            Walk the villa in 3D
            <span className="inline-block transition-transform duration-500 ease-lux group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#register"
            className="inline-flex items-center rounded-full border border-bone/25 px-7 py-3.5 text-[13px] font-medium tracking-wide text-bone/90 transition-all duration-500 ease-lux hover:border-champ/70 hover:text-champ"
          >
            Register interest
          </a>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-[9px] uppercase tracking-micro text-bone/40">Scroll</span>
        <span className="scroll-cue block h-10 w-px bg-champ/60" />
      </div>
    </header>
  );
}
