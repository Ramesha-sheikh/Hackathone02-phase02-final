// frontend/src/app/dashboard/settings/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";

export default function SettingsPage() {
  const { logout, isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [theme, setTheme] = useState('cyberpunk');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  const handleSaveSettings = async () => {
    setError('');
    setSuccess('');

    try {
      // Simulate saving settings
      setTimeout(() => {
        setSuccess('Settings saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] flex items-center justify-center">
        <div className="text-2xl font-bold text-[color:var(--accent-caramel)] animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] overflow-x-hidden relative">
      {/* Animated Blob Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="blob-c">
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar onLogout={logout} />

        {/* Main Content */}
        <main className="flex-1 ml-64 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-[color:var(--accent-caramel)] mb-6">
                Settings
              </h1>
              <div className="text-right">
                <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">Welcome, {user?.email || user?.name || 'User'}!</h2>
                <button
                  onClick={logout}
                  className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#5d4037]/20 to-[#d9a441]/20 hover:from-[#5d4037]/30 hover:to-[#d9a441]/30 border border-[color:var(--border-coffee)] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(93,64,55,0.4)] text-[color:var(--text-primary)]"
                >
                  Logout
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-[color:var(--bg-card)] rounded-lg border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.2)] text-red-300">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-[color:var(--bg-card)] rounded-lg border border-green-500/50 shadow-[0_0_15px_rgba(0,255,0,0.2)] text-green-300">
                {success}
              </div>
            )}

            <div className="space-y-8">
              {/* Account Settings */}
              <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-coffee)] shadow-[0_0_15px_rgba(93,64,55,0.2)] p-6">
                <h2 className="text-2xl font-bold mb-6 text-[color:var(--accent-caramel)]">Account Settings</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-[color:var(--border-coffee)]/30">
                    <div>
                      <h3 className="font-medium text-[color:var(--text-primary)]">Dark Mode</h3>
                      <p className="text-sm text-[color:var(--text-secondary)]">Enable dark theme for the application</p>
                    </div>
                    <div className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                        className="opacity-0 w-0 h-0 peer"
                        id="darkModeToggle"
                      />
                      <label
                        htmlFor="darkModeToggle"
                        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[color:var(--border-coffee)] rounded-full transition-colors duration-300 peer-checked:bg-[color:var(--accent-caramel)] ${darkMode ? 'bg-[color:var(--accent-caramel)]' : 'bg-[color:var(--border-coffee)]'}`}
                      >
                        <span
                          className={`absolute h-4 w-4 bg-[color:var(--bg-card)] rounded-full transition-transform duration-300 top-1 ${darkMode ? 'left-7' : 'left-1'}`}
                        ></span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[color:var(--border-coffee)]/30">
                    <div>
                      <h3 className="font-medium text-[color:var(--text-primary)]">Email Notifications</h3>
                      <p className="text-sm text-[color:var(--text-secondary)]">Receive email notifications for important updates</p>
                    </div>
                    <div className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                        className="opacity-0 w-0 h-0 peer"
                        id="notificationsToggle"
                      />
                      <label
                        htmlFor="notificationsToggle"
                        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[color:var(--border-coffee)] rounded-full transition-colors duration-300 peer-checked:bg-[color:var(--accent-caramel)] ${notifications ? 'bg-[color:var(--accent-caramel)]' : 'bg-[color:var(--border-coffee)]'}`}
                      >
                        <span
                          className={`absolute h-4 w-4 bg-[color:var(--bg-card)] rounded-full transition-transform duration-300 top-1 ${notifications ? 'left-7' : 'left-1'}`}
                        ></span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[color:var(--border-coffee)]/30">
                    <div>
                      <h3 className="font-medium text-[color:var(--text-primary)]">Auto Sync</h3>
                      <p className="text-sm text-[color:var(--text-secondary)]">Automatically sync your todos across devices</p>
                    </div>
                    <div className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={autoSync}
                        onChange={(e) => setAutoSync(e.target.checked)}
                        className="opacity-0 w-0 h-0 peer"
                        id="autoSyncToggle"
                      />
                      <label
                        htmlFor="autoSyncToggle"
                        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[color:var(--border-coffee)] rounded-full transition-colors duration-300 peer-checked:bg-[color:var(--accent-caramel)] ${autoSync ? 'bg-[color:var(--accent-caramel)]' : 'bg-[color:var(--border-coffee)]'}`}
                      >
                        <span
                          className={`absolute h-4 w-4 bg-[color:var(--bg-card)] rounded-full transition-transform duration-300 top-1 ${autoSync ? 'left-7' : 'left-1'}`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Settings */}
              <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-coffee)] shadow-[0_0_15px_rgba(93,64,55,0.2)] p-6">
                <h2 className="text-2xl font-bold mb-6 text-[color:var(--accent-caramel)]">Theme Settings</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-[color:var(--border-coffee)]/30">
                    <div>
                      <h3 className="font-medium text-[color:var(--text-primary)]">Theme</h3>
                      <p className="text-sm text-[color:var(--text-secondary)]">Choose your preferred theme</p>
                    </div>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="bg-[color:var(--bg-card)] border border-[color:var(--border-coffee)] rounded-lg px-3 py-2 text-[color:var(--text-primary)] focus:ring-2 focus:ring-[color:var(--accent-caramel)] focus:border-transparent"
                    >
                      <option value="coffee">Coffee & Caramel</option>
                      <option value="dark">Dark Mode</option>
                      <option value="light">Light Mode</option>
                      <option value="earth">Earth Tones</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-[color:var(--bg-card)] rounded-lg border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.2)] p-6">
                <h2 className="text-2xl font-bold mb-6 text-[color:var(--accent-coffee)]">Danger Zone</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-medium text-[color:var(--text-primary)]">Delete Account</h3>
                      <p className="text-sm text-[color:var(--text-secondary)]">Permanently delete your account and all data</p>
                    </div>
                    <button
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] text-red-300"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  className="coffee-button-primary px-8 py-3 text-lg"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}