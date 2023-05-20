import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import SocialMedia from '@/components/Navbar/SocialMedia'
import { useState, useEffect } from 'react'

const WideLayout = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className='min-h-screen bg-gray-100'>
      <SocialMedia />
      <Navbar />
      <main
        className={`${
          isMounted ? 'opacity-100' : 'opacity-0'
        } w-full transition-opacity duration-500 ease-in-out mx-auto `}
      >
        {children ? <></> : <div className='min-h-half-screen'></div>}
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default WideLayout
