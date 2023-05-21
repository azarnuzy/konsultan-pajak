import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

function JadwalKonsultasi() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const [kelengkapanData, setKelengkapanData] = useState({
    jasaKonsultasi: 'Pilih Jasa Konsultasi',
  })

  const data = [
    {
      name: 'Pajak Bangunan',
    },
  ]

  const onSubmit = () => {}
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex gap-8 p-8'
    >
      <div className='w-full flex flex-col gap-16'>
        <div className='form-container-1'>
          <label
            className='form-title'
            htmlFor={'jasaKonsultasi'}
          >
            Jasa Konsultasi
          </label>
          <select
            className='form-container cursor-pointer'
            id={'jasaKonsultasi'}
            value={kelengkapanData['jasaKonsultasi']}
            {...register('jasaKonsultasi', {
              required: true,
              onChange: (e) => {
                setKelengkapanData({
                  ...kelengkapanData,
                  ['jasaKonsultasi']: e.target.value,
                })
              },
            })}
          >
            <option
              value={'Pilih Jasa Konsultasi'}
              disabled
              //   selected={kelengkapanData?.agama === undefined ? true : false}
            >
              Pilih Jasa Konsultasi
            </option>
            {data.map((item, i) => {
              const key = Object.keys(item)[0]
              const value = item[key]
              return (
                <option
                  value={value}
                  key={i}
                >
                  {value}
                </option>
              )
            })}
          </select>
          {errors.jasaKonsultasi && (
            <span
              className='text-red-700'
              role='alert'
            >
              Pilih Jasa Konsultasi
            </span>
          )}
          <span className='text-lg font-semibold inline-block my-4'>
            Keterangan Jasa:
          </span>
          <p className='block'>
            Membantu klien perusahaan menyusun pedoman perpajakan yang berisis
            kebijakan, strategi, prosedur, pelaporan, dan petunjuk teknis
            perhitungan pajak.
          </p>
        </div>
      </div>
      <div className='w-[345px] form-container-1 '>
        <h4 className='text-lg'>Biaya Konsultasi</h4>
        <span className=''>*Bayar ketika selesai atau saat konsultasi</span>
        <button className='bg-darkBlue text-white w-full text-center'>
          Buat Janji Konsultasi
        </button>
      </div>
    </form>
  )
}

export default JadwalKonsultasi
