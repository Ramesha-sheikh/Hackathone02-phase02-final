// frontend/src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListTodo, Settings, LogOut, User, Home } from "lucide-react";

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/todos", label: "Todos", icon: ListTodo },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-[color:var(--bg-card)] border-r border-[color:var(--border-coffee)] shadow-[0_0_30px_rgba(93,64,55,0.3)] transform transition-transform duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-[color:var(--border-coffee)]">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold coffee-text-gradient">
              Coffee Todo
            </h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-[#d9a441]/20 to-[#8d6e63]/20 text-[color:var(--accent-caramel)] border border-[color:var(--border-coffee)] shadow-[0_0_15px_rgba(217,164,65,0.3)]"
                        : "text-[color:var(--text-secondary)] hover:text-[color:var(--accent-caramel)] hover:bg-[color:var(--bg-primary)]/30"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-[color:var(--border-coffee)]">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg text-[color:var(--text-primary)] hover:text-[color:var(--accent-caramel)] hover:bg-[color:var(--bg-primary)]/30 transition-all duration-300"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}