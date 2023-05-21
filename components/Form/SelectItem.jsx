import { useFormContext } from '@/context/form-context'
import React from 'react'

function SelectItem(props) {
  const { kelengkapanData, setKelengkapanData } = useFormContext()
  return (
    <>
      <label
        className='form-title'
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <select
        className='form-container cursor-pointer'
        id={props.id}
        value={kelengkapanData[props.id]}
        {...props.register(props.id, {
          required: true,
          onChange: (e) => {
            setKelengkapanData({
              ...kelengkapanData,
              [props.id]: e.target.value,
            })
          },
        })}
      >
        <option
          value={''}
          disabled
          selected={kelengkapanData?.agama === undefined ? true : false}
        >
          {props.defaultValue}
        </option>
        {props.data.map((item, i) => {
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
      {props.errors.agama && (
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

export default SelectItem
