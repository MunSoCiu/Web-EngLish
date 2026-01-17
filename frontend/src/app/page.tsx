import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-4">
        Master English <span className="text-blue-500">Today</span>
      </h1>
      <p className="text-gray-400 text-center mb-8">
        Log in to continue your progress and unlock new lessons.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-blue-600 rounded-xl font-semibold"
        >
          Log In
        </Link>
        <Link href="/register" className="px-6 py-3 bg-gray-700 rounded-xl">
          Sign Up
        </Link>
      </div>
    </main>
  );
}
