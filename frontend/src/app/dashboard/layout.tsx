// frontend/src/app/dashboard/layout.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import Chatbot from "../../components/Chatbot";
import { ChatProvider } from "../../context/ChatContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { logout, isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0a05" }}>
        <div className="text-2xl font-bold animate-pulse" style={{ color: "#d9a441" }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <ChatProvider>
      <div className="min-h-screen overflow-x-hidden relative" style={{ background: "#0f0a05" }}>
        <div className="fixed inset-0 -z-10" style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(93,64,55,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(217,164,65,0.08) 0%, transparent 50%)",
        }} />
        <div className="flex">
          <Sidebar onLogout={logout} />
          <main className="flex-1 ml-64 min-h-screen" style={{ color: "#f0e6d2" }}>
            <div className="max-w-5xl mx-auto px-6 py-8">
              {children}
            </div>
          </main>
        </div>
        {user && <Chatbot userId={user.id} />}
      </div>
    </ChatProvider>
  );
}
