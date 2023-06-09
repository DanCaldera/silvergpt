import { getSession } from '@auth0/nextjs-auth0'
import clientPromise from '../lib/mongodb'

export const getAppProps = async context => {
  const {
    user: { sub }
  } = await getSession(context.req, context.res)
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

  const posts = await db
    .collection('posts')
    .find({
      userId: userProfile?._id
    })
    .limit(5)
    .sort({
      createdAt: -1
    })
    .toArray()

  return {
    tokens: userProfile?.tokens || 0,
    posts: posts.map(post => ({
      id: post._id.toString(),
      createdAt: post.createdAt.toString(),
      title: post.title,
      metaDescription: post.metaDescription,
      keywords: post.keywords,
      postContent: post.postContent
    }))
  }
}
