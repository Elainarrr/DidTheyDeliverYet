'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Site } from '@/lib/types';

type Props = {
  site: Site;
};

export default function StatusDisplay({ site }: Props) {
  useEffect(() => {
    if (site.status === 'delivered') {
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.5 },
      });
    }
  }, [site.status]);

  if (site.status === 'pending') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-8xl font-light tracking-tight text-gray-900">
          No.
        </p>
      </main>
    );
  }

  if (site.status === 'delivered') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-8xl font-light tracking-tight text-gray-900">
          Yes!
        </p>
      </main>
    );
  }

  if (site.status === 'closed') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-2xl font-light text-gray-400 text-center max-w-sm">
          {site.closed_message ?? 'This page has been closed.'}
        </p>
      </main>
    );
  }
}