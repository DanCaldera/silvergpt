import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { WrenchIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { AppLayout } from '../../components/app-layout'
import Loader from '../../components/loader'
import { getAppProps } from '../../utils/getAppProps'

export default function NewComponent() {
  const [topic, settopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [componentContent, setComponentContent] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    if (!topic) return toast.error('Please fill out all fields')

    setLoading(true)
    const response = await fetch('/api/generateComponent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic,
      })
    })
    setLoading(false)
    const data = await response.json()
    if (data.componentContent) {
      setComponentContent(data.componentContent)
    }

  }

  if (loading) return <Loader />

  return (
    <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <form className='text-center'>
        <p className='text-base font-semibold text-neutral-600'>
          <div className='flex flex-col'>
              <label>
                <strong>Generate a component:</strong>
              </label>
              <textarea
                // disabled={loading}
                className='w-full resize-none rounded-md border p-2 ring-1 ring-neutral-900/10'
                value={topic}
                onChange={e => settopic(e.target.value)}
              />
            </div>
        </p>
        {/* <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>Page under construction</h1> */}
        <button 
          type='submit'
          className='mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-neutral-600 hover:bg-neutral-700'
          onClick={handleSubmit}
        >
          Generate
        </button>


      </form>
      {componentContent && <div
          className='mt-6 max-w-screen-sm'
          dangerouslySetInnerHTML={{
            __html: componentContent || ''
          }}
        />}
    </main>
  )
}

NewComponent.getLayout = function getLayout(page) {
  return <AppLayout {...page.props}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    return {
      props: await getAppProps(context)
    }
  }
})
