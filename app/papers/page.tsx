"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PapersPage() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/papers")
      .then((res) => res.json())
      .then((data) => setPapers(data));
  }, []);

  return (
    <main className="min-h-screen px-8 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Past Papers</h1>

      {/* Search/Filter */}
      <div className="flex justify-center gap-4 mb-10">
        <input
          placeholder="Search"
          className="px-4 py-2 w-80 rounded border"
          style={{
            background: "#1b1b1b",
            borderColor: "#2a2a2a",
            color: "#eaeaea",
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
      >
        {papers.map((p: any) => (
          <div
            key={p.id}
            className="rounded-lg overflow-hidden cursor-pointer border transition hover:scale-[1.02]"
            style={{ background: "#1b1b1b", borderColor: "#2a2a2a" }}
          >
            <div
              className="w-full h-40 bg-center bg-cover bg-no-repeat"
              style={{
                backgroundImage:
                  "url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png)",
                backgroundColor: "#111",
              }}
            />

            <div className="p-4">
              <h3 className="font-medium truncate">{p.title}</h3>
              <p className="text-sm mt-1 truncate" style={{ color: "#888" }}>
                {p.course_code} — Sem {p.semester} ({p.year})
              </p>

              <div className="flex justify-between mt-3">
                <Link
                  href={`/papers/${p.id}`}
                  className="text-sm underline"
                  style={{ color: "#6b59ff" }}
                >
                  View
                </Link>
                <span style={{ color: "#888" }}>♥</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
