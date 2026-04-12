# Did They Deliver Yet?

### A status page for pregnant people.

**Live at [didtheydeliveryet.com](https://didtheydeliveryet.com)**

---

## The Origin Story

When Elaina was pregnant with her first child, the texts started rolling in as her due date approached. Distant cousins. Old coworkers. People she hadn't heard from in years. All asking the same thing: *Has the baby come yet?*

"If I had the baby, they'd hear about it," she grumbled.

A coworker offered a suggestion: "It's too bad you don't have a status page. Like AWS."

Elaina brought the idea home to Ian. He got inspired. They built the first version on Glitch (RIP) in the final days of her pregnancy — Elaina on the back end, Ian on the front — and pointed everyone who asked to the URL instead. It was a fun distraction, a practical solution, and a pretty good idea born out of mild third-trimester grumpiness.

Years later, they rebuilt it properly. This is that version.

---

## What It Does

- A public page at `didtheydeliveryet.com/yourname` that says **"No."** until you're ready for it to say **"Yes!"**
- Confetti on delivery, obviously
- A password-protected updates feed for close friends and family who want more details
- An admin panel where you and your partner can post updates with photos, text, and status colors
- Three statuses: **Pending**, **Delivered**, and **Closed** — because life doesn't always go to plan, and this tool is designed with that in mind

---

## Hosted Version

Don't want to deal with any of this? We'll set it all up for you.

**$15, one time, yours to keep.**

You get your own page at `didtheydeliveryet.com/yourname`, a private updates feed, two admin accounts, and photo uploads. We handle everything else.

👉 [Get your page](mailto:hello@didtheydeliveryet.com?subject=I%20want%20a%20page!)

---

## DIY Version

Want to run your own? Here's everything you need.

### Tech Stack

- [Next.js](https://nextjs.org/) — React framework with SSR
- [Supabase](https://supabase.com/) — Postgres database, auth, and file storage
- [Vercel](https://vercel.com/) — Hosting and deployment
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) — The important part

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) account (free tier works fine)
- A [Vercel](https://vercel.com/) account (free tier works fine)
- [Resend](https://resend.com/) account (free tier works fine)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (`brew install supabase/tap/supabase` on Mac)

### Setup

**1. Clone the repo**

```bash
git clone https://github.com/elainarrr/didtheydeliveryet.git
cd didtheydeliveryet
npm install
```

**2. Create a Supabase project**

Go to [supabase.com](https://supabase.com), create a new project, and grab your Project URL and anon key from **Project Settings → API**.

**3. Set up environment variables**

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**4. Run the database migration**

In the Supabase SQL editor, run the contents of:

```
supabase/migrations/001_initial_schema.sql
```

**5. Set up Resend for contact form emails**

Create a free account at [resend.com](https://resend.com) and verify your domain. Then grab your API key and add it to your Supabase project:

1. Go to your Supabase dashboard → **Edge Functions → Manage secrets**
2. Add a secret named `RESEND_API_KEY` with your Resend API key as the value

Then update `supabase/functions/contact-form/index.ts` with your own addresses:

```typescript
const TO_EMAIL = 'you@yourdomain.com';     // where you want to receive contact form emails
const FROM_EMAIL = 'contact@yourdomain.com'; // must be on your verified Resend domain
```

Then deploy the Edge Function:

```bash
supabase functions deploy contact-form --no-verify-jwt
```

**6. Run the dev server**

```bash
npm run dev
```

Visit `http://localhost:3000`.

### Provisioning a Site

For now, sites are provisioned manually. In the Supabase SQL editor:

```sql
-- Create the site
insert into sites (slug, operator_label, status)
values ('yourslug', 'Your Internal Label', 'pending');

-- Create a Supabase Auth user via the dashboard, then link them
insert into site_members (site_id, user_id, role)
values (
  (select id from sites where slug = 'yourslug'),
  'the-auth-user-uuid',
  'admin'
);
```

The site owner can then log in at `/yourslug/admin` to set their updates password, post updates, and invite a second admin.

### Deployment

Push to GitHub and import the repo into [Vercel](https://vercel.com). Add your two environment variables in the Vercel project settings. Vercel auto-detects Next.js — no build configuration needed.

---

## Contributing

Pull requests are welcome. If you're adding a feature, open an issue first so we can talk it through.

---

## Authors

Built with love (and mild sleep deprivation) by [Elaina](https://github.com/elainarrr) and [Ian](https://github.com/iann), with the help of [Claude](https://claude.ai) by Anthropic.

---

## License

MIT. Go build something.
