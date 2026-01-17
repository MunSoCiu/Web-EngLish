"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Button from "../common/Button";
import Card from "../common/Card";

export default function Quiz({ quizId }: { quizId: number }) {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    api.get(`/quizzes/${quizId}`).then((res) => {
      setQuestions(res.data.questions);
    });
  }, [quizId]);

  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <Card key={q.id}>
          <h3 className="font-semibold mb-2">{q.question}</h3>
          {q.options.map((o: any) => (
            <label key={o.id} className="block">
              <input type="radio" name={`q-${q.id}`} /> {o.content}
            </label>
          ))}
        </Card>
      ))}
      <Button>Submit</Button>
    </div>
  );
}
