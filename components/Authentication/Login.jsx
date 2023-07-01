import { useAuth } from '@/context/auth-context'
import MainLayout from '@/layouts/mainLayout'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import LoadingSpinner from '../Loading/LoadingSpinner'
import Notification from '../Loading/Notification'

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const { login, previousPath, setPreviousPath, handleNotification } = useAuth()

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState()
  const [status, setStatus] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    // Initial height
    setWindowHeight(window.innerHeight)

    // Event listener for window resize
    window.addEventListener('resize', handleResize)

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const validateEmail = (value) => {
    if (!value) {
      return 'Email is required'
    }
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    // console.log(!emailRegex.test(value))
    if (!emailRegex.test(value)) {
      return 'Invalid email format'
    }
    return true
  }

  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required'
    }
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!passwordRegex.test(value)) {
      return 'Password must be at least 8 characters long, containing at least one letter and one number'
    }
    return true
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    const response = await login(data)

    setIsLoading(false)

    if (response?.data) {
      if (response?.data.status) {
        if (response?.data.message?.includes('User')) {
          setError('email', {
            type: 'manual',
            message: response?.data.message,
          })
        } else if (response?.data.message?.includes('password')) {
          setError('password', {
            type: 'manual',
            message: response?.data.message,
          })
        } else {
          setMessage(response?.data.message)
          setStatus(response?.data.status)
          handleNotification()
        }
      }

      console.log(response?.data)
      if (response?.data.role_id === 3) {
        router.push('/')
      } else if (response?.data.role_id === 1 || response?.data.role_id === 2) {
        router.push('/admin')
      }
      setPreviousPath('/')
    } else {
      // console.log(response)
    }
  }

  // console.log(errors)
  return (
    <MainLayout>
      <Notification
        message={message}
        status={status}
      />
      <div
        className={`justify-center  md:justify-normal flex sm:gap-4 lg:gap-16 ${
          windowHeight > 800
            ? 'h-[calc(100vh-288px)] sm:h-[calc(100vh-475px)]'
            : 'h-full'
        }  2xl:h-[calc(100vh-361px)] items-center`}
      >
        <div className='justify-center sm:w-fit lg:w-1/2 hidden md:flex  md:justify-center'>
          <div className='sm:w-[350px] object-cover flex items-center justify-center'>
            <Image
              src={'/images/sideImg2.png'}
              alt='Logo Images'
              width={588}
              height={692}
            />
          </div>
        </div>
        <div className='p-8'>
          <form
            className='relative bg-white shadow-2xl w-[350px] p-10 min-h-fit rounded-3xl flex flex-col justify-center items-center '
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className='text-xl font-bold tracking-wide mb-5'>
              Welcome Back
            </h3>
            <div className='w-full flex flex-col'>
              <label
                className='form-title'
                htmlFor='email'
              >
                Email
              </label>
              <input
                placeholder='Masukkan Email'
                type='email'
                className='form-container'
                id='email'
                value={email}
                {...register('email', {
                  onChange: (e) => {
                    setEmail(e.target.value)
                  },
                  validate: validateEmail,
                })}
              />
              {errors.email && (
                <span
                  className='text-red-700 text-sm my-1 inline-block'
                  role='alert'
                >
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='w-full flex flex-col my-3'>
              <label
                className='form-title'
                htmlFor='password'
              >
                Password
              </label>
              <input
                placeholder='Masukkan Password'
                type='password'
                className='form-container'
                id='password'
                value={password}
                {...register('password', {
                  onChange: (e) => {
                    setPassword(e.target.value)
                  },
                  validate: validatePassword,
                })}
              />
              {errors.password && (
                <span
                  className='text-red-700 text-sm my-1 inline-block'
                  role='alert'
                >
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className='w-full flex justify-center items-center flex-col'>
              <button
                className='w-full flex justify-center py-2 mt-2 text-sm rounded-md
            text-white bg-[#381DDB] hover:bg-[#281496] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                type='submit'
              >
                Login
              </button>
              <p className='text-sm mt-5 text-slate-600'>
                Doesn&apos;t have an account?{' '}
                <Link
                  href='/register'
                  className='text-sm text-red-500'
                >
                  Register here!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <LoadingSpinner
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    </MainLayout>
  )
}

export default Login
