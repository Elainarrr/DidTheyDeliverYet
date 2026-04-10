import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createHash } from 'crypto';

export async function POST(request: NextRequest) {
  const { siteId, password } = await request.json();

  if (!siteId || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: site, error } = await supabase
    .from('sites')
    .select('updates_password_hash')
    .eq('id', siteId)
    .single();

  if (error || !site) {
    return NextResponse.json({ error: 'Site not found' }, { status: 404 });
  }

  if (!site.updates_password_hash) {
    return NextResponse.json({ error: 'No password set' }, { status: 403 });
  }

  const hash = createHash('sha256').update(password).digest('hex');

  if (hash !== site.updates_password_hash) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}