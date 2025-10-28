"use client";

import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Dashboard() {
  const [notes, setNotes] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");

  const fetchNotes = async () => {
    const res = await api.get("/notes");
    setNotes(res.data);
  };

  const uploadNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("course", course);
    formData.append("semester", semester);

    await api.post("/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Reset
    setFile(null);
    setTitle("");
    setDescription("");
    setCourse("");
    setSemester("");

    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">📚 Upload Study Materials</h1>

      {/* UPLOAD FORM */}
      <form
        onSubmit={uploadNote}
        className="grid gap-4 bg-white p-6 rounded-lg shadow w-full max-w-xl mb-10"
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2 rounded"
        />
        <input
          className="border p-2 rounded"
          placeholder="Title (e.g., DBMS Unit 1 Notes)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Course Code (e.g., CS101)"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Semester (e.g., 5)"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />

        <button className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">
          Upload PDF
        </button>
      </form>

      {/* LIST OF NOTES */}
      <h2 className="text-2xl font-semibold mb-4">Your Uploaded Notes</h2>

      <div className="grid gap-4">
        {notes.map((n) => (
          <div
            key={n.ID}
            className="border bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg">{n.Title}</h3>
              <p className="text-gray-600">{n.Description}</p>
              <p className="text-sm text-gray-500">
                {n.CourseCode} — Semester {n.Semester}
              </p>
            </div>
            <a
              href={n.FileURL}
              target="_blank"
              className="text-blue-600 underline hover:text-blue-800"
            >
              View / Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
