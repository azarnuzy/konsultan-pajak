import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import { ourClient } from '@/helpers/landingPageData'
import { Navigation } from 'swiper'

import Image from 'next/image'

function OurClient() {
  const data = ourClient
  const [slidesPerView, setSlidesPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      let newSlidesPerView = 2 // default value for mobile
      if (screenWidth >= 600 && screenWidth <= 768) {
        newSlidesPerView = 4
      } else if (screenWidth >= 768 && screenWidth < 1024) {
        newSlidesPerView = 6 // tablet
      } else if (screenWidth >= 1024) {
        newSlidesPerView = 8 // desktop
      }

      setSlidesPerView(newSlidesPerView)
    }

    handleResize() // set initial slidesPerView value

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      className='max-w-7xl mx-auto py-16'
      id='our-client'
    >
      <h1 className='text-center font-bold text-2xl text-light-dark tracking-wider mb-8'>
        Our Clients
      </h1>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={slidesPerView}
        spaceBetween={30}
        className='mySwiper px-16'
      >
        {data.map((item, i) => (
          <SwiperSlide
            key={i}
            className='mx-2 sm:mx-5'
          >
            <div className='w-[156px] h-[156px] flex items-center justify-center bg-light-gray '>
              <Image src={`/images/clients/${item.logo}`} alt={item.name} width={156} height={156}/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default OurClient
