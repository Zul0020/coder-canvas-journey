
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1500);
  }

  return (
    <section id="contact" className="section bg-gradient-to-b from-background to-muted/20">
      <div className="section-content">
        <div ref={ref}>
          <div className={cn(
            "text-center max-w-2xl mx-auto mb-16 opacity-0",
            inView && "animate-fade-in"
          )}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-muted-foreground">
              Have a project in mind or just want to chat? Feel free to reach out.
              I'm always open to discussing new opportunities and ideas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className={cn(
              "opacity-0",
              inView && "animate-fade-in"
            )}>
              <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="bg-muted/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="bg-muted/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    required
                    className="min-h-32 bg-muted/50"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-portfolio-primary hover:bg-portfolio-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Sending<span className="loading">...</span></>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            <div className={cn(
              "opacity-0",
              inView && "animate-fade-in delay-100"
            )}>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-portfolio-primary/20 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-portfolio-primary" />
                    </div>
                    <h4 className="font-medium">Email</h4>
                  </div>
                  <a 
                    href="mailto:contact@example.com" 
                    className="text-muted-foreground hover:text-portfolio-primary transition-colors"
                  >
                    contact@example.com
                  </a>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-portfolio-primary/20 p-2 rounded-full">
                      <Linkedin className="h-5 w-5 text-portfolio-primary" />
                    </div>
                    <h4 className="font-medium">LinkedIn</h4>
                  </div>
                  <a 
                    href="https://linkedin.com/in/username" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-portfolio-primary transition-colors"
                  >
                    linkedin.com/in/username
                  </a>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-portfolio-primary/20 p-2 rounded-full">
                      <Github className="h-5 w-5 text-portfolio-primary" />
                    </div>
                    <h4 className="font-medium">GitHub</h4>
                  </div>
                  <a 
                    href="https://github.com/username" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-portfolio-primary transition-colors"
                  >
                    github.com/username
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
