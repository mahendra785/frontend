"use client";

import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Dashboard() {
  const [notes, setNotes] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [uploadType, setUploadType] = useState<"note" | "paper">("note");
  const [isUploading, setIsUploading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get("/stats/course-notes");
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF first!");
    if (!title || !courseCode || !semester)
      return alert("Fill all required fields.");

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("course_code", courseCode);
      formData.append("semester", semester);
      formData.append("is_paper", uploadType === "paper" ? "true" : "false");

      if (uploadType === "note") {
        formData.append("description", description);
      } else {
        formData.append("year", year);
      }

      console.log("Uploading:", { title, courseCode, semester, uploadType });

      await api.post("/uploads", formData);

      setFile(null);
      setTitle("");
      setDescription("");
      setCourseCode("");
      setSemester("");
      setYear("");

      await fetchNotes();
      await fetchStats();

      alert("Upload successful!");
    } catch (error: any) {
      console.error("Upload error:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Upload failed. Check console for details.";
      alert(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-400">
            Upload and manage your study materials
          </p>
        </div>

        {/* Stats Cards */}
        {stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {stats.slice(0, 3).map((stat, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6"
              >
                <h3 className="text-gray-400 text-sm font-medium mb-2">
                  {stat.CourseCode}
                </h3>
                <p className="text-3xl font-bold text-white">{stat.Count}</p>
                <p className="text-gray-500 text-xs mt-1">documents</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Upload Material</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Upload Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUploadType("note")}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    uploadType === "note"
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-750"
                  }`}
                >
                  Notes
                </button>
                <button
                  type="button"
                  onClick={() => setUploadType("paper")}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    uploadType === "paper"
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-750"
                  }`}
                >
                  Past Paper
                </button>
              </div>
            </div>

            <form onSubmit={upload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  PDF File
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                />
                {file && (
                  <p className="text-sm text-gray-500 mt-2">
                    Selected: {file.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {uploadType === "note" && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="Short description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              )}

              {uploadType === "paper" && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2024"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Course Code *
                </label>
                <input
                  type="text"
                  placeholder="e.g., CS101"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Semester *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Fall 2024"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </form>
          </div>

          {/* Notes List */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Your Materials</h2>

            {notes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No materials uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {notes.map((n) => (
                  <div
                    key={n.ID}
                    className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-purple-600 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg text-white">
                        {n.title}
                      </h3>
                      <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">
                        {n.IsPaper ? "Paper" : "Notes"}
                      </span>
                    </div>

                    {n.Description && (
                      <p className="text-gray-400 text-sm mb-3">
                        {n.Description}
                      </p>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-gray-400">
                          {n.CourseCode}
                        </span>
                        {" · "}
                        {n.Semester}
                        {n.Year && ` · ${n.Year}`}
                      </div>

                      <a
                        href={n.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                      >
                        View PDF →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
