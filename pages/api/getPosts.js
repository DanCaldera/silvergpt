import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import clientPromise from '../../lib/mongodb'

async function getPosts(req, res) {
  try {
    const {
      user: { sub }
    } = await getSession(req, res)
    const client = await clientPromise

    const db = await client.db('silverbot')
    const userProfile = await db.collection('users').findOne({
      auth0Id: sub
    })

    if (!userProfile) {
      await db.collection('users').insertOne({
        auth0Id: sub,
        tokens: 10
      })
    }

    const { lastPostDate, getNewerPosts } = req.body

    const posts = await db
      .collection('posts')
      .find({
        userId: userProfile?._id,
        createdAt: {
          [getNewerPosts ? '$gt' : '$lt']: new Date(lastPostDate)
        }
      })
      .limit(getNewerPosts ? 0 : 5)
      .sort({
        createdAt: -1
      })
      .toArray()

    res.status(200).json({
      posts: posts.map(post => ({
        id: post._id.toString(),
        createdAt: post.createdAt.toString(),
        title: post.title,
        metaDescription: post.metaDescription,
        keywords: post.keywords,
        postContent: post.postContent
      }))
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default withApiAuthRequired(getPosts)
