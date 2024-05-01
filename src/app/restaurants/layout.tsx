import React from 'react'
import Navbar from '../components/common/Navbar'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className='p-6'>
        {children}
      </main>
    </>
  )
}
