// frontend/src/app/dashboard/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";

export default function ProfilePage() {
  const { logout, isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    } else if (isAuthenticated && user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || ''
      });
    }
  }, [isAuthenticated, loading, router, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // In a real app, this would make an API call to update the user
      await updateUser?.(formData);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
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
                Profile
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

            <div className="bg-[color:var(--bg-card)] rounded-lg border border-[color:var(--border-coffee)] shadow-[0_0_15px_rgba(93,64,55,0.2)] p-8">
              <div className="flex items-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#5d4037] to-[#d9a441] flex items-center justify-center text-4xl text-[color:var(--bg-card)] font-bold mr-6">
                  {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[color:var(--text-primary)]">{user?.name || 'User'}</h2>
                  <p className="text-[color:var(--accent-caramel)]">{user?.email}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-[color:var(--text-secondary)] mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-3 rounded-lg bg-[color:var(--bg-card)] border border-[color:var(--border-coffee)] focus:ring-2 focus:ring-[color:var(--accent-caramel)] focus:border-transparent text-[color:var(--text-primary)] disabled:bg-[color:var(--bg-card)] disabled:opacity-70"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[color:var(--text-secondary)] mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-3 rounded-lg bg-[color:var(--bg-card)] border border-[color:var(--border-coffee)] focus:ring-2 focus:ring-[color:var(--accent-caramel)] focus:border-transparent text-[color:var(--text-primary)] disabled:bg-[color:var(--bg-card)] disabled:opacity-70"
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-[color:var(--text-secondary)] mb-2">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full p-3 rounded-lg bg-[color:var(--bg-card)] border border-[color:var(--border-coffee)] focus:ring-2 focus:ring-[color:var(--accent-caramel)] focus:border-transparent text-[color:var(--text-primary)] disabled:bg-[color:var(--bg-card)] disabled:opacity-70"
                    ></textarea>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    {!isEditing ? (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="coffee-button-primary px-6 py-3"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              name: user?.name || '',
                              email: user?.email || '',
                              bio: user?.bio || ''
                            });
                            setError('');
                            setSuccess('');
                          }}
                          className="coffee-button-secondary px-6 py-3"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="coffee-button-primary px-6 py-3"
                        >
                          Save Changes
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function updateUser(formData: { name: string; email: string; bio: string; }) {
  throw new Error("Function not implemented.");
}
