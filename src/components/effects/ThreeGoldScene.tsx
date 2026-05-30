"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const seededValue = (index: number, salt: number) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

function GoldRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.08;
      ref.current.rotation.y += delta * 0.12;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.2, 0.04, 32, 100]} />
      <meshStandardMaterial
        color="#d4af37"
        metalness={1}
        roughness={0.15}
        emissive="#a68a2d"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function FloatingGems() {
  const count = 24;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededValue(i, 1) - 0.5) * 8;
      pos[i * 3 + 1] = (seededValue(i, 2) - 0.5) * 8;
      pos[i * 3 + 2] = (seededValue(i, 3) - 0.5) * 4;
    }
    return pos;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#e8c872" transparent opacity={0.6} />
    </points>
  );
}

export function ThreeGoldScene() {
  const [canvasKey, setCanvasKey] = useState(0);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
      <Canvas
        key={canvasKey}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            window.setTimeout(() => setCanvasKey((key) => key + 1), 250);
          });
        }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#f7e7ce" />
        <pointLight position={[-5, -3, 2]} intensity={0.5} color="#d4af37" />
        <GoldRing />
        <FloatingGems />
      </Canvas>
    </div>
  );
}
