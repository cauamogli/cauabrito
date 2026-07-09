import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { pointer, scrollState, isTouch } from "../lib/motion";

/* -------------------------------------------------------------
   Campo de partículas em profundidade (sensação de queda)
   ------------------------------------------------------------- */
function FallingParticles({ count = 1400, color = "#22d3ee" }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60; // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * 60; // y
      arr[i * 3 + 2] = Math.random() * -80; // z (profundidade)
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    const geo = ref.current.geometry;
    const pos = geo.attributes.position.array;
    // velocidade base + impulso do scroll
    const speed = (8 + scrollState.velocity * 14) * delta;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 2] += speed; // partículas vêm em direção à câmera = queda
      if (pos[i * 3 + 2] > 6) {
        pos[i * 3 + 2] = -80;
        pos[i * 3] = (Math.random() - 0.5) * 60;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        color={color}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* -------------------------------------------------------------
   Linhas de velocidade (warp streaks) ao acelerar o scroll
   ------------------------------------------------------------- */
function SpeedLines({ count = 120 }) {
  const ref = useRef();
  const data = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 2] = Math.random() * -60;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    const mat = ref.current.material;
    // só aparecem quando há velocidade de scroll
    mat.opacity = THREE.MathUtils.lerp(
      mat.opacity,
      Math.min(0.5, scrollState.velocity * 0.12),
      0.1
    );
    const geo = ref.current.geometry;
    const pos = geo.attributes.position.array;
    const speed = (20 + scrollState.velocity * 30) * delta;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 2] += speed;
      if (pos[i * 3 + 2] > 6) pos[i * 3 + 2] = -60;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={data}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        color="#a855f7"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* -------------------------------------------------------------
   Objetos distantes: "planeta" e fragmentos flutuantes
   ------------------------------------------------------------- */
function DistantObjects() {
  const planet = useRef();
  const ring = useRef();
  const frags = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (planet.current) planet.current.rotation.y = t * 0.05;
    if (ring.current) ring.current.rotation.z = t * 0.08;
    if (frags.current) frags.current.rotation.y = t * 0.03;
  });

  return (
    <group>
      {/* Planeta distante com glow */}
      <group position={[-14, 7, -40]}>
        <mesh ref={planet}>
          <sphereGeometry args={[4, 32, 32]} />
          <meshStandardMaterial
            color="#1b1f4a"
            emissive="#3b2f7a"
            emissiveIntensity={0.5}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[6, 0.12, 16, 80]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Pequeno satélite/planeta secundário */}
      <mesh position={[16, -6, -34]}>
        <sphereGeometry args={[2.2, 24, 24]} />
        <meshStandardMaterial
          color="#16243f"
          emissive="#22d3ee"
          emissiveIntensity={0.35}
          roughness={0.8}
        />
      </mesh>

      {/* Fragmentos / asteroides */}
      <group ref={frags}>
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(a) * 18,
                Math.sin(a * 1.7) * 9,
                -30 - (i % 3) * 6,
              ]}
              rotation={[a, a * 2, 0]}
            >
              <icosahedronGeometry args={[0.6 + (i % 3) * 0.25, 0]} />
              <meshStandardMaterial
                color="#2a3566"
                emissive="#a855f7"
                emissiveIntensity={0.25}
                roughness={0.9}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* -------------------------------------------------------------
   Câmera que inclina suavemente com o mouse + deriva no scroll
   ------------------------------------------------------------- */
function CameraRig() {
  useFrame((state, delta) => {
    const cam = state.camera;
    const targetX = pointer.nx * 2.4;
    const targetY = -pointer.ny * 1.6;
    cam.position.x += (targetX - cam.position.x) * Math.min(1, delta * 2.5);
    cam.position.y += (targetY - cam.position.y) * Math.min(1, delta * 2.5);
    cam.lookAt(0, 0, -10);
  });
  return null;
}

/* -------------------------------------------------------------
   Cena exportada — Canvas fixo de fundo
   ------------------------------------------------------------- */
export default function SpaceScene() {
  // Reduz carga em mobile/touch (e mais leve no desktop p/ não travar o vídeo)
  const particleCount = isTouch ? 450 : 900;
  const dpr = isTouch ? [1, 1.25] : [1, 1.5];

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 70 }}
        dpr={dpr}
        gl={{ antialias: !isTouch, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#03040a"]} />
        <fog attach="fog" args={["#03040a", 18, 70]} />

        <ambientLight intensity={0.35} />
        {/* Key light cinematográfico */}
        <spotLight
          position={[6, 12, 10]}
          angle={0.5}
          penumbra={1}
          intensity={2}
          color="#bfefff"
        />
        <pointLight position={[10, 10, 10]} intensity={1.1} color="#22d3ee" />
        {/* Rim light roxo por trás */}
        <pointLight position={[-12, -6, -8]} intensity={1.2} color="#a855f7" />

        {/* Estrelas de fundo (drei) */}
        <Stars
          radius={80}
          depth={50}
          count={isTouch ? 1200 : 2200}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        <FallingParticles count={particleCount} />
        {!isTouch && <SpeedLines />}
        <DistantObjects />
        <CameraRig />
      </Canvas>

      {/* Nebulosas / luzes difusas em CSS por cima do canvas */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-[40vw] w-[40vw] rounded-full bg-neon-purple/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[35vw] w-[35vw] rounded-full bg-neon-cyan/15 blur-[120px]" />
      </div>
    </div>
  );
}
