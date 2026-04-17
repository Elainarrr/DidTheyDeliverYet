'use client';

import { useState } from 'react';
import { Update } from '@/lib/types';
import EmojiPicker from '@/components/EmojiPicker';

type Props = {
  update: Update;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, newText: string) => Promise<void>;
};

export default function UpdateCard({ update, isAdmin, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(update.text ?? '');
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!onEdit) return;
    setSaving(true);
    await onEdit(update.id, editText);
    setSaving(false);
    setEditing(false);
  }

  function handleCancel() {
    setEditText(update.text ?? '');
    setEditing(false);
  }
  
  return (
    <div
      className="rounded-lg p-4 flex flex-col gap-3"
      style={{ backgroundColor: update.status_color_hex }}
    >
      {update.photo_url && (
        <img
          src={update.photo_url}
          alt="Update photo"
          className="rounded-md w-full object-contain max-h-400"
        />
      )}

      {editing ? (
        <div className="flex flex-col gap-2">
          <div className="relative">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={3}
              className="w-full bg-white bg-opacity-60 border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
              autoFocus
            />
            <div className="absolute bottom-2 right-2">
              <EmojiPicker
                onEmojiSelect={(emoji) => setEditText((prev) => prev + emoji)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-lavender text-white rounded-full px-4 py-1.5 text-xs font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="text-xs text-gray-500 hover:opacity-70 transition-opacity"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        update.text && (
          <p className="text-sm text-gray-800 leading-relaxed">{update.text}</p>
        )
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {new Date(update.created_at).toLocaleString()}
        </p>
        {isAdmin && (
          <div className="flex gap-3">
            {!editing && onEdit && (
              <button
                onClick={() => setEditing(true)}
                className="text-xs text-gray-400 hover:text-lavender transition-colors"
              >
                Edit
              </button>
            )}
            {onDelete && !editing && (
              <button
                onClick={() => onDelete(update.id)}
                className="text-xs text-gray-400 hover:text-coral transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}