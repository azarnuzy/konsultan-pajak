import { useAdminVerificationContext } from '@/context/consultant-request-context'

const SearchBar = () => {
  const { searchTerm, handleSearchTermChange } = useAdminVerificationContext()
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
