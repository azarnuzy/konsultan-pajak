import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiFillDashboard } from 'react-icons/ai'
import { FaUserCircle, FaUsers } from 'react-icons/fa'
import { MdPendingActions, MdTask } from 'react-icons/md'
import { HiBell, HiChat, HiLogout, HiMail, HiStop } from 'react-icons/hi'
import { useAuth } from '@/context/auth-context'

const AdminLayout = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)

  const { logout } = useAuth()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const data = [
    {
      name: 'Users',
      link: '/admin/users',
    },
    {
      name: 'Consultant Request',
      link: '/admin/consultant-request',
    },
    {
      name: 'Consult Task',
      link: '/admin/consultant-task',
    },
  ]

  return (
    <div className='flex w-full overflow-hidden'>
      <div className='w-64 bg-light-blue-3 text-white font-semibold shadow-lg h-[calc(100vh)]'>
        <Link
          href={'/'}
          className='px-4 h-[57px] bg-light-dark w-full flex items-center text-2xl font-bold justify-center border-b-[1px] border-solid border-slate-100'
        >
          LOGO
        </Link>
        <ul className='flex flex-col my-4 gap-4 mx-3'>
          <li className='pb-3 border-b-[1px] border-solid border-white'>
            <Link
              href={'/admin'}
              className='flex gap-2 items-center'
            >
              <AiFillDashboard />
              <span className='text-white'>Dashboard</span>
            </Link>
          </li>
          {data.map((item, i) => {
            let icon
            if (i === 0) {
              icon = <FaUsers />
            } else if (i === 1) {
              icon = <MdPendingActions />
            } else if (i === 2) {
              icon = <MdTask />
            } else if (i === 3) {
              icon = <HiStop />
            }

            return (
              <li
                className=''
                key={i}
              >
                <Link
                  href={item.link}
                  className='flex gap-2 items-center'
                >
                  {icon}
                  <span className='text-white'>{item.name}</span>
                </Link>
              </li>
              //   {i === 0 && ()}
            )
          })}
          <div className=' border-solid border-b-[1px] border-white'></div>
          <li className='cursor-pointer'>
            <Link
              href={''}
              className='flex gap-2 items-center'
            >
              <HiChat />
              <span className='text-white'>Live Chat</span>
            </Link>
          </li>
          <div className=' border-solid border-b-[1px] border-white'></div>
          <li
            className='cursor-pointer'
            onClick={logout}
          >
            <div
              // href={'admin/chat'}
              className='flex gap-2 items-center'
            >
              <HiLogout />
              <span className='text-white'>Logout</span>
            </div>
          </li>
        </ul>
      </div>
      <div className='w-full bg-light-gray-2'>
        <div className='w-full  bg-white h-[57px]'>
          <div className='flex gap-4 justify-end mx-8 py-3'>
            <div>
              <HiBell className='w-7 h-7 text-gray-500' />
            </div>
            <div>
              <HiMail className='w-7 h-7 text-gray-500' />
            </div>
            <div className='h-[33px] w-[1px] bg-gray-400'></div>
            <div>
              <FaUserCircle className='w-7 h-7 text-gray-500' />
            </div>
          </div>
        </div>
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

export default AdminLayout
