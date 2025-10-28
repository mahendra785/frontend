import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-3">
        Welcome to <span style={{ color: "#6b59ff" }}>UniShare</span>
      </h1>

      <p className="text-lg mb-10 max-w-2xl" style={{ color: "#888" }}>
        A community-driven academic sharing platform to help students survive
        exams.
      </p>

      <div className="flex gap-6">
        <Link
          href="/notes"
          className="px-8 py-3 rounded-lg text-lg font-medium transition"
          style={{ background: "#6b59ff" }}
        >
          Notes 📚
        </Link>

        <Link
          href="/papers"
          className="px-8 py-3 rounded-lg text-lg font-medium border transition"
          style={{ background: "#1b1b1b", borderColor: "#2a2a2a" }}
        >
          Past Papers 📝
        </Link>
      </div>

      <p className="mt-12" style={{ color: "#888" }}>
        Already here?{" "}
        <Link href="/login" className="underline" style={{ color: "#6b59ff" }}>
          Login
        </Link>
      </p>
    </main>
  );
}
