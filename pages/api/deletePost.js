import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import clientPromise from '../../lib/mongodb'

async function deletePost(req, res) {
  try {
    const {
      user: { sub }
    } = await getSession(req, res)
    const client = await clientPromise

    const db = await client.db('silverbot')

    const { postId } = req.body

    const post = await db.collection('posts').findOne({
      _id: ObjectId(postId)
    })

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    if (post.userId !== sub) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    await db.collection('posts').deleteOne({
      _id: ObjectId(postId)
    })

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default withApiAuthRequired(deletePost)
