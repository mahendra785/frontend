"use client";
import { useState } from "react";
import { api } from "../lib/api";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.get(`/search?q=${query}`);
    setResults(res.data);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-1/2"
          placeholder="Search notes..."
        />
        <button className="bg-blue-600 text-white px-4">Search</button>
      </form>

      <div className="mt-6 grid gap-3">
        {results.map((note) => (
          <div key={note.ID} className="border p-3 rounded">
            <h2 className="font-bold">{note.Title}</h2>
            <p>{note.Content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
