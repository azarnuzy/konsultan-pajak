import Pagination from '@/components/Generals/Pagination/Pagination'
import SearchBar from '@/components/Generals/SearchBar/Search'
import Table from '@/components/Generals/Table/Table'
import AdminVerificationProvider from '@/context/auth-consultant-request'
import AdminLayout from '@/layouts/adminLayout'
import React from 'react'

function VerificationPage() {
  return (
    <AdminLayout>
      <AdminVerificationProvider>
        {' '}
        <div className='container mx-auto'>
          <h1 className='admin-title'>Company Details</h1>
          <SearchBar />
          <Table />
          <Pagination />
        </div>
      </AdminVerificationProvider>
    </AdminLayout>
  )
}

export default VerificationPage
