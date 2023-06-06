import React from 'react'
import { FaTasks, FaUsers } from 'react-icons/fa'
import { HiChat } from 'react-icons/hi'
import { MdPendingActions } from 'react-icons/md'

function Admin() {
  const data = [
    {
      name: 'Total Users',
      icon: 'user',
      value: 100,
      color: 'bg-darkBlue ',
      textColor: 'text-darkBlue',
    },
    {
      name: 'Unread Chats',
      icon: 'chat',
      value: 3,
      color: 'bg-light-green ',
      textColor: 'text-light-green',
    },
    {
      name: 'Consult Tasks',
      icon: 'task',
      value: 9,
      color: 'bg-lighBlue ',
      textColor: 'text-lighBlue',
    },
    {
      name: 'Consult Result',
      icon: 'date',
      value: 14,
      color: 'bg-light-yellow ',
      textColor: 'text-light-yellow',
    },
  ]

  return (
    <>
      <h1 className='admin-title'>Dashboard</h1>
      <div className='flex flex-wrap gap-4'>
        {data.map((item, i) => {
          let icon
          switch (item.icon) {
            case 'user':
              icon = <FaUsers className='w-7 h-7 ' />
              break
            case 'chat':
              icon = <HiChat className='w-7 h-7 ' />
              break
            case 'task':
              icon = <FaTasks className='w-7 h-7 ' />
              break
            case 'date':
              icon = <MdPendingActions className='w-7 h-7 ' />
              break

            default:
              break
          }

          return (
            <div
              className='p-3 bg-white shadow-md rounded-lg relative flex items-center justify-between w-[250px]'
              key={i}
            >
              <div
                className={`absolute w-1 ${item.color} left-0 h-full rounded-l-xl`}
              ></div>
              <div className=''>
                <h3 className={`uppercase text ${item.textColor}`}>
                  {item.name}
                </h3>
                <span className='text-light-dark'>{item.value}</span>
              </div>
              {icon}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Admin
