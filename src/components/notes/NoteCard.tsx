import { Note } from "@/pages/Dashboard";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteCard = ({ note, onEdit, onDelete }: NoteCardProps) => {
  return (
    <Card className="group hover:shadow-glow transition-all duration-300 hover:scale-[1.02] border-border/50 backdrop-blur-sm bg-card/95">
      <CardHeader className="pb-3">
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {note.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
        </p>
      </CardHeader>
      
      {note.description && (
        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground line-clamp-4">
            {note.description}
          </p>
        </CardContent>
      )}
      
      <CardFooter className="flex gap-2 pt-3 border-t border-border/50">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="flex-1 gap-2"
        >
          <Edit2 className="w-3 h-3" />
          Edit
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2 hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Note</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{note.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-destructive hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;