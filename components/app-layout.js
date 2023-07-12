import { useUser } from '@auth0/nextjs-auth0/client'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, CircleStackIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useContext, useEffect, useState } from 'react'
import PostsContext from '../context/postsContext'
import { cn } from '../utils/cn'

const tools = [
  { id: 1, name: 'blogs', href: '/post/new', initial: 'B', current: false },
  { id: 2, name: 'formatter', href: '/format/new', initial: 'F', current: false }
]

export function AppLayout({ children, tokens, postId, createdAt, posts }) {
  const { user } = useUser()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { setPostsFromSSR, posts: ssrPosts, getPosts, noMorePosts, setNoMorePosts, deletePost } = useContext(PostsContext)

  useEffect(() => {
    setPostsFromSSR(posts)
    if (posts.length === 0) {
      getPosts({})
    }
    if (postId) {
      getPosts({ lastPostDate: createdAt, getNewerPosts: true })
    }
  }, [posts, setPostsFromSSR, postId, getPosts, createdAt])

  const handleDeletePost = async postId => {
    const confirmed = confirm('Are you sure you want to delete this post?')
    if (!confirmed) return
    deletePost(postId)
  }

  return (
    <div className='h-full'>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as='div' className='z-100 relative lg:hidden' onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-neutral-900/80' />
            </Transition.Child>

            <div className='fixed inset-0 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                      <button type='button' className='-m-2.5 p-2.5' onClick={() => setSidebarOpen(false)}>
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon className='h-6 w-6 text-white' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className='flex grow flex-col gap-y-1 overflow-y-auto bg-white px-6 pb-2'>
                    <div className='flex h-16 shrink-0 items-center'>
                      <Image className='h-11 w-auto invert' width={118} height={46} src='/icon.svg' alt='Logo' />
                      <span className='ml-1 text-xl'>silverbot</span>
                    </div>
                    <button
                      onClick={() => {
                        router.push('/token-topup')
                        setSidebarOpen(false)
                      }}
                      className='my-2 flex items-center justify-center'
                      href='/token-topup'
                    >
                      <CircleStackIcon className='w-6 text-yellow-400 hover:text-yellow-500' />
                      <span
                        className='pl-1 hover:underline
            '
                      >
                        {tokens} tokens available
                      </span>
                    </button>
                    <nav className='flex flex-1 flex-col'>
                      <div role='list' className='flex flex-1 flex-col gap-y-7'>
                        <div>
                          <div role='list' className='-mx-2 space-y-1'>
                            {ssrPosts.map(post => (
                              <div key={post._id} className='flex items-center justify-between'>
                                <button
                                  onClick={() => {
                                    setNoMorePosts(false)
                                    setSidebarOpen(false)
                                    router.push(`/post/${post.id}`)
                                  }}
                                  className={cn(
                                    postId === post.id
                                      ? 'bg-neutral-100 text-neutral-600'
                                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-600',
                                    'group flex w-full gap-x-3 whitespace-nowrap rounded-md border p-2 text-sm font-semibold leading-6'
                                  )}
                                >
                                  {post.title.slice(0, 25) + '...'}
                                </button>
                                <TrashIcon
                                  onClick={() => handleDeletePost(post.id)}
                                  className='ml-2 h-5 w-5 cursor-pointer text-neutral-400 hover:text-neutral-600'
                                />
                              </div>
                            ))}
                          </div>

                          {!noMorePosts && (
                            <div className='-mx-2 mt-4 flex flex-1 justify-center'>
                              <button
                                onClick={() => getPosts({ lastPostDate: ssrPosts[ssrPosts.length - 1]?.createdAt })}
                                className='relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0'
                              >
                                Load more
                              </button>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className='text-xs font-semibold leading-6 text-neutral-400'>Tools</div>
                          <div role='list' className='-mx-2 mt-2 space-y-1'>
                            {tools.map(tool => (
                              <div key={tool.name}>
                                <a
                                  href={tool.href}
                                  className={cn(
                                    tool.current
                                      ? 'bg-neutral-100 text-neutral-600'
                                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-600',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                  )}
                                >
                                  <span
                                    className={cn(
                                      tool.current
                                        ? 'border-neutral-600 text-neutral-600'
                                        : 'border-neutral-200 text-neutral-400 group-hover:border-neutral-600 group-hover:text-neutral-600',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium'
                                    )}
                                  >
                                    {tool.initial}
                                  </span>
                                  <span className='truncate'>{tool.name}</span>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='lg:z-100 hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex grow flex-col gap-y-1 overflow-y-auto border-r border-neutral-200 bg-white px-6'>
            <div className='flex h-16 shrink-0 items-center'>
              <Image className='h-11 w-auto invert' width={118} height={46} src='/icon.svg' alt='Logo' />
              <span className='ml-1 text-xl'>silverbot</span>
            </div>
            <Link className='my-2 flex items-center justify-center' href='/token-topup'>
              <CircleStackIcon className='w-6 text-yellow-400 hover:text-yellow-500' />
              <span
                className='pl-1 hover:underline
            '
              >
                {tokens} tokens available
              </span>
            </Link>
            <nav className='flex flex-1 flex-col'>
              <div className='flex flex-1 flex-col gap-y-7'>
                <div>
                  <div role='list' className='-mx-2 space-y-1'>
                    {ssrPosts.map(post => (
                      <div key={post.name} className='flex w-full items-center justify-between'>
                        <button
                          onClick={() => {
                            setNoMorePosts(false)
                            router.push(`/post/${post.id}`)
                          }}
                          href={`/post/${post.id}`}
                          className={cn(
                            postId === post.id
                              ? 'bg-neutral-100 text-neutral-600'
                              : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-600',
                            'w-full whitespace-nowrap rounded-md border p-2 text-left text-sm font-semibold leading-6'
                          )}
                        >
                          {post.title.slice(0, 25) + '...'}
                        </button>
                        <TrashIcon
                          onClick={() => handleDeletePost(post.id)}
                          className='ml-2 h-5 w-5 cursor-pointer text-neutral-400 hover:text-neutral-600'
                        />
                      </div>
                    ))}
                  </div>

                  {!noMorePosts && (
                    <div className='-mx-2 mt-4 flex flex-1 justify-center'>
                      <button
                        onClick={() => getPosts({ lastPostDate: ssrPosts[ssrPosts.length - 1]?.createdAt })}
                        className='relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0'
                      >
                        Load more
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <div className='text-xs font-semibold leading-6 text-neutral-400'>Tools</div>
                  <div role='list' className='-mx-2 mt-2 space-y-1'>
                    {tools.map(tool => (
                      <div key={tool.name}>
                        <a
                          href={tool.href}
                          className={cn(
                            tool.current
                              ? 'bg-neutral-100 text-neutral-600'
                              : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          )}
                        >
                          <span
                            className={cn(
                              tool.current
                                ? 'border-neutral-600 text-neutral-600'
                                : 'border-neutral-200 text-neutral-400 group-hover:border-neutral-600 group-hover:text-neutral-600',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium'
                            )}
                          >
                            {tool.initial}
                          </span>
                          <span className='truncate'>{tool.name}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='-mx-6 mt-auto'>
                  {!!user ? (
                    <div className='flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-neutral-900 hover:bg-neutral-100'>
                      <Image
                        className='h-8 w-8 rounded-full bg-neutral-100'
                        src={user?.picture}
                        alt={user?.name}
                        width={100}
                        height={100}
                      />
                      <span className='sr-only'>Your profile</span>
                      <div className='flex-1'>
                        <div className='text-sm font-bold'>{user.email}</div>
                        <Link className='text-xs' href='/api/auth/logout'>
                          Logout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <Link href='/api/auth/login'> Login </Link>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>

        {!sidebarOpen && (
          <div className='sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden'>
            <button type='button' className='-m-2.5 p-2.5 text-neutral-700 lg:hidden' onClick={() => setSidebarOpen(true)}>
              <span className='sr-only'>Open sidebar</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div className='flex-1 text-sm font-semibold leading-6 text-neutral-900'></div>
            <Link href='/api/auth/logout'>
              <span className='sr-only'>Your profile</span>
              <Image className='h-8 w-8 rounded-full bg-neutral-100' src={user?.picture} alt={user?.name} width={100} height={100} />
            </Link>
          </div>
        )}

        <main className='py-10 lg:pl-72'>
          <div className='px-4 sm:px-6 lg:px-8'>{children}</div>
        </main>
      </div>
    </div>
  )
}
