import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { registerAcc } from '@/lib/ApiServices'
import LoadingSpinner from '../Loading/LoadingSpinner'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm()

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)

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
    // console.log(data)
    const { email, password } = data
    setIsLoading(true)
    const response = await registerAcc({ name, email, password })

    if (response.message.includes('exist')) {
      setError('email', {
        type: 'manual',
        message: response.message,
      })
    }
    // console.log(response)
    router.push('/login')

    setIsLoading(false)
  }

  return (
    <>
      <LoadingSpinner
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <div className='justify-center sm:justify-normal flex gap-16 h-[calc(100vh-289px)] sm:h-full p-8 items-center m-3'>
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

        <div className='w-full md:w-2/5 h-full flex justify-center items-center'>
          <form
            className='bg-white shadow-2xl w-[350px] pt-14 p-10 h-fit rounded-3xl flex flex-col justify-center items-center relative'
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className='text-xl font-bold tracking-wide mb-3'>
              Create an Account
            </h3>
            <div className='w-full'>
              <label
                className='form-title'
                htmlFor='name'
              >
                Name
              </label>
              <input
                placeholder='Masukkan Nama'
                type='name'
                className='form-container'
                id='name'
                value={name}
                {...register('name', {
                  onChange: (e) => {
                    setName(e.target.value)
                  },
                  required: true,
                })}
              />
              {errors.name && (
                <span
                  className='text-red-700 text-sm my-1 inline-block'
                  role='alert'
                >
                  Nama Harus Diisi
                </span>
              )}
            </div>
            <div className='w-full'>
              <label
                className='form-title my-3'
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
            <div className='w-full my-3'>
              <label
                className='form-title'
                htmlFor='Password'
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
            <div className='w-full'>
              <label
                className='form-title'
                htmlFor='confirmPassword'
              >
                Confirm Password
              </label>
              <input
                placeholder='Masukkan Confirm Password'
                type='password'
                className='form-container'
                id='confirmPassword'
                value={confirmPassword}
                {...register('confirmPassword', {
                  onChange: (e) => {
                    setConfirmPassword(e.target.value)
                  },
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                  required: true,
                })}
              />
              {errors.confirmPassword && (
                <span
                  className='text-red-700 text-sm my-1 inline-block'
                  role='alert'
                >
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className='w-full flex justify-center items-center flex-col'>
              <button
                type='submit'
                className='w-full flex justify-center py-2 mt-2 text-sm rounded-md
            text-white bg-[#381DDB] hover:bg-[#281496] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Daftar
              </button>
              <p className='text-sm mt-5 text-slate-600'>
                Sudah memiliki akun?{' '}
                <Link
                  href='/login'
                  className='text-sm text-red-500'
                >
                  Masuk disini!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
