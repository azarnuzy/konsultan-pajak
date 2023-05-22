import React, { useEffect } from 'react'
import { HiLocationMarker, HiMail } from 'react-icons/hi'
import { FaUserEdit } from 'react-icons/fa'
import Link from 'next/link'
import { useAuth } from '@/context/auth-context'
import Image from 'next/image'

function Profile() {
  const { user } = useAuth()
  const data = {
    name: 'Joen Doe',
    email: 'joenDoe@gmail.com',
    address: 'jalan gagak no 49, Sukasari, Bandung, Jawa Barat',
    imgUrl: '#',
    detail: {
      namaPimpinan: 'Alexander Doe',
      jabatanPimpinan: 'CEO',
      PKP: 'xxx',
      jenisUsaha: 'xxx xxx',
      namaAkunting: 'xxx xxxx',
      kontakAkunting: '+62xxxx-xxxx-xxxx',
    },
  }

  useEffect(() => {
    console.log(user)
  }, [])
  return (
    <>
      <div className='flex flex-col items-center sm:flex-row sm:justify-between my-8 gap-8'>
        <div className='flex flex-col sm:flex-row gap-6 items-center'>
          <div className='w-[100px] md:w-[200px] h-[100px] md:h-[200px] rounded-full bg-light-gray object-cover object-center relative'>
            <Image
              src={
                user?.user?.image?.imagekit_url || '/images/profileDefault.png'
              }
              alt='profile user'
              fill
              // objectFit=''
              className='rounded-full '
            />
          </div>
          <div className='flex flex-col gap-4'>
            <h3 className='text-xl font-semibold'>{user?.name || 'xxx xxx'}</h3>
            <div className='flex gap-2'>
              <HiMail className='w-6 h-6 text-light-dark' />
              <span>{user?.user?.email || 'xxx xxx'}</span>
            </div>
            <div className='flex gap-2'>
              <HiLocationMarker className='w-6 h-6 text-light-dark' />
              <span>{user?.address || 'xxx xxx'}</span>
            </div>
          </div>
        </div>
        <div className='bg-darkBlue w-fit text-whtite font-semibold border border-solid border-darkBlue rounded-md px-6 py-2 flex gap-3 h-fit items-center'>
          <Link
            href={'/profile/edit'}
            className='text-lg text-white'
          >
            Edit User
          </Link>
          <div className='w-[30px] h-[30px] rounded-full border border-light-dark border-solid bg-white text-darkBlue flex justify-center pl-1 items-center shadow-sm'>
            <FaUserEdit className='w-5 h-5' />
          </div>
        </div>
      </div>
      <h3 className='text-light-dark font-semibold my-3 text-center text-2xl'>
        Detail Information
      </h3>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Field
            </th>
            <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Value
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          <tr>
            <td className='py-4 px-6 text-sm text-gray-500 font-medium'>
              Nama Pimpinan
            </td>
            <td className='py-4 px-6 text-sm text-gray-900'>
              {user?.leader_name || 'xxx xxx xxx xx'}
            </td>
          </tr>
          <tr>
            <td className='py-4 px-6 text-sm text-gray-500 font-medium'>
              Jabatan Pimpinan
            </td>
            <td className='py-4 px-6 text-sm text-gray-900'>
              {user?.leader_title || 'xxx xxx xxx xx'}
            </td>
          </tr>
          <tr>
            <td className='py-4 px-6 text-sm text-gray-500 font-medium'>PKP</td>
            <td className='py-4 px-6 text-sm text-gray-900'>
              {user?.pkp || 'xxx xxx xxx xx'}
            </td>
          </tr>
          <tr>
            <td className='py-4 px-6 text-sm text-gray-500 font-medium'>
              Jenis Usaha
            </td>
            <td className='py-4 px-6 text-sm text-gray-900'>
              {user?.business_type || 'xxx xxx xxx xx'}
            </td>
          </tr>
          <tr>
            <td className='py-4 px-6 text-sm text-gray-500 font-medium'>
              Nama Akunting
            </td>
            <td className='py-4 px-6 text-sm text-gray-900'>
              {user?.acc_name || 'xxx xxx xxx xx'}
            </td>
          </tr>
          <tr>
            <td className='py-4 px-6 text-sm text-gray-500 font-medium'>
              Kontak Akunting
            </td>
            <td className='py-4 px-6 text-sm text-gray-900'>
              {user?.acc_telp || 'xxx xxx xxx xx'}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Profile
