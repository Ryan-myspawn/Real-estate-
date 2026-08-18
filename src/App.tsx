import { useCallback, useState } from "react";
import Nav from "./site/nav";
import Hero from "./site/hero";
import {
  Amenities,
  Footer,
  Intro,
  LocationSection,
  Register,
  Residences,
  Vision,
} from "./site/sections";
import Walkthrough from "./site/walkthrough";
import { Cursor, Grain } from "./site/fx";

export default function App() {
  const [model, setModel] = useState<"A" | "B">("A");

  const walkModel = useCallback((m: "A" | "B") => {
    setModel(m);
    document.getElementById("walkthrough")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div id="top" className="bg-char text-bone">
      <Cursor />
      <Grain />
      <Nav />

      {/* Hero stays pinned; the rest of the page slides over it. */}
      <Hero />
      <main className="relative z-10 -mt-[1px]">
        <div className="rounded-t-[2rem] bg-char-soft sm:rounded-t-[3rem]">
          <Intro />
        </div>
        <Vision />
        <Residences onWalk={walkModel} />
        <Walkthrough model={model} setModel={setModel} />
        <Amenities />
        <LocationSection />
        <Register />
        <Footer />
      </main>
    </div>
  );
}
