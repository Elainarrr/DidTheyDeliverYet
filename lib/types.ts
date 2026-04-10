export type SiteStatus = 'pending' | 'delivered' | 'closed';

export type Site = {
  id: string;
  slug: string;
  operator_label: string;
  status: SiteStatus;
  public_message: string | null;
  closed_message: string | null;
  updates_password_hash: string | null;
  created_at: string;
};

export type SiteMember = {
  site_id: string;
  user_id: string;
  role: string;
};

export type Update = {
  id: string;
  site_id: string;
  text: string | null;
  photo_url: string | null;
  status_color: string;
  created_at: string;
};