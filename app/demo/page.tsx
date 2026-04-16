'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DemoPage() {
  const [tab, setTab] = useState<'pending' | 'delivered'>('pending');

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header title="Try it out" />

      {/* Demo notice */}
      <div className="bg-sky px-6 py-3 text-center">
        <p className="text-xs font-medium text-blue-700">
          This is a demo — <Link href="/#pricing" className="underline hover:opacity-70">get your own page for $15</Link>
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex justify-center mt-12 mb-8 gap-2">
        <button
          onClick={() => setTab('pending')}
          className="rounded-full px-6 py-2 text-sm font-medium transition-all"
          style={{
            background: tab === 'pending' ? '#1a1a1a' : 'transparent',
            color: tab === 'pending' ? 'white' : '#6B7280',
            border: tab === 'pending' ? '2px solid #1a1a1a' : '2px solid #e0e0e0',
          }}
        >
          Before delivery
        </button>
        <button
          onClick={() => {
            setTab('delivered');
        confetti({
              particleCount: 200,
              spread: 90,
              origin: { y: 0.5 },
              colors: ['#B7A3E3', '#F9A8C9', '#60A5FA', '#FFF1CB', '#FF8F8F'],
            });
        }}
          className="rounded-full px-6 py-2 text-sm font-medium transition-all"
          style={{
            background: tab === 'delivered' ? '#1a1a1a' : 'transparent',
            color: tab === 'delivered' ? 'white' : '#6B7280',
            border: tab === 'delivered' ? '2px solid #1a1a1a' : '2px solid #e0e0e0',
          }}
        >
          After delivery
        </button>
      </div>

      {/* Status display */}
      <div className="flex-1 flex flex-col items-center justify-center bg-yellow mx-6 rounded-3xl mb-8 py-24">
        {tab === 'pending' ? (
          <p
            className="text-8xl font-light text-black"
            style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '-0.02em' }}
          >
            No.
          </p>
        ) : (
          <p
            className="text-8xl font-light text-lavender"
            style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '-0.02em' }}
          >
            Yes!
          </p>
        )}
        <p className="text-xs text-gray-400 mt-8 tracking-widest uppercase">
          didtheydeliveryet.com/your-name
        </p>
      </div>

      {/* Links to other demo pages */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center px-6 pb-12">
        <Link
          href="/demo/updates"
          className="rounded-full px-6 py-2.5 text-sm font-medium border-2 border-lavender text-lavender hover:opacity-80 transition-opacity"
        >
          See the VIP updates feed →
        </Link>
        <Link
          href="/demo/admin"
          className="rounded-full px-6 py-2.5 text-sm font-medium border-2 border-gray-200 text-gray-400 hover:opacity-80 transition-opacity"
        >
          See the admin panel →
        </Link>
      </div>

      {/* Closed status note */}
      <p className="text-center text-xs text-gray-400 pb-12 px-6 max-w-sm mx-auto leading-relaxed">
        Pages also support a Closed status with a custom message — for when life doesn't go to plan.
      </p>

      <Footer />
    </main>
  );
}