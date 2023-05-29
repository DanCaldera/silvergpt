import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import AppLayout from '../../components/app-layout'

export default function NewPostPage(props) {
  console.log('props', props)
  const handleClick = async () => {
    const response = await fetch('/api/generatePost', {
      method: 'POST'
    })
    const data = await response.json()
    console.log('data', data)
  }

  return (
    <div>
      <h1>This is the new post page</h1>
      <button className='btn btn-primary' onClick={handleClick}>
        Generate
      </button>
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
