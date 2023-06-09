import Image from 'next/image'
import Link from 'next/link'

export default function IndexPage() {
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
          <h1 className='mt-10 text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl'>AI Utilities</h1>
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
          </div>
        </div>
        <div className='mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32'>
          <div className='max-w-3xl flex-none sm:max-w-5xl lg:max-w-none'>
            <div className='-m-2 rounded-xl bg-neutral-900/5 p-2 ring-1 ring-inset ring-neutral-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
              <Image
                src='https://images.unsplash.com/photo-1566555318858-6a1368a2619e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
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
