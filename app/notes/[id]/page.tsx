"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("../../components/PDFViewer"), {
  ssr: false,
});

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
  console.log(note);
  return (
    <main className="min-h-screen p-6">
      <PDFViewer fileUrl={note.FileURL} />
    </main>
  );
}
