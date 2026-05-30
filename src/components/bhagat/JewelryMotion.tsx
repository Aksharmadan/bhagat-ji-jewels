"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const seededValue = (index: number, salt: number) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

function RotatingBangle({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.4 * speed;
      ref.current.rotation.z += delta * 0.25 * speed;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.08, 24, 72]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.12} emissive="#5a4510" emissiveIntensity={0.15} />
      </mesh>
    </Float>
  );
}

function RotatingRing({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.6;
  });
  return (
    <Float speed={2} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[0.45, 0.06, 18, 48]} />
        <meshStandardMaterial color="#e8e8e8" metalness={1} roughness={0.08} />
      </mesh>
      <mesh position={[position[0], position[1], position[2] + 0.05]}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0} emissive="#d4af37" emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
}

const SPARKLE_COUNT = 22;
const SPARKLE_POSITIONS = new Float32Array(SPARKLE_COUNT * 3);
for (let i = 0; i < SPARKLE_COUNT; i++) {
  SPARKLE_POSITIONS[i * 3] = (seededValue(i, 1) - 0.5) * 6;
  SPARKLE_POSITIONS[i * 3 + 1] = (seededValue(i, 2) - 0.5) * 4;
  SPARKLE_POSITIONS[i * 3 + 2] = (seededValue(i, 3) - 0.5) * 3;
}

function DiamondSparkle() {
  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.08;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[SPARKLE_POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#e8c872" transparent opacity={0.7} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-4, -6, -2]} intensity={0.65} color="#ffebad" />
      <RotatingBangle position={[-1.8, 0.3, 0]} scale={0.9} speed={0.8} />
      <RotatingBangle position={[1.6, -0.2, -0.5]} scale={1.1} speed={1.1} />
      <RotatingBangle position={[0, 0.8, -1]} scale={0.65} speed={1.3} />
      <RotatingRing position={[0.2, -0.9, 0.5]} />
      <DiamondSparkle />
    </>
  );
}

export function JewelryMotion({ className }: { className?: string }) {
  const [canvasKey, setCanvasKey] = useState(0);

  return (
    <div className={className} aria-hidden>
      <Canvas
        key={canvasKey}
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        dpr={[0.75, 1]}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            window.setTimeout(() => setCanvasKey((key) => key + 1), 250);
          });
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
