import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from './logo'
import { CircleStackIcon } from '@heroicons/react/20/solid'

const AppLayout = ({ children }) => {
  const { user } = useUser()
  return (
    <div className='grid h-screen max-h-screen grid-cols-[300px,1fr]'>
      <div className='flex flex-col overflow-hidden text-black'>
        <div className='bg-neutral-100 px-2'>
          <Logo />
          <Link
            className='flex items-center justify-center rounded-md border bg-neutral-500 p-2 text-white hover:bg-neutral-600'
            href='/post/new'
          >
            <button>New Post</button>
          </Link>
          <Link className='mt-2 flex items-center justify-center' href='/token-topup'>
            <CircleStackIcon className='w-4 text-yellow-400' />
            <span
              className='pl-1 hover:underline
            '
            >
              0 tokens available
            </span>
          </Link>
        </div>

        <div className='flex-1 overflow-auto bg-neutral-100'>list of posts</div>
        <div className='flex h-20 items-center gap-2 border-t border-t-black/10 bg-neutral-100 px-2'>
          {!!user ? (
            <>
              <div className='min-w-[50px]'>
                <Image src={user.picture} alt={user.name} width={50} height={50} className='rounded-md' />
              </div>
              <div className='flex-1'>
                <div className='font-bold'>{user.email}</div>
                <Link className='text-sm' href='/api/auth/logout'>
                  Logout
                </Link>
              </div>
            </>
          ) : (
            <Link href='/api/auth/login'> Login </Link>
          )}
        </div>
      </div>
      <div className='bg-gray-100'>{children}</div>
    </div>
  )
}

export default AppLayout
