import Link from 'next/link'
import React from 'react'

const SuccessPage = () => {
  return (
    <div>
      <h1>You have successfully bought tokens</h1>
      <Link href='/post/new'>Go back to home page</Link>
    </div>
  )
}

export default SuccessPage
