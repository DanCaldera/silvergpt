import micro_cors from 'micro-cors'
import Stripe from 'stripe'
import verifyStripe from '@webdeveducation/next-verify-stripe'

const cors = micro_cors({ allowMethods: ['POST', 'HEAD'] })

export const config = {
  api: {
    bodyParser: false
  }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

const handler = async (req, res) => {
  if (req.method === 'POST') {
    let event
    try {
      event = verifyStripe({
        req,
        stripe,
        webhookSecret
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(`Webhook Error: ${error.message}`)
    }

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
        console.log(`Unhandled event type ${event.type}`)
    }
    res.status(200).json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default cors(handler)
