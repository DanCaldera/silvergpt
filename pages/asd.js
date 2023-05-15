import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>{error.message}</div>

  return (
    <div>
      <Link href='/api/auth/login'>Login</Link>
      <Link href='/api/auth/logout'>Logout</Link>

      {user ? (
        <div>
          <h2>Profile</h2>
          <p>Hi {user.name}!</p>
          <p>Email: {user.email}</p>
          <p>Picture:</p>
          <Image className='rounded-md w-20' src={user.picture} alt={user.name} width={200} height={200} />
        </div>
      ) : (
        <div>
          <h2>Not signed in</h2>
        </div>
      )}
    </div>
  )
}
