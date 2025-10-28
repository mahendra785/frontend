import Link from "next/link";

export default function NoteCard({ note }: any) {
  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer border transition hover:scale-[1.02]"
      style={{ background: "#1b1b1b", borderColor: "#2a2a2a" }}
    >
      {/* Preview Image */}
      <div
        className="w-full h-40 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png)`,
          backgroundColor: "#111",
        }}
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium truncate">{note.title}</h3>
        <p className="text-sm mt-1 truncate" style={{ color: "#888" }}>
          {note.course_code} — Sem {note.semester}
        </p>

        <div className="flex justify-between items-center mt-3">
          <Link
            href={`/notes/${note.ID}`}
            className="text-sm underline"
            style={{ color: "#6b59ff" }}
          >
            View
          </Link>

          <button className="text-lg" style={{ color: "#888" }}>
            ♥
          </button>
        </div>
      </div>
    </div>
  );
}
