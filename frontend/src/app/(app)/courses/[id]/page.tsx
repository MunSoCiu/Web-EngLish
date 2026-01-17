"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import CourseHeader from "@/components/course/CourseHeader";
import Curriculum from "@/components/course/Curriculum";

export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    api.get(`/lessons/${params.id}`).then((res) => {
      setCourse(res.data);
    });
  }, [params.id]);

  if (!course) return <div>Loading...</div>;

  return (
    <>
      <CourseHeader course={course} />
      <Curriculum quizzes={course.quizzes || []} />
    </>
  );
}
