
import Sidebar from '@/components/shared/Sidebar'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
    </header>
    <main className='root'>
        <Sidebar />
        <div className='root-container'>
          <div className="wrapper">
            {children}
          </div>
        </div>
      </main></>
  )
}

export default Layout