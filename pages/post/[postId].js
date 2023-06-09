import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { HashtagIcon } from '@heroicons/react/20/solid'
import { ObjectId } from 'mongodb'
import { AppLayout } from '../../components/app-layout'
import clientPromise from '../../lib/mongodb'
import { getAppProps } from '../../utils/getAppProps'

export default function PostPage(props) {
  return (
    <div className='h-full overflow-auto'>
      <div className='mx-auto max-w-screen-sm px-4 py-8'>
        <div className='mt-6 rounded-md bg-neutral-100 p-2 text-sm font-bold text-neutral-900'>Created: {props.createdAt}</div>
        <div className='mt-6 rounded-md bg-neutral-100 p-2 text-sm font-bold text-neutral-900'>SEO title and meta description</div>
        <div className='mt-6 rounded-md bg-neutral-100 p-2 text-sm font-bold text-neutral-900'>
          <div className='text-xl font-bold'>{props.title}</div>
          <div className='text-sm text-neutral-600'>{props.metaDescription}</div>
        </div>
        <div className='mt-6 rounded-md bg-neutral-100 p-2 text-sm font-bold text-neutral-900'>Keywords</div>
        <div className='flex flex-wrap'>
          {props.keywords.split(',').map((keyword, index) => (
            <div key={index} className='mr-2 mt-6 rounded-md bg-neutral-900 p-2 text-sm font-bold text-neutral-100'>
              <HashtagIcon className='mr-1 inline-block h-4 w-4' />
              {keyword}
            </div>
          ))}
        </div>

        <div className='mt-6 rounded-md bg-neutral-100 p-2 text-sm font-bold text-neutral-900'>Blog Post</div>
        <div
          className='mt-6 max-w-screen-sm'
          dangerouslySetInnerHTML={{
            __html: props.postContent || ''
          }}
        />
      </div>
    </div>
  )
}

PostPage.getLayout = function getLayout(page) {
  return <AppLayout {...page.props}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const appProps = await getAppProps(context)
    const {
      user: { sub }
    } = await getSession(context.req, context.res)
    const client = await clientPromise
    const db = await client.db('silverbot')
    const userProfile = await db.collection('users').findOne({ auth0Id: sub })
    const post = await db.collection('posts').findOne({
      _id: new ObjectId(context.params.postId),
      userId: userProfile?._id
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
        keywords: post.keywords,
        postId: post._id.toString(),
        createdAt: post.createdAt.toString(),
        ...appProps
      }
    }
  }
})
