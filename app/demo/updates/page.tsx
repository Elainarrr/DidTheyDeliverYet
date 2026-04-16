import Header from '@/components/Header';
import Footer from '@/components/Footer';

const demoUpdates = [
  {
    id: '1',
    text: 'We have arrived at the hospital! Things are moving along — everyone is calm and excited.',
    photo: true,
    color: '#C2E2FA',
    time: 'Today at 9:14 AM',
  },
  {
    id: '2',
    text: 'Bag is packed and we are headed in. See you on the other side!',
    photo: true,
    color: '#FFF1CB',
    time: 'Today at 7:02 AM',
  },
  {
    id: '3',
    text: 'Due date is tomorrow — we are as ready as we\'ll ever be. 🙏',
    photo: false,
    color: '#F9A8C9',
    time: 'Yesterday at 8:45 PM',
  },
];

export default function DemoUpdatesPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header title="✨ VIP Updates" backHref="/demo" backLabel="← Demo" />

      {/* Demo notice */}
      <div className="bg-sky px-6 py-3 text-center">
        <p className="text-xs font-medium text-blue-700">
          This is a demo updates feed — password-protected on real pages
        </p>
      </div>

      <div className="max-w-lg mx-auto w-full py-10 px-4 flex flex-col gap-6 flex-1">
        {demoUpdates.map((update) => (
          <div
            key={update.id}
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ backgroundColor: update.color + '44' }}
          >
            {update.photo && (
              <div
                className="w-full rounded-lg flex items-center justify-center text-sm text-gray-400"
                style={{ height: '200px', background: update.color + '66' }}
              >
                photo
              </div>
            )}
            <p className="text-sm text-gray-800 leading-relaxed">{update.text}</p>
            <p className="text-xs text-gray-400">{update.time}</p>
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}