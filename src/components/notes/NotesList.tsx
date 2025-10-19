import { Note } from "@/pages/Dashboard";
import NoteCard from "./NoteCard";
import { StickyNote } from "lucide-react";

interface NotesListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NotesList = ({ notes, onEdit, onDelete }: NotesListProps) => {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="p-6 rounded-full bg-gradient-to-br from-primary/10 to-primary-glow/10 mb-6">
          <StickyNote className="w-16 h-16 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No notes yet</h2>
        <p className="text-muted-foreground max-w-md">
          Start creating your first note by clicking the "New Note" button above!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={() => onEdit(note)}
          onDelete={() => onDelete(note.id)}
        />
      ))}
    </div>
  );
};

export default NotesList;