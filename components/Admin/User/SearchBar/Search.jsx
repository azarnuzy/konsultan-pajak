import { useAdminVerificationContext } from '@/context/consultant-request-context'
import { useState } from 'react'

const SearchBar = () => {
  // const { searchTerm, handleSearchTermChange } = useAdminVerificationContext()
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
    // setCurrentPage(1) // Reset current page when search term changes
  }
  return (
    <div className='my-4'>
      <input
        type='text'
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder='Search...'
        className='border border-gray-300 rounded py-2 px-4 w-64'
      />
    </div>
  )
}

export default SearchBar
