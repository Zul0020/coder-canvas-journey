
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-gradient">Portfolio</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Building digital experiences with code.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/username" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted/50 hover:bg-portfolio-primary/20 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com/in/username" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted/50 hover:bg-portfolio-primary/20 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:contact@example.com"
              className="p-2 rounded-full bg-muted/50 hover:bg-portfolio-primary/20 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com/username" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted/50 hover:bg-portfolio-primary/20 transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-muted mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
