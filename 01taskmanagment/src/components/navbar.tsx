import React from 'react'
import MobileSidbar from './mobile-sidebar'
import { UserButton } from '@/features/auth/components/user-button'

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between pt-4 px-6'>
      <div className='flex-col hidden lg:flex'> 
        <h1 className='text-2xl font-semibold'>Home</h1>
        <p className='text-muted-foreground'>Monitor all of your projects</p>
      </div>
      <UserButton />
      <MobileSidbar />
    </nav>
  )
}
