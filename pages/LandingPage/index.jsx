import Content from '@/components/LandingPage/Content'
import Heading from '@/components/LandingPage/Heading'
import OurTeam from '@/components/LandingPage/OurTeam'
import MainLayout from '@/layouts/mainLayout'
import WideLayout from '@/layouts/wideLayout'
import React from 'react'

function LandingPage() {
  return (
    <div>
      <WideLayout>
        <Heading />
        <Content />
        <OurTeam />
      </WideLayout>
    </div>
  )
}

export default LandingPage
