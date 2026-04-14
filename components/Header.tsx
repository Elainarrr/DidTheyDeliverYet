import Link from 'next/link';

type Props = {
  title?: string;
  backHref?: string;
  backLabel?: string;
};

export default function Header({ title, backHref, backLabel = '← Back' }: Props) {
  return (
    <header className="bg-yellow px-6 py-5 flex items-center justify-between whitespace-nowrap">
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
        {title && (
          <p
            className="text-3xl font-medium text-black opacity-70"
            style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '-0.02em' }}
          >
            {title}
          </p>
        )}
      </div>
      <div className="flex-1 flex justify-end">
        {backHref && (
          <Link
            href={backHref}
            className="text-xs font-semibold tracking-widest uppercase text-black opacity-50 hover:opacity-70 transition-opacity"
          >
            {backLabel}
          </Link>
        )}
      </div>
    </header>
  );
}