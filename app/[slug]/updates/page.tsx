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

  // Check if the current user is an admin of this site
  const { data: { user } } = await supabase.auth.getUser();
  let isAdmin = false;

  if (user) {
    const { data: membership } = await supabase
      .from('site_members')
      .select('role')
      .eq('site_id', site.id)
      .eq('user_id', user.id)
      .single();

    isAdmin = !!membership;
  }

  return (
    <UpdatesFeed
      site={site as Site}
      updates={(updates ?? []) as Update[]}
      isAdmin={isAdmin}
    />
  );
}