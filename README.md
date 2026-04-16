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

- A public page at your own domain that says **"No."** until you're ready for it to say **"Yes!"**
- Confetti on delivery, obviously
- A password-protected VIP updates feed for close friends and family who want more details
- An admin panel where you and your co-admins can post updates with photos, text, and status colors
- Multiple admin accounts — invite a partner, a doula, anyone you trust
- Three statuses: **Pending**, **Delivered**, and **Closed** — because life doesn't always go to plan, and this tool is designed with that in mind
- Choose a color for your "Yes!" — lavender, pink, or blue 

---

## Hosted Version

Don't want to deal with any of this? We'll set it all up for you.

**$15, one time, yours to keep.**

👉 [Get your page](https://didtheydeliveryet.com)

---

## DIY Version

Want to run your own? Here's everything you need to get a personal status page up and running at your own domain.

### Tech Stack

- [Next.js](https://nextjs.org/) — React framework with SSR
- [Supabase](https://supabase.com/) — Postgres database, auth, and file storage
- [Vercel](https://vercel.com/) — Hosting and deployment
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) — Typography
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) — The important part

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) account (free tier works fine)
- A [Vercel](https://vercel.com/) account (free tier works fine)
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

**5. Run the dev server**

```bash
npm run dev
```

Visit `http://localhost:3000`.

### Setting up your site

In the Supabase SQL editor, create your site and link your admin account:

```sql
-- Create the site
insert into sites (slug, operator_label, status)
values ('yourslug', 'Your Label', 'pending');

-- Create a Supabase Auth user via the dashboard, then link them
insert into site_members (site_id, user_id, role)
values (
  (select id from sites where slug = 'yourslug'),
  'the-auth-user-uuid',
  'admin'
);
```

Then log in at `/yourslug/admin` to set your VIP updates password, post updates, and invite additional admins.

### Deployment

Push to GitHub and import the repo into [Vercel](https://vercel.com). Add your two environment variables in the Vercel project settings. Vercel auto-detects Next.js — no build configuration needed.

Make sure to exclude the Supabase functions folder from the TypeScript build by adding this to `tsconfig.json`:

```json
{
  "exclude": ["node_modules", "supabase/functions"]
}
```

Point your domain at Vercel and you're live.

---

## Contributing

Pull requests are welcome. If you're adding a feature, open an issue first so we can talk it through.

---

## Support

If this project saved you from answering 47 texts, consider buying us a coffee!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/elainarrr)

---

## Authors

Built with love (and mild sleep deprivation) by [Elaina](https://github.com/elainarrr) and [Ian](https://github.com/iann), with the help of [Claude](https://claude.ai) by Anthropic.

---

## Acknowledgements

Color palette sourced from [ColorHunt](https://colorhunt.co/palette/ff8f8ffff1cbc2e2fab7a3e3).

---

## License

MIT. Go build something.
