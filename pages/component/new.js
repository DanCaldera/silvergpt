import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { WrenchIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { AppLayout } from '../../components/app-layout'
import { getAppProps } from '../../utils/getAppProps'

export default function NewComponent() {
  return (
    <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold text-neutral-600'>
          <WrenchIcon className='inline-block h-8 w-8 text-neutral-500' />
        </p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>Page under construction</h1>
      </div>
    </main>
  )
}

NewComponent.getLayout = function getLayout(page, props) {
  return <AppLayout {...props}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    return {
      props: await getAppProps(context)
    }
  }
})
