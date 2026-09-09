"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── AURA AI: Voice waveform sphere ─── */
function AuraScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.IcosahedronGeometry>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
    if (geoRef.current) {
      const pos = geoRef.current.attributes.position;
      const time = state.clock.elapsedTime;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);
        const len = Math.sqrt(x * x + y * y + z * z);
        const nx = x / len, ny = y / len, nz = z / len;
        const wave = 1 + Math.sin(nx * 4 + time * 2) * 0.12 + Math.sin(ny * 3 + time * 1.5) * 0.08 + Math.cos(nz * 5 + time * 3) * 0.06;
        pos.setXYZ(i, nx * wave * 1.5, ny * wave * 1.5, nz * wave * 1.5);
      }
      pos.needsUpdate = true;
      geoRef.current.computeVertexNormals();
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00e5ff" />
      <pointLight position={[-5, -3, 3]} intensity={1} color="#6366f1" />
      <mesh ref={meshRef}>
        <icosahedronGeometry ref={geoRef} args={[1.5, 5]} />
        <meshStandardMaterial color="#00e5ff" wireframe transparent opacity={0.6} />
      </mesh>
      <Float speed={2} floatIntensity={1.5}>
        <mesh position={[2.5, 1, -1]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>
      </Float>
      <Float speed={3} floatIntensity={1}>
        <mesh position={[-2, -1.5, 0.5]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#6366f1" />
        </mesh>
      </Float>
    </>
  );
}

/* ─── SAREGAMA: Music equalizer bars ─── */
function SaregamaScene() {
  const barsRef = useRef<THREE.Group>(null);
  const count = 20;

  const bars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (i - count / 2) * 0.3,
      speed: 1 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
      maxH: 0.5 + Math.random() * 2,
      color: i % 3 === 0 ? "#a855f7" : i % 3 === 1 ? "#6366f1" : "#00e5ff",
    }));
  }, []);

  useFrame((state) => {
    if (barsRef.current) {
      barsRef.current.children.forEach((child, i) => {
        const bar = bars[i];
        const h = bar.maxH * (0.3 + 0.7 * Math.abs(Math.sin(state.clock.elapsedTime * bar.speed + bar.phase)));
        child.scale.y = h;
        child.position.y = h / 2 - 1;
      });
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={2} color="#a855f7" />
      <pointLight position={[-3, -2, 3]} intensity={1} color="#6366f1" />
      <group ref={barsRef}>
        {bars.map((bar, i) => (
          <mesh key={i} position={[bar.x, 0, 0]}>
            <boxGeometry args={[0.18, 1, 0.18]} />
            <meshStandardMaterial color={bar.color} transparent opacity={0.8} emissive={bar.color} emissiveIntensity={0.3} />
          </mesh>
        ))}
      </group>
      {/* Vinyl disc */}
      <Float speed={1} floatIntensity={0.5}>
        <mesh position={[0, 0, -2]} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[1.8, 0.03, 8, 64]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.15} />
        </mesh>
      </Float>
    </>
  );
}

/* ─── RAKSHAK AI: Protective shield ─── */
function RakshakScene() {
  const shieldRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (shieldRef.current) {
      shieldRef.current.rotation.y = t * 0.4;
      shieldRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.5;
      ringRef.current.rotation.z = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.4;
      ring2Ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 5]} intensity={2} color="#10b981" />
      <pointLight position={[-3, -2, 3]} intensity={1} color="#00e5ff" />
      {/* Core shield */}
      <mesh ref={shieldRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial color="#10b981" wireframe transparent opacity={0.5} emissive="#10b981" emissiveIntensity={0.2} />
      </mesh>
      {/* Orbit ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.3} />
      </mesh>
      {/* Orbit ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.6, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.2} />
      </mesh>
      {/* Particles */}
      {[...Array(6)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.3} floatIntensity={1.5}>
          <mesh position={[Math.cos(i * 1.05) * 2.5, Math.sin(i * 1.05) * 2.5, Math.sin(i) * 0.5]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* ─── Exported wrapper ─── */
const scenes: Record<string, () => JSX.Element> = {
  "01": AuraScene,
  "02": SaregamaScene,
  "03": RakshakScene,
};

export function ProjectScene({ projectId }: { projectId: string }) {
  const SceneComponent = scenes[projectId];
  if (!SceneComponent) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <SceneComponent />
    </Canvas>
  );
}
