import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, StickyNote } from "lucide-react";
import { toast } from "sonner";
import NotesList from "@/components/notes/NotesList";
import NoteDialog from "@/components/notes/NoteDialog";

export interface Note {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      } else {
        // Fetch notes after confirming session
        setTimeout(() => {
          fetchNotes();
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error: any) {
      toast.error("Error loading notes");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
      navigate("/auth");
    } catch (error: any) {
      toast.error("Error signing out");
    }
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setDialogOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setDialogOpen(true);
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) throw error;
      
      setNotes(notes.filter((note) => note.id !== id));
      toast.success("Note deleted successfully");
    } catch (error: any) {
      toast.error("Error deleting note");
    }
  };

  const handleSaveNote = async (title: string, description: string) => {
    if (!user) return;

    try {
      if (editingNote) {
        // Update existing note
        const { error } = await supabase
          .from("notes")
          .update({ title, description })
          .eq("id", editingNote.id);

        if (error) throw error;
        
        setNotes(
          notes.map((note) =>
            note.id === editingNote.id
              ? { ...note, title, description, updated_at: new Date().toISOString() }
              : note
          )
        );
        toast.success("Note updated successfully");
      } else {
        // Create new note
        const { data, error } = await supabase
          .from("notes")
          .insert({ title, description, user_id: user.id })
          .select()
          .single();

        if (error) throw error;
        
        setNotes([data, ...notes]);
        toast.success("Note created successfully");
      }
      
      setDialogOpen(false);
    } catch (error: any) {
      toast.error(editingNote ? "Error updating note" : "Error creating note");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <StickyNote className="w-12 h-12 text-primary" />
          <p className="text-muted-foreground">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b border-border/50 backdrop-blur-sm bg-card/95 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-glow">
                <StickyNote className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  My Notes
                </h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleCreateNote} className="gap-2">
                <Plus className="w-4 h-4" />
                New Note
              </Button>
              <Button variant="outline" onClick={handleSignOut} className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <NotesList
          notes={notes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />
      </main>

      <NoteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        note={editingNote}
        onSave={handleSaveNote}
      />
    </div>
  );
};

export default Dashboard;