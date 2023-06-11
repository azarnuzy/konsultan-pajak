import LoadingSpinner from '@/components/Loading/LoadingSpinner'
import Notification from '@/components/Loading/Notification'
import { useAuth } from '@/context/auth-context'
import { useAdminVerificationContext } from '@/context/consultant-request-context'
import { convertDate, convertToRupiah } from '@/helpers/generalFunction'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useState } from 'react'
import { FaCross, FaInfoCircle, FaPlay, FaStopCircle } from 'react-icons/fa'
import { MdClose, MdStart } from 'react-icons/md'

const Table = () => {
  const { taskData, getPaginationData, setUpdate, update } = useAdminVerificationContext()
  const { token, handleNotification } = useAuth()
  // console.log(userData)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState()
  const [status, setStatus] = useState()
  // const whoami = JSON.parse(Cookies.get('whoami'));

  //   console.log(data)
  const handleAccept = async (id) => {
    setIsLoading(true)
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/consultations/${id}/start`,
        {
          //   admin_id: userData.data.admin.id,
          //   cost: 1000000,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        // console.log(response)
        setStatus(response.status)
        setMessage(response.data.message)
        handleNotification()
        getPaginationData(
          taskData?.pagination?.currentPage,
          10,
          'consultations'
        )
      })
      .catch((error) => {
        console.log(error)
      })
    setIsLoading(false)
  }
  const handleDelete = async (id) => {
    setIsLoading(true)
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/consultations/${id}/end`, '',
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
        getPaginationData(taskData?.pagination?.currentPage, 10, 'consultations')
        setUpdate(!update)
        // setData(updatedData)
      })
      .catch((error) => {
        console.log(error)
      })
    setIsLoading(false)
  }

  return (
    <div className='max-h-[calc(80vh-100px)] overflow-auto container-table'>
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
            <th className=' py-2 px-2 md:px-4 border-b'>Tanggal Mulai</th>
            <th className=' py-2 px-2 md:px-4 border-b'>Tanggal Selesai</th>
            <th className=' py-2 px-2 md:px-4 border-b'>Status</th>
            <th className=' py-2 px-2 md:px-4 border-b'>Cost</th>
            <th className=' py-2 px-2 md:px-4 border-b'>Actions</th>
          </tr>
        </thead>
        <tbody className=''>
          {taskData?.data?.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-50' : ''}
            >
              <td className='py-2 px-2 md:px-4 border-b'>{index + 1}</td>
              <td className='py-2 px-2 md:px-4 border-b'>
                {item.schedule.customer.name}
              </td>
              <td className='py-2 px-2 md:px-4 border-b'>
                {convertDate(item?.date_start) || '-'}
              </td>
              <td className='py-2 px-2 md:px-4 border-b'>
                {convertDate(item?.date_end) || '-'}
              </td>
              <td className='py-2 px-2 md:px-4 border-b'>{item.status}</td>
              <td className='py-2 px-2 md:px-4 border-b'>
                {convertToRupiah(item.cost) || '-'}
              </td>
              <td className='py-2 px-2 md:px-4 border-b '>
                <div className='flex items-center justify-center gap-2'>
                  {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 md:px-4 rounded mr-2'>
                  Update
                </button> */}
                  <Link
                    href={`/admin/consultant-task/${item?.id}`}
                    className='flex gap-2 items-center font-bold py-1 px-2 md:px-2 rounded bg-blue-500 hover:bg-blue-700 text-white'
                  >
                    <FaInfoCircle />
                    Detail
                  </Link>
                  <button
                    className={`flex items-center gap-2 ${
                      item.status !== 'Not Started'
                        ? 'text-slate-200 bg-green-300'
                        : 'text-white hover:bg-green-700 bg-green-500 '
                    } font-bold py-1 px-2  rounded mr-2`}
                    onClick={() => {
                      handleAccept(item.id)
                    }}
                    disabled={item.status === 'Ongoing'}
                  >
                    <FaPlay />
                    {item.status !== 'Not Started' ? 'Ongoing' : 'Start'}
                    {/* Accept */}
                  </button>
                  <button
                    className={`flex items-center gap-2 font-bold py-1 px-2  rounded ${
                      item.status !== 'Ongoing'
                        ? 'bg-red-400 text-slate-200'
                        : 'bg-red-500 hover:bg-red-700 text-white '
                    }`}
                    disabled={item.status !== 'Ongoing'}
                    onClick={() => {
                      handleDelete(item.id)
                    }}
                  >
                    <FaStopCircle />
                    End
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
