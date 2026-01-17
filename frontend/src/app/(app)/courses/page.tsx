export const dynamic = "force-dynamic";

import { api } from "@/lib/api";
import CourseCard from "@/components/course/CourseCard";

export default async function CoursesPage() {
  const { data } = await api.get("/lessons");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Courses</h1>

      {data.map((course: any) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
