import MainLayout from '@/layouts/mainLayout'
import { useRouter } from 'next/router'
import { FaExclamation, FaExclamationCircle } from 'react-icons/fa'

function Unauthorized({ statusCode }) {
  return (
    <MainLayout>
      <div className='flex items-center justify-center text-2xl text-light-dark gap-3 font-bold h-[calc(100vh-363px)]'>
        <FaExclamationCircle /> 401 - Unauthorized
      </div>
    </MainLayout>
  )
}

export default Unauthorized
