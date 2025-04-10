
import { Suspense, useEffect, useState } from "react";
import { Scene } from "@/components/canvas/Scene";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const section = useStore((state) => state.section);
  
  useEffect(() => {
    setMounted(true);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') as string);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Add page transition effect
    const handlePageTransition = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75 && sectionTop > -windowHeight * 0.5) {
          // Instead of directly adding the class, use classList
          section.classList.add('opacity-100');
        } else {
          section.classList.remove('opacity-100');
        }
      });
    };
    
    window.addEventListener('scroll', handlePageTransition);
    handlePageTransition(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handlePageTransition);
    };
  }, []);

  // Get current section
  useEffect(() => {
    const updateCurrentSection = () => {
      const sectionElements = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY;
      
      let activeIndex = 0;
      sectionElements.forEach((section, index) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        if (scrollPos >= sectionTop) {
          activeIndex = index;
        }
      });
      
      useStore.setState({ section: activeIndex });
    };
    
    window.addEventListener('scroll', updateCurrentSection);
    updateCurrentSection(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', updateCurrentSection);
    };
  }, []);

  return (
    <main className={cn(
      "relative transition-all duration-500",
      !mounted && "opacity-0"
    )}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      
      <div className="experience-container">
        <Header />
        
        <div>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Index;
