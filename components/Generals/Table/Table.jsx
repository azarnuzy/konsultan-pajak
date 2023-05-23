import { useAdminVerificationContext } from '@/context/consultant-request-context'

const Table = () => {
  const { currentData } = useAdminVerificationContext()
  return (
    <table className='table-fixed w-full bg-white border container-table border-gray-200'>
      <thead>
        <tr>
          <th className='w-1/12 py-2 px-2 md:px-4 border-b'>No.</th>
          <th className='w-2/12 py-2 px-2 md:px-4 border-b'>Nama WP</th>
          <th className='w-2/12 py-2 px-2 md:px-4 border-b'>Jasa Konsultasi</th>
          <th className='w-1/12 py-2 px-2 md:px-4 border-b'>Tanggal</th>
          <th className='w-1/12 py-2 px-2 md:px-4 border-b'>Waktu</th>
          <th className='w-2/12 py-2 px-2 md:px-4 border-b'>
            Tempat Konsultasi
          </th>
          <th className='w-2/12 py-2 px-2 md:px-4 border-b'>
            Alamat Konsultasi
          </th>
          <th className='w-1/12 py-2 px-2 md:px-4 border-b'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* {currentData.map((item, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? 'bg-gray-50' : ''}
          >
            <td className='py-2 px-2 md:px-4 border-b'>{index + 1}</td>
            <td className='py-2 px-2 md:px-4 border-b'>{item.namaWP}</td>
            <td className='py-2 px-2 md:px-4 border-b'>
              {item.jasaKonsultasi}
            </td>
            <td className='py-2 px-2 md:px-4 border-b'>{item.tanggal}</td>
            <td className='py-2 px-2 md:px-4 border-b'>{item.waktu}</td>
            <td className='py-2 px-2 md:px-4 border-b'>
              {item.tempatKonsultasi}
            </td>
            <td className='py-2 px-2 md:px-4 border-b'>
              {item.alamatKonsultasi}
            </td>
            <td className='py-2 px-2 md:px-4 border-b'>
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
        ))} */}
      </tbody>
    </table>
  )
}

export default Table
