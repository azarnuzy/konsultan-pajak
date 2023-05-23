import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from './auth-context'

const AdminVerificationContext = createContext({})

function AdminVerificationProvider({ children }) {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(10)

  const { token } = useAuth()

  // Fetch data from API
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          // console.log(response)
          setData(response.data.data)
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    }
  }, [token])

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    return []
    // return (
    //   item.namaWP.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.jasaKonsultasi.toLowerCase().includes(searchTerm.toLowerCase())
    // )
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
