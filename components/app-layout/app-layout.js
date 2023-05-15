import { useUser } from '@auth0/nextjs-auth0/client'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../logo/logo'

const AppLayout = ({ children }) => {
  const { user } = useUser()
  return (
    <div className='grid grid-cols-[300px,1fr] h-screen max-h-screen'>
      <div className='flex flex-col text-white overflow-hidden'>
        <div className='px-2 bg-gray-800'>
          <Logo />
          <Link className='btn' href='/post/new'>
            New Post
          </Link>
          <Link className='block mt-2 text-center' href='/token-topup'>
            <FontAwesomeIcon icon={faCoins} className='text-yellow-400' />
            <span className='pl-1'>0 tokens available</span>
          </Link>
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
