export default function ProfileHeader({ user }: any) {
  return (
    <div className="text-center mb-6">
      <div className="text-xl font-bold">{user.name}</div>
      <div className="text-blue-500">Level 5 - Master</div>
    </div>
  );
}
