import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import AppLayout from '../../components/app-layout/app-layout'

export default function NewPostPage() {
  return <div>New Page</div>
}

NewPostPage.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {}
  }
})
