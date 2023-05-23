import AdminVerificationProvider from '@/context/consultant-request-context'
import AdminLayout from '@/layouts/adminLayout'
import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import Table from './Table/Table'
import Pagination from './Pagination/Pagination'

function ConsultanTask() {
  return (
    <AdminLayout>
      <AdminVerificationProvider>
        {' '}
        <div className='max-h-[calc(100vh-70px)] mx-auto'>
          <h1 className='admin-title'>Consultant Request</h1>
          <SearchBar />
          <Table />
          <Pagination />
        </div>
      </AdminVerificationProvider>
    </AdminLayout>
  )
}

export default ConsultanTask
