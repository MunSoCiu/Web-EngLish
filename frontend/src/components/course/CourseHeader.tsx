export default function CourseHeader({ course }: any) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p className="text-gray-400">{course.description}</p>
    </div>
  );
}
