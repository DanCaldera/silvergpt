import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export default function TokenTopUpPage() {
  return <div>TokenTopUpPage</div>
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {}
  }
})
