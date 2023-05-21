import { useAuth } from '@/context/auth-context'
import MainLayout from '@/layouts/mainLayout'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const { login, previousPath, setPreviousPath } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (value) => {
    if (!value) {
      return 'Email Harus Diisi'
    }
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    // console.log(!emailRegex.test(value))
    if (!emailRegex.test(value)) {
      return 'Format Email Salah'
    }
    return true
  }

  const validatePassword = (value) => {
    if (!value) {
      return 'Password Harus Diisi'
    }
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d.*\d)[A-Za-z\d]{8,}$/
    if (!passwordRegex.test(value)) {
      return 'Password harus mengandung 8 karakter, 1 kapital, dan 2 nomor'
    }
    return true
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    const response = await login(data)
    console.log(response)
    setIsLoading(false)
    if (response) {
      if (!response?.status) {
        if (response?.message?.includes('Email')) {
          setError('email', {
            type: 'manual',
            message: 'Email Salah',
          })
        } else {
          setError('password', {
            type: 'manual',
            message: 'Password Salah',
          })
        }
      }
      // console.log(response)

      if (previousPath !== '/') {
        router.push(`${previousPath}`)
      } else {
        if (
          response?.data?.role === 'Admin' ||
          response?.data?.role === 'Teachers'
        ) {
          router.push('/admin')
        }
        if (response?.data?.role === 'Users') {
          router.push('/')
        }
      }
      setPreviousPath('/')
    }
  }

  return (
    <MainLayout>
      <div className='justify-center sm:justify-normal flex gap-16 h-[calc(100vh-289px)] sm:h-[calc(100vh-361px)] items-center'>
        <div className='justify-center w-1/2 hidden sm:flex'>
          <div className='sm:w-[400px] object-cover flex items-center justify-center'>
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
                Doesn't have an account?{' '}
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
    </MainLayout>
  )
}

export default Login
