import Image from 'next/image'
import React from 'react'
import Logo from '../components/logo/logo'
import Link from 'next/link'

const Home = () => {
  return (
    <div className='relative w-screen h-screen overflow-hidden flex justify-center items-center'>
      <Image src='/hero.webp' alt='hero' fill className='absolute' />
      <div className='relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-gray-900/90 rounded-md backdrop-blur-sm'>
        <Logo />
        <p>The AI SASS Solution to create SEO Optimized Blog Posts</p>
        <Link className='btn mt-5' href='/post/new'>
          Begin
        </Link>
      </div>
    </div>
  )
}

export default Home
