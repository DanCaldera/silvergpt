import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useState } from 'react'
import AppLayout from '../../components/app-layout'

export default function NewPostPage(props) {
  const [postContent, setPostContent] = useState('')
  const handleClick = async () => {
    const response = await fetch('/api/generatePost', {
      method: 'POST'
    })
    const data = await response.json()
    setPostContent(data.post.postContent)
  }

  return (
    <div>
      <h1>This is the new post page</h1>
      <button className='btn btn-primary' onClick={handleClick}>
        Generate
      </button>
      <div
        className='max-w-screen-sm p-10'
        dangerouslySetInnerHTML={{
          __html: postContent
        }}
      />
    </div>
  )
}

NewPostPage.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {}
  }
})
