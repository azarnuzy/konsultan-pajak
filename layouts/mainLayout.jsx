import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer/Footer'
import SocialMedia from '@/components/Navbar/SocialMedia'
import Head from 'next/head'
import HeadComponent from '@/components/Head/HeadComponents'

const MainLayout = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className='min-h-screen bg-gray-100'>
      <HeadComponent />
      <SocialMedia />
      <Navbar />
      <main
        className={`${
          isMounted ? 'opacity-100' : 'opacity-0'
        } w-full transition-opacity duration-500 ease-in-out mx-auto max-w-7xl px-4 sm:px-8 md:px-16 lg:px-24`}
      >
        {children ? <></> : <div className='h-[70vh] w-full'></div>}
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
