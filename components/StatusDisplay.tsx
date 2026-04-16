'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Site } from '@/lib/types';
import Link from 'next/link';

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
        colors: [
          site.yes_color_hex,
          getComputedStyle(document.documentElement).getPropertyValue('--color-coral').trim(),
          getComputedStyle(document.documentElement).getPropertyValue('--color-yellow').trim(),
          getComputedStyle(document.documentElement).getPropertyValue('--color-blue').trim(),
          getComputedStyle(document.documentElement).getPropertyValue('--color-lavender').trim(),
        ],
      });
    }
  }, [site.status, site.yes_color_hex]);

  if (site.status === 'pending') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-yellow">
        <p
          className="text-8xl font-light text-black"
          style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '-0.02em' }}
        >
          No.
        </p>
        <Link
          href={`/${site.slug}/updates`}
          className="mt-12 text-xs font-medium tracking-widest uppercase text-black opacity-30 hover:opacity-60 transition-opacity"
        >
          Got the password? →
        </Link>
      </main>
    );
  }

  if (site.status === 'delivered') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-yellow">
        <p
          className="text-8xl font-light text-lavender"
          style={{ 
            fontFamily: 'var(--font-dm-sans)', 
            letterSpacing: '-0.02em', 
            color: site.yes_color_hex, }}
        >
          Yes!
        </p>
        <Link
          href={`/${site.slug}/updates`}
          className="mt-12 text-xs font-medium tracking-widest uppercase text-black opacity-40 hover:opacity-70 transition-opacity"
        >
          Got the password? →
        </Link>
      </main>
    );
  }

  if (site.status === 'closed') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-yellow px-6">
        <p
          className="text-2xl font-light text-center max-w-sm leading-relaxed text-black opacity-60"
        >
          {site.closed_message ?? 'This page has been closed.'}
        </p>
      </main>
    );
  }
}