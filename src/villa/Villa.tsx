// Procedural 3D villa — two variants:
//  A = Model A+ (3000 sq ft duplex: G+1, balcony, roof deck)
//  B = Model B  (1600 sq ft single-storey)
// Exterior shell meshes live in the group named "shell" so the camera rig can
// fade them out during interior scroll stages.

const WALL = "#F1E9DC";
const WALL2 = "#E4D8C4";
const FLOOR = "#C9A06B";
const DARK = "#3E2F23";
const GOLD = "#B08D3E";
const GLASS = "#8FB6C4";
const SOFA = "#8A7B63";
const LINEN = "#EFE7D8";
const GREEN = "#6F8B5E";
const POOLC = "#5FA8B8";

type V = "A" | "B";

function Bx({
  p,
  s,
  c,
  o,
}: {
  p: [number, number, number];
  s: [number, number, number];
  c: string;
  o?: number;
}) {
  return (
    <mesh position={p} castShadow receiveShadow>
      <boxGeometry args={s} />
      <meshStandardMaterial
        color={c}
        transparent={o !== undefined}
        opacity={o ?? 1}
        roughness={0.85}
        metalness={0.05}
      />
    </mesh>
  );
}

function Rug({ p, s, c }: { p: [number, number, number]; s: [number, number]; c: string }) {
  return (
    <mesh position={p} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={s} />
      <meshStandardMaterial color={c} roughness={1} />
    </mesh>
  );
}

function Plant({ p }: { p: [number, number, number] }) {
  return (
    <group position={p}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.5, 12]} />
        <meshStandardMaterial color={DARK} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.42, 12, 12]} />
        <meshStandardMaterial color={GREEN} roughness={1} />
      </mesh>
    </group>
  );
}

function Bed({ p, w = 1.8 }: { p: [number, number, number]; w?: number }) {
  return (
    <group position={p}>
      <Bx p={[0, 0.22, 0]} s={[w, 0.44, 2.1]} c={DARK} />
      <Bx p={[0, 0.52, 0.05]} s={[w - 0.1, 0.22, 1.95]} c={LINEN} />
      <Bx p={[0, 0.62, -0.75]} s={[w - 0.2, 0.16, 0.45]} c={GOLD} />
      <Bx p={[0, 0.75, -1.08]} s={[w, 0.9, 0.12]} c={SOFA} />
      <Bx p={[-w / 2 - 0.35, 0.3, -0.85]} s={[0.5, 0.6, 0.5]} c={FLOOR} />
      <Bx p={[w / 2 + 0.35, 0.3, -0.85]} s={[0.5, 0.6, 0.5]} c={FLOOR} />
    </group>
  );
}

function Sofa({ p, rot = 0 }: { p: [number, number, number]; rot?: number }) {
  return (
    <group position={p} rotation={[0, rot, 0]}>
      <Bx p={[0, 0.3, 0]} s={[2.6, 0.5, 1]} c={SOFA} />
      <Bx p={[0, 0.75, -0.42]} s={[2.6, 0.6, 0.22]} c={SOFA} />
      <Bx p={[-1.2, 0.62, 0]} s={[0.22, 0.4, 1]} c={SOFA} />
      <Bx p={[1.2, 0.62, 0]} s={[0.22, 0.4, 1]} c={SOFA} />
      <Bx p={[-0.55, 0.62, -0.15]} s={[0.5, 0.16, 0.5]} c={GOLD} />
      <Bx p={[0.55, 0.62, -0.15]} s={[0.5, 0.16, 0.5]} c={LINEN} />
    </group>
  );
}

function Kitchen({ p }: { p: [number, number, number] }) {
  return (
    <group position={p}>
      {/* L-counter */}
      <Bx p={[0, 0.45, 0]} s={[3.2, 0.9, 0.7]} c={LINEN} />
      <Bx p={[1.6 - 0.35, 0.45, -1.05]} s={[0.7, 0.9, 1.4]} c={LINEN} />
      <Bx p={[0, 0.93, 0]} s={[3.3, 0.06, 0.8]} c={DARK} />
      <Bx p={[1.6 - 0.35, 0.93, -1.05]} s={[0.8, 0.06, 1.5]} c={DARK} />
      {/* island */}
      <Bx p={[-0.2, 0.45, 1.7]} s={[2.2, 0.9, 0.9]} c={WALL2} />
      <Bx p={[-0.2, 0.93, 1.7]} s={[2.3, 0.06, 1]} c={DARK} />
      {/* fridge + tall unit */}
      <Bx p={[-2, 1, -0.05]} s={[0.8, 2, 0.75]} c={DARK} />
      {/* stools */}
      <Bx p={[-0.8, 0.35, 2.45]} s={[0.4, 0.7, 0.4]} c={GOLD} />
      <Bx p={[0.4, 0.35, 2.45]} s={[0.4, 0.7, 0.4]} c={GOLD} />
    </group>
  );
}

function Dining({ p }: { p: [number, number, number] }) {
  const chairs: [number, number][] = [
    [-0.9, 0.8],
    [0.9, 0.8],
    [-0.9, -0.8],
    [0.9, -0.8],
  ];
  return (
    <group position={p}>
      <Bx p={[0, 0.72, 0]} s={[2.2, 0.08, 1.1]} c={FLOOR} />
      <Bx p={[0, 0.36, 0]} s={[0.2, 0.72, 0.2]} c={DARK} />
      {chairs.map(([x, z], i) => (
        <Bx key={i} p={[x, 0.45, z]} s={[0.45, 0.9, 0.45]} c={SOFA} />
      ))}
    </group>
  );
}

function Wardrobe({ p, w = 2.2 }: { p: [number, number, number]; w?: number }) {
  return <Bx p={p} s={[w, 2.2, 0.6]} c={WALL2} />;
}

function TvWall({ p }: { p: [number, number, number] }) {
  return (
    <group position={p}>
      <Bx p={[0, 1.1, 0]} s={[3, 2.2, 0.15]} c={DARK} />
      <Bx p={[0, 1.35, 0.1]} s={[1.8, 1, 0.05]} c={"#101418"} />
      <Bx p={[0, 0.3, 0.25]} s={[2.6, 0.35, 0.4]} c={GOLD} />
    </group>
  );
}

function Stairs({ p }: { p: [number, number, number] }) {
  const steps = Array.from({ length: 10 });
  return (
    <group position={p}>
      {steps.map((_, i) => (
        <Bx
          key={i}
          p={[0, 0.15 + i * 0.3, -i * 0.32]}
          s={[1.1, 0.3, 0.34]}
          c={i % 2 ? FLOOR : "#B98F5C"}
        />
      ))}
    </group>
  );
}

/** Exterior shell — everything here fades during interior stages */
function ShellA() {
  return (
    <group name="shell">
      {/* ground floor walls */}
      <Bx p={[0, 1.6, -4.05]} s={[11, 3.2, 0.25]} c={WALL} o={1} />
      <Bx p={[0, 1.6, 4.05]} s={[11, 3.2, 0.25]} c={WALL} o={1} />
      <Bx p={[-5.5, 1.6, 0]} s={[0.25, 3.2, 8.3]} c={WALL} o={1} />
      <Bx p={[5.5, 1.6, 0]} s={[0.25, 3.2, 8.3]} c={WALL2} o={1} />
      {/* upper floor walls (smaller volume, offset) */}
      <Bx p={[-1, 4.9, -3.05]} s={[9, 3, 0.25]} c={WALL2} o={1} />
      <Bx p={[-1, 4.9, 3.05]} s={[9, 3, 0.25]} c={WALL} o={1} />
      <Bx p={[-5.5, 4.9, 0]} s={[0.25, 3, 6.3]} c={WALL} o={1} />
      <Bx p={[3.5, 4.9, 0]} s={[0.25, 3, 6.3]} c={WALL} o={1} />
      {/* parapets */}
      <Bx p={[-1, 6.6, -3.05]} s={[9.2, 0.5, 0.2]} c={WALL} o={1} />
      <Bx p={[-1, 6.6, 3.05]} s={[9.2, 0.5, 0.2]} c={WALL} o={1} />
      <Bx p={[4.6, 3.4, 0]} s={[2, 0.5, 8.3]} c={WALL} o={1} />
      {/* big glass — proud of the wall face so it reads from outside */}
      <Bx p={[2.8, 1.6, 4.21]} s={[4.5, 2.6, 0.1]} c={GLASS} o={0.55} />
      <Bx p={[-2.2, 4.9, 3.21]} s={[4, 2.2, 0.1]} c={GLASS} o={0.55} />
      {/* gold entrance */}
      <Bx p={[-3.4, 1.3, 4.22]} s={[1.4, 2.6, 0.14]} c={GOLD} o={1} />
      {/* roof slab over upper volume */}
      <group name="roof">
        <Bx p={[-1, 6.42, 0]} s={[9.2, 0.24, 6.5]} c={WALL2} o={1} />
      </group>
    </group>
  );
}

function ShellB() {
  return (
    <group name="shell">
      <Bx p={[0, 1.6, -3.05]} s={[8.5, 3.2, 0.25]} c={WALL} o={1} />
      <Bx p={[0, 1.6, 3.05]} s={[8.5, 3.2, 0.25]} c={WALL} o={1} />
      <Bx p={[-4.25, 1.6, 0]} s={[0.25, 3.2, 6.3]} c={WALL2} o={1} />
      <Bx p={[4.25, 1.6, 0]} s={[0.25, 3.2, 6.3]} c={WALL} o={1} />
      <Bx p={[0, 3.4, 0]} s={[8.9, 0.5, 6.7]} c={WALL2} o={1} />
      <Bx p={[1.8, 1.6, 3.21]} s={[3.4, 2.6, 0.1]} c={GLASS} o={0.55} />
      <Bx p={[-2.6, 1.3, 3.22]} s={[1.3, 2.6, 0.14]} c={GOLD} o={1} />
      <group name="roof">
        <Bx p={[0, 3.32, 0]} s={[8.7, 0.2, 6.5]} c={WALL} o={1} />
      </group>
    </group>
  );
}

export default function Villa({ variant }: { variant: V }) {
  const A = variant === "A";
  return (
    <group>
      {/* site */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#9DB08A" roughness={1} />
      </mesh>
      <Rug p={[0, 0.001, 8.5]} s={[4, 7]} c="#C9BFAE" />
      {A && <Rug p={[8.6, 0.002, 5]} s={[4.5, 8]} c={POOLC} />}
      {A && <Rug p={[8.6, 0.001, 5]} s={[5.1, 8.6]} c={LINEN} />}
      <Plant p={[-7, 0, 6]} />
      <Plant p={[7.5, 0, -5.5]} />
      <Plant p={[-7.5, 0, -6]} />

      {/* ground slab + floor */}
      <Bx p={[0, 0.08, 0]} s={A ? [11.4, 0.16, 8.7] : [8.9, 0.16, 6.7]} c={WALL2} />
      <Rug p={[0, 0.17, 0]} s={A ? [10.8, 8.1] : [8.3, 6.1]} c={FLOOR} />

      {/* GROUND interior */}
      <group>
        <Sofa p={[-2.6, 0.17, 1.6]} rot={Math.PI} />
        <Rug p={[-2.6, 0.18, 0.8]} s={[3.6, 2.6]} c={LINEN} />
        <TvWall p={A ? [-2.6, 0.17, -1.6] : [-2.4, 0.17, -0.35]} />
        <Dining p={A ? [1.6, 0.17, -1.9] : [1.0, 0.17, -2.0]} />
        <Kitchen p={A ? [3.2, 0.17, 1.2] : [2.4, 0.17, 0.2]} />
        {A ? (
          <Stairs p={[-4.6, 0.17, 1.4]} />
        ) : (
          <group>
            {/* Model B principal bedroom behind the media wall */}
            <Bed p={[-2.9, 0.17, -1.8]} w={1.6} />
            <Wardrobe p={[-4.0, 1.27, -0.7]} w={0.6} />
          </group>
        )}
        <Plant p={A ? [4.8, 0.17, 3.3] : [3.9, 0.17, 2.5]} />
      </group>

      {/* UPPER interior (Model A+ only) */}
      {A && (
        <group>
          <Bx p={[-1, 3.32, 0]} s={[9.2, 0.24, 6.5]} c={WALL2} />
          <Rug p={[-1, 3.46, 0]} s={[8.6, 5.9]} c={FLOOR} />
          {/* master */}
          <Bed p={[-3, 3.46, 0.6]} w={2} />
          <Rug p={[-3, 3.47, 0.6]} s={[3.2, 3]} c={LINEN} />
          <Wardrobe p={[-4.9, 4.56, -1.8]} w={2} />
          {/* bedroom 2 */}
          <Bed p={[1.6, 3.46, -1]} w={1.6} />
          {/* balcony lounge */}
          <Bx p={[4.6, 3.62, 1.6]} s={[1.4, 0.4, 1]} c={SOFA} />
          <Plant p={[4.6, 3.5, -1.6]} />
          {/* roof deck (on top of upper slab) */}
          <group>
            <Bx p={[-3.4, 6.75, 1]} s={[1.6, 0.4, 1]} c={GOLD} />
            <Bx p={[-1.2, 6.75, 1]} s={[1.6, 0.4, 1]} c={SOFA} />
            <Rug p={[-2.3, 6.56, 0.6]} s={[4.4, 2.6]} c={LINEN} />
            <Plant p={[1.6, 6.55, -1.8]} />
            {/* pergola */}
            <Bx p={[-2.3, 7.9, -0.2]} s={[4.8, 0.12, 3.4]} c={DARK} o={0.9} />
            <Bx p={[-4.5, 7.2, -1.7]} s={[0.18, 1.5, 0.18]} c={DARK} />
            <Bx p={[-0.1, 7.2, -1.7]} s={[0.18, 1.5, 0.18]} c={DARK} />
            <Bx p={[-4.5, 7.2, 1.3]} s={[0.18, 1.5, 0.18]} c={DARK} />
            <Bx p={[-0.1, 7.2, 1.3]} s={[0.18, 1.5, 0.18]} c={DARK} />
          </group>
        </group>
      )}

      {/* B: garden pavilion instead of upper floor */}
      {!A && (
        <group>
          <Rug p={[7, 0.002, 3.5]} s={[3.4, 3.4]} c="#C9BFAE" />
          <Bx p={[7, 0.35, 3.5]} s={[1.4, 0.4, 1]} c={SOFA} />
          <Bx p={[7, 2.2, 3.5]} s={[3.2, 0.12, 3.2]} c={DARK} o={0.9} />
          <Bx p={[5.7, 1.1, 2.3]} s={[0.16, 2.2, 0.16]} c={DARK} />
          <Bx p={[8.3, 1.1, 2.3]} s={[0.16, 2.2, 0.16]} c={DARK} />
          <Bx p={[5.7, 1.1, 4.7]} s={[0.16, 2.2, 0.16]} c={DARK} />
          <Bx p={[8.3, 1.1, 4.7]} s={[0.16, 2.2, 0.16]} c={DARK} />
        </group>
      )}

      {/* shells last (transparent-capable) */}
      {A ? <ShellA /> : <ShellB />}
    </group>
  );
}
