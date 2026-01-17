import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#111827] flex justify-around py-3">
      <Link href="/home">Home</Link>
      <Link href="/courses">Courses</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  );
}
