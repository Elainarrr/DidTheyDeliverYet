import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Site } from '@/lib/types';
import StatusDisplay from '@/components/StatusDisplay';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: 'Did They Deliver Yet?',
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: site, error } = await supabase
    .from('sites')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !site) {
    notFound();
  }

  return <StatusDisplay site={site as Site} />;
}