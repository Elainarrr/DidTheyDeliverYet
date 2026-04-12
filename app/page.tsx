import { DM_Sans } from 'next/font/google';
import Link from 'next/link';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
});

export default function LandingPage() {
  return (
    <main className={`${dmSans.variable} min-h-screen bg-white text-foreground`}>

      {/* Hero */}
      <section className="bg-yellow px-6 pt-16 pb-16 text-center">
        <p className="text-sm font-medium tracking-widest uppercase mb-4 text-black opacity-50">
          Did They Deliver Yet?
        </p>
        <h1 className="text-4xl sm:text-5xl font-medium leading-tight mb-4 text-black">
          A status page for<br />pregnant people.
        </h1>
        <p className="text-base max-w-sm mx-auto mb-8 leading-relaxed text-gray-600">
          Stop answering the same text 47 times. Set up a page. Let people check it themselves.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          
          <a href="mailto:hello@didtheydeliveryet.com?subject=I want a page!"
            className="rounded-full px-8 py-3 text-sm font-medium bg-coral text-white hover:opacity-80 transition-opacity"
          >
            Get your page — $15
          </a>
          
          <a href="https://github.com/elainarrr/didtheydeliveryet"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-8 py-3 text-sm font-medium border-2 border-lavender text-lavender hover:opacity-80 transition-opacity"
          >
            DIY on GitHub
          </a>
        </div>

        {/* Phone mockups */}
        <div className="flex gap-4 justify-center">
          <div
            className="bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center gap-2 py-4 px-4"
            style={{ width: '120px', height: '160px' }}
          >
            <div className="flex gap-1 mb-1">
              {['#FF8F8F', '#FFF1CB', '#C2E2FA', '#B7A3E3'].map((c) => (
                <span key={c} className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: c }} />
              ))}
            </div>
            <p
              className="text-4xl font-light"
              style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '-0.02em', color: '#1a1a1a' }}
            >
              No.
            </p>
            <p className="text-xs mt-1 text-gray-400">Before delivery</p>
          </div>

          <div
            className="bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center gap-2 py-4 px-4"
            style={{ width: '120px', height: '160px' }}
          >
            <div className="flex gap-1 mb-1">
              {['#FF8F8F', '#FFF1CB', '#C2E2FA', '#B7A3E3'].map((c) => (
                <span key={c} className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: c }} />
              ))}
            </div>
            <p
              className="text-4xl font-light text-lavender"
              style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '-0.02em' }}
            >
              Yes!
            </p>
            <p className="text-xs mt-1 text-gray-400">After delivery</p>
          </div>
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
                description: 'We set up your personal page at didtheydeliveryet.com/yourname and an admin panel where you and your partner can manage everything.',
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
                emoji: '👥',
                bg: 'bg-yellow',
                title: 'Multiple admins',
                description: 'Add additional admins so someone else can post updates while you focus on the important stuff.',
              },
              {
                emoji: '🎨',
                bg: 'bg-coral',
                title: 'Status colors',
                description: 'Color-code your updates to set the tone — calm green, excited yellow, or anything in between.',
              },
              {
                emoji: '🌅',
                bg: 'bg-lavender',
                title: 'Three outcomes',
                description: 'Pending, Delivered, or Closed. Because life is complicated, and we designed for all of it.',
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
                
                <a href="mailto:hello@didtheydeliveryet.com?subject=I want a page!"
                  className="block w-full bg-coral text-white rounded-full px-6 py-3 text-sm font-medium text-center hover:opacity-80 transition-opacity"
                >
                  Get your page
                </a>
              </div>
            </div>

            {/* DIY */}
            <div className="rounded-2xl p-8 flex flex-col border border-lavender">
              <p className="text-xs font-medium tracking-widest uppercase text-lavender mb-2">DIY</p>
              <p className="text-5xl font-light mb-1">Free</p>
              <p className="text-sm text-gray-400 mb-6">if you're into that sort of thing</p>
              <ul className="text-sm flex flex-col gap-2 text-left text-gray-600 mb-8">
                {[
                  'Full source code on GitHub',
                  'Deploy on your own infrastructure',
                  'Bring your own domain',
                  'Complete setup guide included',
                  "Tip jar if you're feeling generous",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-lavender mt-0.5">✓</span>
                    {item}
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

      {/* Footer */}
      <footer className="bg-black px-6 py-12 text-center text-sm text-gray-400">
        <p>Made with love (and mild sleep deprivation) by people who've been there.</p>
        <p className="mt-2">
          <Link
            href="/contact"
            className="text-yellow hover:opacity-70 transition-opacity"
          >
            Get in touch
          </Link>
        </p>
      </footer>

    </main>
  );
}