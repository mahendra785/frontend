"use client";

import { useEffect, useState } from "react";
import NoteCard from "../components/Notescard";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  return (
    <main className="min-h-screen px-8 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Notes</h1>

      {/* Filter + Search */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          className="px-4 py-2 border rounded"
          style={{ borderColor: "#2a2a2a", color: "#888" }}
        >
          Filter
        </button>

        <input
          placeholder="Search"
          className="px-4 py-2 w-80 rounded border"
          style={{ background: "#1b1b1b", borderColor: "#2a2a2a" }}
        />
      </div>

      {/* Notes Grid */}
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        }}
      >
        {notes.map((note: any) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </main>
  );
}
