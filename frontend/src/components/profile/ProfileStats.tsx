import Card from "../common/Card";

export default function ProfileStats({ stats }: any) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>{stats.streak} Streak</Card>
      <Card>{stats.xp} XP</Card>
      <Card>{stats.words} Words</Card>
    </div>
  );
}
