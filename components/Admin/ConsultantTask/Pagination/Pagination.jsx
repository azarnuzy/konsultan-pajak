import { useAdminVerificationContext } from '@/context/consultant-request-context'
import { useState } from 'react'

const Pagination = ({ onPageChange }) => {
  const { taskData, getPaginationSchedules, setTaskData } =
    useAdminVerificationContext()

  const [inputPage, setInputPage] = useState(
    taskData?.pagination?.currentPage || 1
  )

  const handlePageChange = (page) => {
    setInputPage(page)
    setTaskData({
      ...data,
      pagination: {
        ...data.pagination,
        currentPage: page,
      },
    })
    getPaginationSchedules(page, 10, 'consultations')
  }

  const handleInputChange = (e) => {
    setInputPage(e.target.value)
    setTaskData({
      ...data,
      pagination: {
        ...data.pagination,
        currentPage: e.target.value,
      },
    })
    getPaginationSchedules(e.target.value, 10, 'consultations')
  }

  const handleInputBlur = () => {
    if (inputPage < 1) {
      setInputPage(1)
    } else if (inputPage > taskData?.pagination?.totalPages) {
      setInputPage(taskData?.pagination?.totalPages)
    }
  }

  return (
    <div className='flex items-center justify-center mt-4'>
      <button
        onClick={() => handlePageChange(taskData?.pagination?.prev)}
        disabled={taskData?.pagination?.currentPage === 1}
        className='px-2 py-1 mr-2 text-sm font-medium text-gray-500 bg-white rounded hover:bg-gray-100'
      >
        Prev
      </button>
      <input
        type='number'
        value={inputPage}
        min={1}
        max={taskData?.pagination?.totalPages}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className='w-12 px-2 py-1 mr-2 text-sm text-center text-gray-700 bg-white border border-gray-300 rounded'
      />
      <span className='text-sm text-gray-600'>
        / {taskData?.pagination?.totalPages} pages
      </span>
      <button
        onClick={() => handlePageChange(taskData?.pagination?.next)}
        disabled={
          taskData?.pagination?.currentPage === taskData?.pagination?.totalPages
        }
        className='px-2 py-1 ml-2 text-sm font-medium text-gray-500 bg-white rounded hover:bg-gray-100'
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
