// import Sidebar from '@/components/Sidebar'
import Sidebar from '@/components/Sidebar/Sidebar'
import React, { useEffect, useState } from 'react'

function AdminLayout() {
  return (
    <div className='flex w-full'>
      <Sidebar />
    </div>
  )
}

export default AdminLayout
