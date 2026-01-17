import Link from "next/link";
import Card from "../common/Card";

export default function CourseCard({ course }: any) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card>
        <h3 className="font-semibold">{course.title}</h3>
        <p className="text-sm text-gray-400">{course.level}</p>
      </Card>
    </Link>
  );
}
