'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Site, SiteStatus } from '@/lib/types';
import { createHash } from 'crypto';
import Header from '@/components/Header';

type Props = {
  site: Site;
};

export default function AdminPanel({ site }: Props) {
  const [yesColor, setYesColor] = useState(site.yes_color_hex ?? '#B7A3E3');
  const supabase = createClient();

  // Status
  const [status, setStatus] = useState<SiteStatus>(site.status);
  const [closedMessage, setClosedMessage] = useState(site.closed_message ?? '');
  const [statusSaving, setStatusSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const yesColorOptions = [
    { label: 'Lavender', value: '#B7A3E3' },
    { label: 'Pink', value: '#F9A8C9' },
    { label: 'Blue', value: '#60A5FA' },
  ];

  // Password
  const [newPassword, setNewPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  // New update
  const [updateText, setUpdateText] = useState('');
  const [updateColor, setUpdateColor] = useState('#FFF9C4');
  const [updatePhoto, setUpdatePhoto] = useState<File | null>(null);
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState<string | null>(null);
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
    if (status === 'delivered') updates.yes_color_hex = yesColor;
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

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setUpdatePhoto(file);
    if (file) {
      setPreviewPhotoUrl(URL.createObjectURL(file));
    } else {
      setPreviewPhotoUrl(null);
    }
  }

  return (
    <main className="min-h-screen bg-white">

      <Header title="Admin 📝" backHref={`/${site.slug}`} backLabel="View site →" />

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
          {status === 'delivered' && (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-400">Color for "Yes!"</p>
              <div className="flex gap-3">
                {yesColorOptions.map((color) => (
                  <label
                    key={color.value}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <div
                      className="w-8 h-8 rounded-full transition-all"
                      style={{
                        background: color.value,
                        boxShadow: yesColor === color.value
                          ? `0 0 0 2px white, 0 0 0 4px ${color.value}`
                          : 'none',
                      }}
                    />
                    <input
                      type="radio"
                      name="yesColor"
                      value={color.value}
                      checked={yesColor === color.value}
                      onChange={() => setYesColor(color.value)}
                      className="sr-only"
                    />
                    <span className="text-xs text-gray-400">{color.label}</span>
                  </label>
                ))}
              </div>
            </div>
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