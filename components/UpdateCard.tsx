import { Update } from '@/lib/types';

type Props = {
  update: Update;
};

export default function UpdateCard({ update }: Props) {
  return (
    <div
      className="rounded-lg p-4 flex flex-col gap-3"
      style={{ backgroundColor: update.status_color + '22' }}
    >
      {update.photo_url && (
        <img
          src={update.photo_url}
          alt="Update photo"
          className="rounded-md w-full object-cover max-h-80"
        />
      )}
      {update.text && (
        <p className="text-gray-800 text-sm leading-relaxed">
          {update.text}
        </p>
      )}
      <p className="text-gray-400 text-xs">
        {new Date(update.created_at).toLocaleString()}
      </p>
    </div>
  );
}