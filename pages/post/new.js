import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'sonner'
import { AppLayout } from '../../components/app-layout'
import Loader from '../../components/loader'
import { getAppProps } from '../../utils/getAppProps'

export default function NewPostPage(props) {
  const router = useRouter()
  const [topic, settopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async e => {
    e.preventDefault()

    if (!topic || !keywords) return toast.error('Please fill out all fields')

    setLoading(true)
    const response = await fetch('/api/generatePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic,
        keywords
      })
    })
    setLoading(false)
    const data = await response.json()
    if (data.postId) {
      router.push(`/post/${data.postId}`)
    } else if (data.error) {
      toast.error(data.error)
    } else {
      toast.error('Something went wrong')
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl'>
          <form>
            <div className='flex flex-col'>
              <label>
                <strong>Generate a blog post on the topic of:</strong>
              </label>
              <textarea
                disabled={loading}
                rows={10}
                className='w-full resize-none rounded-md border p-2 ring-1 ring-neutral-900/10'
                value={topic}
                onChange={e => settopic(e.target.value)}
              />
            </div>
            <div className='mt-4 flex flex-col'>
              <strong>Targeting the following keywords:</strong>
              <textarea
                disabled={loading}
                rows={10}
                className='w-full resize-none rounded-md border p-2 ring-1 ring-neutral-900/10'
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
              />
              <span className='text-sm text-neutral-500'>Separate keywords with commas</span>
            </div>
            <button
              type='submit'
              disabled={loading}
              onClick={handleSubmit}
              className='mt-4 w-full rounded bg-neutral-500 px-4 py-2 font-bold text-white hover:bg-neutral-600'
            >
              Generate
            </button>
            <p className='mt-2 text-center text-sm text-neutral-500'>
              This will cost you <strong>1 token</strong>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

NewPostPage.getLayout = function getLayout(page) {
  return <AppLayout {...page.props}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const props = await getAppProps(context)

    //? Handle redirection if user has no tokens, not sure if this is needed by ux
    // if (!props.tokens) {
    //   return {
    //     redirect: {
    //       destination: '/token-topup',
    //       permanent: false
    //     }
    //   }
    // }

    return {
      props
    }
  }
})
