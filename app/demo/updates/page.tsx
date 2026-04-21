'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

type DemoUpdate = {
  id: string;
  text: string;
  photo: string | null;
  status_color_hex: string;
  time: string;
};

const demoUpdates: DemoUpdate[]= [
  {
    id: '1',
    text: 'She\'s here. 💛',
    photo: 'https://lvbohndlhpszyftdldbd.supabase.co/storage/v1/object/public/site-assets/7f3a2c91-4e8b-4d5f-9b1a-e3c6f2d08a47-newborn.jpeg',
    status_color_hex: '#FCE4EC',
    time: 'Today at 9:14 AM',
  },
  {
    id: '2',
    text: 'The epidural is all set, Elaina even got a 30 minute nap in. Things seem to be accelerating nicely. 🤞',
    photo: null,
    status_color_hex: '#E3F2FD',
    time: 'Today at 6:45 AM',
  },
  {
    id: '3',
    text: 'We\'re headed to the hospital! 🧳',
    photo: null,
    status_color_hex: '#FFF9C4',
    time: 'Today at 4:02 AM',
  },
];

export default function DemoUpdatesPage() {
  const [tab, setTab] = useState<'admin' | 'vip'>('vip');

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header title="✨ VIP Updates" backHref="/demo" backLabel="← Demo" />

      {/* Demo notice */}
      <div className="bg-sky px-6 py-3 text-center">
        <p className="text-xs font-medium text-blue-700">
          This is a demo — password-protected on real pages
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex justify-center mt-8 mb-6 gap-2">
        <button
          onClick={() => setTab('vip')}
          className="rounded-full px-6 py-2 text-sm font-medium transition-all"
          style={{
            background: tab === 'vip' ? '#1a1a1a' : 'transparent',
            color: tab === 'vip' ? 'white' : '#6B7280',
            border: tab === 'vip' ? '2px solid #1a1a1a' : '2px solid #e0e0e0',
          }}
        >
          What your VIPs see
        </button>
        <button
          onClick={() => setTab('admin')}
          className="rounded-full px-6 py-2 text-sm font-medium transition-all"
          style={{
            background: tab === 'admin' ? '#1a1a1a' : 'transparent',
            color: tab === 'admin' ? 'white' : '#6B7280',
            border: tab === 'admin' ? '2px solid #1a1a1a' : '2px solid #e0e0e0',
          }}
        >
          What you see
        </button>
      </div>

      <div className="max-w-lg mx-auto w-full px-4 pb-12 flex flex-col gap-6 flex-1">

        {/* Admin post form — only shown in admin tab */}
        {tab === 'admin' && (
          <div className="flex flex-col gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-semibold tracking-widest uppercase text-black opacity-50">
              Post an update
            </p>

            {/* Preview tile */}
            <div className="w-full rounded-xl p-4 flex flex-col gap-3" style={{ background: '#FFF9C4' }}>
              <p className="text-sm text-gray-400 italic">Your update will appear here...</p>
              <p className="text-xs text-gray-400">Just now</p>
            </div>
            <div className="relative">
                <textarea
                disabled
                placeholder="What's happening?"
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-400 resize-none bg-gray-50 cursor-not-allowed"
                />
                <div className="absolute bottom-2 right-2 text-gray-300 text-lg cursor-not-allowed opacity-30">
                    🙂
                </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-400">Tile color</p>
              <div className="flex flex-wrap gap-2">
                {[
                  '#FFF9C4', '#FCE4EC', '#FFF3E0', '#FFE0B2',
                  '#E8F5E9', '#E3F2FD', '#F3E5F5', '#E0F7FA',
                ].map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full"
                    style={{
                      background: color,
                      boxShadow: color === '#FFF9C4'
                        ? `0 0 0 2px white, 0 0 0 4px #1a1a1a`
                        : `0 0 0 1px #e0e0e0`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-400">Photo</p>
              <div className="rounded-full px-4 py-2 text-sm font-medium border-2 border-gray-200 text-gray-400 inline-block cursor-not-allowed opacity-50">
                📷 Choose a photo
              </div>
            </div>

            <button
              disabled
              className="bg-lavender text-white rounded-full px-6 py-2 text-sm font-medium opacity-40 cursor-not-allowed self-start"
            >
              Post update
            </button>
          </div>
        )}

        {/* Updates feed */}
        {demoUpdates.map((update) => (
          <div
            key={update.id}
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ backgroundColor: update.status_color_hex }}
          >
            {update.photo && (
              typeof update.photo === 'string' ? (
                <img
                  src={update.photo}
                  alt="Update photo"
                  className="w-full rounded-lg"
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                />
              ) : (
                <div
                  className="w-full rounded-lg flex items-center justify-center text-sm text-gray-400"
                  style={{ height: '180px', background: update.status_color_hex + '99' }}
                >
                  photo
                </div>
              )
            )}
            <p className="text-sm text-gray-800 leading-relaxed">{update.text}</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">{update.time}</p>
              {tab === 'admin' && (
                <button
                  disabled
                  className="text-xs text-gray-300 cursor-not-allowed"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}