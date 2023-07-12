import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ObjectId } from 'mongodb'
import { AppLayout } from '../../components/app-layout'
import clientPromise from '../../lib/mongodb'
import { getAppProps } from '../../utils/getAppProps'

export default function FormatPage(props) {
  return (
    <div className='h-full overflow-auto'>
      <div className='mx-auto max-w-screen-sm px-4 py-8'>
        <div className='mt-6 rounded-md bg-neutral-100 p-2 text-sm font-bold text-neutral-900'>Created: {props.createdAt}</div>
        <div className='mt-6 rounded-md bg-neutral-100 p-2 text-sm font-bold text-neutral-900'>
          <h3 className='text-base font-bold'>Instruction:</h3>
          <p className='text-base'>{props.instruction}</p>
          <h3 className='mt-6 text-base font-bold'>Raw:</h3>
          <div className='text-base'>{props.raw}</div>
        </div>

        <div className='mt-6 rounded-md bg-neutral-100 p-2 text-sm font-bold text-neutral-900'>Response:</div>
        <div
          className='mt-6 max-w-screen-sm'
          dangerouslySetInnerHTML={{
            __html: props.formatContent || ''
          }}
        />
      </div>
    </div>
  )
}

FormatPage.getLayout = function getLayout(page) {
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
    const format = await db.collection('formats').findOne({
      _id: new ObjectId(context.params.formatId),
      userId: userProfile?._id
    })

    if (!format) {
      return {
        redirect: {
          destination: '/format/new',
          permanent: false
        }
      }
    }

    return {
      props: {
        formatContent: format.formatContent,
        instruction: format.instruction,
        raw: format.raw,
        formatId: format._id.toString(),
        createdAt: format.createdAt.toString(),
        ...appProps
      }
    }
  }
})
