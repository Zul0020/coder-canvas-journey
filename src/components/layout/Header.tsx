
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";
import { Switch } from "@/components/ui/switch";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";
  const resumeLink = "https://drive.google.com/file/d/10MGaLuztczj9l4lWbEpvQ0JsJ8-Ouqnj/view?usp=sharing";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-2 shadow-md"
          : "bg-transparent py-4"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <h1 className="text-xl font-bold text-gradient">Prince Kumar Singh</h1>
        </a>

        <div className="flex items-center gap-2">
          {/* Theme Toggle Button - Always visible */}
          <div className="flex items-center gap-2 mr-2 bg-muted/50 rounded-full p-1 px-3">
            <Sun className="h-4 w-4 text-yellow-500" />
            <Switch 
              checked={isDark}
              onCheckedChange={toggleTheme}
              aria-label="Toggle theme"
            />
            <Moon className="h-4 w-4 text-blue-400" />
          </div>

          {isMobile ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          ) : (
            <nav className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium hover:text-portfolio-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a 
                href={resumeLink}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="bg-portfolio-primary hover:bg-portfolio-primary/90">
                  Resume
                </Button>
              </a>
            </nav>
          )}

          {isMobile && isMenuOpen && (
            <div className="fixed inset-0 top-16 bg-background/95 backdrop-blur-sm p-4 z-50">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium py-2 border-b border-muted hover:text-portfolio-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a 
                  href={resumeLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="pt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full bg-portfolio-primary hover:bg-portfolio-primary/90">
                    Resume
                  </Button>
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
