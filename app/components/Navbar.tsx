"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="w-full flex justify-between items-center px-6 py-4 border-b"
      style={{ background: "#111", borderColor: "#2a2a2a" }}
    >
      <Link href="/dashboard" className="text-xl font-semibold">
        UniShare
      </Link>

      <div className="flex items-center gap-6" style={{ color: "#888" }}>
        <Link href="/notes">Notes</Link>
        <Link href="/papers">Past Papers</Link>
        <Link href="/upload/note">Upload</Link>
      </div>
    </nav>
  );
}
