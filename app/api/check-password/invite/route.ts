import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const { siteId, email } = await request.json();

  if (!siteId || !email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const supabase = await createClient();

  // Confirm the requester is a member of this site
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: membership } = await supabase
    .from('site_members')
    .select('role')
    .eq('site_id', siteId)
    .eq('user_id', user.id)
    .single();

  if (!membership) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Look up the invitee by email using the admin API
  const adminSupabase = createClient();
  const { data: users, error: lookupError } = await (await adminSupabase)
    .rpc('get_user_id_by_email', { email });

  if (lookupError || !users) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Add them as a site member
  const { error: insertError } = await supabase
    .from('site_members')
    .insert({ site_id: siteId, user_id: users, role: 'admin' });

  if (insertError) {
    return NextResponse.json({ error: 'Error adding member' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}