// frontend/src/app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { customSignUp } from "../../lib/auth-client";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await customSignUp(email, password);
      router.push("/login?message=Signup successful, please log in.");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Blob Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="blob-c">
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 card bg-[color:var(--bg-card)] rounded-xl border border-[color:var(--border-coffee)] shadow-[0_0_30px_rgba(93,64,55,0.3)] p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[color:var(--text-primary)]">
            Sign up for an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[color:var(--border-coffee)] placeholder-[color:var(--text-primary)] text-[color:var(--text-primary)] rounded-t-md focus:outline-none focus:ring-[color:var(--border-coffee)] focus:border-[color:var(--border-coffee)] focus:z-10 sm:text-sm bg-[color:var(--bg-card)]"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[color:var(--border-coffee)] placeholder-[color:var(--text-primary)] text-[color:var(--text-primary)] rounded-b-md focus:outline-none focus:ring-[color:var(--border-coffee)] focus:border-[color:var(--border-coffee)] focus:z-10 sm:text-sm bg-[color:var(--bg-card)]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="mt-2 text-center text-sm text-red-300">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#5d4037] to-[#8d6e63] hover:from-[#d9a441] hover:to-[#d9a441] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d9a441] transition-all duration-300 transform hover:scale-105"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <a href="/login" className="font-medium text-[color:var(--accent-coffee)] hover:text-[color:var(--accent-caramel)] transition-colors duration-300">
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
