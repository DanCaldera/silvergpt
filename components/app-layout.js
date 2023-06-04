import { useUser } from '@auth0/nextjs-auth0/client'
import { CircleStackIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from './logo'
import { cn } from '../lib/utils'

export const AppLayout = ({ children }) => {
  const { user } = useUser()
  return (
    <div className='grid h-screen max-h-screen grid-cols-[300px,1fr]'>
      <div className='flex flex-col overflow-hidden border text-black shadow'>
        <div className='bg-neutral-100 px-2'>
          <Logo />
          <Link
            className='flex items-center justify-center rounded-md border bg-neutral-500 p-2 text-white hover:bg-neutral-600'
            href='/post/new'
          >
            <button>New Blog</button>
          </Link>
          <Link className='mt-2 flex items-center justify-center' href='/token-topup'>
            <CircleStackIcon className='w-4 text-yellow-400' />
            <span
              className='pl-1 hover:underline
            '
            >
              {children.props.tokens} tokens available
            </span>
          </Link>
        </div>

        <div className='flex-1 overflow-auto'>
          <div className='text-s bg-neutral-100 p-2 text-neutral-500'>Blogs</div>
          {children.props?.posts?.map(post => (
            <Link key={post._id} href={`/post/${post.id}`}>
              <div
                className={cn(
                  'cursor-pointer bg-neutral-100 p-2 hover:bg-neutral-200',
                  children.props?.postId === post.id && 'bg-neutral-200'
                )}
              >
                <div className='text-sm font-bold'>{post.title}</div>
              </div>
            </Link>
          ))}
        </div>
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
