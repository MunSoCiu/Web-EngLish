"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function LessonPage({ params }: { params: { id: string } }) {
  const [lesson, setLesson] = useState<any>(null);

  useEffect(() => {
    api.get(`/lessons/${params.id}`).then((res) => {
      setLesson(res.data);
    });
  }, [params.id]);

  if (!lesson) return <div>Loading...</div>;

  const quiz = lesson.quizzes?.[0];

  return (
    <div>
      <h1 className="text-xl font-bold">{lesson.title}</h1>

      {quiz && (
        <a href={`/practice/${quiz.id}`} className="text-blue-500 underline">
          Start Quiz
        </a>
      )}
    </div>
  );
}
