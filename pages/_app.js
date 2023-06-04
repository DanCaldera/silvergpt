import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Toaster } from 'sonner'
import Meta from '../components/meta'
import '../styles/globals.css'
import { PostsProvider } from '../context/postsContext'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page)
  return (
    <UserProvider>
      <PostsProvider>
        <Meta />
        <Toaster />
        <div>{getLayout(<Component {...pageProps} />)}</div>
      </PostsProvider>
    </UserProvider>
  )
}

export default MyApp
