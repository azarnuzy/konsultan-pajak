import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {} from 'react-icons/hi'
function Navbar() {
  const [isActive, setIsActive] = useState(false)
  const router = useRouter()

  const { token, logout } = useAuth()

  // console.log(token)
  const path = router.pathname
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  return (
    <>
      <div
        className={` z-[1000]  hidden lg:block w-full px-8 transition duration-300 ease-in-out ${
          path === '/' ? 'absolute bg-transparent' : 'bg-light-red'
        }`}
      >
        <div className='py-4 flex max-w-7xl lg:mx-auto justify-between  items-center '>
          <Link href={'/'}>
            <h3 className='text-3xl italic text-white font-bold tracking-wide'>
              SDN Ciwaregu
            </h3>
          </Link>
          <ul className='flex list-none gap-4 md:gap-5 lg:gap-8 text-white uppercase items-center font-semibold'>
            <li>
              <Link href='/'>beranda</Link>{' '}
            </li>
            <li>
              <button
                onMouseEnter={() => setIsMenuOpen(true)}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className=' py-2 rounded inline-flex items-center'
              >
                <span className=' uppercase items-center font-semibold '>
                  Profile
                </span>
                <ChevronDownIcon className='w-5 ' />
              </button>
              <Transition
                show={isMenuOpen}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <div
                  className='absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg'
                  onMouseEnter={() => setIsMenuOpen(true)}
                  onMouseLeave={() => setIsMenuOpen(false)}
                >
                  {menuData.map((item) => (
                    <Link
                      href={item.url}
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      key={item.id}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </Transition>
            </li>
            <li>
              <Link href='/gallery'>galeri</Link>
            </li>
            <li>
              <Link href='/alur-ppdb'>alur ppdb</Link>
            </li>
            <li className='text-white p-2 px-5 rounded bg-origin-blue px- text-sm'>
              <Link href='/daftar-ppdb'>Daftar PPDB</Link>
            </li>
            <li className='flex gap-2'>
              {token ? (
                <div className='relative'>
                  <button
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className=' py-2 rounded inline-flex items-center'
                  >
                    <UserCircleIcon className='h-12 w-12 bg-gray-400 cursor-pointer rounded-full' />
                  </button>
                  <Transition
                    show={isProfileOpen}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <div
                      className='absolute right-0 py-2 w-36 bg-white rounded-md shadow-lg  flex flex-col'
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => setIsProfileOpen(false)}
                    >
                      <Link
                        href={'/akun'}
                        className='w-full text-start block px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer'
                      >
                        Profile
                      </Link>
                      <button
                        className='w-full text-start block px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer'
                        onClick={() => logout()}
                      >
                        LOGOUT
                      </button>
                    </div>
                  </Transition>
                </div>
              ) : (
                <>
                  <Link
                    href='/login'
                    className='bg-white p-2 px-5 rounded text-light-red px- text-sm'
                  >
                    login
                  </Link>
                  <Link
                    href='/register'
                    className='bg-white p-2 px-5 rounded text-light-red px- text-sm'
                  >
                    register
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${
          isActive ? 'fixed' : 'hidden'
        } w-full h-screen z-10 bg-light-dark transition duration-300 opacity-30 top-0 left-0`}
        onClick={() => {
          setIsActive(() => false)
        }}
      ></div>
      <div
        className={`${
          path === '/' ? 'absolute bg-transparent' : 'bg-light-red py-4'
        } z-10  w-full top-4 lg:hidden transition duration-300 ease-in-out `}
      >
        <div className='flex justify-between px-8'>
          <h3 className='text-3xl italic text-white font-bold tracking-wide'>
            SDN Ciwaregu
          </h3>
          <div
            onClick={() => {
              setIsActive((isActive) => !isActive)
            }}
            className='min-h-fit min-w-fit cursor-pointer'
          >
            <Bars3Icon className='w-7 h-8 text-white font-extrabold' />
          </div>
        </div>
        <div
          className={`fixed flex flex-col bg-dark-gray bg-light-dark text-white max-w-[310px] transform  gap-8 h-screen w-full top-0 z-50 px-4 pt-3 left-0 duration-1000 ease-in-out ${
            isActive ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='flex items-center gap-1 justify-between'>
            <div className='flex gap-1 items-center'>
              <h3 className='text-2xl italic text-white font-bold tracking-wide'>
                SDN Ciwaregu
              </h3>
            </div>
            <div className='rounded-full bg-[#41444b] p-1 cursor-pointer'>
              <div
                className='text-2xl flex items-center  font-black'
                onClick={() => {
                  setIsActive(() => false)
                }}
              >
                <XMarkIcon className='h-7' />
              </div>
            </div>
          </div>
          <div className='h-[68%]'>
            <ul className='list-none flex flex-col gap-2 text-xl uppercase'>
              <li>
                <Link href='/'>beranda</Link>{' '}
              </li>
              <li>
                <button
                  onMouseEnter={() => setIsMenuOpen(true)}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className='700   py-2  rounded inline-flex items-center'
                >
                  <span className=' uppercase items-center '>Profile</span>
                  <ChevronDownIcon className='w-5 ' />
                </button>
                <Transition
                  show={isMenuOpen}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <div
                    className='absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg'
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onMouseLeave={() => setIsMenuOpen(false)}
                  >
                    {menuData.map((item) => (
                      <a
                        href={item.url}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        key={item.id}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </Transition>
              </li>
              <li className=''>
                <Link href='/guru-staff'>guru & staff</Link>
              </li>
              <li>
                <Link href='/gallery'>galeri</Link>
              </li>
              <li>
                <Link href='/alur-ppdb'>alur ppdb</Link>
              </li>
              <li className=' text-center p-2 px-5 rounded text-white bg-light-red px- text-sm  '>
                <Link href='/daftar-ppdb'>Daftar PPDB</Link>
              </li>
              <li className='bg-white text-center p-2 px-5 rounded text-light-red px- text-sm min-[100px]'>
                <Link
                  href='/login'
                  className=''
                >
                  login
                </Link>
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-3 items-center'>
                <PhoneIcon className='w-6' />
                <span className='text-md'>0858-6451-9008</span>
              </div>
              <div className='flex gap-3 items-center'>
                <EnvelopeIcon className='w-6' />
                <span className='text-md'>sd.ciwaregu@gmail.com</span>
              </div>
              <div className='flex  mt-3 gap-2 items-center'>
                <span>Follow Us : </span>
                <svg
                  className='h-6 w-6 text-white'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  {' '}
                  <rect
                    x='2'
                    y='2'
                    width='20'
                    height='20'
                    rx='5'
                    ry='5'
                  />{' '}
                  <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />{' '}
                  <line
                    x1='17.5'
                    y1='6.5'
                    x2='17.51'
                    y2='6.5'
                  />
                </svg>
                <svg
                  className='h-6 w-6 text-white'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  {' '}
                  <path d='M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z' />{' '}
                  <polygon points='9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02' />
                </svg>
                <span className='p-[2px] rounded-full bg-white text-[#222]'>
                  <svg
                    className='h-6 w-6 text-[#222]'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    {' '}
                    <path
                      stroke='none'
                      d='M0 0h24v24H0z'
                    />{' '}
                    <path d='M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3' />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
