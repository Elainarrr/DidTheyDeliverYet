'use client';

import { useState } from 'react';
import { Site, Update } from '@/lib/types';
import UpdateCard from '@/components/UpdateCard';
import Link from 'next/link';

type Props = {
  site: Site;
  updates: Update[];
};

export default function UpdatesFeed({ site, updates }: Props) {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!password) return;
    setLoading(true);
    setError('');

    const res = await fetch(`/api/check-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteId: site.id, password }),
    });

    if (res.ok) {
      setUnlocked(true);
    } else {
      setError('Incorrect password. Please try again.');
    }

    setLoading(false);
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-yellow px-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center gap-4 w-full max-w-xs">
          <p
            className="text-2xl font-light text-black"
            style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '-0.02em' }}
          >
            VIP access ✨
          </p>
          <p className="text-sm text-gray-400 text-center leading-relaxed">
            If you were given a password, enter it below for more detailed updates.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Password"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
          {error && (
            <p className="text-coral text-sm">{error}</p>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-coral text-white rounded-full px-4 py-3 text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Enter'}
          </button>
          <Link
            href={`/${site.slug}`}
            className="text-xs text-gray-300 hover:opacity-70 transition-opacity"
          >
            ← Back to status page
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-yellow px-6 py-5 flex items-center justify-between">
        <div className="flex-1">
          <Link
            href="/"
            className="text-base font-bold text-coral hover:opacity-70 transition-opacity"
            style={{ letterSpacing: '0.15em' }}
          >
            DTDY
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <p
            className="text-2xl font-medium text-black opacity-70"
            style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '-0.02em' }}
          >
            ✨ VIP Updates
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <Link
            href={`/${site.slug}`}
            className="text-xs font-semibold tracking-widest uppercase text-black opacity-50 hover:opacity-70 transition-opacity"
          >
            ← Back
          </Link>
        </div>
      </header>

      <div className="max-w-lg mx-auto py-10 px-4 flex flex-col gap-6">
        {updates.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-12">
            No updates yet. Check back soon!
          </p>
        ) : (
          updates.map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))
        )}
      </div>
    </main>
  );
}