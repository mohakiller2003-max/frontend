'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin, setAdminToken } from '@/lib/admin-api';
import { Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await adminLogin(username, password);
      setAdminToken(token);
      router.push('/admin');
    } catch {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-ivory border border-sand rounded-3xl shadow-card p-8">
        <p className="text-xs uppercase tracking-widest text-taupe mb-1">Skinouva</p>
        <h1 className="text-2xl font-black text-mocha mb-6">Admin Login</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-sand bg-white focus:outline-none focus:ring-2 focus:ring-mocha"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-sand bg-white focus:outline-none focus:ring-2 focus:ring-mocha"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-error font-medium">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-mocha text-ivory py-3 rounded-xl font-black hover:bg-mocha/90 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
