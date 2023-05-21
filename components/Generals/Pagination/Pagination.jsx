import { useAdminVerificationContext } from '@/context/auth-consultant-request'

const Pagination = () => {
  const { currentPage, perPage, filteredData, handlePaginationChange } =
    useAdminVerificationContext()
  const totalPages = Math.ceil(filteredData.length / perPage)
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className='my-4'>
      <ul className='flex'>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`mr-2 cursor-pointer ${
              pageNumber === currentPage ? 'font-bold' : ''
            }`}
            onClick={() => handlePaginationChange(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
