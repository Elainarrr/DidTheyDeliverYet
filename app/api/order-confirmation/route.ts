import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }

    // Fetch the session from Stripe to get customer details
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['custom_fields'],
    });

    const customerEmail = session.customer_details?.email;
    const desiredSlug = session.custom_fields?.find(
      (f) => f.key === 'desired_slug'
    )?.text?.value;

    if (!customerEmail) {
      return NextResponse.json({ error: 'No customer email found' }, { status: 400 });
    }

    // Call the Supabase Edge Function to send confirmation emails
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/order-confirmation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ customerEmail, desiredSlug }),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to send confirmation' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error('Order confirmation error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}