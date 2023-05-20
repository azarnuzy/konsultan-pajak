import Content from '@/components/LandingPage/Content'
import Heading from '@/components/LandingPage/Heading'
import MainLayout from '@/layouts/mainLayout'
import WideLayout from '@/layouts/wideLayout'
import React from 'react'

function LandingPage() {
  return (
    <div>
      <WideLayout>
        <Heading />
        <Content />
      </WideLayout>
    </div>
  )
}

export default LandingPage
