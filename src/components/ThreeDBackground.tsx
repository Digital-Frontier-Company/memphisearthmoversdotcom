import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Animated particle field component
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      // Create particles in a large sphere around the scene
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      
      // Cyan color variations
      colors[i * 3] = 0.3 + Math.random() * 0.3; // R
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // G
      colors[i * 3 + 2] = 1; // B (full blue)
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        size={0.5}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Floating geometric shapes
function FloatingShape({ position, scale, rotationSpeed }: { position: [number, number, number], scale: number, rotationSpeed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#4DD2FF"
          transparent
          opacity={0.3}
          wireframe
          emissive="#4DD2FF"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

// Animated rings/orbits
function AnimatedRing({ radius, speed }: { radius: number, speed: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.1, 8, 64]} />
      <meshStandardMaterial
        color="#4DD2FF"
        transparent
        opacity={0.4}
        emissive="#4DD2FF"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// Pulsing central orb
function CentralOrb() {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (orbRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      orbRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Sphere ref={orbRef} args={[2, 32, 32]} position={[0, 0, -20]}>
      <meshStandardMaterial
        color="#4DD2FF"
        transparent
        opacity={0.2}
        emissive="#4DD2FF"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

const ThreeDBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-black" />
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4DD2FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4DD2FF" />
        
        {/* Particle field */}
        <ParticleField />
        
        {/* Central pulsing orb */}
        <CentralOrb />
        
        {/* Animated rings */}
        <AnimatedRing radius={15} speed={0.2} />
        <AnimatedRing radius={25} speed={-0.1} />
        <AnimatedRing radius={35} speed={0.05} />
        
        {/* Floating geometric shapes */}
        <FloatingShape position={[-15, 5, -10]} scale={0.5} rotationSpeed={0.01} />
        <FloatingShape position={[15, -5, -15]} scale={0.8} rotationSpeed={-0.015} />
        <FloatingShape position={[0, 10, -25]} scale={0.3} rotationSpeed={0.02} />
        <FloatingShape position={[-20, -10, -5]} scale={0.6} rotationSpeed={-0.01} />
        <FloatingShape position={[25, 0, -20]} scale={0.4} rotationSpeed={0.018} />
        
        {/* Additional floating elements */}
        <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.8}>
          <mesh position={[30, 15, -30]}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#4DD2FF"
              transparent
              opacity={0.2}
              wireframe
              emissive="#4DD2FF"
              emissiveIntensity={0.1}
            />
          </mesh>
        </Float>
        
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={[-30, -15, -25]}>
            <octahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial
              color="#4DD2FF"
              transparent
              opacity={0.25}
              wireframe
              emissive="#4DD2FF"
              emissiveIntensity={0.15}
            />
          </mesh>
        </Float>
      </Canvas>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default ThreeDBackground;