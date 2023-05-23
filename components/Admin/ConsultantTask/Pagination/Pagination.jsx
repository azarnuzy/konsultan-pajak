import { useAdminVerificationContext } from '@/context/consultant-request-context'
import { useState } from 'react'

const Pagination = ({ onPageChange }) => {
  const { data, getPaginationSchedules, setData } =
    useAdminVerificationContext()

  const [inputPage, setInputPage] = useState(data?.pagination?.currentPage || 1)

  const handlePageChange = (page) => {
    setInputPage(page)
    setData({
      ...data,
      pagination: {
        ...data.pagination,
        currentPage: page,
      },
    })
    getPaginationSchedules(page, 10)
  }

  const handleInputChange = (e) => {
    setInputPage(e.target.value)
    setData({
      ...data,
      pagination: {
        ...data.pagination,
        currentPage: e.target.value,
      },
    })
    getPaginationSchedules(e.target.value, 10)
  }

  const handleInputBlur = () => {
    if (inputPage < 1) {
      setInputPage(1)
    } else if (inputPage > data?.pagination?.totalPages) {
      setInputPage(data?.pagination?.totalPages)
    }
  }

  return (
    <div className='flex items-center justify-center mt-4'>
      <button
        onClick={() => handlePageChange(data?.pagination?.prev)}
        disabled={data?.pagination?.currentPage === 1}
        className='px-2 py-1 mr-2 text-sm font-medium text-gray-500 bg-white rounded hover:bg-gray-100'
      >
        Prev
      </button>
      <input
        type='number'
        value={inputPage}
        min={1}
        max={data?.pagination?.totalPages}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className='w-12 px-2 py-1 mr-2 text-sm text-center text-gray-700 bg-white border border-gray-300 rounded'
      />
      <span className='text-sm text-gray-600'>
        / {data?.pagination?.totalPages} pages
      </span>
      <button
        onClick={() => handlePageChange(data?.pagination?.next)}
        disabled={
          data?.pagination?.currentPage === data?.pagination?.totalPages
        }
        className='px-2 py-1 ml-2 text-sm font-medium text-gray-500 bg-white rounded hover:bg-gray-100'
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
