'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Header from '@/components/Header';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Incorrect email or password. Please try again.');
      setLoading(false);
      return;
    }

    router.push(redirectTo);
  }

  return (
    <main className="min-h-screen bg-yellow flex flex-col">
      <Header title="Admin login 🔐" />

      <div className="flex-1 flex items-center justify-center px-6 py-12 pb-20">
        <div className="bg-white rounded-2xl p-8 w-full max-w-xs flex flex-col gap-5 border border-gray-100">
          <p className="text-sm text-gray-400 text-center">
            Sign in to manage your site.
          </p>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
          {error && (
            <p className="text-coral text-sm">{error}</p>
          )}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-coral text-white rounded-full px-6 py-3 text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <Link
            href="/"
            className="text-center text-sm text-gray-400 hover:opacity-70 transition-opacity"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="text-sm text-gray-400">Loading...</p>}>
      <LoginForm />
    </Suspense>
  );
}