// import Pagination from '@/components/Admin/ConsultantRequest/Pagination/Pagination'
// import SearchBar from '@/components/Admin/ConsultantRequest/SearchBar/Search'
// import Table from '@/components/Admin/ConsultantRequest/Table/Table'
import AdminVerificationProvider from '@/context/consultant-request-context'
import AdminLayout from '@/layouts/adminLayout'
import React from 'react'
import SearchBar from './SearchBar/Search'
import Table from './Table/Table'
import Pagination from './Pagination/Pagination'

function ConsultantRequest() {
  return (
    <AdminLayout>
      <AdminVerificationProvider>
        {' '}
        <div className='max-h-[calc(100vh-70px)] mx-auto'>
          <h1 className='admin-title'>Consultantation Request</h1>
          <SearchBar />
          <Table />
          <Pagination />
        </div>
      </AdminVerificationProvider>
    </AdminLayout>
  )
}

export default ConsultantRequest
