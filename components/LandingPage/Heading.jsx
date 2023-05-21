import { headingData } from '@/helpers/landingPageData'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Heading() {
  const data = headingData
  return (
    <div className='bg-no-repeat bg-cover w-full h-screen sm:h-[84vh] relative object-center'>
      <Image
        src={'/images/header2.png'}
        alt='heading'
        fill
        className='object-cover  w-full h-screen sm:h-[84vh] absolute object-center'
      />
      <div className='absolute w-full h-screen sm:h-[84vh] bg-gradient-to-r from-black to-light-purple opacity-30'></div>
      {/* <Navbar /> */}
      <div className='sm:mx-0 h-screen absolute w-full sm:h-[84vh] flex flex-col justify-center items-center'>
        <h1 className='uppercase flex flex-col mb-6 text-3xl sm:text-5xl font-extrabold text-light-dark text-center tracking-wider gap-3'>
          selamat datang di <span className='text-light-red'>{data.title}</span>
        </h1>
        <div className='max-w-lg text-center text-gray-800'>
          <p>{data.description}</p>
        </div>
        <Link
          href={'/jadwal-konsultasi'}
          className='w-1/2 py-3 text-center bg-transparent mt-8 border-solid border-gray-600 border-2 font-semibold rounded-md'
        >
          {data.button}
        </Link>
      </div>
    </div>
  )
}

export default Heading
