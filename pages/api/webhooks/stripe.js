import micro_cors from 'micro-cors'
import Stripe from 'stripe'

const cors = micro_cors({ allowMethods: ['POST', 'HEAD'] })

export const config = {
  api: {
    bodyParser: false
  }
}

async function buffer(readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

const relevantEvents = new Set(['payment_intent.succeeded'])

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature'] || ''
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    let event

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case 'payment_intent.succeeded':
            const paymentIntent = event.data.object
            const auth0Id = paymentIntent.metadata.sub
            const client = await clientPromise

            const db = await client.db('silverbot')

            await db.collection('users').updateOne(
              {
                auth0Id
              },
              {
                $inc: { tokens: 10 },
                $setOnInsert: {
                  auth0Id
                }
              },
              { upsert: true }
            )

            break
          default:
            throw new Error('Unhandled relevant event!')
        }
      } catch (error) {
        console.log(error)
        return res.status(400).send('Webhook error: "Webhook handler failed. View logs."')
      }
    }

    res.status(200).json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default cors(handler)
