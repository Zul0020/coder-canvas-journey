
import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { cn } from "@/lib/utils";

export function Loader() {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setShow(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (!show) return null;

  return (
    <div className={cn(
      "fixed inset-0 flex items-center justify-center bg-background z-50",
      progress === 100 ? "opacity-0 transition-opacity duration-500" : "opacity-100"
    )}>
      <div className="text-center">
        <div className="w-16 h-16 mb-4 mx-auto">
          <div className="w-full h-full rounded-full border-4 border-t-portfolio-primary border-r-portfolio-secondary border-b-portfolio-accent border-l-transparent animate-spin-slow"></div>
        </div>
        <h2 className="text-2xl font-bold text-gradient">Loading 3D Experience</h2>
        <p className="text-muted-foreground mt-2">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
