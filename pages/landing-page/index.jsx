import Content from '@/components/LandingPage/Content'
import Heading from '@/components/LandingPage/Heading'
import OurClient from '@/components/LandingPage/OurClient'
import OurServices from '@/components/LandingPage/OurServices'
import OurTeam from '@/components/LandingPage/OurTeam'
import WideLayout from '@/layouts/wideLayout'
import React from 'react'

function LandingPage() {
  return (
    <div>
      <WideLayout>
        <Heading />
        <Content />
        <OurTeam />
        <OurServices />
        <OurClient />
      </WideLayout>
    </div>
  )
}

export default LandingPage
