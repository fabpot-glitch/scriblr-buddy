import { useState, useEffect } from "react";

function App() {
  const BACKEND = import.meta.env.VITE_BACKEND_URL; // ✅ Read from .env
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ✅ Fetch notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/notes`);
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        setNotes(data);
      } catch (error) {
        console.error(error);
        setMessage("❌ Could not load notes. Please check backend connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [BACKEND]);

  // ✅ Add new note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Please fill both fields!");

    try {
      const res = await fetch(`${BACKEND}/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error("Failed to add note");
      const newNote = await res.json();
      setNotes([...notes, newNote]);
      setTitle("");
      setContent("");
      setMessage("✅ Note added successfully!");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add note.");
    }
  };

  // ✅ Delete note
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BACKEND}/api/notes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete note");
      setNotes(notes.filter((note) => note._id !== id));
      setMessage("🗑️ Note deleted successfully!");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to delete note.");
    }
  };

  // ✅ Loading Screen
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Loading notes...
      </div>
    );

  // ✅ UI
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">📝 Scriblr Buddy</h1>

      {message && <p className="text-center text-green-400 mb-4">{message}</p>}

      {/* Add Note Form */}
      <form
        onSubmit={handleAddNote}
        className="max-w-lg mx-auto bg-slate-800 p-6 rounded-2xl shadow-md mb-8"
      >
        <input
          type="text"
          placeholder="Note Title"
          className="w-full p-2 mb-3 rounded bg-slate-700 text-white border border-slate-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your note..."
          className="w-full p-2 mb-3 rounded bg-slate-700 text-white border border-slate-600"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-semibold"
        >
          Add Note
        </button>
      </form>

      {/* Notes List */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note._id}
              className="bg-slate-800 p-5 rounded-xl shadow-md border border-slate-700"
            >
              <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
              <p className="text-slate-300 mb-3">{note.content}</p>
              <button
                onClick={() => handleDelete(note._id)}
                className="text-red-400 hover:text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-slate-400">
            No notes yet. Add one above!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
