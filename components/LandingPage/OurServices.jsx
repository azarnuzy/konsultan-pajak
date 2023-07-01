import { ourService } from '@/helpers/landingPageData'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function OurServices() {
  const data = ourService
  return (
    <div
      id='our-services'
      className='mx-auto max-w-7xl p-8'
    >
      <h1 className='text-center font-bold text-2xl text-light-dark tracking-wider mb-8'>
        Our Services
      </h1>
      <div className='flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap gap-8'>
        {data.map((item, i) => (
          <div
            className='p-5 bg-lighBlue flex flex-col gap-4 justify-center items-center w-fit md:w-[413px]'
            key={i}
          >
            <div className='w-[80px] h-[70px]'>
              <Image
                src={`/images/${item.logo}`}
                alt='Logo Services'
                width={80}
                height={70}
              />
            </div>
            <h3 className='text-xl text-center font-semibold'>{item.title}</h3>
            <span className=''>{item.description}</span>
          </div>
        ))}
      </div>
      <div className='w-full flex justify-center my-5'>
        <Link
          href='/our-services'
          className='bg-blue-700 text-white w-[150px] py-3 text-center rounded-md font-bold px-3'
        >
          Read More...
        </Link>
      </div>
    </div>
  )
}

export default OurServices
