import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export default function NewPostPage() {
  return <div>New Page</div>
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {}
  }
})
