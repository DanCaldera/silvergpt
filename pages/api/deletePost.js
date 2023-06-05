import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

async function handler(req, res) {
  try {
    const {
      user: { sub }
    } = await getSession(req, res)
    const client = await clientPromise

    const db = await client.db('silverbot')

    const { postId } = req.body

    const post = await db.collection('posts').findOne({
      _id: new ObjectId(postId)
    })

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const user = await db.collection('users').findOne({
      auth0Id: sub
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (post.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    await db.collection('posts').deleteOne({
      _id: new ObjectId(postId)
    })

    res.status(200).json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export default withApiAuthRequired(handler)
