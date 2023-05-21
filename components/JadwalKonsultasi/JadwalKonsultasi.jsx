import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import InputText from '../Form/InputText'

function JadwalKonsultasi() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const [kelengkapanData, setKelengkapanData] = useState({
    jasaKonsultasi: '',
    waktuKonsultasi: '',
    date: '',
    lokasi: '',
  })

  const data = [
    {
      name: 'Penyusunan Manual Pajak Perusahaan',
    },
    {
      name: 'Penyusunan Transfer Pricing Documentation',
    },
    {
      name: 'Penyusunan Asistensi Pajak',
    },
  ]

  const lokasiData = [
    {
      id: 'kantor',
      value: 'Kantor',
      name: 'lokasi',
    },
    {
      id: 'Lainnya',
      value: 'Lainnya',
      name: 'lokasi',
    },
  ]

  const filterDate = (date) => {
    // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
    const day = date.getDay()

    // Allow selection only if it's Monday to Friday (1-5)
    return day !== 0 && day !== 6
  }

  const filterTime = (time) => {
    // Get the hour of the selected time
    const hour = time.getHours()

    // Allow selection only if it's between 9 AM (9) and 4 PM (16)
    return hour >= 9 && hour <= 16
  }

  const onSubmit = () => {}
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex gap-8 p-8 flex-col sm:flex-row'
    >
      <div className='w-full flex flex-col gap-8'>
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
              value={''}
              selected
              className='text-slate-300'
              disabled
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
              className='block text-red-700'
              role='alert'
            >
              Pilih Jasa Konsultasi
            </span>
          )}
          <span className='text-lg font-semibold inline-block mt-4 mb-1'>
            Keterangan Jasa:
          </span>
          <p className='block'>
            Membantu klien perusahaan menyusun pedoman perpajakan yang berisis
            kebijakan, strategi, prosedur, pelaporan, dan petunjuk teknis
            perhitungan pajak.
          </p>
        </div>
        <div className='form-container-1'>
          <label
            className='form-title'
            htmlFor={'tanggalWaktu'}
          >
            Tanggal dan Waktu Konsultasi
          </label>
          <DatePicker
            {...register('datetime', { required: true })}
            showTimeSelect
            id='tanggalWaktu'
            timeIntervals={15}
            minDate={new Date()}
            // maxDate={new Date().setDate(new Date().getDate() + 30)}
            dateFormat='dd/MM/yyyy h:mm aa'
            filterDate={filterDate}
            filterTime={filterTime}
            selected={kelengkapanData['date']}
            className={'form-container'}
            onChange={(date) =>
              setKelengkapanData({
                ...kelengkapanData,
                ['date']: date,
              })
            }
            placeholderText='Pilih Tanggal dan Waktu Konsultasi'
          />
          {errors.datetime && (
            <span className='text-red-700'>
              Tanggal dan Waktu Konsultasi Harus Diisi
            </span>
          )}
        </div>
        <div className='form-container-1'>
          <label className='form-title'>Lokasi Konsultasi</label>
          <div className='flex justify-start flex-wrap gap-5 '>
            {lokasiData.map((item, i) => {
              return (
                <div
                  className='flex gap-3 items-center justify-center'
                  key={i}
                >
                  <input
                    type='radio'
                    id={item.id}
                    value={item.value}
                    {...register(item.name, {
                      required: true,
                      onChange: (e) => {
                        setKelengkapanData({
                          ...kelengkapanData,
                          [item.name]: e.target.value,
                        })
                      },
                    })}
                    checked={
                      item.value === kelengkapanData['lokasi'] ? true : false
                    }
                  />
                  <label
                    className=' tracking-wide'
                    htmlFor={item.id}
                  >
                    {item.value}
                  </label>
                </div>
              )
            })}
          </div>
          {errors.lokasi && (
            <span
              className='text-red-700'
              role='alert'
            >
              Lokasi Harus Dipilih
            </span>
          )}
          <div className='my-4'>
            <InputText
              label='Alamat Konsultasi'
              placeholder='Masukkan Alamat Konsultasi'
              id='alamatKonsultasi'
              name='alamatKonsultasi'
              value={kelengkapanData['alamatKonsultasi']}
              kelengkapanData={kelengkapanData}
              setKelengkapanData={setKelengkapanData}
              errors={errors}
              register={register}
              errorText={'Alamat Konsultasi Harus Diisi'}
              required={kelengkapanData['lokasi'] === 'Lainnya' ? true : false}
            />
          </div>
          <div className='my-4'>
            <InputText
              label='Link Alamat (Gmaps)'
              placeholder='Masukkan Link Alamat (Gmaps)'
              id='linkGmaps'
              name='linkGmaps'
              value={kelengkapanData['linkGmaps']}
              kelengkapanData={kelengkapanData}
              setKelengkapanData={setKelengkapanData}
              errors={errors}
              register={register}
              errorText={'Link Alamat (Gmaps) Harus Diisi'}
              required={kelengkapanData['lokasi'] === 'Lainnya' ? true : false}
            />
          </div>
        </div>
      </div>
      <div className='w-full sm:w-[345px] h-fit form-container-1 '>
        <h4 className='text-lg'>Biaya Konsultasi</h4>
        <span className='text-sm w-full whitespace-nowrap'>
          *Bayar ketika selesai atau saat konsultasi
        </span>
        <button
          className='bg-darkBlue rounded-md py-2  text-white w-full text-center mt-3'
          type='submit'
        >
          Buat Janji Konsultasi
        </button>
      </div>
    </form>
  )
}

export default JadwalKonsultasi
