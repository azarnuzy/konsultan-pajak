import AdminVerificationProvider from '@/context/consultant-request-context'
import AdminLayout from '@/layouts/adminLayout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

export default function EditUser() {
    const router = useRouter()
    const id = router.query.id
    return (
        <AdminLayout>
            <AdminVerificationProvider>
                <div className='max-h-[calc(100vh-100px)] overflow-scroll container-table mx-auto'>
                    <h1 className='admin-title'>Edit User Details</h1>
                    <Link
                        href={`/admin/users/${id}`}
                        className='flex gap-2 items-center font-bold py-1 px-2 md:px-2 rounded bg-blue-500 hover:bg-blue-700 text-white w-fit mb-3'
                    >
                        <FaArrowLeft />
                        Back
                    </Link>
                </div>
            </AdminVerificationProvider>
        </AdminLayout>
    )
}
