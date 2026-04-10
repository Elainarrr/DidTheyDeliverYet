'use client';

import { useState } from 'react';
import { Site, Update } from '@/lib/types';
import UpdateCard from '@/components/UpdateCard';

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
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <p className="text-gray-500 text-sm">
            This page is private. Enter the password to continue.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Password"
            className="w-full border border-gray-200 rounded px-4 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gray-900 text-white rounded px-4 py-2 text-sm hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Enter'}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">
        {updates.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">
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