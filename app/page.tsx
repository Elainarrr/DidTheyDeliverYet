'use client';
import { useState } from 'react';
import { DM_Sans } from 'next/font/google';
import Footer from '@/components/Footer';
import Link from 'next/link';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
});

export default function LandingPage() {
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
    <main className={`${dmSans.variable} min-h-screen bg-white text-foreground`}>

      {/* Hero */}
      <section className="bg-yellow px-6 pt-16 pb-14 text-center">
        <p className="text-sm font-medium tracking-widest uppercase mb-4 text-coral">
          Did They Deliver Yet?
        </p>
        <h1 className="text-4xl sm:text-5xl font-medium leading-tight mb-4 text-black">
          A status page for<br />pregnant people.
        </h1>
        <p className="text-base max-w-sm mx-auto mb-8 leading-relaxed text-gray-600">
          Stop answering the same text 47 times. Set up a page. Let people check it themselves.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center ">
          
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

      {/* Phone mockups */}
      <section className="bg-white px-6 py-14">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-10">
          <div className="flex gap-6 justify-center">
            {/* No phone */}
            <div
              className="bg-yellow rounded-2xl flex flex-col items-center justify-center gap-2 py-10 px-8"
              style={{ width: '150px', height: '220px', border: '2px solid #6B7280' }}
            >
              <p
                className="text-5xl font-light text-black"
                style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '-0.02em' }}
              >
                No.
              </p>
              <p className="text-xs text-gray-400 mt-2 whitespace-nowrap">Before delivery</p>
            </div>

            {/* Yes phone */}
            <div
              className="bg-yellow rounded-2xl flex flex-col items-center justify-center gap-1 py-10 px-8"
              style={{ width: '150px', height: '220px', border: '2px solid #6B7280' }}
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
              <p className="text-xs text-gray-400 mt-2 whitespace-nowrap">After delivery</p>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-medium mb-4">
              One link, one quick answer.
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-md mx-auto">
              Your very own page that answers "No." until you're ready to switch it to "Yes!"
            </p>
          </div>
          <p className="text-gray-500 leading-relaxed text-center max-w-md text-sm">
            Plus, you get a password-protected feed of more detailed updates you can share with your closest friends and family.
          </p>
        </div>
      </section>
      

      {/* The problem */}
      <section className="bg-yellow px-6 py-14">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-coral opacity-70 mb-4">
              Sound familiar?
            </p>
            <h2 className="text-4xl font-medium mb-4">
              Your phone won't stop.
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
              As your due date approaches, the texts roll in. Every. Single. Day.
            </p>
          </div>

          {/* Phone container */}
          <div
            className="bg-white rounded-3xl px-6 py-8 w-full max-w-sm flex flex-col gap-3"
            style={{ border: '0.5px solid #e8d9a0' }}
          >
            {[
              { text: '"Has the baby come yet??"', align: 'left' },
              { text: '"Any news?? Thinking of you!"', align: 'left' },
              { text: '"Just checking in... is it time??"', align: 'left' },
              { text: '"Still no baby. I\'ll let you know." 😅', align: 'right', coral: true },
            ].map((bubble) => (
              <div
                key={bubble.text}
                className={`flex ${bubble.align === 'right' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="px-4 py-3 text-sm leading-relaxed max-w-xs text-gray-700"
                  style={{
                    background: bubble.coral ? '#FF8F8F33' : '#f0f0f0',
                    borderRadius: bubble.align === 'right'
                      ? '18px 18px 4px 18px'
                      : '18px 18px 18px 4px',
                  }}
                >
                  {bubble.text}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/tour"
            className="text-sm font-medium text-coral hover:opacity-70 transition-opacity"
          >
            Learn more →
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-2xl mx-auto flex flex-col gap-12">
          <h2 className="text-4xl font-medium text-center">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-10 text-center">
            {[
              {
                emoji: '🤰',
                bg: 'bg-yellow',
                title: 'You get a page',
                description: 'We set up your personal page at didtheydeliveryet.com/yourname and an admin panel where you and your support people can manage everything.',
              },
              {
                emoji: '📱',
                bg: 'bg-sky',
                title: 'Share with your people',
                description: 'Send the public link to everyone. For close friends and family, share a private password for a VIP updates feed.',
              },
              {
                emoji: '🎉',
                bg: 'bg-coral',
                title: 'Post updates as you go',
                description: 'Change your status, post photos, and share updates from the admin panel. When the moment comes, flip to Yes!',
              },
            ].map((step) => (
              <div key={step.title} className="flex flex-col items-center gap-3">
                <div className={`${step.bg} w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-1`}>
                  {step.emoji}
                </div>
                <h3 className="font-medium text-lg">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-yellow px-6 py-16">
        <div className="max-w-2xl mx-auto flex flex-col gap-12">
          <h2 className="text-4xl font-medium text-center">Everything you need</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                emoji: '🔒',
                bg: 'bg-sky',
                title: 'Private updates feed',
                description: 'Share a password with close family and friends for a more detailed, photo-friendly update feed.',
              },
              {
                emoji: '🎨',
                bg: 'bg-coral',
                title: 'Choose how you share',
                description: 'Make your public "Yes!" page Lavender, Pink, or Blue. Customize your VIP feed with colors and photos.',
              },
              {
                emoji: '👥',
                bg: 'bg-yellow',
                title: 'Multiple admins',
                description: 'Add additional admins so someone else can post updates while you focus on the important stuff.',
              },
              {
                emoji: '🤍',
                bg: 'bg-lavender',
                title: 'Here to support',
                description: 'Your page has three statuses — Yes!, No., and Closed (with a custom message). Because life doesn\'t always go to plan.',
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-6 flex flex-col gap-2 border border-gray-100">
                <div className={`${feature.bg} w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-1`}>
                  {feature.emoji}
                </div>
                <h3 className="font-medium">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-2xl mx-auto flex flex-col gap-10 text-center">
          <h2 className="text-4xl font-medium">Simple pricing</h2>
          <div className="grid sm:grid-cols-2 gap-6 items-stretch">

            {/* Hosted */}
            <div className="rounded-2xl p-8 flex flex-col border-2 border-coral">
              <p className="text-xs font-medium tracking-widest uppercase text-coral mb-2">Hosted</p>
              <p className="text-5xl font-light mb-1">$15</p>
              <p className="text-sm text-gray-400 mb-6">one time, yours to keep</p>
              <ul className="text-sm flex flex-col gap-2 text-left text-gray-600 mb-8">
                {[
                  'Your own page at didtheydeliveryet.com/your-name',
                  'Private updates feed with password',
                  'Multiple admin accounts',
                  'Photo uploads',
                  'We handle everything',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-coral mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                
              <button
                onClick={handleCheckout}
                disabled={loadingCheckout}
                className="mt-4 w-full bg-coral text-white rounded-full px-6 py-3 text-sm font-medium text-center hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {loadingCheckout ? 'Loading...' : 'Get your page'}
              </button>
              </div>
            </div>

            {/* DIY */}
            <div className="rounded-2xl p-8 flex flex-col border border-lavender">
              <p className="text-xs font-medium tracking-widest uppercase text-lavender mb-2">DIY</p>
              <p className="text-5xl font-light mb-1">Free</p>
              <p className="text-sm text-gray-400 mb-6">if you're into that sort of thing</p>
              <ul className="text-sm flex flex-col gap-2 text-left text-gray-600 mb-8">
                {[
                  { label: 'Full source code on GitHub' },
                  { label: 'Deploy on your own infrastructure' },
                  { label: 'Bring your own domain' },
                  { label: 'Complete setup guide included' },
                  { label: "Tip jar if you're feeling generous", href: 'https://ko-fi.com/elainarrr' },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-2">
                    <span className="text-lavender mt-0.5">✓</span>
                    {item.href ? (
                      
                      <a  href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lavender hover:opacity-70 transition-opacity"
                      >
                        {item.label}
                      </a>
                    ) : (
                      item.label
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                
                <a href="https://github.com/elainarrr/didtheydeliveryet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border-2 border-lavender text-lavender rounded-full px-6 py-3 text-sm font-medium text-center hover:opacity-80 transition-opacity"
                >
                  View on GitHub
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />

    </main>
  );
}