import Card from "../common/Card";

export default function Curriculum({ quizzes }: any) {
  return (
    <div className="space-y-3">
      {quizzes.map((q: any) => (
        <Card key={q.id}>{q.title}</Card>
      ))}
    </div>
  );
}
