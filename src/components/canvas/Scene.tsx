
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { Environment, Preload, AdaptiveDpr, AdaptiveEvents, Stars } from "@react-three/drei";
import { SceneObjects } from "./SceneObjects";
import { Loader } from "../ui/Loader";
import { useTheme } from "@/hooks/use-theme";

export function Scene() {
  const { theme } = useTheme();
  
  return (
    <div className="canvas-container">
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 25 }}
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]} // Responsive DPR for better performance
      >
        <fog attach="fog" args={[theme === "dark" ? "#0F172A" : "#F8FAFC", 10, 50]} />
        
        <Suspense fallback={null}>
          <SceneObjects />
          
          {/* Environment map based on theme */}
          <Environment
            preset={theme === "dark" ? "night" : "sunset"}
            background={false}
          />
          
          {/* Stars only in dark mode */}
          {theme === "dark" && (
            <Stars 
              radius={100} 
              depth={50} 
              count={1000} 
              factor={4} 
              saturation={0.5} 
              fade 
              speed={1}
            />
          )}
        </Suspense>
        
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Preload all />
      </Canvas>
      <Loader />
    </div>
  );
}
