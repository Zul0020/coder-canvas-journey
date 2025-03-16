
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink: string;
  githubLink: string;
};

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product filtering, cart functionality, and payment processing.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    liveLink: "https://example-ecommerce.netlify.app",
    githubLink: "https://github.com/username/ecommerce-platform",
  },
  {
    title: "Task Management App",
    description: "A productivity application that helps users organize tasks, set priorities, and track progress. Implements drag-and-drop functionality and real-time updates.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["TypeScript", "React", "Firebase", "Tailwind CSS"],
    liveLink: "https://task-app-example.vercel.app",
    githubLink: "https://github.com/username/task-management",
  },
  {
    title: "Weather Dashboard",
    description: "An interactive weather application that provides real-time weather data, forecasts, and visualizations. Uses geolocation and third-party weather APIs.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    tags: ["JavaScript", "Chart.js", "REST API", "Geolocation"],
    liveLink: "https://weather-dashboard-demo.netlify.app",
    githubLink: "https://github.com/username/weather-dashboard",
  },
];

export function Projects() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="section bg-gradient-to-b from-muted/20 to-background">
      <div className="section-content">
        <div ref={ref}>
          <div className={cn(
            "text-center max-w-2xl mx-auto mb-16 opacity-0",
            inView && "animate-fade-in"
          )}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground">
              A collection of projects that showcase my skills and expertise in software development.
              Each project represents a unique challenge and solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={index} 
                project={project} 
                index={index}
                inView={inView}
              />
            ))}
          </div>

          <div className={cn(
            "mt-16 text-center opacity-0",
            inView && "animate-fade-in"
          )}>
            <Button variant="outline" className="border-portfolio-primary text-portfolio-primary">
              View All Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-portfolio-primary/10 opacity-0",
      inView && "animate-fade-in",
      { "delay-100": index === 1, "delay-200": index === 2 }
    )}>
      <div className="aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-muted rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <a 
            href={project.githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-portfolio-primary transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a 
            href={project.liveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-portfolio-primary hover:text-portfolio-primary/80 transition-colors"
          >
            Live Demo <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
