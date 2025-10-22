import express from "express";
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all notes (for logged-in user)
router.get("/", protect, getNotes);

// Create a new note
router.post("/", protect, createNote);

// Update a note by ID
router.put("/:id", protect, updateNote);

// Delete a note by ID
router.delete("/:id", protect, deleteNote);

export default router;
