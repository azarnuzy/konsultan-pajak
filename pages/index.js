import { Inter } from '@next/font/google'
import HeadComponent from '@/components/Head/HeadComponents'
import LandingPage from './LandingPage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <HeadComponent />
      <LandingPage />
    </>
  )
}
