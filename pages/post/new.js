import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useState } from 'react'
import { AppLayout } from '../../components/app-layout'
import { useRouter } from 'next/router'
import { getAppProps } from '../../utils/getAppProps'
import Loader from '../../components/loader'

export default function NewPostPage(props) {
  const router = useRouter()
  const [topic, settopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async e => {
    e.preventDefault()
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
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <form>
        <div className='flex flex-col'>
          <label>
            <strong>Generate a blog post on the topic of:</strong>
          </label>
          <textarea
            disabled={loading}
            className='w-full resize-none rounded-md border p-2'
            value={topic}
            onChange={e => settopic(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <strong>Targeting the following keywords:</strong>
          <textarea
            disabled={loading}
            className='w-full resize-none rounded-md border p-2'
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          onClick={handleSubmit}
          className='mt-4 w-full rounded bg-neutral-500 px-4 py-2 font-bold text-white hover:bg-neutral-600'
        >
          Generate
        </button>
      </form>
    </div>
  )
}

NewPostPage.getLayout = function getLayout(page, props) {
  return <AppLayout {...props}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    return {
      props: await getAppProps(context)
    }
  }
})
