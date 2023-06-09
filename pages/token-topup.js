import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AppLayout } from '../components/app-layout'
import { getAppProps } from '../utils/getAppProps'

export default function TokenTopUpPage(props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/addTokens', {
        method: 'POST'
      })
      const { session } = await response.json()
      router.push(session.url)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <div className='h-full'>
      <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
        <div className='text-center'>
          <p className='text-base font-semibold text-neutral-600'>201</p>
          <h1 className='mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl'>Do you want to buy more tokens?</h1>
          <p className='mt-6 text-base leading-7 text-neutral-600'>You can buy more tokens to generate more content.</p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <button
              onClick={handleClick}
              disabled={loading}
              className='rounded-md bg-neutral-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600'
            >
              Buy 10 tokens
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

TokenTopUpPage.getLayout = function getLayout(page) {
  return <AppLayout {...page.props}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    return {
      props: await getAppProps(context)
    }
  }
})
