import Pagination from '@/components/Admin/Pagination/Pagination'
import SearchBar from '@/components/Admin/SearchBar/Search'
import Table from '@/components/Admin/Table/Table'
import AdminVerificationProvider from '@/context/consultant-request-context'
import AdminLayout from '@/layouts/adminLayout'
import React from 'react'

function ConsultantRequest() {
  return (
    <AdminLayout>
      <AdminVerificationProvider>
        {' '}
        <div className='container mx-auto'>
          <h1 className='admin-title'>Consultant Request</h1>
          <SearchBar />
          <Table />
          <Pagination />
        </div>
      </AdminVerificationProvider>
    </AdminLayout>
  )
}

export default ConsultantRequest
