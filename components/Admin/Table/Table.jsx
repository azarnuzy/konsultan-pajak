import { useAdminVerificationContext } from '@/context/consultant-request-context'
import { convertDate } from '@/helpers/generalFunction'

const Table = () => {
  const { data } = useAdminVerificationContext()
  // console.log(data)
  return (
    <table className=' bg-white border container-table border-gray-200'>
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
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? 'bg-gray-50' : ''}
          >
            <td className='py-2 px-2 md:px-4 border-b'>{index + 1}</td>
            <td className='py-2 px-2 md:px-4 border-b'>{item.customer.name}</td>
            <td className='py-2 px-2 md:px-4 border-b'>{item.type.type}</td>
            <td className='py-2 px-2 md:px-4 border-b'>
              {convertDate(item.date)}
            </td>
            <td className='py-2 px-2 md:px-4 border-b'>{item.place_type}</td>
            <td className='py-2 px-2 md:px-4 border-b'>
              {item.address || '-'}
            </td>
            <td className='py-2 px-2 md:px-4 border-b flex gap-2'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 md:px-4 rounded mr-2'>
                Update
              </button>
              <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 md:px-4 rounded mr-2'>
                Accept
              </button>
              <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 md:px-4 rounded'>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
