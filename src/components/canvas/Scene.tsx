
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, Preload } from "@react-three/drei";
import { SceneObjects } from "./SceneObjects";
import { Loader } from "../ui/Loader";

export function Scene() {
  return (
    <div className="canvas-container">
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <SceneObjects />
          <Environment preset="city" />
        </Suspense>
        <Preload all />
      </Canvas>
      <Loader />
    </div>
  );
}
