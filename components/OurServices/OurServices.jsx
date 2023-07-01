import {
  advisorPajak,
  asistenPajak,
  jasaKepatuhan,
  listAdvisorPajak,
  ourService,
} from '@/helpers/landingPageData'
import Image from 'next/image'
import React from 'react'

const services = ourService
const asistenPajakData = asistenPajak
const jasaKepatuhanData = jasaKepatuhan
const advisorPajakData = advisorPajak
const listAdvisorPajakData = listAdvisorPajak
function OurServices() {
  return (
    <div className='max-w-7xl mx-auto py-8'>
      <h1 className='text-center font-bold text-3xl text-light-dark tracking-wider mb-8'>
        Our Services
      </h1>
      {services.map((service, index) => (
        <div
          className={
            index === 2 && 'flex flex-col bg-lighBlue mx-8 rounded-2xl'
          }
          key={index}
        >
          <div
            className=' flex flex-col md:flex-row justify-between my-5 rounded-2xl bg-lighBlue p-3 md:p-10 md:gap-20 mx-8 gap-5'
            key={index}
          >
            <div className='flex justify-center flex-col items-center font-bold text-xl md:w-[350px]'>
              <div className='w-[80px] h-[70px]'>
                <Image
                  src={'/images/' + service.logo}
                  alt='Logo Services'
                  width={80}
                  height={70}
                />
              </div>
              <h3 className='text-xl text-center'>{service.title}</h3>
            </div>
            <div className='text-lg font-semibold flex  justify-center items-center text-center'>
              {service.description}
            </div>
          </div>
          {index === 2 && (
            <>
              <div className='h-[2px] mx-3 bg-gray-600'></div>
              <div className='flex gap-4 flex-col lg:flex-row mx-5 my-5'>
                {asistenPajakData.map((item, i) => (
                  <div
                    className='boder bg-white text-light-dark border border-solid border-light-dark rounded-xl p-8 shadow-md'
                    key={i}
                  >
                    <div className='text-xl font-bold text-center mb-3'>
                      {item.title}
                    </div>
                    <div className='text-lg font-semibold text-center'>
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
              <div className='mx-5 boder bg-white text-light-dark border border-solid border-light-dark rounded-xl p-8 shadow-md flex flex-col md:flex-row justify-center md:gap-24'>
                <div className='md:w-[350px]'>
                  <div className=' text-xl font-bold text-center mb-3'>
                    {jasaKepatuhanData.title}
                  </div>
                  <div className='text-lg font-semibold text-center'>
                    {jasaKepatuhanData.description}
                  </div>
                </div>
                <ul className='list-disc'>
                  {jasaKepatuhanData.list.map((item, i) => (
                    <li
                      className='text-xl font-semibold'
                      key={i}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='m-5 boder bg-white text-light-dark border border-solid border-light-dark rounded-xl p-8 shadow-md'>
                <div className='flex justify-center'>
                  <div className='md:w-[480px]'>
                    <div className=' text-xl font-bold text-center mb-3'>
                      {advisorPajakData.title}
                    </div>
                    <div className='text-lg font-semibold text-center'>
                      {advisorPajakData.description}
                    </div>
                  </div>
                </div>
                <div className='h-[2px] mx-3 bg-gray-600 my-5'></div>
                <div className='flex  flex-col lg:flex-row gap-4'>
                  {listAdvisorPajakData.map((item, i) => (
                    <div
                      key={i}
                      className='flex  flex-col items-center justify-center gap-3'
                    >
                      <div className='w-60 h-55 flex items-center justify-center '>
                        <Image
                          src={item.logo}
                          alt='Logo Services'
                          width={60}
                          height={55}
                        />
                      </div>
                      <div className='text-xl font-bold text-center'>
                        {item.title}
                      </div>
                      <div className='text-lg font-semibold text-center'>
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default OurServices
