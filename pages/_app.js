import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Toaster } from 'sonner'
import Meta from '../components/meta'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page)
  return (
    <UserProvider>
      <Meta />
      <Toaster />
      <div>{getLayout(<Component {...pageProps} />)}</div>
    </UserProvider>
  )
}

export default MyApp
