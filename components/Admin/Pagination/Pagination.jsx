import { useState } from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [inputPage, setInputPage] = useState(currentPage)

  const handlePageChange = (page) => {
    setInputPage(page)
    onPageChange(page)
  }

  const handleInputChange = (e) => {
    setInputPage(e.target.value)
  }

  const handleInputBlur = () => {
    if (inputPage < 1) {
      setInputPage(1)
    } else if (inputPage > totalPages) {
      setInputPage(totalPages)
    }
  }

  return (
    <div className='flex items-center justify-center mt-4'>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-2 py-1 mr-2 text-sm font-medium text-gray-500 bg-white rounded hover:bg-gray-100'
      >
        Prev
      </button>
      <input
        type='number'
        value={inputPage}
        min={1}
        max={totalPages}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className='w-12 px-2 py-1 mr-2 text-sm text-center text-gray-700 bg-white border border-gray-300 rounded'
      />
      <span className='text-sm text-gray-600'>/ {totalPages} pages</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-2 py-1 ml-2 text-sm font-medium text-gray-500 bg-white rounded hover:bg-gray-100'
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
