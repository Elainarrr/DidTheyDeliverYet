import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Site } from '@/lib/types';
import AdminPanel from '@/components/AdminPanel';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function AdminPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  console.log('user:', user?.id);
  if (!user) redirect('/login');

  const { data: site, error: siteError } = await supabase
    .from('sites')
    .select('*')
    .eq('slug', slug)
    .single();
  console.log('site:', site?.id, 'error:', siteError);
  if (siteError || !site) notFound();

  // Confirm the logged in user is a member of this site
  const { data: membership, error: membershipError} = await supabase
    .from('site_members')
    .select('role')
    .eq('site_id', site.id)
    .eq('user_id', user.id)
    .single();
  console.log('membership:', membership, 'error:', membershipError);
  if (!membership) notFound();

  return <AdminPanel site={site as Site} />;
}