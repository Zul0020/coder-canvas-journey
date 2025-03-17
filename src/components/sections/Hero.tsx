
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="home" className="section relative overflow-hidden">
      <div className="section-content flex flex-col items-center justify-center text-center h-screen">
        <div className={cn(
          "space-y-6 opacity-0",
          isLoaded && "animate-fade-in"
        )}>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            <span className="text-gradient">Software Developer</span> Creating Digital Experiences
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Bringing ideas to life with code. Specializing in modern web technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <a href="#projects">
              <Button size="lg" className="bg-portfolio-primary hover:bg-portfolio-primary/90">
                View My Work
              </Button>
            </a>
            <Button size="lg" variant="outline">
              Contact Me
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" aria-label="Scroll down">
            <ArrowDown className="h-8 w-8 text-portfolio-primary" />
          </a>
        </div>
      </div>
    </section>
  );
}
