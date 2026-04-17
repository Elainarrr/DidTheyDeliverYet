import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DemoAdminPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header title="Admin 📝" backHref="/demo" backLabel="← Demo" />

      <div className="bg-sky px-6 py-3 text-center">
        <p className="text-xs font-medium text-blue-700">
          This is a read-only demo — buttons are disabled
        </p>
      </div>

      <div className="max-w-lg mx-auto py-10 px-4 flex flex-col gap-10 w-full">

        {/* Status */}
        <section className="flex flex-col gap-3 items-start">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-black opacity-50">
            Site status
          </h2>
          <select
            disabled
            className="w-1/2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 bg-gray-50 cursor-not-allowed"
          >
            <option>Delivered</option>
          </select>
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-400">Color for "Yes!"</p>
            <div className="flex gap-3">
              {[
                { label: 'Lavender', value: '#B7A3E3' },
                { label: 'Pink', value: '#F9A8C9' },
                { label: 'Blue', value: '#60A5FA' },
              ].map((color) => (
                <div key={color.value} className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 h-8 rounded-full opacity-50"
                    style={{ background: color.value }}
                  />
                  <span className="text-xs text-gray-400">{color.label}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            disabled
            className="bg-lavender text-white rounded-full px-6 py-2 text-sm font-medium opacity-40 cursor-not-allowed"
          >
            Save status
          </button>
        </section>

        <hr className="border-gray-100" />

        {/* Password */}
        <section className="flex flex-col gap-3 items-start">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-black opacity-50">
            VIP updates password
          </h2>
          <p className="text-sm text-gray-400">
            Set or change the password for your VIP Updates feed.
          </p>
          <input
            disabled
            type="password"
            placeholder="Set a new password..."
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
          />
          <button
            disabled
            className="bg-lavender text-white rounded-full px-6 py-2 text-sm font-medium opacity-40 cursor-not-allowed"
          >
            Save password
          </button>
        </section>

        <hr className="border-gray-100" />

        {/* Invite */}
        <section className="flex flex-col gap-3 items-start pb-10">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-black opacity-50">
            Invite a co-admin
          </h2>
          <p className="text-sm text-gray-400">
            Add additional admins so someone else can post updates while you focus on the important stuff.
          </p>
          <input
            disabled
            type="email"
            placeholder="partner@email.com"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
          />
          <button
            disabled
            className="bg-lavender text-white rounded-full px-6 py-2 text-sm font-medium opacity-40 cursor-not-allowed"
          >
            Send invite
          </button>
        </section>

      </div>

      <Footer />
    </main>
  );
}