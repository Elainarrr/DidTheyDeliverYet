import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-12 text-center text-sm text-gray-400">
      <Link
        href="/"
        className="text-coral font-bold hover:opacity-70 transition-opacity"
        style={{ letterSpacing: '0.15em' }}
      >
        DTDY
      </Link>
      <p className="mt-3">Made with love (and mild sleep deprivation) by people who've been there.</p>
      <p className="mt-2">
        <Link
          href="/contact"
          className="text-yellow hover:opacity-70 transition-opacity"
        >
          Get in touch
        </Link>
      </p>
    </footer>
  );
}