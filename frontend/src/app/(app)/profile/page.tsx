export const dynamic = "force-dynamic";

import { api } from "@/lib/api";

export default async function ProfilePage() {
  const { data } = await api.get("/progress");

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Profile</h1>

      <div className="space-y-4">
        {data.map((p: any) => (
          <div key={p.id} className="bg-[#111827] p-4 rounded-xl">
            <div>{p.lesson.title}</div>
            <div className="text-gray-400 text-sm">{p.progress_percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
