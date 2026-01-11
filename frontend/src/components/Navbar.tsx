// frontend/src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[color:var(--bg-primary)] border-b border-[color:var(--border-neon)] shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-3xl font-bold text-[color:var(--accent-caramel)] tracking-wide" style={{ textShadow: '0 0 8px #d9a441, 0 0 15px #d9a441' }}>
              Coffee Todo
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[color:var(--text-primary)] hover:text-[color:var(--accent-caramel)] transition-colors duration-300 relative group px-3 py-2 rounded-lg hover:bg-[color:var(--bg-card)]/30">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[color:var(--accent-caramel)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-[color:var(--text-primary)] hover:text-[color:var(--accent-coffee)] transition-colors duration-300 relative group px-3 py-2 rounded-lg hover:bg-[color:var(--bg-card)]/30">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[color:var(--accent-coffee)] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-[color:var(--text-primary)] hover:text-[color:var(--accent-caramel)] transition-colors duration-300 relative group">
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[color:var(--accent-caramel)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <button
                  onClick={logout}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#5d4037]/20 to-[#d9a441]/20 hover:from-[#5d4037]/30 hover:to-[#d9a441]/30 border border-[color:var(--border-coffee)] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(93,64,55,0.4)] text-[color:var(--text-primary)]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="coffee-button-secondary px-6 py-2 text-sm md:text-base"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="coffee-button-primary px-6 py-2 text-sm md:text-base"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-[color:var(--accent-caramel)] focus:outline-none hover:text-[color:var(--accent-coffee)] transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} className="animate-pulse" /> : <Menu size={28} className="animate-pulse" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-6 md:hidden flex flex-col space-y-4 pb-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-lg text-[color:var(--text-primary)] hover:text-[color:var(--accent-caramel)] transition-colors duration-300 relative group py-2 px-3 rounded-lg hover:bg-[color:var(--bg-card)]/30"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[color:var(--accent-caramel)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="text-lg text-[color:var(--text-primary)] hover:text-[color:var(--accent-coffee)] transition-colors duration-300 relative group py-2 px-3 rounded-lg hover:bg-[color:var(--bg-card)]/30"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[color:var(--accent-coffee)] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-lg text-[color:var(--text-primary)] hover:text-[color:var(--accent-caramel)] transition-colors duration-300 relative group py-2"
                >
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[color:var(--accent-caramel)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-left px-4 py-2 rounded-lg bg-gradient-to-r from-[#5d4037]/20 to-[#d9a441]/20 hover:from-[#5d4037]/30 hover:to-[#d9a441]/30 border border-[color:var(--border-coffee)] transition-all duration-300 transform hover:scale-105 text-[color:var(--text-primary)] w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="coffee-button-secondary py-3 px-4 text-center w-full text-base"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="coffee-button-primary py-3 px-4 text-center w-full text-base"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}