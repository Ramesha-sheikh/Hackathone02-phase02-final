// frontend/src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListTodo, Settings, LogOut, User, Home, Coffee, CheckCircle2, Clock, Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/todos", label: "All Todos", icon: ListTodo },
    { href: "/dashboard/todos/new", label: "New Task", icon: Plus },
    { href: "/dashboard/todos/pending", label: "Pending", icon: Clock },
    { href: "/dashboard/todos/completed", label: "Completed", icon: CheckCircle2 },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() || "U";

  return (
    <aside className="fixed top-0 left-0 bottom-0 z-40 w-64 flex flex-col" style={{
      background: "linear-gradient(180deg, #1a1208 0%, #2c1e0f 40%, #1a1208 100%)",
      borderRight: "1px solid rgba(217,164,65,0.15)",
      boxShadow: "4px 0 30px rgba(0,0,0,0.4)",
    }}>
      {/* Logo */}
      <div className="px-6 py-6 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(217,164,65,0.1)" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{
          background: "linear-gradient(135deg, #d9a441, #8d6e63)",
          boxShadow: "0 0 20px rgba(217,164,65,0.4)",
        }}>
          <Coffee className="w-5 h-5 text-[#1a1208]" />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-none" style={{
            background: "linear-gradient(90deg, #d9a441, #f0c060)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            CoffeeTodo
          </h1>
          <p className="text-[10px] mt-0.5" style={{ color: "rgba(217,164,65,0.5)", letterSpacing: "1.5px" }}>PREMIUM</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(217,164,65,0.35)" }}>
          Main Menu
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative"
              style={active ? {
                background: "linear-gradient(135deg, rgba(217,164,65,0.18), rgba(141,110,99,0.12))",
                border: "1px solid rgba(217,164,65,0.25)",
                boxShadow: "0 2px 15px rgba(217,164,65,0.1)",
              } : { border: "1px solid transparent" }}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full" style={{
                  background: "linear-gradient(180deg, #d9a441, #f0c060)",
                  boxShadow: "0 0 8px rgba(217,164,65,0.8)",
                }} />
              )}
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={active ? {
                  background: "linear-gradient(135deg, #d9a441, #c49235)",
                  boxShadow: "0 0 12px rgba(217,164,65,0.35)",
                } : { background: "rgba(255,255,255,0.04)" }}>
                <Icon className="w-4 h-4" style={{ color: active ? "#1a1208" : "rgba(217,164,65,0.55)" }} />
              </div>
              <p className="text-sm font-medium" style={{ color: active ? "#f0c060" : "rgba(240,214,178,0.75)" }}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4" style={{ borderTop: "1px solid rgba(217,164,65,0.1)" }}>
        <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl" style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(217,164,65,0.08)",
        }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{
            background: "linear-gradient(135deg, #8d6e63, #5d4037)", color: "#f0e6d2",
          }}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: "rgba(240,214,178,0.9)" }}>
              {user?.name || user?.email?.split("@")[0] || "User"}
            </p>
            <p className="text-[10px] truncate" style={{ color: "rgba(217,164,65,0.45)" }}>{user?.email || ""}</p>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200"
          style={{ border: "1px solid transparent" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)" }}>
            <Home className="w-4 h-4" style={{ color: "rgba(217,164,65,0.45)" }} />
          </div>
          <span className="text-sm font-medium" style={{ color: "rgba(240,214,178,0.55)" }}>Home</span>
        </Link>
        <button onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group"
          style={{ border: "1px solid transparent" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:bg-red-500/10"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <LogOut className="w-4 h-4 transition-colors duration-200 group-hover:text-red-400" style={{ color: "rgba(217,164,65,0.45)" }} />
          </div>
          <span className="text-sm font-medium transition-colors duration-200 group-hover:text-red-400" style={{ color: "rgba(240,214,178,0.55)" }}>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
