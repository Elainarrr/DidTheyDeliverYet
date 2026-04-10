import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 gap-6">
        <p className="text-sm uppercase tracking-widest text-gray-400 font-medium">
          Did They Deliver Yet?
        </p>
        <h1 className="text-5xl sm:text-7xl font-light tracking-tight">
          A status page for<br />pregnant people.
        </h1>
        <p className="text-lg text-gray-400 max-w-md">
          Stop answering the same text 47 times. Set up a page. Let people check it themselves.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          
          <a href="mailto:hello@didtheydeliveryet.com?subject=I want a page!"
            className="bg-gray-900 text-white rounded-full px-8 py-3 text-sm hover:bg-gray-700 transition-colors"
          >
            Get your page — $15
          </a>
          
          <a href="https://github.com/yourusername/didtheydeliveryet"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-200 text-gray-600 rounded-full px-8 py-3 text-sm hover:bg-gray-50 transition-colors"
          >
            DIY on GitHub
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 px-6 py-24">
        <div className="max-w-2xl mx-auto flex flex-col gap-12">
          <h2 className="text-3xl font-light text-center">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col gap-3">
              <span className="text-4xl">🤰</span>
              <h3 className="font-medium">You get a link</h3>
              <p className="text-sm text-gray-400">
                We set up a personal page at didtheydeliveryet.com/yourname. Share it wherever you'd normally field anxious texts.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-4xl">📱</span>
              <h3 className="font-medium">They check it</h3>
              <p className="text-sm text-gray-400">
                Your people visit the page. It says "No." They put their phone down. Everyone wins.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-4xl">🎉</span>
              <h3 className="font-medium">Then it says Yes!</h3>
              <p className="text-sm text-gray-400">
                When the moment comes, you flip a switch. The page updates. Confetti falls. The texts can wait.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24">
        <div className="max-w-2xl mx-auto flex flex-col gap-12">
          <h2 className="text-3xl font-light text-center">Everything you need</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                emoji: '🔒',
                title: 'Private updates feed',
                description: 'Share a password with close family and friends for a more detailed, photo-friendly update feed.',
              },
              {
                emoji: '👫',
                title: 'Two admins',
                description: 'Both partners can post updates and manage the page. Because it takes two.',
              },
              {
                emoji: '🎨',
                title: 'Status colors',
                description: 'Color-code your updates to set the tone — calm green, excited yellow, or anything in between.',
              },
              {
                emoji: '🌅',
                title: 'Three outcomes',
                description: 'Pending, Delivered, or Closed. Because life is complicated, and we designed for all of it.',
              },
            ].map((feature) => (
              <div key={feature.title} className="flex flex-col gap-2">
                <span className="text-3xl">{feature.emoji}</span>
                <h3 className="font-medium">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 px-6 py-24">
        <div className="max-w-2xl mx-auto flex flex-col gap-10 text-center">
          <h2 className="text-3xl font-light">Simple pricing</h2>
          <div className="grid sm:grid-cols-2 gap-6">

            {/* Paid tier */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col gap-4 items-center">
              <p className="text-sm uppercase tracking-widest text-gray-400">Hosted</p>
              <p className="text-5xl font-light">$15</p>
              <p className="text-sm text-gray-400">one time, yours to keep</p>
              <ul className="text-sm text-gray-600 flex flex-col gap-2 text-left w-full mt-2">
                {[
                  'Your own page at didtheydeliveryet.com/you',
                  'Private updates feed with password',
                  'Two admin accounts',
                  'Photo uploads',
                  'We handle everything',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <a href="mailto:hello@didtheydeliveryet.com?subject=I want a page!"
                className="mt-4 w-full bg-gray-900 text-white rounded-full px-6 py-3 text-sm hover:bg-gray-700 transition-colors text-center"
              >
                Get your page
              </a>
            </div>

            {/* DIY tier */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col gap-4 items-center">
              <p className="text-sm uppercase tracking-widest text-gray-400">DIY</p>
              <p className="text-5xl font-light">Free</p>
              <p className="text-sm text-gray-400">if you're into that sort of thing</p>
              <ul className="text-sm text-gray-600 flex flex-col gap-2 text-left w-full mt-2">
                {[
                  'Full source code on GitHub',
                  'Deploy on your own infrastructure',
                  'Bring your own domain',
                  'Complete setup guide included',
                  'Tip jar if you\'re feeling generous',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <a href="https://github.com/yourusername/didtheydeliveryet"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full border border-gray-200 text-gray-600 rounded-full px-6 py-3 text-sm hover:bg-gray-50 transition-colors text-center"
              >
                View on GitHub
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-sm text-gray-300">
        <p>Made with love (and mild sleep deprivation) by people who've been there.</p>
        <p className="mt-2">
          
          <a href="mailto:hello@didtheydeliveryet.com"
            className="hover:text-gray-500 transition-colors"
          >
            hello@didtheydeliveryet.com
          </a>
        </p>
      </footer>

    </main>
  );
}