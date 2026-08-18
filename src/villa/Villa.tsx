// Procedural archviz villa — two variants:
//  A = Model A+ (3000 sq ft duplex: G+1, balcony, roof deck, pool court)
//  B = Model B  (1600 sq ft single-storey, garden pavilion)
// Exterior shell meshes live in the group named "shell" so the camera rig can
// fade them out during interior scroll stages. PBR materials + procedural
// textures; interiors follow the photographic renders (cream fabric, walnut,
// brass, cove lighting).
import { ReactNode } from "react";
import { RoundedBox } from "@react-three/drei";
import {
  fabricTexture,
  grassTexture,
  marbleTexture,
  plasterTexture,
  walnutTexture,
  woodTexture,
} from "./textures";

const GOLD = "#B08D3E";
const CREAM = "#DDD3C4";
const LINEN = "#EFE7DA";
const CHARCOAL = "#2E2A26";
const GREENS = ["#6F8B5E", "#7B9668", "#647F54"];

type V = "A" | "B";
type P3 = [number, number, number];

/* ————— primitives ————— */

function Bx({
  p,
  s,
  c = "#FFFFFF",
  o,
  map,
  rough = 0.85,
  metal = 0.04,
  emissive,
  glow = 0,
  rot,
}: {
  p: P3;
  s: P3;
  c?: string;
  o?: number;
  map?: "wood" | "walnut" | "marble" | "plaster" | "fabric";
  rough?: number;
  metal?: number;
  emissive?: string;
  glow?: number;
  rot?: P3;
}) {
  const tex =
    map === "wood"
      ? woodTexture()
      : map === "walnut"
        ? walnutTexture()
        : map === "marble"
          ? marbleTexture()
          : map === "plaster"
            ? plasterTexture()
            : map === "fabric"
              ? fabricTexture()
              : undefined;
  return (
    <mesh position={p} rotation={rot} castShadow receiveShadow>
      <boxGeometry args={s} />
      <meshStandardMaterial
        color={c}
        map={tex}
        transparent={o !== undefined}
        opacity={o ?? 1}
        roughness={rough}
        metalness={metal}
        emissive={emissive ?? "#000000"}
        emissiveIntensity={glow}
      />
    </mesh>
  );
}

/** Soft-edged box for upholstery and bedding. */
function RBx({
  p,
  s,
  c,
  r = 0.06,
  map,
  rough = 0.95,
  rot,
}: {
  p: P3;
  s: P3;
  c: string;
  r?: number;
  map?: "fabric";
  rough?: number;
  rot?: P3;
}) {
  return (
    <RoundedBox
      position={p}
      rotation={rot}
      args={s}
      radius={Math.min(r, Math.min(...s) / 2.2)}
      smoothness={3}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={c}
        map={map === "fabric" ? fabricTexture() : undefined}
        roughness={rough}
        metalness={0.02}
      />
    </RoundedBox>
  );
}

function Glass({ p, s, o = 0.16 }: { p: P3; s: P3; o?: number }) {
  return (
    <mesh position={p} castShadow>
      <boxGeometry args={s} />
      <meshPhysicalMaterial
        color="#B9D2DA"
        transparent
        opacity={o}
        roughness={0.06}
        metalness={0}
        envMapIntensity={1.4}
      />
    </mesh>
  );
}

/** Bronze-framed glazing with vertical mullions, facing ±z. */
function WindowWall({
  p,
  w,
  h,
  cols = 3,
  frame = "#3B352E",
}: {
  p: P3;
  w: number;
  h: number;
  cols?: number;
  frame?: string;
}) {
  const F = frame;
  const t = 0.07;
  const d = 0.09;
  const kids: ReactNode[] = [];
  // outer frame
  kids.push(<Bx key="t" p={[0, h / 2 - t / 2, 0]} s={[w, t, d]} c={F} rough={0.5} metal={0.4} />);
  kids.push(<Bx key="b" p={[0, -h / 2 + t / 2, 0]} s={[w, t, d]} c={F} rough={0.5} metal={0.4} />);
  kids.push(<Bx key="l" p={[-w / 2 + t / 2, 0, 0]} s={[t, h, d]} c={F} rough={0.5} metal={0.4} />);
  kids.push(<Bx key="r" p={[w / 2 - t / 2, 0, 0]} s={[t, h, d]} c={F} rough={0.5} metal={0.4} />);
  for (let i = 1; i < cols; i++) {
    kids.push(
      <Bx
        key={`m${i}`}
        p={[-w / 2 + (w / cols) * i, 0, 0]}
        s={[0.045, h - t, d]}
        c={F}
        rough={0.5}
        metal={0.4}
      />,
    );
  }
  kids.push(<Glass key="g" p={[0, 0, 0]} s={[w - t * 1.4, h - t * 1.4, 0.02]} />);
  return <group position={p}>{kids}</group>;
}

/** Warm recessed cove + downlights under a ceiling. */
function Cove({ p, w, d }: { p: P3; w: number; d: number }) {
  const strip = 0.08;
  const inset = 0.55;
  return (
    <group position={p}>
      <Bx p={[0, 0, -d / 2 + inset]} s={[w - inset * 2, strip, strip]} c="#FFE3B3" emissive="#FFC97E" glow={2.4} />
      <Bx p={[0, 0, d / 2 - inset]} s={[w - inset * 2, strip, strip]} c="#FFE3B3" emissive="#FFC97E" glow={2.4} />
      <Bx p={[-w / 2 + inset, 0, 0]} s={[strip, strip, d - inset * 2]} c="#FFE3B3" emissive="#FFC97E" glow={2.4} />
      <Bx p={[w / 2 - inset, 0, 0]} s={[strip, strip, d - inset * 2]} c="#FFE3B3" emissive="#FFC97E" glow={2.4} />
      {[-w / 4, 0, w / 4].map((x, i) => (
        <mesh key={i} position={[x, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.03, 12]} />
          <meshStandardMaterial color="#FFF7E6" emissive="#FFEFC9" emissiveIntensity={2.2} />
        </mesh>
      ))}
    </group>
  );
}

/* ————— furniture ————— */

function Sofa({ p, rot = 0, w = 2.7 }: { p: P3; rot?: number; w?: number }) {
  return (
    <group position={p} rotation={[0, rot, 0]}>
      <Bx p={[0, 0.16, 0]} s={[w, 0.3, 1.05]} c={CREAM} map="fabric" />
      <RBx p={[-w / 4, 0.42, 0.06]} s={[w / 2 - 0.08, 0.22, 0.9]} c={CREAM} map="fabric" r={0.07} />
      <RBx p={[w / 4, 0.42, 0.06]} s={[w / 2 - 0.08, 0.22, 0.9]} c={CREAM} map="fabric" r={0.07} />
      <RBx p={[-w / 4, 0.72, -0.42]} s={[w / 2 - 0.1, 0.5, 0.24]} c={CREAM} map="fabric" r={0.08} />
      <RBx p={[w / 4, 0.72, -0.42]} s={[w / 2 - 0.1, 0.5, 0.24]} c={CREAM} map="fabric" r={0.08} />
      <RBx p={[-w / 2 + 0.09, 0.56, 0]} s={[0.2, 0.5, 1.02]} c={CREAM} map="fabric" r={0.07} />
      <RBx p={[w / 2 - 0.09, 0.56, 0]} s={[0.2, 0.5, 1.02]} c={CREAM} map="fabric" r={0.07} />
      <RBx p={[-w / 4, 0.62, -0.18]} s={[0.44, 0.34, 0.14]} c="#B9AA95" map="fabric" r={0.06} rot={[0.18, 0, 0]} />
      <RBx p={[w / 4 + 0.1, 0.62, -0.2]} s={[0.44, 0.34, 0.14]} c="#8A7B63" map="fabric" r={0.06} rot={[0.15, 0, 0]} />
    </group>
  );
}

function CoffeeTable({ p }: { p: P3 }) {
  return (
    <group position={p}>
      <Bx p={[0, 0.34, 0]} s={[1.3, 0.09, 0.85]} c="#6B4E37" map="walnut" rough={0.4} />
      <Bx p={[0, 0.12, 0]} s={[0.95, 0.16, 0.6]} c="#4A3626" map="walnut" rough={0.5} />
      <mesh position={[0.2, 0.42, 0.1]} castShadow>
        <cylinderGeometry args={[0.14, 0.16, 0.07, 20]} />
        <meshStandardMaterial color={CHARCOAL} roughness={0.4} />
      </mesh>
      <mesh position={[0.2, 0.5, 0.1]} castShadow>
        <sphereGeometry args={[0.09, 12, 10]} />
        <meshStandardMaterial color={GREENS[1]} roughness={1} />
      </mesh>
    </group>
  );
}

function TvWall({ p, rot = 0, h = 2.7 }: { p: P3; rot?: number; h?: number }) {
  return (
    <group position={p} rotation={[0, rot, 0]}>
      <Bx p={[0, h / 2, 0]} s={[3.4, h, 0.12]} c="#6B4E37" map="walnut" rough={0.45} />
      <Bx p={[0, h * 0.55, 0.075]} s={[1.9, 1.06, 0.04]} c="#0B0D10" rough={0.15} metal={0.4} />
      <Bx p={[0, h * 0.55 - 0.6, 0.09]} s={[1.7, 0.07, 0.06]} c="#1A1C1E" rough={0.3} />
      <Bx p={[0, 0.3, 0.24]} s={[2.9, 0.34, 0.42]} c="#3F3A33" rough={0.5} />
      <Bx p={[0, h - 0.08, 0.05]} s={[3.4, 0.06, 0.06]} c="#FFE3B3" emissive="#FFC97E" glow={1.8} />
    </group>
  );
}

function Pendant({ p }: { p: P3 }) {
  return (
    <group position={p}>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.9, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.16, 18, 14]} />
        <meshPhysicalMaterial color="#EFE2C8" transparent opacity={0.35} roughness={0.05} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.06, 10, 8]} />
        <meshStandardMaterial color="#FFEFC9" emissive="#FFD98F" emissiveIntensity={3.4} />
      </mesh>
    </group>
  );
}

function Stool({ p }: { p: P3 }) {
  return (
    <group position={p}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 10]} />
        <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.9} />
      </mesh>
      <RBx p={[0, 0.66, 0]} s={[0.42, 0.14, 0.42]} c={CREAM} map="fabric" r={0.06} />
      <RBx p={[0, 0.86, -0.16]} s={[0.4, 0.3, 0.08]} c={CREAM} map="fabric" r={0.04} />
    </group>
  );
}

function Kitchen({ p }: { p: P3 }) {
  return (
    <group position={p}>
      {/* back run — walnut base, marble top + splash */}
      <Bx p={[0, 0.45, -0.05]} s={[3.4, 0.9, 0.68]} c="#6B4E37" map="walnut" rough={0.45} />
      <Bx p={[0, 0.93, -0.05]} s={[3.5, 0.06, 0.78]} c="#F2EEE7" map="marble" rough={0.2} />
      <Bx p={[0, 1.62, -0.36]} s={[3.5, 1.32, 0.05]} c="#F2EEE7" map="marble" rough={0.25} />
      <Bx p={[0, 2.34, -0.2]} s={[3.5, 0.06, 0.4]} c="#FFE3B3" emissive="#FFC97E" glow={1.6} />
      {/* tall units + oven stack */}
      <Bx p={[-2.05, 1.4, -0.1]} s={[0.75, 2.8, 0.66]} c="#6B4E37" map="walnut" rough={0.45} />
      <Bx p={[-2.05, 1.66, 0.235]} s={[0.5, 0.34, 0.02]} c="#101214" rough={0.2} metal={0.5} />
      <Bx p={[-2.05, 1.2, 0.235]} s={[0.5, 0.3, 0.02]} c="#101214" rough={0.2} metal={0.5} />
      {/* waterfall marble island */}
      <Bx p={[0.1, 0.48, 1.55]} s={[2.6, 0.86, 0.95]} c="#EDE9E1" map="marble" rough={0.25} />
      <Bx p={[0.1, 0.94, 1.55]} s={[2.76, 0.07, 1.08]} c="#F2EEE7" map="marble" rough={0.18} />
      {/* brass tap + sink */}
      <mesh position={[0.55, 1.06, 1.4]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.24, 8]} />
        <meshStandardMaterial color={GOLD} roughness={0.25} metalness={0.95} />
      </mesh>
      <Bx p={[0.55, 0.975, 1.5]} s={[0.44, 0.015, 0.3]} c="#2F3235" rough={0.3} metal={0.6} />
      {/* stools + pendants */}
      <Stool p={[-0.55, 0, 2.35]} />
      <Stool p={[0.15, 0, 2.35]} />
      <Stool p={[0.85, 0, 2.35]} />
      <Pendant p={[-0.6, 2.15, 1.55]} />
      <Pendant p={[0.1, 2.15, 1.55]} />
      <Pendant p={[0.8, 2.15, 1.55]} />
    </group>
  );
}

function Chair({ p, rot = 0 }: { p: P3; rot?: number }) {
  return (
    <group position={p} rotation={[0, rot, 0]}>
      <RBx p={[0, 0.44, 0]} s={[0.44, 0.1, 0.44]} c={CREAM} map="fabric" r={0.04} />
      <RBx p={[0, 0.72, -0.19]} s={[0.44, 0.5, 0.09]} c={CREAM} map="fabric" r={0.045} />
      {(
        [
          [-0.17, -0.17],
          [0.17, -0.17],
          [-0.17, 0.17],
          [0.17, 0.17],
        ] as [number, number][]
      ).map(([x, z], i) => (
        <mesh key={i} position={[x, 0.2, z]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.4, 8]} />
          <meshStandardMaterial color="#5A4130" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Dining({ p, seats = 6 }: { p: P3; seats?: number }) {
  const perSide = Math.ceil(seats / 2);
  const chairs: ReactNode[] = [];
  for (let i = 0; i < perSide; i++) {
    const x = -0.7 + (1.4 / Math.max(1, perSide - 1)) * i;
    chairs.push(<Chair key={`a${i}`} p={[x, 0, 0.75]} rot={Math.PI} />);
    chairs.push(<Chair key={`b${i}`} p={[x, 0, -0.75]} />);
  }
  return (
    <group position={p}>
      <Bx p={[0, 0.73, 0]} s={[2.3, 0.07, 1.05]} c="#5A4130" map="walnut" rough={0.35} />
      <Bx p={[-0.8, 0.36, 0]} s={[0.12, 0.72, 0.85]} c="#4A3626" map="walnut" />
      <Bx p={[0.8, 0.36, 0]} s={[0.12, 0.72, 0.85]} c="#4A3626" map="walnut" />
      <mesh position={[0, 0.82, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, 0.1, 18]} />
        <meshStandardMaterial color={CHARCOAL} roughness={0.4} />
      </mesh>
      {chairs}
      <Pendant p={[-0.45, 2.1, 0]} />
      <Pendant p={[0.45, 2.1, 0]} />
    </group>
  );
}

function Bed({ p, w = 1.9, rot = 0 }: { p: P3; w?: number; rot?: number }) {
  return (
    <group position={p} rotation={[0, rot, 0]}>
      {/* backlit headboard wall */}
      <Bx p={[0, 1.15, -1.18]} s={[w + 1.1, 2.3, 0.08]} c="#CDC2B1" map="fabric" />
      <Bx p={[0, 2.2, -1.12]} s={[w + 1.0, 0.05, 0.05]} c="#FFE3B3" emissive="#FFC97E" glow={2.2} />
      <RBx p={[0, 0.85, -1.05]} s={[w, 1.1, 0.16]} c="#B8AB97" map="fabric" r={0.05} />
      {/* platform + mattress + duvet */}
      <Bx p={[0, 0.22, 0]} s={[w, 0.34, 2.15]} c="#4A3626" map="walnut" />
      <RBx p={[0, 0.5, 0]} s={[w - 0.08, 0.3, 2.05]} c={LINEN} map="fabric" r={0.08} />
      <RBx p={[0, 0.62, 0.35]} s={[w - 0.04, 0.16, 1.3]} c="#E4D9C6" map="fabric" r={0.07} />
      <RBx p={[-w / 4, 0.72, -0.7]} s={[w / 2 - 0.14, 0.16, 0.5]} c="#F4EFE5" map="fabric" r={0.06} rot={[0.25, 0, 0]} />
      <RBx p={[w / 4, 0.72, -0.7]} s={[w / 2 - 0.14, 0.16, 0.5]} c="#F4EFE5" map="fabric" r={0.06} rot={[0.25, 0, 0]} />
      <RBx p={[0, 0.68, -0.35]} s={[0.8, 0.14, 0.3]} c="#8A7B63" map="fabric" r={0.05} />
      {/* nightstands + lamps */}
      {[-1, 1].map((sgn) => (
        <group key={sgn} position={[sgn * (w / 2 + 0.4), 0, -0.7]}>
          <Bx p={[0, 0.26, 0]} s={[0.5, 0.44, 0.45]} c="#4A3626" map="walnut" />
          <mesh position={[0, 0.56, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.05, 0.16, 10]} />
            <meshStandardMaterial color={CHARCOAL} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.72, 0]}>
            <cylinderGeometry args={[0.11, 0.13, 0.14, 12]} />
            <meshStandardMaterial color="#F2E8D2" emissive="#FFDFA6" emissiveIntensity={1.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Wardrobe({ p, w = 2.2, rot = 0 }: { p: P3; w?: number; rot?: number }) {
  const doors = Math.max(2, Math.round(w / 0.55));
  return (
    <group position={p} rotation={[0, rot, 0]}>
      <Bx p={[0, 0, 0]} s={[w, 2.3, 0.6]} c="#6B4E37" map="walnut" rough={0.45} />
      {Array.from({ length: doors - 1 }, (_, i) => (
        <Bx
          key={i}
          p={[-w / 2 + (w / doors) * (i + 1), 0, 0.301]}
          s={[0.012, 2.24, 0.012]}
          c="#3A2C1F"
        />
      ))}
      {Array.from({ length: doors }, (_, i) => (
        <Bx
          key={`h${i}`}
          p={[-w / 2 + (w / doors) * (i + 0.5) + 0.16, 0.1, 0.315]}
          s={[0.02, 0.3, 0.02]}
          c={GOLD}
          metal={0.9}
          rough={0.3}
        />
      ))}
    </group>
  );
}

function Stairs({ p, rot = 0 }: { p: P3; rot?: number }) {
  const steps = Array.from({ length: 10 });
  return (
    <group position={p} rotation={[0, rot, 0]}>
      {steps.map((_, i) => (
        <Bx
          key={i}
          p={[0, 0.15 + i * 0.3, -i * 0.32]}
          s={[1.1, 0.09, 0.34]}
          c="#B98F5C"
          map="wood"
          rough={0.5}
        />
      ))}
      {steps.map((_, i) => (
        <Bx key={`r${i}`} p={[0, 0.05 + i * 0.3, -i * 0.32 + 0.13]} s={[1.1, 0.22, 0.06]} c="#A67C4C" map="wood" />
      ))}
      <Glass p={[0.58, 1.55, -1.44]} s={[0.03, 2.9, 3.3]} o={0.14} />
      <Bx p={[0.6, 3.05, -1.44]} s={[0.05, 0.05, 3.3]} c="#3B352E" metal={0.5} rough={0.4} />
    </group>
  );
}

function Plant({ p, s = 1 }: { p: P3; s?: number }) {
  return (
    <group position={p} scale={s}>
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.13, 0.55, 14]} />
        <meshStandardMaterial color="#26221E" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.5, 6]} />
        <meshStandardMaterial color="#4A3B2A" roughness={1} />
      </mesh>
      {([[0, 1.02, 0, 0.3], [0.16, 0.86, 0.1, 0.2], [-0.15, 0.92, -0.08, 0.22]] as const).map(
        ([x, y, z, r], i) => (
          <mesh key={i} position={[x, y, z]} castShadow>
            <sphereGeometry args={[r, 10, 8]} />
            <meshStandardMaterial color={GREENS[i % 3]} roughness={1} />
          </mesh>
        ),
      )}
    </group>
  );
}

function Tree({ p, s = 1 }: { p: P3; s?: number }) {
  return (
    <group position={p} scale={s}>
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.12, 1.1, 8]} />
        <meshStandardMaterial color="#4A3B2A" roughness={1} />
      </mesh>
      {([[0, 1.5, 0, 0.62], [0.32, 1.2, 0.12, 0.4], [-0.3, 1.3, -0.1, 0.44], [0.05, 1.85, 0.05, 0.4]] as const).map(
        ([x, y, z, r], i) => (
          <mesh key={i} position={[x, y, z]} castShadow>
            <sphereGeometry args={[r, 12, 10]} />
            <meshStandardMaterial color={GREENS[(i + 1) % 3]} roughness={1} />
          </mesh>
        ),
      )}
    </group>
  );
}

/** Glass balustrade with bronze posts and handrail, along x. */
function Railing({ p, w, rot = 0 }: { p: P3; w: number; rot?: number }) {
  const posts = Math.max(2, Math.round(w / 1.1));
  return (
    <group position={p} rotation={[0, rot, 0]}>
      <Glass p={[0, 0.5, 0]} s={[w, 0.95, 0.025]} o={0.12} />
      <Bx p={[0, 1.0, 0]} s={[w, 0.05, 0.07]} c="#3B352E" metal={0.5} rough={0.4} />
      {Array.from({ length: posts + 1 }, (_, i) => (
        <Bx key={i} p={[-w / 2 + (w / posts) * i, 0.5, 0]} s={[0.045, 1.0, 0.045]} c="#3B352E" metal={0.5} rough={0.4} />
      ))}
    </group>
  );
}

/** Slatted timber pergola with corner posts. */
function Pergola({ p, w, d, h = 2.5 }: { p: P3; w: number; d: number; h?: number }) {
  const slats = Math.round(w / 0.48);
  return (
    <group position={p}>
      {Array.from({ length: slats }, (_, i) => (
        <Bx
          key={i}
          p={[-w / 2 + (w / (slats - 1)) * i, h, 0]}
          s={[0.08, 0.14, d]}
          c="#6B5138"
          map="walnut"
          rough={0.6}
        />
      ))}
      <Bx p={[0, h + 0.12, -d / 2 + 0.08]} s={[w + 0.2, 0.1, 0.16]} c="#5E4632" map="walnut" />
      <Bx p={[0, h + 0.12, d / 2 - 0.08]} s={[w + 0.2, 0.1, 0.16]} c="#5E4632" map="walnut" />
      {(
        [
          [-w / 2 + 0.1, -d / 2 + 0.1],
          [w / 2 - 0.1, -d / 2 + 0.1],
          [-w / 2 + 0.1, d / 2 - 0.1],
          [w / 2 - 0.1, d / 2 - 0.1],
        ] as [number, number][]
      ).map(([x, z], i) => (
        <Bx key={`p${i}`} p={[x, h / 2, z]} s={[0.14, h, 0.14]} c="#5E4632" map="walnut" />
      ))}
    </group>
  );
}

function Pool({ p, w = 4.5, d = 8 }: { p: P3; w?: number; d?: number }) {
  return (
    <group position={p}>
      <Bx p={[0, 0.02, 0]} s={[w + 0.7, 0.09, d + 0.7]} c="#E8E2D6" map="marble" rough={0.4} />
      <mesh position={[0, 0.066, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w, d]} />
        <meshPhysicalMaterial color="#4FA3B5" transparent opacity={0.85} roughness={0.05} envMapIntensity={1.6} />
      </mesh>
    </group>
  );
}

/* ————— exterior shells ————— */

function ShellA() {
  return (
    <group name="shell">
      {/* ground floor walls */}
      <Bx p={[0, 1.6, -4.05]} s={[11, 3.2, 0.28]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[-2.4, 1.6, 4.05]} s={[6.2, 3.2, 0.28]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[5.3, 1.6, 4.05]} s={[0.4, 3.2, 0.28]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[0.62, 2.9, 4.05]} s={[12.2, 0.62, 0.28]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[-5.5, 1.6, 0]} s={[0.28, 3.2, 8.3]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[5.5, 1.6, 0]} s={[0.28, 3.2, 8.3]} c="#E7E0D3" map="plaster" o={1} />
      {/* ground front glazing into the pool court */}
      <WindowWall p={[2.9, 1.42, 4.2]} w={4.4} h={2.5} cols={3} />
      {/* upper floor walls */}
      <Bx p={[-1, 4.9, -3.05]} s={[9, 3, 0.28]} c="#E7E0D3" map="plaster" o={1} />
      <Bx p={[-3.6, 4.9, 3.05]} s={[3.8, 3, 0.28]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[2.05, 4.9, 3.05]} s={[3.0, 3, 0.28]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[-1, 6.1, 3.05]} s={[9, 0.6, 0.28]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[-5.5, 4.9, 0]} s={[0.28, 3, 6.3]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[3.5, 4.9, 0]} s={[0.28, 3, 6.3]} c="#EFEAE0" map="plaster" o={1} />
      {/* upper glazing */}
      <WindowWall p={[-0.55, 4.75, 3.24]} w={2.2} h={2.1} cols={2} />
      <Bx p={[-0.55, 3.56, 3.05]} s={[2.3, 0.28, 0.28]} c="#EFEAE0" map="plaster" o={1} />
      {/* parapets with capping */}
      <Bx p={[-1, 6.62, -3.05]} s={[9.2, 0.5, 0.24]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[-1, 6.9, -3.05]} s={[9.3, 0.07, 0.32]} c="#DDD5C6" o={1} />
      <Bx p={[-1, 6.62, 3.05]} s={[9.2, 0.5, 0.24]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[-1, 6.9, 3.05]} s={[9.3, 0.07, 0.32]} c="#DDD5C6" o={1} />
      {/* terrace slab over ground east wing */}
      <Bx p={[4.6, 3.4, 0]} s={[2, 0.5, 8.3]} c="#EFEAE0" map="plaster" o={1} />
      {/* gold entrance with frame + handle */}
      <Bx p={[-3.4, 1.35, 4.2]} s={[1.5, 2.7, 0.1]} c="#DDD5C6" o={1} />
      <Bx p={[-3.4, 1.3, 4.24]} s={[1.3, 2.6, 0.09]} c={GOLD} rough={0.35} metal={0.8} o={1} />
      <Bx p={[-2.95, 1.3, 4.31]} s={[0.035, 0.7, 0.035]} c="#2E2A26" metal={0.6} rough={0.3} o={1} />
      {/* roof slab over upper volume */}
      <group name="roof">
        <Bx p={[-1, 6.42, 0]} s={[9.2, 0.26, 6.5]} c="#E7E0D3" map="plaster" o={1} />
      </group>
    </group>
  );
}

function ShellB() {
  return (
    <group name="shell">
      <Bx p={[0, 1.6, -3.05]} s={[8.5, 3.2, 0.28]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[-2.0, 1.6, 3.05]} s={[4.5, 3.2, 0.28]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[3.9, 1.6, 3.05]} s={[0.7, 3.2, 0.28]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[0, 2.92, 3.05]} s={[8.5, 0.56, 0.28]} c="#EFEAE0" map="plaster" o={1} />
      <Bx p={[-4.25, 1.6, 0]} s={[0.28, 3.2, 6.3]} c="#E7E0D3" map="plaster" o={1} />
      <Bx p={[4.25, 1.6, 0]} s={[0.28, 3.2, 6.3]} c="#EFEAE0" map="plaster" o={1} />
      {/* fascia band + roof */}
      <Bx p={[0, 3.42, 0]} s={[8.9, 0.5, 6.7]} c="#E7E0D3" map="plaster" o={1} />
      <Bx p={[0, 3.7, 0]} s={[9.0, 0.07, 6.8]} c="#DDD5C6" o={1} />
      {/* garden glazing + gold entrance */}
      <WindowWall p={[1.9, 1.42, 3.24]} w={3.3} h={2.5} cols={3} />
      <Bx p={[-2.6, 1.35, 3.2]} s={[1.4, 2.7, 0.1]} c="#DDD5C6" o={1} />
      <Bx p={[-2.6, 1.3, 3.24]} s={[1.2, 2.6, 0.09]} c={GOLD} rough={0.35} metal={0.8} o={1} />
      <Bx p={[-2.18, 1.3, 3.31]} s={[0.035, 0.7, 0.035]} c="#2E2A26" metal={0.6} rough={0.3} o={1} />
      <group name="roof">
        <Bx p={[0, 3.3, 0]} s={[8.7, 0.22, 6.5]} c="#E7E0D3" map="plaster" o={1} />
      </group>
    </group>
  );
}

/* ————— the villa ————— */

export default function Villa({ variant }: { variant: V }) {
  const A = variant === "A";
  return (
    <group>
      {/* site */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial map={grassTexture()} roughness={1} />
      </mesh>
      {/* driveway + garden path */}
      <Bx p={[0, 0.005, 8.5]} s={[4, 0.02, 7]} c="#D9D2C4" map="marble" rough={0.6} />
      {A && <Pool p={[8.6, 0, 5]} />}
      <Tree p={[-7.5, 0, 6]} s={1.15} />
      <Tree p={[7.5, 0, -5.5]} />
      <Tree p={[-7.5, 0, -6]} s={0.9} />
      <Tree p={[11.5, 0, -1]} s={1.05} />

      {/* ground slab + oak floor */}
      <Bx p={[0, 0.08, 0]} s={A ? [11.4, 0.16, 8.7] : [8.9, 0.16, 6.7]} c="#DDD5C6" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.165, 0]} receiveShadow>
        <planeGeometry args={A ? [10.8, 8.1] : [8.3, 6.1]} />
        <meshStandardMaterial map={woodTexture()} roughness={0.55} />
      </mesh>

      {/* GROUND interior */}
      <group>
        <Sofa p={[-2.6, 0.17, 1.7]} rot={Math.PI} />
        <CoffeeTable p={[-2.6, 0.17, 0.1]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.6, 0.175, 0.7]} receiveShadow>
          <planeGeometry args={[3.6, 2.8]} />
          <meshStandardMaterial color="#E2D9C8" map={fabricTexture()} roughness={1} />
        </mesh>
        <TvWall p={A ? [-2.6, 0.17, -1.7] : [-2.4, 0.17, -0.35]} h={A ? 2.7 : 2.1} />
        <Dining p={A ? [1.6, 0.17, -1.9] : [1.0, 0.17, -1.85]} seats={A ? 6 : 4} />
        <Kitchen p={A ? [3.2, 0.17, 1.2] : [2.4, 0.17, 0.2]} />
        {A ? (
          <Stairs p={[-4.6, 0.17, 1.4]} />
        ) : (
          <group>
            <Bed p={[-2.9, 0.17, -1.7]} w={1.6} />
            <Wardrobe p={[-4.0, 1.32, -0.7]} w={0.6} />
          </group>
        )}
        <Plant p={A ? [4.8, 0.17, 3.3] : [3.7, 0.17, 2.5]} />
        <Plant p={A ? [-4.9, 0.17, -3.3] : [3.9, 0.17, -2.6]} s={0.85} />
      </group>

      {/* ground-floor ceiling cove (under the upper slab / roof) */}
      <Cove p={A ? [-0.3, 3.14, 0] : [0, 3.12, 0]} w={A ? 9.6 : 7.6} d={A ? 7.4 : 5.6} />

      {/* UPPER interior (Model A+ only) */}
      {A && (
        <group>
          <Bx p={[-1, 3.32, 0]} s={[9.2, 0.24, 6.5]} c="#DDD5C6" />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1, 3.45, 0]} receiveShadow>
            <planeGeometry args={[8.6, 5.9]} />
            <meshStandardMaterial map={woodTexture()} roughness={0.55} />
          </mesh>
          {/* master suite */}
          <Bed p={[-3, 3.46, 0.4]} w={2} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3, 3.47, 0.6]} receiveShadow>
            <planeGeometry args={[3.4, 3]} />
            <meshStandardMaterial color="#DCD3C2" map={fabricTexture()} roughness={1} />
          </mesh>
          <Wardrobe p={[-4.95, 4.61, -1.6]} w={2} rot={Math.PI / 2} />
          {/* bedroom 2 */}
          <Bed p={[1.6, 3.46, -1]} w={1.6} />
          {/* balcony lounge on the terrace */}
          <RBx p={[4.6, 3.85, 1.6]} s={[1.5, 0.45, 1.05]} c={CREAM} map="fabric" r={0.09} />
          <RBx p={[4.6, 4.12, 1.05]} s={[1.4, 0.34, 0.2]} c={CREAM} map="fabric" r={0.07} />
          <Plant p={[4.6, 3.65, -1.6]} />
          <Railing p={[5.52, 3.65, 0]} w={8.3} rot={Math.PI / 2} />
          {/* roof deck */}
          <group>
            <RBx p={[-3.4, 6.82, 1]} s={[1.7, 0.42, 1.05]} c="#C8B491" map="fabric" r={0.08} />
            <RBx p={[-1.2, 6.82, 1]} s={[1.7, 0.42, 1.05]} c={CREAM} map="fabric" r={0.08} />
            <RBx p={[-2.3, 6.75, -0.5]} s={[1.1, 0.28, 0.7]} c="#4A3626" r={0.04} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.3, 6.57, 0.4]} receiveShadow>
              <planeGeometry args={[4.6, 2.8]} />
              <meshStandardMaterial color="#E2D9C8" map={fabricTexture()} roughness={1} />
            </mesh>
            <Plant p={[1.6, 6.56, -1.8]} />
            <Pergola p={[-2.3, 6.56, -0.2]} w={4.9} d={3.5} h={1.5} />
            <Railing p={[-1, 6.56, 3.18]} w={9.0} />
            <Railing p={[-1, 6.56, -3.18]} w={9.0} />
            <Railing p={[3.35, 6.56, 0]} w={6.2} rot={Math.PI / 2} />
            <Railing p={[-5.35, 6.56, 0]} w={6.2} rot={Math.PI / 2} />
          </group>
        </group>
      )}

      {/* B: garden pavilion */}
      {!A && (
        <group>
          <Bx p={[7, 0.01, 3.5]} s={[3.6, 0.06, 3.6]} c="#C9BFAE" map="marble" rough={0.5} />
          <RBx p={[7, 0.42, 3.9]} s={[1.5, 0.45, 1.0]} c={CREAM} map="fabric" r={0.09} />
          <RBx p={[7, 0.7, 4.35]} s={[1.4, 0.32, 0.2]} c={CREAM} map="fabric" r={0.07} />
          <RBx p={[7, 0.32, 2.9]} s={[0.9, 0.26, 0.6]} c="#4A3626" r={0.04} />
          <Pergola p={[7, 0, 3.5]} w={3.4} d={3.4} h={2.3} />
        </group>
      )}

      {/* shells last (transparent-capable) */}
      {A ? <ShellA /> : <ShellB />}
    </group>
  );
}
