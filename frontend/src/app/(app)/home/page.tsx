"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function HomePage() {
  const [lessons, setLessons] = useState<any[]>([]);

  useEffect(() => {
    api.get("/lessons").then((res) => setLessons(res.data));
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
      <div className="space-y-4">
        {lessons.map((l) => (
          <a
            key={l.id}
            href={`/courses/${l.id}`}
            className="block bg-[#111827] p-4 rounded-xl"
          >
            <h3 className="font-semibold">{l.title}</h3>
            <p className="text-gray-400 text-sm">{l.level}</p>
          </a>
        ))}
      </div>
    </>
  );
}
