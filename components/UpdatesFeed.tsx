'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Site, Update } from '@/lib/types';
import UpdateCard from '@/components/UpdateCard';
import Header from '@/components/Header';
import Link from 'next/link';

type Props = {
  site: Site;
  updates: Update[];
  isAdmin: boolean;
};

export default function UpdatesFeed({ site, updates: initialUpdates, isAdmin }: Props) {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(isAdmin);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [updates, setUpdates] = useState<Update[]>(initialUpdates);

  // Post form state
  const [updateText, setUpdateText] = useState('');
  const [updateColor, setUpdateColor] = useState('#FFF9C4');
  const [updatePhoto, setUpdatePhoto] = useState<File | null>(null);
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState<string | null>(null);
  const [updateSaving, setUpdateSaving] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const supabase = createClient();

  async function handleSubmit() {
    if (!password) return;
    setLoading(true);
    setError('');

    const res = await fetch(`/api/check-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteId: site.id, password }),
    });

    if (res.ok) {
      setUnlocked(true);
    } else {
      setError('Incorrect password. Please try again.');
    }

    setLoading(false);
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

  async function handleUpdatePost() {
    setUpdateSaving(true);
    setUpdateMessage('');
    let photo_url = null;

    if (updatePhoto) {
      const filename = `${site.id}/${Date.now()}-${updatePhoto.name}`;
      console.log(filename);
      const { error: uploadError } = await supabase.storage
        .from('update-photos')
        .upload(filename, updatePhoto);

      if (uploadError) {
        setUpdateMessage('Error uploading photo.');
        setUpdateSaving(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from('update-photos')
        .getPublicUrl(filename);
      photo_url = urlData.publicUrl;
    }

    const { data: newUpdate, error } = await supabase
      .from('updates')
      .insert({
        site_id: site.id,
        text: updateText || null,
        photo_url,
        status_color_hex: updateColor,
      })
      .select()
      .single();
    
    console.log('newUpdate:', newUpdate);

    if (error) {
      setUpdateMessage('Error posting update.');
    } else {
      setUpdates([newUpdate as Update, ...updates]);
      setUpdateMessage('Update posted!');
      setUpdateText('');
      setUpdatePhoto(null);
      setPreviewPhotoUrl(null);
      setUpdateColor('#FFF9C4');
    }

    setUpdateSaving(false);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('updates')
      .delete()
      .eq('id', id);

    if (!error) {
      setUpdates(updates.filter((u) => u.id !== id));
    }
  }

  async function handleEdit(id: string, newText: string) {
    const { error } = await supabase
      .from('updates')
      .update({ text: newText })
      .eq('id', id);

    if (!error) {
      setUpdates(updates.map((u) =>
        u.id === id ? { ...u, text: newText } : u
      ));
    }
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-yellow px-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center gap-4 w-full max-w-xs">
          <p
            className="text-2xl font-light text-black"
            style={{ fontFamily: 'var(--font-dm-sans)', letterSpacing: '-0.02em' }}
          >
            VIP access ✨
          </p>
          <p className="text-sm text-gray-400 text-center leading-relaxed">
            If you were given a password, enter it below for more detailed updates!
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Password"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
          {error && <p className="text-coral text-sm">{error}</p>}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-coral text-white rounded-full px-4 py-3 text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Enter'}
          </button>
          <Link
            href={`/${site.slug}`}
            className="text-xs text-gray-300 hover:opacity-70 transition-opacity"
          >
            ← Back to status page
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header
        title="✨ VIP Updates"
        backHref={`/${site.slug}`}
        backLabel="← Back"
      />

      <div className="max-w-lg mx-auto py-10 px-4 flex flex-col gap-6">

        {/* Admin post form */}
        {isAdmin && (
          <div className="flex flex-col gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-semibold tracking-widest uppercase text-black opacity-50">
              Post an update
            </p>

            {/* Live preview */}
            <div
              className="w-full rounded-xl p-4 flex flex-col gap-3 transition-colors"
              style={{ background: updateColor }}
            >
              {previewPhotoUrl && (
                <img
                  src={previewPhotoUrl}
                  alt="Preview"
                  className="w-full rounded-lg"
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                />
              )}
              <p className="text-sm text-gray-800 leading-relaxed">
                {updateText || <span className="text-gray-400 italic">Your update will appear here...</span>}
              </p>
              <p className="text-xs text-gray-400">Just now</p>
            </div>

            <textarea
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              placeholder="What's happening?"
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
            />

            {/* Color swatches */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-400">Tile color</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Butter', value: '#FFF9C4' },
                  { label: 'Blush', value: '#FCE4EC' },
                  { label: 'Peach', value: '#FFF3E0' },
                  { label: 'Tangerine', value: '#FFE0B2' },
                  { label: 'Mint', value: '#E8F5E9' },
                  { label: 'Sky', value: '#E3F2FD' },
                  { label: 'Lavender', value: '#F3E5F5' },
                  { label: 'Aqua', value: '#E0F7FA' },
                ].map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setUpdateColor(color.value)}
                    title={color.label}
                    className="w-8 h-8 rounded-full transition-all"
                    style={{
                      background: color.value,
                      boxShadow: updateColor === color.value
                        ? `0 0 0 2px white, 0 0 0 4px #1a1a1a`
                        : `0 0 0 1px #e0e0e0`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Photo upload */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-400">Photo</p>
              <label className="cursor-pointer">
                <div className="rounded-full px-4 py-2 text-sm font-medium border-2 border-gray-200 text-gray-500 hover:opacity-70 transition-opacity inline-block">
                  {updatePhoto ? `📷 ${updatePhoto.name}` : '📷 Choose a photo'}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="sr-only"
                />
              </label>
              {previewPhotoUrl && (
                <button
                  onClick={() => { setUpdatePhoto(null); setPreviewPhotoUrl(null); }}
                  className="text-xs text-coral hover:opacity-70 transition-opacity text-left"
                >
                  Remove photo
                </button>
              )}
            </div>

            <button
              onClick={handleUpdatePost}
              disabled={updateSaving}
              className="bg-lavender text-white rounded-full px-6 py-2 text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50 self-start"
            >
              {updateSaving ? 'Posting...' : 'Post update'}
            </button>
            {updateMessage && <p className="text-sm text-gray-400">{updateMessage}</p>}
          </div>
        )}

        {/* Updates feed */}
        {updates.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-4">
            No updates yet. Check back soon!
          </p>
        ) : (
          updates.map((update) => (
            <UpdateCard
              key={update.id}
              update={update}
              isAdmin={isAdmin}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </main>
  );
}