import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { AppLayout } from '../components/app-layout'
import { getAppProps } from '../utils/getAppProps'
import { useRouter } from 'next/router'

export default function TokenTopUpPage(props) {
  const router = useRouter()
  const handleClick = async () => {
    const response = await fetch('/api/addTokens', {
      method: 'POST'
    })
    console.log(response)
    router.reload()
  }
  return (
    <div>
      <button onClick={handleClick} className='mt-4 w-full rounded bg-neutral-500 px-4 py-2 font-bold text-white hover:bg-neutral-600'>
        Add tokens
      </button>
    </div>
  )
}

TokenTopUpPage.getLayout = function getLayout(page, props) {
  return <AppLayout {...props}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    return {
      props: await getAppProps(context)
    }
  }
})
