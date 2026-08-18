import {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

/** Shared IntersectionObserver that flips `.is-in` on [data-reveal]/[data-clip]. */
let sharedObserver: IntersectionObserver | null = null;
function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            sharedObserver!.unobserve(e.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
  }
  return sharedObserver;
}

export function Reveal({
  children,
  delay = 0,
  clip = false,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  clip?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getObserver();
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, ["--rd" as string]: `${delay}ms` }}
      {...(clip ? { "data-clip": "" } : { "data-reveal": "" })}
    >
      {children}
    </div>
  );
}

export function useInView<T extends Element>(rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

/** Animated number that counts up when it enters the viewport. */
export function Counter({ value, className = "" }: { value: number; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>("-10% 0px");
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref} className={className}>
      {n}
    </span>
  );
}

/** Film grain overlay. */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] opacity-[0.055] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/** Custom cursor — champagne dot + lagging ring. Fine pointers only. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let rx = x;
    let ry = y;
    let hovering = false;
    let visible = false;
    let last = performance.now();

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      const t = e.target as Element | null;
      hovering = !!t?.closest("a, button, input, textarea, select, label, [data-hover]");
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    let raf = 0;
    const frame = (t: number) => {
      const dt = Math.min(64, t - last);
      last = t;
      const k = 1 - Math.pow(0.001, dt / 1000); // time-based lag
      rx += (x - rx) * k;
      ry += (y - ry) * k;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      const s = hovering ? 1.7 : 1;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%) scale(${s})`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-champ opacity-0 transition-opacity duration-300"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-champ/50 opacity-0 transition-opacity duration-300"
        style={{ transitionProperty: "opacity" }}
      />
    </>
  );
}
