import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { FaCalendarTimes, FaSuitcase } from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'
import { useAuth } from '@/context/auth-context'
import Image from 'next/image'
import { convertDate } from '@/helpers/generalFunction'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function RiwayatKonsultasi() {
  const { consultRequest, consultOngoing, consultDone, user } = useAuth()

  let [categories, setCategories] = useState({
    'Daftar Appointment': [],
    'Konsultasi Berjalan': [],
    'Konsultasi Selesai': [],
  })

  useEffect(() => {
    console.log(consultRequest)
    setCategories({
      'Daftar Appointment': consultRequest,
      'Konsultasi Berjalan': consultOngoing,
      'Konsultasi Selesai': consultDone,
    })
    // console.log(user)
    // console.log(consultRequest)
  }, [consultRequest, consultOngoing, consultDone])

  return (
    <div className='w-full  px-2 py-16 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl bg-lighBlue p-1'>
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-semibold leading-5  text-light-dark',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-light-dark hover:bg-white/[0.12] hover:text-darkBlue'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          {Object.values(categories).map((posts, idx) => (
            
            <Tab.Panel
              key={idx}
              className={classNames('rounded-xl bg-white p-3')}
            >
              <ul>
                {posts?.length > 0 &&
                  posts?.map((item) => (
                    <li
                      key={item.id}
                      className='relative rounded-md p-3'
                    >
                      <div className='w-full border border-solid border-light-dark rounded-md'>
                        <div className='border-b-[1px]  border-solid border-light-dark w-full p-8 flex flex-col sm:flex-row gap-8 justify-between'>
                          <div className=' flex flex-col gap-6'>
                            <div className='text-light-dark flex gap-3'>
                              <FaSuitcase className='w-6 h-6' />
                              <div className=''>
                                <h3 className='font-semibold text-lg mb-3'>
                                  Jasa Konsultasi
                                </h3>
                                <span>{item.type.type}</span>
                              </div>
                            </div>
                            <div className='text-light-dark flex gap-3'>
                              <FaCalendarTimes className='w-6 h-6' />
                              <div className=''>
                                <h3 className='font-semibold text-lg mb-3'>
                                  Tanggal & Waktu Konsultasi
                                </h3>
                                <span>{convertDate(item.date)}</span>
                              </div>
                            </div>
                            <div className='text-light-dark flex gap-3'>
                              <HiLocationMarker className='w-6 h-6' />
                              <div className=''>
                                <h3 className='font-semibold text-lg mb-3'>
                                  Lokasi dan Alamat Konsultasi
                                </h3>
                                <span>
                                  {item.place_type}{' '}
                                  {item.place_type === 'Lainnya'
                                    ? `| ${item.address}`
                                    : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='w-full  sm:w-fit overflow-hidden'>
                            <div className='flex gap-3'>
                              <HiLocationMarker className='w-6 h-6' />
                              <span className='font-semibold text-lg mb-3'>
                                Link Alamat (Gmaps)
                              </span>
                            </div>
                            {/* <span className='text-ellipsis '>
                              {item.gmap_link || '-'}
                              
                            </span> */}
                            <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.2457089488134!2d107.59177497329686!3d-6.8611285671234725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6b943c2c5ff%3A0xee36226510a79e76!2sUniversitas%20Pendidikan%20Indonesia!5e0!3m2!1sid!2sid!4v1686404036268!5m2!1sid!2sid" 
          width="400"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        
                          </div>
                        </div>
                        <div className='flex justify-between p-8 gap-8'>
                          <div className='text-lg font-medium'>
                            {`${item?.status} | ${item?.consultation?.status ? item?.consultation?.status : `-`}` || '-'}
                          </div>
                          <div className='flex justify-end gap-8'>
                            <h4 className='text-lg font-medium'>
                              Total Biaya Konsultasi
                            </h4>
                            <span className='text-lg font-medium'>
                              Rp1.000.000
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={classNames(
                          'relative inset-0 rounded-md',
                          'ring-blue-400 '
                        )}
                      />
                    </li>
                  ))}
                {posts?.length === 0 && (
                  <div className='flex justify-center'>
                    <div className='w-full h-full sm:w-[450px] sm:h-[560px] object-cover'>
                      <Image
                        src={'/images/NoData.svg'}
                        alt={'no data image'}
                        width={450}
                        height={560}
                      />
                    </div>
                  </div>
                )}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
