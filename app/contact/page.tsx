'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  async function handleSubmit() {
    if (!name || !email || !message) {
      setError('Please fill out all fields.');
      return;
    }

    setLoading(true);
    setError('');

const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/contact-form`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ name, email, message, honeypot }),
      }
    );

    if (res.ok) {
      setSubmitted(true);
    } else {
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-yellow flex items-center justify-center px-6">
        <div className="text-center flex flex-col gap-4 max-w-sm">
          <p className="text-4xl">🎉</p>
          <h1 className="text-2xl font-medium">Message received!</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Thanks for reaching out — we'll get back to you soon.
          </p>
          <Link
            href="/"
            className="mt-2 text-sm text-lavender hover:opacity-70 transition-opacity"
          >
            ← Back to home
          </Link>
        </div>
        <Footer/>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-yellow flex flex-col">
      <Header title="Get in touch 💌" />

      <div className="flex-1 flex items-center justify-center px-6 py-12 pb-20">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md flex flex-col gap-5 border border-gray-100">
          <p className="text-sm text-gray-600">
            Questions, custom requests, or just want to say hi — we'd love to hear from you.
          </p>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>

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
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's on your mind?"
              rows={4}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
            />
          </div>

          {error && (
            <p className="text-coral text-sm">{error}</p>
          )}

        {/* Honeypot - hidden from real users */}
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-coral text-white rounded-full px-6 py-3 text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send message'}
          </button>

          <Link
            href="/"
            className="text-center text-sm text-gray-400 hover:opacity-70 transition-opacity"
          >
            ← Back to home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}