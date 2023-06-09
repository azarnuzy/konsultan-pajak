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
  FaTrash,
} from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'

function DetailRequest() {
  const [userFile, setUserFile] = useState({
    userFile: '',
  })

  const [userDetailData, setUserDetailData] = useState()
  const [consultData, setConsultData] = useState()

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
    console.log(userFile)
  }, [userFile])

  useEffect(() => {
    if (id && token) {
      const getUsersDetail = async () => {
        await axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customers/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            setUserDetailData(response.data)
            // console.log(response.data)
          })
          .catch((error) => console.log(error))
      }

      getUsersDetail()
    }
  }, [id, token])

  useEffect(() => {
    if (userDetailData && token) {
      // console.log('print')
      const getConsultData = async () => {
        await axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}${userDetailData.data._links['consult-request'].href}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            setConsultData(response.data)
            // console.log(response.data)
          })
          .catch((error) => console.log(error))
      }

      getConsultData()
    }
  }, [userDetailData, token])

  const onSubmit = async () => {
    const formData = new FormData()
    setIsLoading(true)
    formData.append('doc', userFile.userFile[0])
    formData.append('useration_id', userDetailData?.data.id)
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
      .catch((error) => {
        setStatus(error.response.status)
        setMessage(error.message)
        handleNotification()
        console.log(error)
      })

    setIsLoading(false)
  }

  const handleDelete = async (id) => {
    setIsLoading(true)
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/customers/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setStatus(response.status)
        setMessage(response.data.message)
        handleNotification()
        // getPaginationData(data?.pagination?.currentPage, 10, 'customers')
        // setData(updatedData)
        router.back()
      })
      .catch((error) => {
        console.log(error)
      })
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
          <h1 className='admin-title'>User Details</h1>
          <div className='flex flex-row justify-between'>
            <Link
              href={'/admin/users'}
              className='flex gap-2 items-center font-bold py-1 px-2 md:px-2 rounded bg-blue-500 hover:bg-blue-700 text-white w-fit mb-3'
            >
              <FaArrowLeft />
              Back
            </Link>
            <div className='flex flex-row gap-3 item-stretch'>
              <Link
                href={`/admin/users/${userDetailData?.data?.id}/edit`}
                className='flex gap-2 items-center font-bold py-1 px-2 md:px-2 rounded bg-yellow-400 hover:bg-orange-700 text-white w-fit mb-3'
              >
                Edit
              </Link>
              <button
                className={`flex gap-2 items-center font-bold py-1 px-2 md:px-2 rounded bg-red-500 hover:bg-red-700 text-white w-fit mb-3`}
                onClick={() => {
                  handleDelete(userDetailData?.data?.id)
                }}
              >
                Delete
              </button>
            </div>
          </div>
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
                        userDetailData?.data.user.image.imagekit_url ||
                        '/images/profileDefault.png'
                      }
                      width={90}
                      height={90}
                      alt={userDetailData?.data.user.image.file_name}
                      className='rounded-full'
                    />
                  </div>
                  <div className='flex flex-col gap-2 max-w-fit'>
                    <h4 className='text-gray-700 font-semibold text-lg'>
                      {userDetailData?.data.name}
                    </h4>
                    <div className='flex gap-2 text-gray-600 items-center'>
                      <FaEnvelope />
                      {userDetailData?.data.user.email}
                    </div>
                    <div className='flex gap-2 text-gray-600 items-center'>
                      <HiLocationMarker />
                      {userDetailData?.data.address}
                    </div>
                  </div>
                </div>
                <h3 className='font-bold text-xl text-gray-600 mt-5'>
                  Detail Info
                </h3>
                <table className="table">
                  <tr>
                    <td className="table-cell text-gray-500 font-medium">Nama Pimpinan</td>
                    <td className="table-cell text-gray-500 font-base">{userDetailData?.data.leader_name}</td>
                  </tr>
                  <tr>
                    <td className="table-cell text-gray-500 font-medium">Jabatan Pimpinan</td>
                    <td className="table-cell text-gray-500 font-base">{userDetailData?.data.leader_title}</td>
                  </tr>
                  <tr>
                    <td className="table-cell text-gray-500 font-medium">PKP</td>
                    <td className="table-cell text-gray-500 font-base">{userDetailData?.data.pkp}</td>
                  </tr>
                  <tr>
                    <td className="table-cell text-gray-500 font-medium">Jenis Usaha</td>
                    <td className="table-cell text-gray-500 font-base">{userDetailData?.data.business_type}</td>
                  </tr>
                  <tr>
                    <td className="table-cell text-gray-500 font-medium">Nama Akunting</td>
                    <td className="table-cell text-gray-500 font-base">{userDetailData?.data.acc_name}</td>
                  </tr>
                  <tr>
                    <td className="table-cell text-gray-500 font-medium">Kontak Akunting</td>
                    <td className="table-cell text-gray-500 font-base">{userDetailData?.data.acc_telp}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className='w-full bg-white shadow-sm rounded-md p-2'>
              <h3 className='font-bold text-xl text-gray-600'>
                Consult History
              </h3>
              <table className=' bg-white border  border-gray-200  '>
                <thead>
                  <tr>
                    <th className=' py-2 px-2 md:px-4 border-b'>No.</th>
                    <th className=' py-2 px-2 md:px-4 border-b'>Jasa</th>
                    <th className=' py-2 px-2 md:px-4 border-b'>Tanggal/Waktu</th>
                    <th className=' py-2 px-2 md:px-4 border-b'>Lokasi</th>
                    <th className=' py-2 px-2 md:px-4 border-b'>Alamat</th>
                    <th className=' py-2 px-2 md:px-4 border-b'>Link</th>
                    <th className=' py-2 px-2 md:px-4 border-b'>Biaya</th>
                    <th className=' py-2 px-2 md:px-4 border-b'>Status</th>
                  </tr>
                </thead>
                <tbody className=''>
                  {consultData?.data?.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-gray-50' : ''}
                    >
                      <td className='py-2 px-2 md:px-4 border-b'>{index + 1}</td>
                      <td className='py-2 px-2 md:px-4 border-b'>
                        {item?.type?.type}
                      </td>
                      <td className='py-2 px-2 md:px-4 border-b'>
                        {convertDate(item?.date)}
                      </td>
                      <td className='py-2 px-2 md:px-4 border-b'>{item?.place_type}</td>
                      <td className='py-2 px-2 md:px-4 border-b'>
                        {item?.address}
                      </td>
                      <td className='py-2 px-2 md:px-4 border-b'>
                        {item?.gmap_link}
                      </td>
                      <td className='py-2 px-2 md:px-4 border-b'>
                        {item?.consultation?.cost}
                      </td>
                      <td className='py-2 px-2 md:px-4 border-b'>
                        {item?.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminVerificationProvider>
    </AdminLayout>
  )
}

export default DetailRequest
