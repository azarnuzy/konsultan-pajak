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
                    <div className='bg-white shadow-sm rounded-sm p-2'>
                        <h3 className='font-bold text-xl text-gray-600'>
                            Edit User
                        </h3>
                        <table className="table gap-3">
                            <tr>
                                <td className="table-cell text-gray-500 font-medium">Nama WP</td>
                                <td className="table-cell text-gray-500 font-base"><input type="text" className='border border-gray-300 rounded-md ml-5 mb-2' /></td>
                            </tr>
                            <tr>
                                <td className="table-cell text-gray-500 font-medium">Email</td>
                                <td className="table-cell text-gray-500 font-base"><input type="text" className='border border-gray-300 rounded-md ml-5 mb-2' /></td>
                            </tr>
                            <tr>
                                <td className="table-cell text-gray-500 font-medium">NPWP</td>
                                <td className="table-cell text-gray-500 font-base"><input type="text" className='border border-gray-300 rounded-md ml-5 mb-2' /></td>
                            </tr>
                            <tr>
                                <td className="table-cell text-gray-500 font-medium">Alamat</td>
                                <td className="table-cell text-gray-500 font-base"><input type="text" className='border border-gray-300 rounded-md ml-5 mb-2' /></td>
                            </tr>
                            <tr>
                                <td className="table-cell text-gray-500 font-medium">Nama Pimpinan</td>
                                <td className="table-cell text-gray-500 font-base"><input type="text" className='border border-gray-300 rounded-md ml-5 mb-2' /></td>
                            </tr>
                            <tr>
                                <td className="table-cell text-gray-500 font-medium">Jabatan Pimpinan</td>
                                <td className="table-cell text-gray-500 font-base"><input type="text" className='border border-gray-300 rounded-md ml-5 mb-2' /></td>
                            </tr>
                            <tr>
                                <td className="table-cell text-gray-500 font-medium">PKP</td>
                                <td className="table-cell text-gray-500 font-base"><input type="text" className='border border-gray-300 rounded-md ml-5 mb-2' /></td>
                            </tr>
                            <tr>
                                <td className="table-cell text-gray-500 font-medium">Jenis Usaha</td>
                                <td className="table-cell text-gray-500 font-base"><input type="text" className='border border-gray-300 rounded-md ml-5 mb-2' /></td>
                            </tr>
                            <tr>
                                <td className="table-cell text-gray-500 font-medium">Nama Akunting</td>
                                <td className="table-cell text-gray-500 font-base"><input type="text" className='border border-gray-300 rounded-md ml-5 mb-2' /></td>
                            </tr>
                            <tr>
                                <td className="table-cell text-gray-500 font-medium">Kontak Akunting</td>
                                <td className="table-cell text-gray-500 font-base"><input type="text" className='border border-gray-300 rounded-md ml-5 mb-2' /></td>
                            </tr>
                        </table>
                        <button className='flex gap-2 items-center font-bold py-1 px-2 md:px-4 rounded bg-green-600 hover:bg-green-700 text-white w-fit my-3'>Save</button>
                    </div>
                </div>
            </AdminVerificationProvider>
        </AdminLayout>
    )
}
