
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
                Hello! I'm a passionate software developer with a strong focus on creating 
                elegant and efficient solutions to complex problems. My journey in programming 
                began with a curiosity about how digital products work, and has evolved into 
                a professional career building impactful applications.
              </p>
              
              <p>
                With a solid background in both frontend and backend development, I enjoy 
                working with modern technologies to deliver responsive, user-friendly 
                applications. I specialize in JavaScript/TypeScript, React, Node.js, and 
                modern web technologies.
              </p>
              
              <p>
                I'm committed to continuous learning and staying updated with the latest 
                industry trends. When I'm not coding, you can find me contributing to 
                open-source projects, sharing knowledge with the developer community, 
                or exploring new technologies.
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-muted rounded-full text-sm">Problem Solver</span>
              <span className="px-3 py-1 bg-muted rounded-full text-sm">Full Stack Developer</span>
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
