import Link from "next/link";

export default function NoteCard({ note }: any) {
  return (
    <div
      className="rounded-lg overflow-hidden border hover:scale-[1.02] transition cursor-pointer"
      style={{ background: "#1b1b1b", borderColor: "#2a2a2a" }}
    >
      <div className="p-4">
        <h3 className="font-medium text-white truncate">
          {note.title || "Untitled"}
        </h3>

        {note.is_paper ? (
          <p className="text-sm text-purple-400 mt-1">📄 Past Paper</p>
        ) : (
          <p className="text-sm text-gray-400 mt-1">
            {note.description || "No description"}
          </p>
        )}

        <p className="text-sm text-gray-500 mt-1">
          {note.course_code || "N/A"} — Sem {note.semester || "?"}
        </p>

        <div className="flex justify-between items-center mt-3">
          <Link
            href={note.file_url}
            target="_blank"
            className="text-sm underline text-[#6b59ff]"
          >
            View PDF
          </Link>
        </div>
      </div>
    </div>
  );
}
