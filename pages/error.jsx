import MainLayout from '@/layouts/mainLayout'
import { useRouter } from 'next/router'
import { FaExclamation, FaExclamationCircle } from 'react-icons/fa'

function Error({ statusCode }) {
  const router = useRouter()
  // console.log(router)
  const errorMessages = () => {
    if (router.asPath.includes('401')) {
      return '401 - Unauthorized'
    } else if (router.asPath.includes('400')) {
      return '400 - Bad Request'
    } else if (router.asPath.includes('500')) {
      return '500 - Internal Server Error'
    } else {
      return '404 - Page Not Found'
    }
  }

  return (
    <MainLayout>
      <div className='flex items-center justify-center text-2xl text-light-dark gap-3 font-bold h-[calc(100vh-363px)]'>
        <FaExclamationCircle /> {errorMessages()}
      </div>
    </MainLayout>
  )
}

export default Error
