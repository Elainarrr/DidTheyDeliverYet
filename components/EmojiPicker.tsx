'use client';

import { useEffect, useRef, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

type Props = {
  onEmojiSelect: (emoji: string) => void;
};

export default function EmojiPicker({ onEmojiSelect }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
        title="Add emoji"
      >
        🙂
      </button>
      {open && (
        <div className="absolute bottom-8 right-0 z-50">
          <Picker
            data={data}
            onEmojiSelect={(emoji: { native: string }) => {
              onEmojiSelect(emoji.native);
              setOpen(false);
            }}
            theme="light"
            previewPosition="none"
            skinTonePosition="none"
          />
        </div>
      )}
    </div>
  );
}