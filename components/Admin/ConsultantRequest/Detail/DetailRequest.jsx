import InputFile from '@/components/Form/InputFile'
import LoadingSpinner from '@/components/Loading/LoadingSpinner'
import Notification from '@/components/Loading/Notification'
import { useAuth } from '@/context/auth-context'
import AdminVerificationProvider from '@/context/consultant-request-context'
import { convertDate } from '@/helpers/generalFunction'
import AdminLayout from '@/layouts/adminLayout'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FaArrowLeft,
  FaCalendarTimes,
  FaEnvelope,
  FaLocationArrow,
  FaSuitcase,
} from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'

function DetailRequest() {
  const [consultFile, setConsultFile] = useState({
    consultFile: '',
  })

  const [consultDetailData, setConsultDetailData] = useState()
  const [customerData, setCostumerData] = useState()

  const [formData, setFormData] = useState({})

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const { token, handleNotification } = useAuth()
  const router = useRouter()
  const id = router.query.id

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState()
  const [status, setStatus] = useState()

  const handleInputChange = (e) => {
    const { name, files } = e.target
    setFormData({ ...formData, [name]: files })
  }

  useEffect(() => {
    console.log(consultFile)
  }, [consultFile])

  useEffect(() => {
    if (id && token) {
      const getConsultationsDetail = async () => {
        await axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/consultations/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            setConsultDetailData(response.data)
            // console.log(response.data)
          })
          .catch((error) => console.log(error))
      }

      getConsultationsDetail()
    }
  }, [id, token])

  useEffect(() => {
    if (consultDetailData && token) {
      // console.log('print')
      const getCustomerData = async () => {
        await axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}${consultDetailData.data._links.customer.href}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            setCostumerData(response.data)
            // console.log(response.data)
          })
          .catch((error) => console.log(error))
      }

      getCustomerData()
    }
  }, [consultDetailData, token])

  const onSubmit = async () => {
    const formData = new FormData()
    setIsLoading(true)
    formData.append('doc', consultFile.consultFile[0])
    formData.append('consultation_id', consultDetailData?.data.id)
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/documents`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setStatus(response.status)
        setMessage(response.data.message)
        handleNotification()
      })
      .catch((error) => console.log(error))

    setIsLoading(false)
  }
  return (
    <AdminLayout>
      <AdminVerificationProvider>
        <LoadingSpinner
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <Notification
          message={message}
          status={status}
        />
        <div className='max-h-[calc(100vh-100px)] overflow-scroll container-table  mx-auto'>
          <h1 className='admin-title'>Consult Task Details</h1>
          <Link
            href={'/admin/consultant-task'}
            className='flex gap-2 items-center font-bold py-1 px-2 md:px-2 rounded bg-blue-500 hover:bg-blue-700 text-white w-fit mb-3'
          >
            <FaArrowLeft />
            Back
          </Link>
          <div className='flex gap-3 flex-col md:flex-row'>
            <div className='flex flex-col gap-1 min-w-[450px]'>
              <div className='bg-white shadow-sm rounded-sm p-2'>
                <h3 className='font-bold text-xl text-gray-600'>
                  User Details
                </h3>
                <div className='flex gap-4 items-center'>
                  <div className='rounded-full bg-gray-400 min-w-[90px] h-[90px]'>
                    <Image
                      src={
                        customerData?.data.user.image.imagekit_url ||
                        '/images/profileDefault.png'
                      }
                      width={90}
                      height={90}
                      alt={customerData?.data.user.image.file_name}
                      className='rounded-full'
                    />
                  </div>
                  <div className='flex flex-col gap-2 max-w-fit'>
                    <h4 className='text-gray-700 font-semibold text-lg'>
                      {customerData?.data.name}
                    </h4>
                    <div className='flex gap-2 text-gray-600 items-center'>
                      <FaEnvelope />
                      {customerData?.data.user.email}
                    </div>
                    <div className='flex gap-2 text-gray-600 items-center'>
                      <HiLocationMarker />
                      {customerData?.data.address}
                    </div>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className='bg-white shadow-sm rounded-sm p-2 mt-3'
              >
                <InputFile
                  label='Consult File'
                  placeholder='Choose File'
                  id='consultFile'
                  name='consultFile'
                  kelengkapanData={consultFile}
                  setKelengkapanData={setConsultFile}
                  errors={errors}
                  register={register}
                  errorText={'Consult File is Required'}
                  required={true}
                  handleInputChange={handleInputChange}
                />
                <div className='flex justify-between gap-2 my-2'>
                  <button
                    type='submit'
                    className='bg-light-green hover:bg-green-700 text-white py-1 w-full rounded-sm'
                  >
                    Complete
                  </button>
                  <button
                    type='reset'
                    onClick={() => {
                      setFormData({})
                      setConsultFile({})
                    }}
                    className='bg-red-500 hover:bg-red-700 text-white py-1 w-full rounded-sm'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            <div className='w-full bg-white shadow-sm rounded-md p-2'>
              <h3 className='font-bold text-xl text-gray-600'>
                Request Details
              </h3>
              <div className='border-b-[1px]  border-solid border-gray-500 w-full p-8 flex flex-col sm:flex-row gap-8 justify-between'>
                <div className=' flex flex-col gap-6'>
                  <div className='text-gray-600 border-gray-500 flex gap-3'>
                    <FaSuitcase className='w-6 h-6' />
                    <div className=''>
                      <h3 className='font-semibold text-lg mb-3'>
                        Jasa Konsultasi
                      </h3>
                      <span>{consultDetailData?.data.schedule.type.type}</span>
                    </div>
                  </div>
                  <div className='text-gray-600 border-gray-500 flex gap-3'>
                    <FaCalendarTimes className='w-6 h-6' />
                    <div className=''>
                      <h3 className='font-semibold text-lg mb-3'>
                        Tanggal & Waktu Konsultasi
                      </h3>
                      <span>
                        {consultDetailData &&
                          convertDate(consultDetailData?.data.schedule.date)}
                      </span>
                    </div>
                  </div>
                  <div className='text-gray-600 border-gray-500 flex gap-3'>
                    <HiLocationMarker className='w-6 h-6' />
                    <div className=''>
                      <h3 className='font-semibold text-lg mb-3'>
                        Lokasi dan Alamat Konsultasi
                      </h3>
                      <span>
                        {consultDetailData?.data.schedule.place_type}{' '}
                        {consultDetailData?.data.schedule.place_type ===
                        'Lainnya'
                          ? `| ${consultDetailData?.data.schedule.address}`
                          : ''}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='w-full  sm:w-fit overflow-hidden'>
                  <div className='flex gap-3 text-gray-600'>
                    <HiLocationMarker className='w-6 h-6' />
                    <span className='font-semibold text-lg mb-3'>
                      Link Alamat (Gmaps)
                    </span>
                  </div>
                  <Link
                    href={consultDetailData?.data.schedule.gmap_link || '#'}
                    className='text-ellipsis '
                    target='_blank'
                  >
                    {consultDetailData?.data.schedule.gmap_link || '-'}
                  </Link>
                </div>
              </div>
              <div className='flex justify-end p-8 gap-8'>
                <h4 className='text-lg font-medium'>Total Biaya Konsultasi</h4>
                <span className='text-lg font-medium'>Rp1.000.000</span>
              </div>
            </div>
          </div>
        </div>
      </AdminVerificationProvider>
    </AdminLayout>
  )
}

export default DetailRequest
