import LoadingSpinner from '@/components/Loading/LoadingSpinner'
import Notification from '@/components/Loading/Notification'
import { useAuth } from '@/context/auth-context'
import { useAdminVerificationContext } from '@/context/consultant-request-context'
import { convertDate } from '@/helpers/generalFunction'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaCheckCircle, FaInfoCircle, FaTrash } from 'react-icons/fa'

const Table = () => {
  const { data, setData, fetchData, getPaginationData } =
    useAdminVerificationContext()
  const { token, userData, handleNotification } = useAuth()
  // console.log(userData)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState()
  const [status, setStatus] = useState()
  // const whoami = JSON.parse(Cookies.get('whoami'));

  useEffect(() => {
    console.log(data)
  }, [])
  // console.log(data)
  const handleAccept = async (id) => {
    setIsLoading(true)
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules/${id}/accept`,
        {
          admin_id: userData.data.admin.id,
          cost: 1000000,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        setStatus(response.status)
        setMessage(response.data.message)
        handleNotification()
        getPaginationData(data?.pagination?.currentPage, 10, 'schedules')
      })
      .catch((error) => {
        console.log(error)
      })
    setIsLoading(false)
  }
  const handleDelete = async (id) => {
    setIsLoading(true)
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setStatus(response.status)
        setMessage(response.data.message)
        handleNotification()
        getPaginationData(data?.pagination?.currentPage, 10, 'schedules')
        // setData(updatedData)
      })
      .catch((error) => {
        console.log(error)
      })
    setIsLoading(false)
  }

  // console.log(data)
  return (
    <div className='max-h-[calc(80vh-120px)] overflow-auto container-table'>
      <Notification
        message={message}
        status={status}
      />
      <LoadingSpinner
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <table className=' bg-white border  border-gray-200  '>
        <thead>
          <tr>
            <th className=' py-2 px-2 md:px-4 border-b'>No.</th>
            <th className=' py-2 px-2 md:px-4 border-b'>Nama WP</th>
            <th className=' py-2 px-2 md:px-4 border-b'>Jasa Konsultasi</th>
            <th className=' py-2 px-2 md:px-4 border-b'>Tanggal/Waktu</th>
            <th className=' py-2 px-2 md:px-4 border-b'>Tempat Konsultasi</th>
            <th className=' py-2 px-2 md:px-4 border-b'>Alamat Konsultasi</th>
            <th className=' py-2 px-2 md:px-4 border-b'>Actions</th>
          </tr>
        </thead>
        <tbody className=''>
          {data?.data?.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-50' : ''}
            >
              <td className='py-2 px-2 md:px-4 border-b'>{index + 1}</td>
              <td className='py-2 px-2 md:px-4 border-b'>
                {item?.customer?.name}
              </td>
              <td className='py-2 px-2 md:px-4 border-b'>{item?.type?.type}</td>
              <td className='py-2 px-2 md:px-4 border-b'>
                {convertDate(item?.date)}
              </td>
              <td className='py-2 px-2 md:px-4 border-b'>{item?.place_type}</td>
              <td className='py-2 px-2 md:px-4 border-b'>
                {item?.address || '-'}
              </td>
              <td className='py-2 px-2 md:px-4 border-b '>
                <div className=' flex flex-wrap items-center justify-center gap-2'>
                  {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 md:px-4 rounded mr-2'>
                  Update
                </button> */}
                  <button
                    className={`flex gap-2 items-center ${
                      item?.status === 'Accepted'
                        ? 'text-slate-200 bg-green-300'
                        : 'text-white hover:bg-green-700 bg-green-500 '
                    } font-bold py-1 px-2 md:px-2 rounded `}
                    onClick={() => {
                      handleAccept(item?.id)
                    }}
                    disabled={item?.status === 'Accepted'}
                  >
                    <FaCheckCircle />
                    {item?.status === 'Accepted' ? 'Accepted' : 'Accept'}
                    {/* Accept */}
                  </button>
                  <button
                    className={`flex gap-2 items-center font-bold py-1 px-2 md:px-2 rounded   ${
                      item?.status === 'Accepted'
                        ? 'text-slate-200 bg-red-300'
                        : 'bg-red-500 hover:bg-red-700 text-white '
                    }`}
                    disabled={item?.status === 'Accepted'}
                    onClick={() => {
                      handleDelete(item?.id)
                    }}
                  >
                    <FaTrash />
                    {item?.status === 'Declined' ? 'Declined' : 'Decline'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
