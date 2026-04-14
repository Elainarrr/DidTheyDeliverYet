import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const FROM_EMAIL = 'hello@didtheydeliveryet.com';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const { customerEmail, desiredSlug } = await req.json();

    if (!customerEmail) {
      return new Response(
        JSON.stringify({ error: 'Missing customer email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email to customer
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: customerEmail,
        subject: 'Your Did They Deliver Yet? page is on its way! 🎉',
        html: `
          <p>Hi there!</p>
          <p>Thanks so much for your order — we're so excited to be part of your journey!</p>
          <p>Here's what happens next:</p>
          <ul>
            <li>We'll reach out within 24 hours to get you set up</li>
            <li>We'll create an account for you and send you your login details so you can manage your page at <a href="https://didtheydeliveryet.com/login">didtheydeliveryet.com/login</a></li>
            <li>Once you're set up, your page will be live at <strong>didtheydeliveryet.com/${desiredSlug ?? 'yourname'}</strong></li>
          </ul>
          <p>If you have any questions in the meantime, just reply to this email.</p>
          <p>Congrats and good luck! 🍼</p>
          <p>— Elaina & Ian</p>
        `,
      }),
    });

    // Notification email to you
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: FROM_EMAIL,
        subject: `New order! Desired slug: ${desiredSlug ?? 'not specified'}`,
        html: `
          <p>You have a new order!</p>
          <p><strong>Customer email:</strong> ${customerEmail}</p>
          <p><strong>Desired slug:</strong> ${desiredSlug ?? 'not specified'}</p>
          <p>Time to provision their site!</p>
        `,
      }),
    });

    return new Response(
      JSON.stringify({ ok: true }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Something went wrong' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});