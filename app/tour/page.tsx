'use client';
import { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function TourPage() {
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  
    async function handleCheckout() {
      setLoadingCheckout(true);
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
        setLoadingCheckout(false);
      }
    }

  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
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
            How it works
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <Link
            href="/"
            className="text-xs font-semibold tracking-widest uppercase text-black opacity-40 hover:opacity-70 transition-opacity"
          >
            ← Home
          </Link>
        </div>
      </header>

      {/* Step 1 — white */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-coral opacity-70 mb-4">
              Step 1 — your page
            </p>
            <h2 className="text-4xl font-medium mb-4">
              You get a personal URL.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              We set up a page just for you. Share it anywhere you'd normally field anxious texts — your group chat, your Instagram bio, wherever.
            </p>
            <div
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm mb-6 font-mono"
              style={{ background: '#f5f5f5', border: '0.5px solid #e0e0e0' }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
              didtheydeliveryet.com/elaina-and-ian
            </div>
            <p className="text-xs text-gray-400 mb-2">Share it with:</p>
            <div className="flex flex-wrap gap-2">
              {['Family group chat', 'Instagram bio', 'Work Slack', 'Anyone who asks'].map((chip) => (
                <span
                  key={chip}
                  className="bg-yellow text-gray-600 rounded-full px-3 py-1 text-xs"
                  style={{ border: '0.5px solid #e8d9a0' }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            {/* No phone */}
            <div
              className="bg-yellow rounded-2xl flex flex-col items-center justify-center gap-2 py-8 px-6"
              style={{ width: '140px', height: '210px', border: '0.5px solid #e8d9a0' }}
            >
              <p
                className="text-5xl font-light text-black"
                style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '-0.02em' }}
              >
                No.
              </p>
              <p className="text-xs text-gray-400 mt-2">Before delivery</p>
            </div>

            {/* Yes phone */}
            <div
              className="bg-yellow rounded-2xl flex flex-col items-center justify-center gap-1 py-8 px-6"
              style={{ width: '140px', height: '210px', border: '0.5px solid #e8d9a0' }}
            >
              <div className="flex gap-1 mb-1">
                {[
                  { bg: '#FF8F8F', round: true },
                  { bg: '#C2E2FA', round: false },
                  { bg: '#B7A3E3', round: true },
                  { bg: '#FF8F8F', round: false },
                  { bg: '#C2E2FA', round: true },
                  { bg: '#B7A3E3', round: false },
                ].map((c, i) => (
                  <span
                    key={i}
                    className="inline-block"
                    style={{
                      width: '6px',
                      height: '6px',
                      background: c.bg,
                      borderRadius: c.round ? '50%' : '1px',
                      transform: `rotate(${i % 2 === 0 ? '10' : '-10'}deg)`,
                    }}
                  />
                ))}
              </div>
              <p
                className="text-5xl font-light text-lavender"
                style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '-0.02em' }}
              >
                Yes!
              </p>
              <div className="flex gap-1 mt-1">
                {[
                  { bg: '#B7A3E3', round: false },
                  { bg: '#FF8F8F', round: true },
                  { bg: '#C2E2FA', round: false },
                  { bg: '#B7A3E3', round: true },
                ].map((c, i) => (
                  <span
                    key={i}
                    className="inline-block"
                    style={{
                      width: '6px',
                      height: '6px',
                      background: c.bg,
                      borderRadius: c.round ? '50%' : '1px',
                      transform: `rotate(${i % 2 === 0 ? '-10' : '15'}deg)`,
                    }}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">After delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 — yellow */}
      <section className="bg-yellow px-6 py-20">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-12 items-center">

          {/* VIP feed mockup */}
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '0.5px solid #e0e0e0' }}>
            <div className="bg-yellow px-4 py-3 flex items-center justify-between" style={{ borderBottom: '0.5px solid #e8d9a0' }}>
              <span className="text-xs font-bold text-coral" style={{ letterSpacing: '0.15em' }}>DTDY</span>
              <span className="text-sm text-black opacity-60">✨ VIP Updates</span>
              <span className="text-xs text-gray-400">← Back</span>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div className="rounded-xl p-3" style={{ background: '#C2E2FA22' }}>
                <div className="w-full h-24 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400 mb-2">
                  photo
                </div>
                <p className="text-sm text-gray-800">We've arrived! Things are moving fast.</p>
                <p className="text-xs text-gray-400 mt-1">Today at 9:14 AM</p>
              </div>
              <div className="rounded-xl p-3" style={{ background: '#FFF1CB66' }}>
                <p className="text-sm text-gray-800">Headed in — bag is packed, everyone is calm. Mostly.</p>
                <p className="text-xs text-gray-400 mt-1">Today at 7:02 AM</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-lavender opacity-70 mb-4">
              Step 2 — VIP access
            </p>
            <h2 className="text-4xl font-medium mb-4">
              A private feed for your closest people.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Give a password to close friends and family for a detailed, photo-friendly updates feed. Everyone else just sees the public page.
            </p>
            {[
              'Password-protected — only share it with who you want.',
              'Post photos, text, and color-coded updates in real time.',
              'Change the password anytime from your admin panel.',
            ].map((item, i) => (
              <div key={item} className="flex items-start gap-3 mb-4">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5"
                  style={{ background: '#B7A3E3', fontSize: '11px', fontWeight: 500 }}
                >
                  {i + 1}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 3 — white */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-coral opacity-70 mb-4">
              Step 3 — admin panel
            </p>
            <h2 className="text-4xl font-medium mb-4">
              You're in control.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Manage everything from a simple admin panel. You and your partner both get access — post updates from the delivery room, or hand it off to someone you trust.
            </p>
            {[
              'Flip your status from Pending to Delivered with one tap.',
              'Post updates with photos and status colors.',
              'Add multiple admins — a partner, a doula, anyone you trust.',
            ].map((item, i) => (
              <div key={item} className="flex items-start gap-3 mb-4">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5"
                  style={{ background: '#FF8F8F', fontSize: '11px', fontWeight: 500 }}
                >
                  {i + 1}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Admin mockup */}
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-2xl p-5" style={{ border: '0.5px solid #e0e0e0' }}>
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-3">Site status</p>
              <select className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 w-1/2 mb-3" style={{ border: '0.5px solid #e0e0e0' }}>
                <option>Pending</option>
              </select>
              <div>
                <button
                  className="text-white rounded-full px-4 py-1.5 text-xs font-medium"
                  style={{ background: '#B7A3E3' }}
                >
                  Save status
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5" style={{ border: '0.5px solid #e0e0e0' }}>
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-3">Post an update</p>
              <textarea
                className="w-full bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-400 resize-none"
                style={{ border: '0.5px solid #e0e0e0', height: '60px' }}
                placeholder="What's happening?"
                readOnly
              />
              <div className="mt-2">
                <button
                  className="text-white rounded-full px-4 py-1.5 text-xs font-medium"
                  style={{ background: '#B7A3E3' }}
                >
                  Post update
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black px-6 py-20 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-coral mb-4">
          Ready?
        </p>
        <h2
          className="text-4xl font-medium text-white mb-3"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          Get your own page.
        </h2>
        <p className="text-gray-400 text-sm mb-8">One time. $15. We handle everything.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleCheckout}
            disabled={loadingCheckout}
            className="rounded-full px-8 py-3 text-sm font-medium bg-coral text-white hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {loadingCheckout ? 'Loading...' : 'Get your page — $15'}
          </button>
          
        <a href="https://github.com/elainarrr/didtheydeliveryet"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-8 py-3 text-sm font-medium border-2 border-lavender text-lavender hover:opacity-80 transition-opacity"
          >
            DIY on GitHub
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}