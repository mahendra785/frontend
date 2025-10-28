"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={submit}
        className="p-8 rounded-lg w-full max-w-md border"
        style={{ background: "#1b1b1b", borderColor: "#2a2a2a" }}
      >
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

        <input
          placeholder="Email"
          className="w-full mb-4 p-2 rounded border"
          style={{ background: "#111", borderColor: "#2a2a2a" }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full mb-6 p-2 rounded border"
          style={{ background: "#111", borderColor: "#2a2a2a" }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full py-2 rounded text-white"
          style={{ background: "#6b59ff" }}
        >
          Login
        </button>

        <p className="text-center mt-4" style={{ color: "#888" }}>
          No account?{" "}
          <Link
            href="/signup"
            className="underline"
            style={{ color: "#6b59ff" }}
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
