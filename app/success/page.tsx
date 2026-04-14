'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/components/Footer';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    async function sendConfirmation() {
      try {
        const res = await fetch('/api/order-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        if (res.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    }

    sendConfirmation();
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-yellow flex flex-col">
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
          <div className="flex-1" />
          <div className="flex-1" />
        </header>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600 text-sm">Setting things up...</p>
        </div>
      </main>
    );
  }

  if (status === 'error') {
    return (
      <main className="min-h-screen bg-yellow flex flex-col">
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
          <div className="flex-1" />
          <div className="flex-1" />
        </header>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-4 text-center border border-gray-100">
            <p className="text-3xl">😅</p>
            <h1 className="text-xl font-medium">Something went wrong</h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your payment went through but we had trouble sending your confirmation email. Don't worry — we'll be in touch within 24 hours!
            </p>
            <Link href="/" className="text-sm text-coral hover:opacity-70 transition-opacity">
              ← Back to home
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-yellow flex flex-col">
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
        <div className="flex-1" />
        <div className="flex-1" />
      </header>
      <div className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-4 text-center border border-gray-100">
          <p className="text-4xl">🎉</p>
          <h1 className="text-2xl font-medium text-black">You're all set!</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Thanks for your order! Check your inbox for a confirmation email. We'll be in touch within 24 hours to get your page set up.
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            In the meantime, feel free to reach out if you have any questions.
          </p>
          <Link
            href="/contact"
            className="text-sm text-coral hover:opacity-70 transition-opacity"
          >
            Get in touch →
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:opacity-70 transition-opacity"
          >
            ← Back to home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="text-sm text-gray-600 p-8">Loading...</p>}>
      <SuccessContent />
    </Suspense>
  );
}