"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NoteView() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [note, setNote] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/notes/${id}`)
      .then((res) => res.json())
      .then(setNote);
  }, [id]);

  if (!note) return <p style={{ color: "#888" }}>Loading…</p>;

  return (
    <main className="min-h-screen">
      {/* Use embed to display the PDF */}
      <embed
        src={note.FileURL}
        type="application/pdf"
        style={{ width: "100%", height: "100vh", border: " solid #ccc" }}
      />
    </main>
  );
}
