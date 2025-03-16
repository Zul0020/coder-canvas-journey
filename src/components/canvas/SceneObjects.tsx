
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { Float, useScroll } from "@react-three/drei";
import { useStore } from "@/store";

export function SceneObjects() {
  const { camera } = useThree();
  const scroll = useScroll();
  const section = useStore((state) => state.section);
  const cameraPositionsRef = useRef([
    [0, 0, 10], // Hero
    [0, 5, 10], // About
    [5, 0, 10], // Projects
    [-5, 0, 10], // Skills
    [0, -5, 10], // Contact
  ]);

  // Update camera on scroll
  useFrame(() => {
    const targetSection = Math.floor(scroll.offset * 5);
    
    if (targetSection !== section) {
      useStore.setState({ section: targetSection });
    }
    
    const targetPos = new THREE.Vector3(...cameraPositionsRef.current[section]);
    camera.position.lerp(targetPos, 0.05);
  });

  return (
    <group>
      {/* Ambient Light */}
      <ambientLight intensity={0.5} />
      
      {/* Main Light */}
      <directionalLight 
        position={[1, 1, 1]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]} 
      />
      
      {/* Background Particles */}
      <Particles />
      
      {/* Floating Objects */}
      <TechIcons />
    </group>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 2000;
  
  // Generate random positions for particles
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8B5CF6"
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  );
}

function TechIcons() {
  const technologies = [
    { name: "react", position: [3, 1, 0], scale: 1, color: "#61DAFB" },
    { name: "js", position: [-3, 2, 1], scale: 0.8, color: "#F7DF1E" },
    { name: "node", position: [2, -2, -1], scale: 1.2, color: "#339933" },
    { name: "typescript", position: [-2, -1, 2], scale: 0.9, color: "#3178C6" },
    { name: "html", position: [4, 0, -2], scale: 0.7, color: "#E34F26" },
    { name: "css", position: [-4, -2, 0], scale: 0.75, color: "#1572B6" },
  ];

  return (
    <group>
      {technologies.map((tech, index) => (
        <Float key={index} speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <mesh position={tech.position} scale={tech.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={tech.color} wireframe />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
