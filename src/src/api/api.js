import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Example: Fetch all notes
export const fetchNotes = () => API.get("/api/notes");

// Example: Add a new note
export const createNote = (noteData) => API.post("/api/notes", noteData);

// Example: Delete a note
export const deleteNote = (id) => API.delete(`/api/notes/${id}`);

// Example: User authentication
export const registerUser = (userData) => API.post("/api/auth/register", userData);
export const loginUser = (userData) => API.post("/api/auth/login", userData);

export default API;
