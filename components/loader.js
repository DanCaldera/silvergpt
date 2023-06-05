import { CommandLineIcon } from '@heroicons/react/20/solid'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-neutral-100 dark:bg-neutral-900'>
      <div className='flex flex-col items-center justify-center'>
        <CommandLineIcon className='h-16 w-16 animate-pulse text-neutral-900' />
      </div>
    </div>
  )
}

export default Loader
