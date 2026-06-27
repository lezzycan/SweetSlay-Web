// netlify/functions/create-checkout.js
// Creates a Stripe Checkout Session from the cart and returns the hosted URL.
// The secret key lives ONLY here (server side) — never in the website.

const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { items, notes } = JSON.parse(event.body || '{}')

    if (!Array.isArray(items) || items.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Your bag is empty.' }) }
    }

    const line_items = items.map((i) => {
      const price = Number(i.price)
      const qty = Math.max(1, parseInt(i.qty, 10) || 1)
      if (!i.name || isNaN(price) || price <= 0) {
        throw new Error('Invalid item in cart.')
      }
      return {
        quantity: qty,
        price_data: {
          currency: 'gbp',
          unit_amount: Math.round(price * 100),
          product_data: {
            name: String(i.name).slice(0, 120),
            ...(i.sub ? { description: String(i.sub).slice(0, 200) } : {}),
          },
        },
      }
    })

    const origin =
      event.headers.origin || event.headers.Origin || `https://${event.headers.host}`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      phone_number_collection: { enabled: true },
      shipping_address_collection: { allowed_countries: ['GB'] },
      metadata: { notes: (notes || '').slice(0, 480) },
      payment_intent_data: {
        description: 'Sweet2Slay order',
        metadata: { notes: (notes || '').slice(0, 480) },
      },
      success_url: `${origin}/?paid=1`,
      cancel_url: `${origin}/?canceled=1`,
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'Something went wrong.' }),
    }
  }
}
