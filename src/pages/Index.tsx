import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StickyNote, Lock, Edit3, Trash2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "NotesApp - Organize Your Thoughts";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-glow">
              <StickyNote className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              NotesApp
            </h1>
          </div>
          <Button onClick={() => navigate("/auth")} className="gap-2">
            Get Started
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Content */}
        <section className="flex flex-col items-center justify-center text-center py-20 max-w-4xl mx-auto">
          <div className="p-6 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 mb-8 animate-pulse">
            <StickyNote className="w-20 h-20 text-primary" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            Organize Your Thoughts, Simplify Your Life
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            A beautiful, modern notes app to capture your ideas, tasks, and memories.
            Simple, secure, and always accessible.
          </p>
          
          <Button size="lg" onClick={() => navigate("/auth")} className="gap-2 text-lg px-8 py-6">
            Start Taking Notes
          </Button>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 py-20 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl border border-border/50 backdrop-blur-sm bg-card/95 hover:shadow-card transition-all duration-300 hover:scale-105">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 w-fit mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your notes are encrypted and stored securely. Only you have access to your data.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/50 backdrop-blur-sm bg-card/95 hover:shadow-card transition-all duration-300 hover:scale-105">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 w-fit mb-4">
              <Edit3 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-muted-foreground">
              Create, edit, and organize your notes with an intuitive and beautiful interface.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/50 backdrop-blur-sm bg-card/95 hover:shadow-card transition-all duration-300 hover:scale-105">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 w-fit mb-4">
              <Trash2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Full Control</h3>
            <p className="text-muted-foreground">
              Manage your notes your way. Edit and delete with complete freedom.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-20">
          <div className="p-10 rounded-3xl border border-border/50 backdrop-blur-sm bg-gradient-to-br from-card/95 to-primary/5 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Join thousands of users who trust NotesApp for their daily note-taking needs.
            </p>
            <Button size="lg" onClick={() => navigate("/auth")} className="gap-2">
              Create Your Account
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 NotesApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
