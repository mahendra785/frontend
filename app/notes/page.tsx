"use client";

import { useState } from "react";
import NoteCard from "../components/Notescard";

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | "notes" | "papers">("all");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotes = async (customSearch?: string) => {
    setIsLoading(true);
    let url = "http://localhost:8080/api/notes";

    const queryText = customSearch ?? search.trim();
    if (queryText) {
      url = `http://localhost:8080/api/search?q=${encodeURIComponent(
        queryText
      )}`;
    } else if (filter !== "all") {
      url += `?filter=${filter}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setNotes(data);
    setIsLoading(false);
  };

  // Initial load
  useState(() => {
    fetchNotes();
  });

  const handleSearch = () => fetchNotes();
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <main className="min-h-screen px-8 py-10 text-white bg-black">
      <h1 className="text-4xl font-bold mb-8 text-center">Study Materials</h1>

      {/* Filter */}
      <div className="flex justify-center gap-3 mb-6">
        {["all", "notes", "papers"].map((val) => (
          <button
            key={val}
            onClick={() => {
              setFilter(val as any);
              fetchNotes(); // refetch on filter change
            }}
            className={`px-4 py-2 rounded border ${
              filter === val
                ? "bg-[#6b59ff] border-[#6b59ff]"
                : "border-[#2a2a2a] text-gray-400"
            }`}
          >
            {val.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex justify-center mb-8 gap-2">
        <input
          placeholder="Search by title or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          className="px-4 py-2 w-80 rounded border bg-[#1b1b1b] border-[#2a2a2a] text-white"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded bg-[#6b59ff] hover:bg-[#5644df]"
        >
          Search
        </button>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
        >
          {notes.length > 0 ? (
            notes.map((note) => <NoteCard key={note.id} note={note} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No results found.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
