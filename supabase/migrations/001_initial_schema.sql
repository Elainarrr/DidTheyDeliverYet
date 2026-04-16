-- Enable UUID generation
create extension if not exists "pgcrypto";

-- Sites table
create table sites (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  operator_label text not null,
  status text not null default 'pending', -- 'pending' | 'delivered' | 'closed'
  public_message text,
  closed_message text,                    -- optional, shown when status is 'closed'
  updates_password_hash text,
  yes_color_hex text not null default '#B7A3E3',
  created_at timestamptz default now()
);

-- Site members (supports multiple admins per site)
create table site_members (
  site_id uuid references sites(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null default 'admin',
  primary key (site_id, user_id)
);

-- Updates table
create table updates (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references sites(id) on delete cascade,
  text text,
  photo_url text,
  status_color text default '#4ade80',
  created_at timestamptz default now()
);

-- Row Level Security
alter table sites enable row level security;
alter table site_members enable row level security;
alter table updates enable row level security;

-- Anyone can read sites (for the public status page)
create policy "Public can read sites"
  on sites for select
  using (true);

-- Only site members can update their site
create policy "Members can update site"
  on sites for update
  using (
    auth.uid() in (
      select user_id from site_members where site_id = id
    )
  );

-- Anyone can read updates (password gate handled in app logic)
create policy "Public can read updates"
  on updates for select
  using (true);

-- Only site members can insert updates
create policy "Members can insert updates"
  on updates for insert
  with check (
    auth.uid() in (
      select user_id from site_members where site_id = site_id
    )
  );

-- Only site members can read site_members (for invite flows)
create policy "Members can read site_members"
  on site_members for select
  using (user_id = auth.uid());

-- Storage bucket for photos
insert into storage.buckets (id, name, public)
values ('update-photos', 'update-photos', true);

-- Anyone can read photos
create policy "Public can read photos"
  on storage.objects for select
  using (bucket_id = 'update-photos');

-- Only authenticated users can upload photos
create policy "Authenticated users can upload photos"
  on storage.objects for insert
  with check (
    bucket_id = 'update-photos'
    and auth.role() = 'authenticated'
  );

-- Helper function for invite flow
create or replace function get_user_id_by_email(email text)
returns uuid
language sql
security definer
as $$
  select id from auth.users where auth.users.email = get_user_id_by_email.email;
$$;