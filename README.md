# Haven — Real Estate

A boutique real-estate landing site: curated listings grid with live search, stats band, and contact CTA.

## Stack
React 18 + Vite 5 + TypeScript + Tailwind CSS 3 + lucide-react.

## Quick start
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
```

## Rebranding
All brand values live in `src/config.ts` (name, tagline, city, phone, email).
Listings data lives in `src/data.ts` — property cards use CSS gradient placeholders;
swap the `art` field for real photography URLs when available.
