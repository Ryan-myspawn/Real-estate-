import { useEffect, useState } from "react";

const LINKS = [
  { href: "#story", label: "The Island" },
  { href: "#vision", label: "Vision" },
  { href: "#residences", label: "Residences" },
  { href: "#walkthrough", label: "Walkthrough" },
  { href: "#amenities", label: "Amenities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > innerHeight * 0.72);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-lux ${
        scrolled
          ? "border-b border-champ/10 bg-char/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="group leading-none">
          <span className="font-display text-xl font-light lowercase tracking-wide text-bone transition-colors duration-500 group-hover:text-champ">
            manidvipa
          </span>
          <span className="ml-3 hidden font-display text-[11px] italic text-champ/80 sm:inline">
            the pearl island
          </span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-bone/55 transition-colors duration-400 hover:text-champ"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#register"
          className="rounded-full border border-champ/40 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-champ transition-all duration-500 ease-lux hover:bg-champ hover:text-char"
        >
          Register
        </a>
      </div>
    </nav>
  );
}
