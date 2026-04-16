import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  const lastUpdated = 'April 2026';

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header title="Privacy policy" />

      <div className="max-w-2xl mx-auto px-6 py-16 flex flex-col gap-8 flex-1">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Last updated: {lastUpdated}</p>
          <p className="text-gray-500 leading-relaxed">
            Did They Deliver Yet? is a status page service for expectant families. We take privacy seriously — especially given the sensitive and personal nature of what this product is used for. This policy explains what data we collect, how we use it, and your rights.
          </p>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">Who we are</h2>
          <p className="text-gray-500 leading-relaxed">
            Did They Deliver Yet? is operated by Elaina and Ian, based in the United States. You can reach us at{' '}
            <a href="mailto:hello@didtheydeliveryet.com" className="text-coral hover:opacity-70 transition-opacity">
              hello@didtheydeliveryet.com
            </a>.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">What data we collect</h2>
          <p className="text-gray-500 leading-relaxed">We collect the following categories of personal data:</p>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Contact form submissions</p>
              <p className="text-sm text-gray-500 leading-relaxed">When you use our contact form, we collect your name, email address, and the content of your message. This is used solely to respond to your inquiry.</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Order information</p>
              <p className="text-sm text-gray-500 leading-relaxed">When you purchase a hosted page, we collect your email address and desired page name via Stripe Checkout. Payment information (card details) is processed entirely by Stripe and never touches our servers. You can read Stripe's privacy policy at <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-coral hover:opacity-70 transition-opacity">stripe.com/privacy</a>.</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Account information</p>
              <p className="text-sm text-gray-500 leading-relaxed">Admin users have an account with an email address and password, managed through Supabase Auth. This is used to authenticate access to your admin panel.</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Updates feed content</p>
              <p className="text-sm text-gray-500 leading-relaxed">Photos, text updates, and status information posted to your page are stored in our database and file storage, provided by Supabase. This content is shared only with people you choose to give access to via the VIP updates password.</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Session cookies</p>
              <p className="text-sm text-gray-500 leading-relaxed">We use strictly necessary cookies to maintain your admin login session. These cookies are essential for the service to function and do not track you across other websites.</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">How we use your data</h2>
          <p className="text-gray-500 leading-relaxed">We use your data only to provide and improve the service:</p>
          <ul className="flex flex-col gap-2 text-sm text-gray-500">
            <li className="flex items-start gap-2"><span className="text-coral mt-0.5">→</span>To respond to contact form inquiries</li>
            <li className="flex items-start gap-2"><span className="text-coral mt-0.5">→</span>To provision and manage your status page</li>
            <li className="flex items-start gap-2"><span className="text-coral mt-0.5">→</span>To send order confirmation and setup emails</li>
            <li className="flex items-start gap-2"><span className="text-coral mt-0.5">→</span>To authenticate admin access to your page</li>
            <li className="flex items-start gap-2"><span className="text-coral mt-0.5">→</span>To store and display your updates feed content</li>
          </ul>
          <p className="text-sm text-gray-500 leading-relaxed">We do not sell your data, use it for advertising, or share it with third parties beyond what is necessary to operate the service (Supabase for storage and auth, Stripe for payments, Resend for email delivery).</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">Third party services</h2>
          <p className="text-gray-500 leading-relaxed">We use the following third party services to operate Did They Deliver Yet?:</p>
          <div className="flex flex-col gap-3 text-sm text-gray-500">
            <p><span className="font-medium text-gray-700">Supabase</span> — database, file storage, and authentication. Data is stored on servers in the region you selected at project creation. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-coral hover:opacity-70">Privacy policy →</a></p>
            <p><span className="font-medium text-gray-700">Stripe</span> — payment processing. Card data never touches our servers. <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-coral hover:opacity-70">Privacy policy →</a></p>
            <p><span className="font-medium text-gray-700">Resend</span> — transactional email delivery. <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-coral hover:opacity-70">Privacy policy →</a></p>
            <p><span className="font-medium text-gray-700">Vercel</span> — website hosting and deployment. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-coral hover:opacity-70">Privacy policy →</a></p>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">Data retention</h2>
          <p className="text-gray-500 leading-relaxed">
            We retain your data for as long as your page is active. If you would like your data deleted, please contact us at{' '}
            <a href="mailto:hello@didtheydeliveryet.com" className="text-coral hover:opacity-70 transition-opacity">
              hello@didtheydeliveryet.com
            </a>{' '}
            and we will delete your account, page, and all associated content within 30 days.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">Your rights</h2>
          <p className="text-gray-500 leading-relaxed">
            Depending on where you are located, you may have the right to access, correct, or delete your personal data, or to object to or restrict how we process it. To exercise any of these rights, please contact us at{' '}
            <a href="mailto:hello@didtheydeliveryet.com" className="text-coral hover:opacity-70 transition-opacity">
              hello@didtheydeliveryet.com
            </a>.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">Changes to this policy</h2>
          <p className="text-gray-500 leading-relaxed">
            We may update this policy from time to time. If we make significant changes we will update the date at the top of this page. Continued use of the service after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">Contact</h2>
          <p className="text-gray-500 leading-relaxed">
            Questions about this privacy policy? Reach us at{' '}
            <a href="mailto:hello@didtheydeliveryet.com" className="text-coral hover:opacity-70 transition-opacity">
              hello@didtheydeliveryet.com
            </a>{' '}
            or via the{' '}
            <a href="/contact" className="text-coral hover:opacity-70 transition-opacity">
              contact form
            </a>.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}