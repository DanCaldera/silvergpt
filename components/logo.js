import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex items-center justify-center py-4'>
      <Image className='h-11 invert' width={118} height={46} src='/icon.svg' alt='Your Company' />
    </div>
  )
}

export default Logo
