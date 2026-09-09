"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 2500;

  const [positions, colors] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const cyan = new THREE.Color("#00e5ff");
    const indigo = new THREE.Color("#6366f1");
    
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const mix = Math.random();
      const col = cyan.clone().lerp(indigo, mix);
      c[i * 3] = col.r;
      c[i * 3 + 1] = col.g;
      c[i * 3 + 2] = col.b;
    }
    return [p, c];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function WireframeShape({ position, args, speed, color }: { position: [number, number, number]; args: any; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.15;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.8;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={args} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.08} />
    </mesh>
  );
}

function FloatingRing({ position, speed }: { position: [number, number, number]; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[1.5, 0.02, 16, 100]} />
      <meshBasicMaterial color="#00e5ff" transparent opacity={0.1} />
    </mesh>
  );
}

function CameraRig() {
  const { camera, pointer } = useThree();

  useFrame((_, delta) => {
    camera.position.x += (pointer.x * 1.5 - camera.position.x) * delta * 1.5;
    camera.position.y += (pointer.y * 1.5 - camera.position.y) * delta * 1.5;
    camera.lookAt(0, 0, -2);
  });

  return null;
}

export function Scene() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <CameraRig />
        <Particles />

        {/* Wireframe shapes */}
        <WireframeShape position={[-5, 2, -6]} args={[1.2, 1]} speed={0.4} color="#00e5ff" />
        <WireframeShape position={[5, -2, -8]} args={[1.8, 0]} speed={0.3} color="#6366f1" />
        <WireframeShape position={[0, 4, -10]} args={[1, 1]} speed={0.5} color="#10b981" />

        {/* Floating rings */}
        <FloatingRing position={[-3, -1, -5]} speed={0.3} />
        <FloatingRing position={[4, 3, -7]} speed={0.2} />

        {/* Floating orbs */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
          <mesh position={[3, 1, -4]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.4} />
          </mesh>
        </Float>
        <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
          <mesh position={[-4, -2, -3]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
          </mesh>
        </Float>
        <Float speed={1} rotationIntensity={0.4} floatIntensity={3}>
          <mesh position={[0, -3, -6]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.3} />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}
