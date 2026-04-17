'use client';

import { Update } from '@/lib/types';

type Props = {
  update: Update;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
};

export default function UpdateCard({ update, isAdmin, onDelete }: Props) {
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
      {update.text && (
        <p className="text-gray-800 text-sm leading-relaxed">
          {update.text}
        </p>
      )}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {new Date(update.created_at).toLocaleString()}
        </p>
        {isAdmin && onDelete && (
          <button
            onClick={() => onDelete(update.id)}
            className="text-xs text-gray-400 hover:text-coral transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}