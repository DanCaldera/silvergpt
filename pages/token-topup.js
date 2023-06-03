import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
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
      console.log(session)
      window.location.href = session.url
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (router.query.success) {
      toast.success('Tokens added successfully')
    } else if (router.query.canceled) {
      toast.error('Tokens not added')
    }
    router.push('/token-topup', undefined, { shallow: true })
  }, [router])

  return (
    <div>
      <button
        disabled={loading}
        onClick={handleClick}
        className='mt-4 w-full rounded bg-neutral-500 px-4 py-2 font-bold text-white hover:bg-neutral-600'
      >
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
