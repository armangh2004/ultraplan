'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Invalid password');
        return;
      }

      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-surface border border-white/10 p-8 rounded-lg"
      >
        <h1 className="font-headline text-2xl text-on-surface text-center mb-8">
          Access Admin Panel
        </h1>

        <div className="flex flex-col gap-2 mb-6">
          <label
            htmlFor="admin-password"
            className="font-body text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold"
          >
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface-container-high text-on-surface border border-outline-variant focus:border-primary focus:outline-none py-4 px-4 rounded transition-colors"
            placeholder="Enter admin password"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-on-primary font-body font-bold uppercase text-[10px] tracking-widest py-4 rounded transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
        >
          {loading ? 'Verifying...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
