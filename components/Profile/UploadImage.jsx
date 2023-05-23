import { useAuth } from '@/context/auth-context'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import LoadingSpinner from '../Loading/LoadingSpinner'
import Notification from '../Loading/Notification'

function UploadImage() {
  // let src = URL.createObjectURL(ProfileImage)
  const {
    user,
    setUser,
    showUpload,
    setShowUpload,
    handleNotification,
    profileImage,
    token,
  } = useAuth()
  const [src, setSrc] = useState()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log(user)
    if (profileImage) {
      setSrc(URL.createObjectURL(profileImage))
    }
  }, [profileImage])

  const [message, setMessage] = useState()
  const [status, setStatus] = useState()

  const postImage = async (data) => {
    setIsLoading(true)
    const formData = new FormData()
    if (data) {
      formData.append('image', data)
    }
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/images/`, formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const { data } = response.data
        setUser({
          ...user,
          user: {
            ...user.user,
            image: {
              ...user.user.image,
              file_name: data.file_name,
              imagekit_url: data.imagekit_url,
            },
          },
        })
        // console.log(user)
        // console.log(response)
        setStatus(response.status)
        setMessage(response.data.message)
        handleNotification()
      })

    setIsLoading(false)
  }

  const uploadImage = async (data) => {
    setIsLoading(true)
    const formData = new FormData()
    if (data) {
      formData.append('image', data)
    }
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/images/${user?.user_id}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        const { data } = response.data
        setUser({
          ...user,
          user: {
            ...user.user,
            image: {
              ...user.user.image,
              file_name: data.file_name,
              imagekit_url: data.imagekit_url,
            },
          },
        })
        // console.log(user)
        // console.log(response)
        setStatus(response.status)
        setMessage(response.data.message)
        handleNotification()
      })
      .catch((error) => {
        // setStatus(error.response.status)
        // setMessage(error.response.data.message)
        // handleNotification()
        // console.log(data)
        postImage(data)
        console.log(error)
      })

    setShowUpload(false)
    setIsLoading(false)
  }
  return (
    <>
      <Notification
        message={message}
        status={status}
      />
      <LoadingSpinner
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      {showUpload && (
        <div className='fixed inset-0 z-30 overflow-y-auto'>
          <div className='flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 transition-opacity'>
              <div
                className='absolute inset-0 bg-gray-500 opacity-50'
                // onClick={() => onFinishUpload()}
              ></div>
            </div>
            <span
              className='hidden sm:inline-block sm:h-screen sm:align-middle'
              aria-hidden='true'
            ></span>
            <div
              className='inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle'
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-headline'
            >
              <div className=' rounded bg-white shadow-lg'>
                <div className=' mb-3 flex w-full items-center justify-between bg-darkBlue py-2 px-3 text-lg font-bold text-white'>
                  <h3>Upload Image</h3>
                  <MdClose
                    className='cursor-pointer text-2xl font-bold text-white'
                    onClick={() => setShowUpload(false)}
                  />
                </div>
                <div className=' flex max-h-[500px] w-full flex-col items-center gap-3 py-3 px-4'>
                  <Image
                    alt={profileImage?.name}
                    src={src}
                    width={60}
                    height={60}
                    className='h-60 w-full object-contain'
                  />
                  <button
                    className='mx-auto flex w-fit justify-center rounded-lg bg-darkBlue px-3 py-2 text-lg font-semibold text-white'
                    onClick={() => {
                      console.log(profileImage)
                      uploadImage(profileImage)
                    }}
                  >
                    Upload Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UploadImage
