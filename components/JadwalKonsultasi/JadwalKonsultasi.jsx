import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import InputText from '../Form/InputText'
import axios from 'axios'
import { useAuth } from '@/context/auth-context'
import Notification from '../Loading/Notification'
import LoadingSpinner from '../Loading/LoadingSpinner'

function JadwalKonsultasi() {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm()

  const { user, token, handleNotification } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState()
  const [status, setStatus] = useState()

  const [kelengkapanData, setKelengkapanData] = useState({
    type_id: '',
    // waktuKonsultasi: '',
    date: '',
    place_type: '',
    address: '',
    gmapLink: '',
    cust_id: user?.id,
  })

  useEffect(() => {
    //   console.log(kelengkapanData)
    if (user) {
      // console.log(user.id)
      setKelengkapanData({
        ...kelengkapanData,
        cust_id: user?.id,
      })
    }
  }, [user])

  const data = [
    {
      name: 'Penyusunan Manual Pajak Perusahaan',
      value: 1,
    },
    {
      name: 'Penyusunan Transfer Pricing Documentation',
      value: 2,
    },
    {
      name: 'Penyusunan Asistensi Pajak',
      value: 3,
    },
  ]

  const lokasiData = [
    {
      id: 'kantor',
      value: 'Kantor',
      name: 'place_type',
    },
    {
      id: 'online',
      value: 'Online',
      name: 'place_type',
    },
    {
      id: 'Lainnya',
      value: 'Lainnya',
      name: 'place_type',
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

    // Allow selection only if it's between 9 AM (9) and 2 PM (14)
    return hour >= 9 && hour <= 14
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    // console.log(kelengkapanData)
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules`,
        kelengkapanData,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        setStatus(response.status)
        setMessage(response.data.message)
        handleNotification()
        setKelengkapanData({
          type_id: '',
          // waktuKonsultasi: '',
          date: '',
          place_type: '',
          address: '',
          gmapLink: '',
          cust_id: user?.id,
        })
      })
      .catch((error) => {
        setStatus(error.response.status)
        setMessage(error.response.data.message)
        handleNotification()
      })
    setIsLoading(false)
  }
  return (
    <>
      <Notification
        message={message}
        status={status}
      />
      <LoadingSpinner
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex gap-8 p-8 flex-col sm:flex-row'
      >
        <div className='w-full flex flex-col gap-8'>
          <div className='form-container-1'>
            <label
              className='form-title'
              htmlFor={'type_id'}
            >
              Jasa Konsultasi
            </label>
            <select
              className='form-container cursor-pointer text-red-300'
              id={'type_id'}
              value={kelengkapanData['type_id']}
              {...register('type_id', {
                required: true,
                onChange: (e) => {
                  setKelengkapanData({
                    ...kelengkapanData,
                    ['type_id']: parseInt(e.target.value),
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
                    value={item.value}
                    key={i}
                  >
                    {value}
                  </option>
                )
              })}
            </select>
            {errors.type_id && (
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
              htmlFor={'date'}
            >
              Tanggal dan Waktu Konsultasi
            </label>
            <Controller
              control={control}
              name='date'
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  // dateFormat="dd/MM/yyyy"
                  selected={field.value ? new Date(field.value) : null}
                  // onChange={(date) => field.onChange(date)}
                  showTimeSelect
                  id='date'
                  timeIntervals={15}
                  minDate={new Date()}
                  // maxDate={new Date().setDate(new Date().getDate() + 30)}
                  dateFormat='dd/MM/yyyy h:mm aa'
                  filterDate={filterDate}
                  filterTime={filterTime}
                  // selected={kelengkapanData['date']}
                  className={'form-container'}
                  onChange={(date) => {
                    // console.log(date)
                    field.onChange(date)
                    setKelengkapanData({
                      ...kelengkapanData,
                      ['date']: date,
                    })
                  }}
                  placeholderText='Pilih Tanggal dan Waktu Konsultasi'
                />
              )}
            />
            {errors.date && (
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
                        item.value === kelengkapanData['place_type']
                          ? true
                          : false
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
            {errors.place_type && (
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
                id='address'
                name='address'
                value={kelengkapanData['address']}
                kelengkapanData={kelengkapanData}
                setKelengkapanData={setKelengkapanData}
                errors={errors}
                register={register}
                errorText={'Alamat Konsultasi Harus Diisi'}
                required={
                  kelengkapanData['place_type'] === 'Lainnya' ? true : false
                }
              />
            </div>
            <div className='my-4'>
              <InputText
                label='Link Alamat (Gmaps)'
                placeholder='Masukkan Link Alamat (Gmaps)'
                id='gmapLink'
                name='gmapLink'
                value={kelengkapanData['gmapLink']}
                kelengkapanData={kelengkapanData}
                setKelengkapanData={setKelengkapanData}
                errors={errors}
                register={register}
                errorText={'Link Alamat (Gmaps) Harus Diisi'}
                required={
                  kelengkapanData['place_type'] === 'Lainnya' ? true : false
                }
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
    </>
  )
}

export default JadwalKonsultasi
