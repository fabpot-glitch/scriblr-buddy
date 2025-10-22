import Note from "../models/Note.js";

// @desc Get all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new note
export const createNote = async (req, res) => {
  try {
    const note = new Note({
      user: req.user.id,
      title: req.body.title,
      content: req.body.content,
    });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a note
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await note.deleteOne();
    res.json({ message: "Note removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
