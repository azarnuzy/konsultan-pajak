import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { FaCalendarTimes, FaSuitcase } from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function RiwayatKonsultasi() {
  let [categories] = useState({
    'Menunggu Konfirmasi': [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    'Sedang Berjalan': [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Selesai: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  })

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
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
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
                              <span>{post.title}</span>
                            </div>
                          </div>
                          <div className='text-light-dark flex gap-3'>
                            <FaCalendarTimes className='w-6 h-6' />
                            <div className=''>
                              <h3 className='font-semibold text-lg mb-3'>
                                Tanggal & Waktu Konsultasi
                              </h3>
                              <span>{post.date}</span>
                            </div>
                          </div>
                          <div className='text-light-dark flex gap-3'>
                            <HiLocationMarker className='w-6 h-6' />
                            <div className=''>
                              <h3 className='font-semibold text-lg mb-3'>
                                Jasa Konsultasi
                              </h3>
                              <span>{post.shareCount}</span>
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
                          <span className='text-ellipsis '>
                            https://google.maps/234dafwef.cawefawefagavwe/
                          </span>
                        </div>
                      </div>
                      <div className='flex justify-end p-8 gap-8'>
                        <h4 className='text-lg font-medium'>
                          Total Biaya Konsultasi
                        </h4>
                        <span className='text-lg font-medium'>Rp1.000.000</span>
                      </div>
                    </div>
                    {/* <h3 className='text-sm font-medium leading-5'>
                      {post.title}
                    </h3>

                    <ul className='mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500'>
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul> */}

                    <a
                      href='#'
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
