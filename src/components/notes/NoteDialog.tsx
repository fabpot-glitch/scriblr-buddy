import { useState, useEffect } from "react";
import { Note } from "@/pages/Dashboard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";

const noteSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }).max(100, { message: "Title must be less than 100 characters" }),
  description: z.string().max(1000, { message: "Description must be less than 1000 characters" }).optional(),
});

interface NoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note: Note | null;
  onSave: (title: string, description: string) => void;
}

const NoteDialog = ({ open, onOpenChange, note, onSave }: NoteDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [note, open]);

  const handleSave = () => {
    const validation = noteSchema.safeParse({ title, description });
    
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    onSave(validation.data.title, validation.data.description || "");
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{note ? "Edit Note" : "Create New Note"}</DialogTitle>
          <DialogDescription>
            {note ? "Update your note details below." : "Add a new note to your collection."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter note description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground text-right">
              {description.length}/1000
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {note ? "Save Changes" : "Create Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;