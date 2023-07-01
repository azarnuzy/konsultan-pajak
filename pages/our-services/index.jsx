import Heading from '@/components/LandingPage/Heading'
import OurServices from '@/components/OurServices/OurServices'
import WideLayout from '@/layouts/wideLayout'
import React from 'react'

function OurServicesPage() {
  return (
    <div>
      <WideLayout>
        <Heading />
        <OurServices />
      </WideLayout>
    </div>
  )
}

export default OurServicesPage
