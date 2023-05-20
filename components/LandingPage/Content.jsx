import { contentData } from '@/helpers/landingPageData'
import Image from 'next/image'
import React from 'react'

function Content() {
  const data = contentData
  return (
    <div className='max-w-7xl mx-auto py-8 '>
      <div className='flex gap-16 flex-col md:flex-row justify-center items-center px-8'>
        <div className='w-full max-h-[400px] sm:1/2 md:w-1/4 flex justify-center'>
          <Image
            src={`/images/${data.sideImg}`}
            alt='Content Image'
            width={413}
            height={617}
            className=' object-cover object-center'
          />
        </div>
        <div className='w-full h-full sm:1/2 md:w-3/4'>
          <h2 className='font-semibold text-light-dark text-xl tracking-wide text-center mb-3'>
            {data.content1.title}
          </h2>
          <p className='text-light-dark text-center'>
            {data.content1.subTitle}
          </p>
          <div className='flex flex-col md:flex-row justify-center gap-4 my-3'>
            {data.content1.subContents.map((item, i) => (
              <div
                className='bg-lighBlue h-[400px] w-full md:w-[345px] rounded-xl text-light-dark flex  justify-center p-5  items-center flex-col'
                key={i}
              >
                <Image
                  src={`/images/${item.logo}`}
                  width={10}
                  height={10}
                  alt='logo content'
                  className='w-10 h-10'
                />
                <span className='text-lg'>{item.title}</span>
                <span className='text-lg font-semibold'>{item.subtitle}</span>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row items-center gap-8'>
        <div className='text-light-dark px-8'>
          <p className='block mb-3'>{data.content2.description.p1}</p>
          <p className='block'> {data.content2.description.p2}</p>
        </div>
        <div className='max-w-[200px] md:w-fit'>
          <Image
            src={`/images/${data.content2.sideImg}`}
            alt='Side Image 2'
            width={350}
            height={330}
            className='object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default Content
