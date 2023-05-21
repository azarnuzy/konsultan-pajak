import React, { createContext, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

const AdminVerificationContext = createContext({})

function AdminVerificationProvider({ children }) {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(10)

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    return (
      item.namaWP.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jasaKonsultasi.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // Get current page of data
  const indexOfLastItem = currentPage * perPage
  const indexOfFirstItem = indexOfLastItem - perPage
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  // Handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1) // Reset current page when search term changes
  }

  // Handle pagination change
  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <AdminVerificationContext.Provider
      value={{
        data,
        setData,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        perPage,
        filteredData,
        indexOfLastItem,
        indexOfFirstItem,
        currentData,
        handleSearchTermChange,
        handlePaginationChange,
      }}
    >
      {children}
    </AdminVerificationContext.Provider>
  )
}

export default AdminVerificationProvider

export const useAdminVerificationContext = () =>
  useContext(AdminVerificationContext)
