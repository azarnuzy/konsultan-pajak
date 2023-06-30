import { useAuth } from '@/context/auth-context'
import { navbarData, socialMedia } from '@/helpers/landingPageData'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillYoutube,
} from 'react-icons/ai'
import {
  HiChevronDown,
  HiMail,
  HiMenu,
  HiOutlineLocationMarker,
  HiPhone,
  HiUserCircle,
  HiX,
} from 'react-icons/hi'
function Navbar() {
  const [isActive, setIsActive] = useState(false)
  const router = useRouter()
  const data = navbarData
  const data2 = socialMedia
  const { token, logout, user, userInfo } = useAuth()

  const path = router.pathname
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  return (
    <>
      <div
        className={` z-[1000] hidden lg:block w-full px-8 transition duration-300 ease-in-out ${
          path === '/' ? 'absolute bg-lighBlue' : 'bg-lighBlue'
        }`}
      >
        <div className='py-4 flex max-w-7xl lg:mx-auto justify-between  items-center '>
          <Link href={'/'}>
            <h3 className='text-3xl italic text-darkBlue font-bold tracking-wide'>
              Logo
            </h3>
          </Link>
          <ul className='flex list-none gap-4 md:gap-5 lg:gap-8 text-black uppercase items-center font-semibold'>
            {data.navbars.map((item, i) => (
              <li key={i}>
                <Link href={item.link}>{item.label}</Link>
              </li>
            ))}
            <li className='flex gap-2'>
              {token ? (
                <div className=''>
                  <button
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className=' py-2 rounded inline-flex items-center'
                  >
                    <div className='h-12 w-12 object-cover object-center cursor-pointer rounded-full '>
                      <Image
                        src={
                          user?.user?.image?.imagekit_url ||
                          '/images/profileDefault.png'
                        }
                        alt='profile user'
                        width={48}
                        height={48}
                        className='rounded-full h-12 w-12'
                      />
                    </div>
                  </button>
                  <Transition
                    show={isProfileOpen}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                    className={''}
                  >
                    <div
                      className='absolute right-0 py-2 w-36 bg-white rounded-md shadow-lg  flex flex-col z-50'
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => {
                        // console.log('leave')
                        setIsProfileOpen(false)
                      }}
                    >
                      <Link
                        href={'/profile'}
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
                    className='bg-darkBlue p-2 px-5 rounded text-white px- text-sm'
                  >
                    login
                  </Link>
                  <Link
                    href='/register'
                    className='bg-white p-2 px-5 rounded text-darkBlue border-2 border-solid border-darkBlue px- text-sm'
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
        className={` z-10  w-full py-2 lg:hidden bg-darkBlue transition duration-300 ease-in-out `}
      >
        <div className='flex justify-between px-8 bg-darkBlue'>
          <h3 className='text-3xl italic text-white font-bold tracking-wide'>
            Logo
          </h3>
          <div
            onClick={() => {
              setIsActive((isActive) => !isActive)
            }}
            className='min-h-fit min-w-fit cursor-pointer'
          >
            <HiMenu className='w-7 h-8 text-white font-extrabold' />
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
                Logo
              </h3>
            </div>
            <div className='rounded-full bg-[#41444b] p-1 cursor-pointer'>
              <div
                className='text-2xl flex items-center  font-black'
                onClick={() => {
                  setIsActive(() => false)
                }}
              >
                <HiX className='h-7' />
              </div>
            </div>
          </div>
          <div className='h-[68%]'>
            <ul className='list-none flex flex-col gap-2 text-xl uppercase'>
              {data.navbars.map((item, i) => (
                <li key={i}>
                  <Link href={item.link}>{item.label}</Link>
                </li>
              ))}

              {!token ? (
                <>
                  <Link
                    href='/login'
                    className='inline-block'
                  >
                    <li className='bg-white text-center p-2 px-5 rounded text-darkBlue px- text-sm min-[100px]'>
                      login
                    </li>
                  </Link>
                  <Link
                    href='/register'
                    className='inline-block'
                  >
                    <li className='bg-white text-center p-2 px-5 rounded text-darkBlue px- text-sm min-[100px]'>
                      Register
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <li className='flex justify-center items-center my-10'>
                    <div className='h-32 w-32 object-cover object-center cursor-pointer rounded-full '>
                      <Image
                        src={
                          user?.user?.image?.imagekit_url ||
                          '/images/profileDefault.png'
                        }
                        alt='profile user'
                        width={48}
                        height={48}
                        className='rounded-full h-32 w-32'
                      />
                    </div>
                  </li>
                  <Link
                    href='/profile'
                    className='inline-block'
                  >
                    <li className='bg-white text-center p-2 px-5 rounded text-darkBlue px- text-sm min-[100px]'>
                      Profile
                    </li>
                  </Link>
                  <div
                    // href='/logout'
                    onClick={() => logout()}
                    className='inline-block'
                  >
                    <li className='bg-white text-center p-2 px-5 rounded text-darkBlue px- text-sm min-[100px]'>
                      logout
                    </li>
                  </div>
                </>
              )}
            </ul>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-1 items-center'>
                <HiOutlineLocationMarker className='w-6 h-6' />
                <span className='text-md'>
                  {data2.extendSocialMedia[1].name}
                </span>
              </div>
              <div className='flex gap-1 items-center'>
                <HiMail className='w-6 h-6' />
                <span className='text-md'>
                  {data2.extendSocialMedia[0].name}
                </span>
              </div>
              <div className='flex  mt-3 gap-2 items-center'>
                <div className='flex gap-2 items-center'>
                  <AiFillTwitterCircle className='w-6 h-6' />
                  <AiFillInstagram className='w-6 h-6' />
                  <AiFillLinkedin className='w-6 h-6' />
                  <AiFillFacebook className='w-6 h-6' />
                  <AiFillYoutube className='w-6 h-6' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
