import { useFormContext } from '@/context/form-context'
import React from 'react'

function InputFile(props) {
  // const { kelengkapanData, setKelengkapanData } = useFormContext()

  return (
    <>
      <label
        className='form-title'
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <div className='relative bg-white text-gray-700 border border-gray-200 rounded   leading-tight focus:outline-none shadow-sm'>
        <input
          type='file'
          id={props.id}
          className='absolute text-gray-700  inset-0 w-full h-full opacity-0 cursor-pointer'
          {...props.register(props.id, {
            required: true,
            onChange: (e) => {
              props.setKelengkapanData({
                ...props.kelengkapanData,
                [props.id]: e.target.files,
              })
              props.handleInputChange(e)
            },
          })}
        />
        <div className={`flex justify-end items-center pl-4 w-full`}>
          {props.kelengkapanData[props.id] && (
            <span className='text-gray-700 overflow-hidden whitespace-nowrap text-ellipsis'>
              {props?.kelengkapanData[props.id][0]?.name || ''}
            </span>
          )}

          <label
            className=' cursor-pointer bg-gray-200 text-gray-700 border border-gray-200 px-4 py-2 rounded-md inline-flex   items-center space-x-2'
            htmlFor={props.id}
          >
            <span>Browse</span>
          </label>
        </div>
      </div>
      {props.errors.hasOwnProperty(props.id) && (
        <span
          className='text-red-700'
          role='alert'
        >
          {props.errorText}
        </span>
      )}
    </>
  )
}

export default InputFile
