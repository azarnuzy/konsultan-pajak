import { footer } from '@/helpers/landingPageData'
import React from 'react'
import { HiLocationMarker, HiMail } from 'react-icons/hi'

function Footer() {
  const data = footer

  return (
    <div className='w-full  border-t-[1px] border-dotted border-light-red pt-10 bg-lighBlue'>
      <div className='max-w-7xl md:px-8 mb-10 md:gap-14 lg:gap-28 md:mx-auto flex flex-col md:flex-row'>
        <div className='flex w-full sm:w-1/2  flex-col gap-4'>
          <h3 className='text-xl font-bold uppercase tracking-wide'>
            {data.footer1.title}
          </h3>
          <p className='text-light-dark'>{data.footer1.description}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='text-xl font-bold tracking-wide'>
            {data.footer2.title}
          </h3>
          <div className='flex gap-3'>
            <HiMail className='w-4 h-4' />

            <p className='text-light-dark'>{data.footer2.email.name}</p>
          </div>
          <div className='flex gap-3'>
            <HiLocationMarker className='w-4 h-4' />

            <p className='text-light-dark'>{data.footer2.address.name}</p>
          </div>
        </div>
      </div>
      <div className='flex w-full gap-1 justify-center bg-darkBlue py-2 text-white'>
        Copyright <span className='font-medium'>KKP Budi Indratno</span>
      </div>
    </div>
  )
}

export default Footer
