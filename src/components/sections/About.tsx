
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

export function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="section bg-gradient-to-b from-background to-muted/20">
      <div className="section-content">
        <div
          ref={ref}
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-10 items-center opacity-0",
            inView && "animate-fade-in"
          )}
        >
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Hello! I'm a passionate software developer with expertise in building 
                modern web applications and interactive experiences. My journey in 
                programming began with a curiosity about how digital products work and 
                evolved into a professional career creating elegant solutions.
              </p>
              
              <p>
                With over 5 years of experience, I've worked on various projects from 
                responsive websites to complex web applications. I love working at the 
                intersection of creativity and technology, turning ideas into reality 
                through clean, efficient code.
              </p>
              
              <p>
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge with the 
                developer community. I believe in continuous learning and staying 
                updated with the latest industry trends.
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-muted rounded-full text-sm">Problem Solver</span>
              <span className="px-3 py-1 bg-muted rounded-full text-sm">Team Player</span>
              <span className="px-3 py-1 bg-muted rounded-full text-sm">Detail-Oriented</span>
              <span className="px-3 py-1 bg-muted rounded-full text-sm">Fast Learner</span>
              <span className="px-3 py-1 bg-muted rounded-full text-sm">Creative Thinker</span>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 relative">
              <div className="absolute inset-0 rounded-full bg-portfolio-primary/20 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-portfolio-primary/10 backdrop-blur-sm"></div>
              <div className="absolute inset-4 rounded-full bg-portfolio-secondary/5 backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full overflow-hidden w-48 h-48 md:w-64 md:h-64 border-4 border-portfolio-primary/30">
                  <div className="w-full h-full bg-gradient-to-br from-portfolio-primary/80 to-portfolio-secondary/80 flex items-center justify-center">
                    <div className="text-5xl">👨‍💻</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
