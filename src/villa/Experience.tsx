import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Scroll, ScrollControls, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import Villa from "./Villa";
import { AMENITIES, PLOTS, RERA, CONTACTS, ADDRESS } from "../data";

type V = "A" | "B";

type Stage = {
  cam: [number, number, number];
  look: [number, number, number];
  interior?: boolean;
  hideRoof?: boolean;
};

const STAGES_A: Stage[] = [
  { cam: [16, 9, 19], look: [0, 2.8, 0] }, // hero
  { cam: [9, 3.6, 14], look: [0, 2.4, 0] }, // exterior — glazed front + pool court
  { cam: [-2.6, 3.4, 9.6], look: [-2.6, 0.7, -0.6], interior: true }, // living (dollhouse)
  { cam: [4.6, 3.6, 9.2], look: [2.8, 0.7, 0.6], interior: true }, // kitchen/dining
  { cam: [-2.2, 6.4, 9.8], look: [-3, 3.9, 0], interior: true }, // master, first floor
  { cam: [3.4, 10.6, 6.6], look: [-2.4, 6.6, 0] }, // roof deck from above
  { cam: [26, 22, -26], look: [0, 0, 0] }, // amenities aerial
  { cam: [30, 22, 30], look: [0, 0, 0] }, // plots/contact far
];

const STAGES_B: Stage[] = [
  { cam: [-12, 7.5, 15], look: [0.5, 1.2, 0] }, // hero — entrance side, pavilion far
  { cam: [-7, 3, 12], look: [0, 1.6, 0] }, // exterior
  { cam: [-2.6, 4.4, 8.6], look: [-2.6, 0.4, -0.4], interior: true, hideRoof: true }, // living
  { cam: [2.6, 4.6, 8.2], look: [2, 0.4, -0.2], interior: true, hideRoof: true }, // kitchen/dining
  { cam: [-9, 4.2, -4.8], look: [-2.9, 0.5, -1.7], interior: true, hideRoof: true }, // bedroom from west
  { cam: [13, 4.5, 11], look: [5.5, 0.8, 2.8] }, // garden pavilion with house context
  { cam: [22, 18, -22], look: [0, 0, 0] },
  { cam: [26, 19, 26], look: [0, 0, 0] },
];

function Rig({ variant }: { variant: V }) {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const stages = variant === "A" ? STAGES_A : STAGES_B;
  const camPos = useMemo(() => new THREE.Vector3(), []);
  const lookPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const t = scroll.offset * (stages.length - 1);
    const i = Math.min(Math.floor(t), stages.length - 2);
    const f = THREE.MathUtils.smoothstep(t - i, 0, 1);
    const a = stages[i];
    const b = stages[i + 1];

    camPos.set(...a.cam).lerp(new THREE.Vector3(...b.cam), f);
    lookPos.set(...a.look).lerp(new THREE.Vector3(...b.look), f);
    // frame-rate-independent damping (12%/frame at 60fps)
    const k = 1 - Math.pow(0.88, delta * 60);
    state.camera.position.lerp(camPos, k);
    state.camera.lookAt(lookPos);

    // fade exterior shell during interior stages
    const wA = a.interior ? 1 : 0;
    const wB = b.interior ? 1 : 0;
    const interiorW = wA + (wB - wA) * f;
    const rA = a.hideRoof ? 1 : 0;
    const rB = b.hideRoof ? 1 : 0;
    const roofW = rA + (rB - rA) * f;
    const shellOpacity = 1 - interiorW * 0.93;
    const roofOpacity = Math.min(shellOpacity, 1 - roofW * 0.96);

    if (group.current) {
      group.current.traverse((obj) => {
        if (obj.parent?.name === "shell" || obj.parent?.parent?.name === "shell") {
          const mesh = obj as THREE.Mesh;
          if (mesh.isMesh) {
            const m = mesh.material as THREE.MeshStandardMaterial;
            const inRoof =
              mesh.parent?.name === "roof" || mesh.parent?.parent?.name === "roof";
            const base = (m.userData.base as number) ?? (m.userData.base = m.opacity);
            m.transparent = true;
            m.opacity = base * (inRoof ? roofOpacity : shellOpacity);
            m.depthWrite = m.opacity > 0.5;
          }
        }
      });
    }
  });

  return (
    <group ref={group}>
      <Villa variant={variant} />
    </group>
  );
}

function Panel({
  kicker,
  title,
  body,
  right,
}: {
  kicker: string;
  title: string;
  body: string;
  right?: boolean;
}) {
  return (
    <section className="flex h-[86svh] items-center px-6 sm:px-14">
      <div
        className={`max-w-md rounded-2xl border border-char/10 bg-bone/92 p-7 shadow-[0_24px_70px_-30px_rgba(62,47,35,0.5)] backdrop-blur ${
          right ? "ml-auto" : ""
        }`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-bronze">
          {kicker}
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-char">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-char/50">{body}</p>
      </div>
    </section>
  );
}

const COPY_A = [
  {
    kicker: "Model A+ · 3000 sq ft · 4 BHK duplex",
    title: "A villa told one floor at a time.",
    body: "Keep scrolling — the house will open itself for you. Fully furnished visualization of the Model A+ duplex on Manidvipa villa plots.",
  },
  {
    kicker: "Exterior",
    title: "Modern, clean, unmistakably yours.",
    body: "Double-height massing in pearl render with a champagne-gold entrance, full-width glazing and a private pool court on 40'×60' plots.",
  },
  {
    kicker: "Ground floor",
    title: "The great room.",
    body: "A living hall that seats ten without raising its voice — media wall, lounge seating and garden glazing across the full southern face.",
  },
  {
    kicker: "Ground floor",
    title: "Kitchen & dining that host.",
    body: "Island kitchen in stone and smoked oak, six-seat dining, and a tall pantry wall — the working heart of the house, open to the garden.",
  },
  {
    kicker: "First floor",
    title: "The master retreat.",
    body: "King suite with a dressing wall, balcony lounge, and morning light from the east glazing. Two further bedrooms share the floor.",
  },
  {
    kicker: "Roof",
    title: "A deck above the treeline.",
    body: "Pergola-shaded roof deck for Bangalore evenings — plumbed, wired and railed as standard on every Model A+.",
  },
  {
    kicker: "The Pearl Island",
    title: "20 acres, 21 guntas of thought.",
    body: "Clubhouse, pool, courts, temple, labyrinth, herbal garden, pet park and 40-ft roads — the full amenity schedule is below.",
  },
  {
    kicker: "Mavallipura · Bangalore North",
    title: "Choose your plot.",
    body: "BDA-approved layout beside the proposed Peripheral Ring Road, Dr. K. Shivaram Karanth Layout and Mavallipura Lake.",
  },
];

const COPY_B = [
  {
    kicker: "Model B · 1600 sq ft · 3 BHK",
    title: "Compact. Complete. Calm.",
    body: "Scroll to walk the single-storey Model B — every square foot furnished and working. Designed for 30'×40' and 30'×50' plots.",
  },
  {
    kicker: "Exterior",
    title: "One clean volume.",
    body: "A single pearl-render storey with a gold entrance and a glazed garden face — low maintenance, high presence.",
  },
  {
    kicker: "Living",
    title: "The everything room.",
    body: "Lounge, media wall and garden view in one generous space that borrows light from the full-height glazing.",
  },
  {
    kicker: "Kitchen & dining",
    title: "Open, social, efficient.",
    body: "Island counter with breakfast stools, four-seat dining and a tall storage wall — nothing wasted at 1600 sq ft.",
  },
  {
    kicker: "Bedrooms",
    title: "Rest, properly.",
    body: "The principal bedroom anchors the quiet corner of the plan, wardrobed wall included; two further rooms flex as bed, study or den.",
  },
  {
    kicker: "Garden",
    title: "Your pavilion evenings.",
    body: "A timber pergola pavilion off the lawn — the Model B answer to the roof deck, at ground level under open sky.",
  },
  {
    kicker: "The Pearl Island",
    title: "20 acres, 21 guntas of thought.",
    body: "Clubhouse, pool, courts, temple, labyrinth, herbal garden, pet park and 40-ft roads — the full amenity schedule is below.",
  },
  {
    kicker: "Mavallipura · Bangalore North",
    title: "Choose your plot.",
    body: "BDA-approved layout beside the proposed Peripheral Ring Road, Dr. K. Shivaram Karanth Layout and Mavallipura Lake.",
  },
];

function InfoPages() {
  return (
    <>
      {/* Amenities page (stage 6 area) */}
      <section className="flex h-[86svh] items-center px-6 sm:px-14">
        <div className="ml-auto w-full max-w-lg rounded-2xl border border-char/10 bg-bone/95 p-7 shadow-xl backdrop-blur">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-bronze">
            Amenities & facilities
          </p>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[13px] text-char/70">
            {AMENITIES.map((a) => (
              <span key={a}>· {a}</span>
            ))}
          </div>
        </div>
      </section>
      {/* Plots + contact page (stage 7 area) */}
      <section className="flex h-[86svh] items-center px-6 sm:px-14">
        <div className="w-full max-w-lg rounded-2xl border border-char/10 bg-bone/95 p-7 shadow-xl backdrop-blur">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-bronze">
            Surface & plots
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PLOTS.map((p) => (
              <span
                key={p}
                className="rounded-full border border-char/15 px-3 py-1 text-sm text-char/70"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="mt-6 border-t border-char/10 pt-5">
            <p className="font-display text-2xl font-semibold text-char">
              Book a site visit
            </p>
            <p className="mt-2 text-sm text-char/50">{ADDRESS}</p>
            <p className="mt-2 text-sm font-medium text-char/70">
              {CONTACTS.join(" · ")}
            </p>
            <p className="mt-4 text-[11px] leading-relaxed text-char/50">
              RERA: {RERA} · BDA approved. 3D visualization is an artistic,
              indicative furnishing concept — not to scale; final specifications
              per agreement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/** Neutral studio environment for PBR reflections — fully procedural, no network. */
function Env() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.55;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

export default function Experience({ variant }: { variant: V }) {
  const copy = variant === "A" ? COPY_A : COPY_B;
  return (
    <div className="h-[86svh] w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, toneMappingExposure: 1.12 }}
        camera={{ fov: 35, position: variant === "A" ? [16, 9, 19] : [-12, 7.5, 15] }}
      >
        <color attach="background" args={["#EFE8DB"]} />
        <fog attach="fog" args={["#EFE8DB", 70, 170]} />
        <Env />
        <hemisphereLight args={["#EAE4D8", "#77875F", 0.5]} />
        <directionalLight
          position={[18, 24, 10]}
          intensity={2.1}
          color="#FFF4E0"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0004}
          shadow-camera-left={-18}
          shadow-camera-right={18}
          shadow-camera-top={18}
          shadow-camera-bottom={-18}
          shadow-camera-far={70}
        />
        <directionalLight position={[-12, 10, -8]} intensity={0.35} color="#DCE4EC" />
        <ContactShadows
          position={[0, 0.005, 0]}
          opacity={0.42}
          scale={44}
          blur={2.6}
          far={12}
          resolution={512}
          frames={1}
        />
        <Suspense fallback={null}>
          <ScrollControls pages={8} damping={0.22}>
            <Rig variant={variant} />
            <Scroll html style={{ width: "100%" }}>
              <div className="w-screen">
                {copy.slice(0, 6).map((c, i) => (
                  <Panel key={i} {...c} right={i % 2 === 1} />
                ))}
                <InfoPages />
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
