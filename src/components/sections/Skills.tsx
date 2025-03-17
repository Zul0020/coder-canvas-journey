import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

type Skill = {
  name: string;
  icon: string;
  color: string;
  level: number;
};

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", icon: "💻", color: "#E34F26", level: 95 },
      { name: "CSS", icon: "🎨", color: "#1572B6", level: 90 },
      { name: "JavaScript", icon: "📜", color: "#F7DF1E", level: 92 },
      { name: "TypeScript", icon: "🛡️", color: "#3178C6", level: 85 },
      { name: "React", icon: "⚛️", color: "#61DAFB", level: 90 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "🟢", color: "#339933", level: 88 },
      { name: "Express", icon: "🚂", color: "#000000", level: 85 },
      { name: "Python", icon: "🐍", color: "#3776AB", level: 80 },
      { name: "MongoDB", icon: "🍃", color: "#47A248", level: 82 },
      { name: "PostgreSQL", icon: "🐘", color: "#336791", level: 78 },
      { name: "GraphQL", icon: "⚡", color: "#E535AB", level: 75 },
    ],
  },
  {
    title: "Other",
    skills: [
      { name: "Git", icon: "📊", color: "#F05032", level: 90 },
      { name: "Docker", icon: "🐳", color: "#2496ED", level: 78 },
      { name: "CI/CD", icon: "🔄", color: "#4285F4", level: 75 },
      { name: "AWS", icon: "☁️", color: "#FF9900", level: 72 },
      { name: "Testing", icon: "🧪", color: "#9ACD32", level: 83 },
    ],
  },
];

export function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="section">
      <div className="section-content">
        <div ref={ref}>
          <div className={cn(
            "text-center max-w-2xl mx-auto mb-16 opacity-0",
            inView && "animate-fade-in"
          )}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical <span className="text-gradient">Skills</span>
            </h2>
            <p className="text-muted-foreground">
              I've worked with a variety of technologies and tools throughout my career.
              Here's an overview of my technical expertise and proficiency levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {skillCategories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex}
                className={cn(
                  "opacity-0",
                  inView && "animate-fade-in",
                  { "delay-100": categoryIndex === 1, "delay-200": categoryIndex === 2 }
                )}
              >
                <h3 className="text-xl font-bold mb-6 text-center">
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar 
                      key={skillIndex} 
                      skill={skill} 
                      index={skillIndex}
                      inView={inView}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, index, inView }: { skill: Skill; index: number; inView: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>{skill.icon}</span>
          <span className="font-medium">{skill.name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: inView ? `${skill.level}%` : '0%',
            backgroundColor: skill.color,
            transitionDelay: `${index * 150}ms`,
          }}
        />
      </div>
    </div>
  );
}
