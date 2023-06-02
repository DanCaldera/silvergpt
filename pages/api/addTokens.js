import { getSession } from '@auth0/nextjs-auth0'
import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  const { user } = await getSession(req, res)
  console.log(user)

  const client = await clientPromise

  const db = await client.db('silverbot')

  const userProfile = await db
    .collection('users')
    .updateOne({ auth0Id: user.sub }, { $inc: { tokens: 10 }, $setOnInsert: { auth0Id: user.sub } }, { upsert: true })

  console.log(userProfile)

  res.status(200).json({ name: 'John Doe' })
}
