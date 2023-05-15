import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AppLayout = ({ children }) => {
  const { user } = useUser()
  return (
    <div className='grid grid-cols-[300px,1fr] h-screen max-h-screen'>
      <div className='flex flex-col text-white overflow-hidden bg-gray-800'>
        <div>
          <div>logo</div>
          <div>cta button</div>
          <div>tokens</div>
        </div>

        <div className='flex-1 overflow-auto bg-gradient-to-b from-gray-800 to-cyan-900'>list of posts</div>
        <div className='bg-cyan-900 flex items-center gap-2 border-t border-t-black/50 h-20 px-2'>
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
