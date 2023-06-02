import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import AppLayout from '../../components/app-layout'
import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default function PostPage(props) {
  console.log(props)
  return <div>Post page</div>
}

PostPage.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { user } = await getSession(context.req, context.res)
    const client = await clientPromise
    const db = await client.db('silverbot')
    const userProfile = await db.collection('users').findOne({ auth0Id: user.sub })
    const post = await db.collection('posts').findOne({
      _id: new ObjectId(context.params.postId),
      userId: userProfile._id
    })

    if (!post) {
      return {
        redirect: {
          destination: '/post/new',
          permanent: false
        }
      }
    }

    return {
      props: {
        postContent: post.postContent,
        title: post.title,
        metaDescription: post.metaDescription,
        keywords: post.keywords
      }
    }
  }
})
