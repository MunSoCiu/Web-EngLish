"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
    router.push("/home");
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full px-4 py-3 rounded-xl bg-[#0B1220]"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full px-4 py-3 rounded-xl bg-[#0B1220]"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 py-3 rounded-xl font-semibold">
          Log In →
        </button>
      </form>
    </>
  );
}
