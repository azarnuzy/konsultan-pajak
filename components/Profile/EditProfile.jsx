import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import RadioButton from '../Form/RadioButton'
import InputText from '../Form/InputText'
import Link from 'next/link'

function EditProfile() {
  const [kelengkapanData, setKelengkapanData] = useState({
    name: '',
    npwp: '',
    alamatWp: '',
    namaPimpinan: '',
    jabatanPimpinan: '',
    pkp: '',
    jenisUsaha: '',
    namaAkunting: '',
    nomorTelp: '',
  })
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const data = [
    { id: 1, name: 'pkp', value: 'Ya' },
    { id: 2, name: 'pkp', value: 'Tidak' },
  ]
  return (
    <form
      onSubmit={handleSubmit()}
      className='flex  flex-col sm:flex-row gap-8 my-4 px-2 sm:px-16'
    >
      <div className='flex flex-col gap-8 w-full '>
        <div className='w-full form-container-1'>
          <h3 className='form-title-1'>Photo Profile</h3>
          <div className='flex flex-col sm:flex-row justify-center items-center gap-6 pb-3'>
            <div className='w-[200px] h-[200px] rounded-full bg-light-gray'></div>
            <div className='flex flex-col gap-4'>
              <button className='w-[183px] py-2 bg-darkBlue rounded-lg text-white font-semibold'>
                Upload
              </button>
              <button className='w-[183px] py-2 bg-red-600 rounded-lg text-white font-semibold'>
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className='w-full form-container-1'>
          <h3 className='form-title-1'>User Details</h3>
          <div className='mb-5'>
            <InputText
              label='Nama WP (Wajib Pajak)'
              placeholder='Masukkan Nama WP (Wajib Pajak)'
              id='name'
              name='name'
              value={kelengkapanData['name']}
              kelengkapanData={kelengkapanData}
              setKelengkapanData={setKelengkapanData}
              errors={errors}
              register={register}
              errorText={'Nama WP (Wajib Pajak) Harus Diisi'}
              required={true}
            />
          </div>
          <div className='mb-5'>
            <InputText
              label='NPWP'
              placeholder='Masukkan NPWP'
              id='npwp'
              name='npwp'
              value={kelengkapanData['npwp']}
              kelengkapanData={kelengkapanData}
              setKelengkapanData={setKelengkapanData}
              errors={errors}
              register={register}
              errorText={'NPWP Harus Diisi'}
              required={true}
            />
            <div className='mb-5'></div>
          </div>
          <InputText
            label='Alamat WP (Wajib Pajak)'
            placeholder='Masukkan Alamat WP (Wajib Pajak)'
            id='alamatWp'
            name='alamatWp'
            value={kelengkapanData['alamatWp']}
            kelengkapanData={kelengkapanData}
            setKelengkapanData={setKelengkapanData}
            errors={errors}
            register={register}
            errorText={'Alamat WP (Wajib Pajak) Harus Diisi'}
            required={true}
          />
          <div className='mb-5'>
            <InputText
              label='Nama Pimpinan (WP Badan)'
              placeholder='Masukkan Nama Pimpinan (WP Badan)'
              id='namaPimpinan'
              name='namaPimpinan'
              value={kelengkapanData['namaPimpinan']}
              kelengkapanData={kelengkapanData}
              setKelengkapanData={setKelengkapanData}
              errors={errors}
              register={register}
              errorText={'Nama Pimpinan (WP Badan) Harus Diisi'}
              required={true}
            />
          </div>
          <div className='mb-5'>
            <InputText
              label='Jabatan Pimpinan (WP Badan)'
              placeholder='Masukkan Jabatan Pimpinan (WP Badan)'
              id='namaPimpinan'
              name='namaPimpinan'
              value={kelengkapanData['namaPimpinan']}
              kelengkapanData={kelengkapanData}
              setKelengkapanData={setKelengkapanData}
              errors={errors}
              register={register}
              errorText={'Jabatan Pimpinan (WP Badan) Harus Diisi'}
              required={true}
            />
          </div>
          <div className='mb-5'>
            {' '}
            <RadioButton
              data={data}
              register={register}
              errors={errors}
              value={kelengkapanData?.pkp || ''}
              label={'PKP'}
              errorText={'PKP Harus Diisi'}
              name={'pkp'}
              kelengkapanData={kelengkapanData}
              setKelengkapanData={setKelengkapanData}
            />
          </div>
          <div className='mb-5'>
            <InputText
              label='Jenis Usaha (Sesuai KLU)'
              placeholder='Masukkan Jenis Usaha (Sesuai KLU)'
              id='jenisUsaha'
              name='jenisUsaha'
              value={kelengkapanData['jenisUsaha']}
              kelengkapanData={kelengkapanData}
              setKelengkapanData={setKelengkapanData}
              errors={errors}
              register={register}
              errorText={'Jenis Usaha (Sesuai KLU) Harus Diisi'}
              required={true}
            />
          </div>
          <div className='mb-5'>
            <InputText
              label='Nama Akunting'
              placeholder='Masukkan Nama Akunting'
              id='namaAkunting'
              name='namaAkunting'
              value={kelengkapanData['namaAkunting']}
              kelengkapanData={kelengkapanData}
              setKelengkapanData={setKelengkapanData}
              errors={errors}
              register={register}
              errorText={'Nama Akunting Harus Diisi'}
              required={true}
            />
          </div>
          <div className='mb-5'>
            <InputText
              label='Nomor Telephone Akunting/Pajak/Admin'
              placeholder='Masukkan Nomor Telephone Akunting/Pajak/Admin'
              id='nomorTelp'
              name='nomorTelp'
              value={kelengkapanData['nomorTelp']}
              kelengkapanData={kelengkapanData}
              setKelengkapanData={setKelengkapanData}
              errors={errors}
              register={register}
              errorText={'Nomor Telephone Akunting/Pajak/Admin Harus Diisi'}
              required={true}
            />
          </div>
          <div className='flex gap-4 justify-center flex-wrap'>
            <button
              className='w-[228px] py-2 rounded-lg bg-light-yellow font-medium text-white'
              type='submit'
            >
              Save Changes
            </button>
            <button className='w-[228px] py-2 rounded-lg bg-light-green font-medium text-white'>
              Reset Value
            </button>
            <Link
              href={'/profile'}
              className='text-center w-[228px] py-2 rounded-lg bg-darkBlue font-medium text-white'
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}

export default EditProfile
