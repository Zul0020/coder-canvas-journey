
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { Float, useScroll, Text, MeshDistortMaterial, Environment } from "@react-three/drei";
import { useStore } from "@/store";
import { useTheme } from "@/hooks/use-theme";

export function SceneObjects() {
  const { camera } = useThree();
  const scroll = useScroll();
  const { theme } = useTheme();
  const section = useStore((state) => state.section);
  
  const isDarkMode = useMemo(() => theme === "dark", [theme]);
  
  const cameraPositionsRef = useRef([
    new THREE.Vector3(0, 0, 10), // Hero
    new THREE.Vector3(0, 5, 10), // About
    new THREE.Vector3(5, 0, 10), // Projects
    new THREE.Vector3(-5, 0, 10), // Skills
    new THREE.Vector3(0, -5, 10), // Contact
  ]);

  const groupRef = useRef<THREE.Group>(null);

  // Update camera on scroll
  useFrame((state) => {
    const targetSection = Math.floor(scroll.offset * 5);
    
    if (targetSection !== section) {
      useStore.setState({ section: targetSection });
    }
    
    // Use Vector3 directly from the reference array
    const targetPos = cameraPositionsRef.current[section];
    camera.position.lerp(targetPos, 0.05);
    
    // Rotate the entire scene slightly based on mouse position
    if (groupRef.current) {
      const mouseX = state.mouse.x * 0.1;
      const mouseY = state.mouse.y * 0.1;
      groupRef.current.rotation.y += (mouseX - groupRef.current.rotation.y) * 0.01;
      groupRef.current.rotation.x += (mouseY - groupRef.current.rotation.x) * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient Light */}
      <ambientLight intensity={0.5} />
      
      {/* Main Light */}
      <directionalLight 
        position={[1, 1, 1]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]} 
      />
      
      {/* Secondary Lights for better color distribution */}
      <pointLight position={[-10, -10, -10]} color={isDarkMode ? "#8B5CF6" : "#06B6D4"} intensity={1} />
      <pointLight position={[10, 10, 10]} color={isDarkMode ? "#10B981" : "#8B5CF6"} intensity={0.8} />
      
      {/* Background Particles */}
      <Particles isDarkMode={isDarkMode} />
      
      {/* 3D Text */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          font="/fonts/Inter-Bold.woff"
          fontSize={3}
          position={[0, 0, -10]}
          color={isDarkMode ? "#8B5CF6" : "#06B6D4"}
          anchorX="center"
          anchorY="middle"
        >
          Portfolio
        </Text>
      </Float>
      
      {/* Floating Objects */}
      <TechIcons isDarkMode={isDarkMode} />
      
      {/* Abstract Shapes */}
      <AbstractShapes isDarkMode={isDarkMode} />
    </group>
  );
}

function Particles({ isDarkMode }: { isDarkMode: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 3000;
  
  // Generate random positions for particles with improved distribution
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Create a sphere distribution
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(180);
      
      const radius = 20 + Math.random() * 20;
      
      pos[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(theta);
    }
    return pos;
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0002;
      particlesRef.current.rotation.x += 0.0001;
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
        color={isDarkMode ? "#8B5CF6" : "#06B6D4"}
        sizeAttenuation
        transparent
        opacity={0.7}
        fog={true}
      />
    </points>
  );
}

function TechIcons({ isDarkMode }: { isDarkMode: boolean }) {
  const technologies = [
    { name: "react", position: new THREE.Vector3(3, 1, 0), scale: 1, color: "#61DAFB" },
    { name: "js", position: new THREE.Vector3(-3, 2, 1), scale: 0.8, color: "#F7DF1E" },
    { name: "node", position: new THREE.Vector3(2, -2, -1), scale: 1.2, color: "#339933" },
    { name: "typescript", position: new THREE.Vector3(-2, -1, 2), scale: 0.9, color: "#3178C6" },
    { name: "html", position: new THREE.Vector3(4, 0, -2), scale: 0.7, color: "#E34F26" },
    { name: "css", position: new THREE.Vector3(-4, -2, 0), scale: 0.75, color: "#1572B6" },
    { name: "three.js", position: new THREE.Vector3(0, 3, -3), scale: 1.1, color: "#FFFFFF" },
    { name: "tailwind", position: new THREE.Vector3(-3, 0, -4), scale: 1, color: "#38B2AC" },
  ];

  return (
    <group>
      {technologies.map((tech, index) => (
        <Float key={index} speed={1.5} rotationIntensity={2} floatIntensity={2}>
          <mesh position={tech.position} scale={tech.scale}>
            <octahedronGeometry args={[1, 0]} />
            <MeshDistortMaterial 
              color={tech.color} 
              speed={0.8} 
              distort={0.3} 
              wireframe={isDarkMode} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function AbstractShapes({ isDarkMode }: { isDarkMode: boolean }) {
  const shapesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (shapesRef.current) {
      shapesRef.current.rotation.y += 0.001;
      shapesRef.current.rotation.z += 0.0005;
    }
  });
  
  return (
    <group ref={shapesRef}>
      {/* Torus */}
      <mesh position={[-8, -4, -10]}>
        <torusGeometry args={[2, 0.5, 16, 50]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#10B981" : "#8B5CF6"}
          roughness={0.4} 
          metalness={0.8} 
        />
      </mesh>
      
      {/* Icosahedron */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[8, 4, -15]}>
          <icosahedronGeometry args={[2, 0]} />
          <meshPhongMaterial 
            color={isDarkMode ? "#06B6D4" : "#10B981"} 
            shininess={100}
            wireframe={true}
          />
        </mesh>
      </Float>
      
      {/* Dodecahedron */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-5, 6, -12]}>
          <dodecahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial 
            color={isDarkMode ? "#8B5CF6" : "#06B6D4"} 
            roughness={0.2} 
            metalness={0.9} 
            wireframe={isDarkMode}
          />
        </mesh>
      </Float>
    </group>
  );
}
