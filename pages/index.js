import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'

export default function Example() {
  return (
    <div className='relative isolate overflow-hidden bg-white'>
      <svg
        className='absolute inset-0 -z-10 h-full w-full stroke-neutral-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
        aria-hidden='true'
      >
        <defs>
          <pattern id='0787a7c5-978c-4f66-83c7-11c213f99cb7' width={200} height={200} x='50%' y={-1} patternUnits='userSpaceOnUse'>
            <path d='M.5 200V.5H200' fill='none' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' strokeWidth={0} fill='url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)' />
      </svg>
      <div className='mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40'>
        <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8'>
          <Image className='h-11 invert' width={118} height={46} src='/icon.svg' alt='Your Company' />
          <div className='mt-24 sm:mt-32 lg:mt-16'>
            <a href='#' className='inline-flex space-x-6'>
              <span className='rounded-full bg-neutral-500/10 px-3 py-1 text-sm font-semibold leading-6 text-neutral-500 ring-1 ring-inset ring-neutral-500/10'>
                What&apos;s new
              </span>
              <span className='inline-flex items-center space-x-2 text-sm font-medium leading-6 text-neutral-500'>
                <span>Just shipped v1.0</span>
                <ChevronRightIcon className='h-5 w-5 text-neutral-400' aria-hidden='true' />
              </span>
            </a>
          </div>
          <h1 className='mt-10 text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl'>Deploy to the cloud with confidence</h1>
          <p className='mt-6 text-lg leading-8 text-neutral-500'>
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className='mt-10 flex items-center gap-x-6'>
            <Link
              href='/post/new'
              className='rounded-md bg-neutral-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500'
            >
              Get started
            </Link>
            <Link href='/post/new' className='text-sm font-semibold leading-6 text-neutral-900'>
              Learn more <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>
        <div className='mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32'>
          <div className='max-w-3xl flex-none sm:max-w-5xl lg:max-w-none'>
            <div className='-m-2 rounded-xl bg-neutral-900/5 p-2 ring-1 ring-inset ring-neutral-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
              <Image
                src='https://tailwindui.com/img/component-images/project-app-screenshot.png'
                alt='App screenshot'
                width={2432}
                height={1442}
                className='w-[76rem] rounded-md shadow-2xl ring-1 ring-neutral-900/10'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
