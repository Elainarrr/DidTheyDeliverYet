import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DemoAdminPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header title="Admin 📝" backHref="/demo" backLabel="← Demo" />

      {/* Demo notice */}
      <div className="bg-sky px-6 py-3 text-center">
        <p className="text-xs font-medium text-gray-600">
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
            <option>Pending</option>
          </select>
          <button
            disabled
            className="bg-lavender text-white rounded-full px-6 py-2 text-sm font-medium opacity-40 cursor-not-allowed"
          >
            Save status
          </button>
        </section>

        <hr className="border-gray-100" />

        {/* Post Update */}
        <section className="flex flex-col gap-3 items-start">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-black opacity-50">
            Post an update
          </h2>
          <textarea
            disabled
            placeholder="What's happening?"
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-400 resize-none bg-gray-50 cursor-not-allowed"
          />
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-400">Status color</label>
            <div className="w-8 h-6 rounded" style={{ background: '#4ade80', opacity: 0.4 }} />
          </div>
          <button
            disabled
            className="bg-lavender text-white rounded-full px-6 py-2 text-sm font-medium opacity-40 cursor-not-allowed"
          >
            Post update
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