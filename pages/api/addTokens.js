import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

async function handler(req, res) {
  const { user } = await getSession(req, res)
  const lineItems = [
    {
      price: process.env.STRIPE_PRODUCT_PRICE_ID,
      quantity: 1
    }
  ]

  const protocol = process.env.NODE_ENV === 'production' ? 'https://' : 'http://'
  const host = req.headers.host

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${protocol}${host}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${protocol}${host}/token-topup`,
    payment_intent_data: {
      metadata: {
        sub: user.sub
      }
    },
    metadata: {
      sub: user.sub
    }
  })

  res.status(200).json({ session })
}

export default withApiAuthRequired(handler)
