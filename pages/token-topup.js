import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import AppLayout from '../components/app-layout'

export default function TokenTopUpPage() {
  return <div>TokenTopUpPage</div>
}

TokenTopUpPage.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {}
  }
})
