import { socialMedia } from '@/helpers/landingPageData'
import React from 'react'
import { HiMail, HiOutlineLocationMarker } from 'react-icons/hi'
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillYoutube,
} from 'react-icons/ai'
export default function SocialMedia() {
  const data = socialMedia

  return (
    <div className='w-full  hidden sm:block bg-white'>
      <div className='mx-8 py-4 lg:px-8 flex justify-between flex-row-reverse lg:mx-auto max-w-7xl text-black'>
        <div className='flex flex-row-reverse gap-4'>
          <div className='flex gap-1 items-center'>
            <HiOutlineLocationMarker className='w-6 h-6' />
            <span className='text-md'>{data.extendSocialMedia[1].name}</span>
          </div>
          <div className='flex gap-1 items-center'>
            <HiMail className='w-6 h-6' />
            <span className='text-md'>{data.extendSocialMedia[0].name}</span>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <AiFillTwitterCircle className='w-6 h-6' />
          <AiFillInstagram className='w-6 h-6' />
          <AiFillLinkedin className='w-6 h-6' />
          <AiFillFacebook className='w-6 h-6' />
          <AiFillYoutube className='w-6 h-6' />
        </div>
      </div>
    </div>
  )
}
