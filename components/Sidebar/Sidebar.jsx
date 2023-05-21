import { useEffect, useState } from 'react'
import Link from 'next/link'
import {} from 'react-icons/ai'

const Sidebar = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className='flex w-full'>
      <div className='w-64 bg-light-dark text-white font-semibold shadow-lg h-[calc(100vh)]'>
        <Link
          href={'/'}
          className='px-4 h-[57px] w-full flex items-center text-2xl font-bold justify-center border-b-[1px] border-solid border-slate-100'
        >
          LOGO
        </Link>
      </div>
      <div className='w-full bg-lighBlue'>
        <div className='w-full bg-white h-[57px]'></div>
        <main
          className={`${
            isMounted ? 'opacity-100' : 'opacity-0'
          } py-3 px-8 w-full overflow-hidden`}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default Sidebar
