import { faBrain } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Logo = () => {
  return (
    <div className='text-3xl text-center py-4 font-heading'>
      Blog Standard
      <FontAwesomeIcon icon={faBrain} className='text-2xl text-gray-200' />
    </div>
  )
}

export default Logo
