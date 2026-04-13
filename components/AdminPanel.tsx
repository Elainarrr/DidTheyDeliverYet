'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Site, SiteStatus } from '@/lib/types';
import { createHash } from 'crypto';
import Link from 'next/link';

type Props = {
  site: Site;
};

export default function AdminPanel({ site }: Props) {
  const supabase = createClient();

  // Status
  const [status, setStatus] = useState<SiteStatus>(site.status);
  const [closedMessage, setClosedMessage] = useState(site.closed_message ?? '');
  const [statusSaving, setStatusSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Password
  const [newPassword, setNewPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  // New update
  const [updateText, setUpdateText] = useState('');
  const [updateColor, setUpdateColor] = useState('#4ade80');
  const [updatePhoto, setUpdatePhoto] = useState<File | null>(null);
  const [updateSaving, setUpdateSaving] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  // Invite
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteSaving, setInviteSaving] = useState(false);
  const [inviteMessage, setInviteMessage] = useState('');

  async function handleStatusSave() {
    setStatusSaving(true);
    setStatusMessage('');
    const updates: Record<string, string> = { status };
    if (status === 'closed') updates.closed_message = closedMessage;
    const { error } = await supabase.from('sites').update(updates).eq('id', site.id);
    setStatusMessage(error ? 'Error saving status.' : 'Status updated!');
    setStatusSaving(false);
  }

  async function handlePasswordSave() {
    if (!newPassword) return;
    setPasswordSaving(true);
    setPasswordMessage('');
    const hash = createHash('sha256').update(newPassword).digest('hex');
    const { error } = await supabase.from('sites').update({ updates_password_hash: hash }).eq('id', site.id);
    setPasswordMessage(error ? 'Error saving password.' : 'Password updated!');
    setNewPassword('');
    setPasswordSaving(false);
  }

  async function handleUpdatePost() {
    setUpdateSaving(true);
    setUpdateMessage('');
    let photo_url = null;

    if (updatePhoto) {
      const filename = `${site.id}/${Date.now()}-${updatePhoto.name}`;
      const { error: uploadError } = await supabase.storage
        .from('update-photos')
        .upload(filename, updatePhoto);
      if (uploadError) {
        setUpdateMessage('Error uploading photo.');
        setUpdateSaving(false);
        return;
      }
      const { data: urlData } = supabase.storage.from('update-photos').getPublicUrl(filename);
      photo_url = urlData.publicUrl;
    }

    const { error } = await supabase.from('updates').insert({
      site_id: site.id,
      text: updateText || null,
      photo_url,
      status_color: updateColor,
    });

    setUpdateMessage(error ? 'Error posting update.' : 'Update posted!');
    setUpdateText('');
    setUpdatePhoto(null);
    setUpdateColor('#4ade80');
    setUpdateSaving(false);
  }

  async function handleInvite() {
    if (!inviteEmail) return;
    setInviteSaving(true);
    setInviteMessage('');
    const res = await fetch('/api/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteId: site.id, email: inviteEmail }),
    });
    setInviteMessage(
      res.ok
        ? 'Invite sent! They can now log in and manage this site.'
        : 'Error sending invite. Make sure they have an account first.'
    );
    setInviteEmail('');
    setInviteSaving(false);
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
            className="text-3xl font-medium text-black opacity-70"
            style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '-0.02em' }}
          >
            Admin panel 📝
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <Link
            href={`/${site.slug}`}
            className="text-xs font-semibold tracking-widest uppercase text-black opacity-50 hover:opacity-70 transition-opacity"
          >
            View site →
          </Link>
        </div>
      </header>

      <div className="max-w-lg mx-auto py-10 px-4 flex flex-col gap-10">

        {/* Status */}
        <section className="flex flex-col gap-3 items-start">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-black opacity-50">
            Site status
          </h2>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as SiteStatus)}
            className="w-1/2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
          >
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="closed">Closed</option>
          </select>
          {status === 'closed' && (
            <input
              type="text"
              value={closedMessage}
              onChange={(e) => setClosedMessage(e.target.value)}
              placeholder="Optional closing message..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          )}
          <button
            onClick={handleStatusSave}
            disabled={statusSaving}
            className="bg-lavender text-white rounded-full px-6 py-2 text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {statusSaving ? 'Saving...' : 'Save status'}
          </button>
          {statusMessage && <p className="text-sm text-gray-400">{statusMessage}</p>}
        </section>

        <hr className="border-gray-200" />

        {/* Post Update */}
        <section className="flex flex-col gap-3 items-start">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-black opacity-50">
            Post an update
          </h2>
          <textarea
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
            placeholder="What's happening?"
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
          />
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-500">Status color</label>
            <input
              type="color"
              value={updateColor}
              onChange={(e) => setUpdateColor(e.target.value)}
              className="h-8 w-12 rounded cursor-pointer border border-gray-200"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setUpdatePhoto(e.target.files?.[0] ?? null)}
            className="text-sm text-gray-500"
          />
          <button
            onClick={handleUpdatePost}
            disabled={updateSaving}
            className="bg-lavender text-white rounded-full px-4 py-2 text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {updateSaving ? 'Posting...' : 'Post update'}
          </button>
          {updateMessage && <p className="text-sm text-gray-400">{updateMessage}</p>}
        </section>

        <hr className="border-gray-200" />

        {/* Password */}
        <section className="flex flex-col gap-3 items-start">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-black opacity-50">
            VIP updates password
          </h2>
          <p className="text-sm text-gray-400">
            Set or change the password for your VIP Updates feed.
          </p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Set a new password..."
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <button
            onClick={handlePasswordSave}
            disabled={passwordSaving}
            className="bg-lavender text-white rounded-full px-4 py-2 text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {passwordSaving ? 'Saving...' : 'Save password'}
          </button>
          {passwordMessage && <p className="text-sm text-gray-400">{passwordMessage}</p>}
        </section>

        <hr className="border-gray-200" />

        {/* Invite */}
        <section className="flex flex-col gap-3 items-start pb-10">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-black opacity-50">
            Invite a co-admin
          </h2>
          <p className="text-sm text-gray-400">
            They must already have an account. Enter their email to give them admin access.
          </p>
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="teammate@email.com"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <button
            onClick={handleInvite}
            disabled={inviteSaving}
            className="bg-lavender text-white rounded-full px-4 py-2 text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {inviteSaving ? 'Inviting...' : 'Send invite'}
          </button>
          {inviteMessage && <p className="text-sm text-gray-400">{inviteMessage}</p>}
        </section>

      </div>
    </main>
  );
}