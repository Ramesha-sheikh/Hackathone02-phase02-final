// frontend/src/components/HeroSection.tsx

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { MoveRight } from 'lucide-react';

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="text-center py-20 md:py-32">
      <h1 className="text-5xl md:text-7xl font-bold coffee-text-gradient mb-6">
        Coffee Todo
      </h1>
      <p className="text-xl md:text-2xl text-[color:var(--text-secondary)] max-w-3xl mx-auto mb-10">
        The ultimate task manager for the modern, coffee-loving individual. Organize your digital life with warmth and efficiency.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {isAuthenticated ? (
          <Link href="/dashboard" className="coffee-button-primary text-lg px-8 py-4">
            Go to Dashboard <MoveRight className="ml-2" />
          </Link>
        ) : (
          <>
            <Link href="/signup" className="coffee-button-primary text-lg px-8 py-4">
              Get Started <MoveRight className="ml-2" />
            </Link>
            <Link href="/login" className="coffee-button-secondary text-lg px-8 py-4">
              Login
            </Link>
          </>
        )}
      </div>
    </section>
  );
}