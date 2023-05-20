import { ourTeam } from '@/helpers/landingPageData'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from 'react-icons/ai'

function OurTeam() {
  const data = ourTeam
  return (
    <div
      id='our-team'
      className='w-full bg-light-gray flex justify-center items-center p-8'
    >
      <div className='max-w-7xl mx-auto my-8'>
        <h1 className='text-center font-bold text-2xl text-light-dark tracking-wider mb-8'>
          Our Team
        </h1>
        <div className='mx-16 flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-8'>
          {data.map((item, i) => (
            <div
              className='bg-white p-5 rounded-md shadow-md text-light-dark flex flex-col items-center'
              key={i}
            >
              <div className='w-[250px] h-[250] rounded-full mb-3'>
                <Image
                  src={`/images/${item.img}`}
                  alt='team image'
                  width={250}
                  height={250}
                />
              </div>
              <span className='text-lg block'>{item.name}</span>
              <span className='block'>{item.position} </span>
              <div className='flex my-3 gap-2 justify-center'>
                <Link
                  href={`${item.socialMedia[0].link}`}
                  target='_blank'
                  passHref
                >
                  {' '}
                  <AiFillLinkedin className='w-7 h-7' />
                </Link>

                <Link
                  href={`${item.socialMedia[1].link}`}
                  target='_blank'
                  passHref
                >
                  {' '}
                  <AiFillFacebook className='w-7 h-7' />
                </Link>

                <Link
                  href={`${item.socialMedia[2].link}`}
                  target='_blank'
                  passHref
                >
                  {' '}
                  <AiFillTwitterCircle className='w-7 h-7' />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurTeam
