import React, { createContext, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

const FormContext = createContext({})

function FormProvider({ children }) {
  return <FormContext.Provider value={{}}>{children}</FormContext.Provider>
}

export default FormProvider

export const useFormContext = () => useContext(FormContext)
