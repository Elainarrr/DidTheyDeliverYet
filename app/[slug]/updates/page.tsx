import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Site, Update } from '@/lib/types';
import UpdatesFeed from '@/components/UpdatesFeed';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function UpdatesPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: site, error: siteError } = await supabase
    .from('sites')
    .select('*')
    .eq('slug', slug)
    .single();

  if (siteError || !site) {
    notFound();
  }

  const { data: updates } = await supabase
    .from('updates')
    .select('*')
    .eq('site_id', site.id)
    .order('created_at', { ascending: false });

  return (
    <UpdatesFeed
      site={site as Site}
      updates={(updates ?? []) as Update[]}
    />
  );
}