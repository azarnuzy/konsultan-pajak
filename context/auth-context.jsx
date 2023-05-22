import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRouter } from 'next/router'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const router = useRouter()

  const [token, setToken] = useState(null)
  const [previousPath, setPreviousPath] = useState('/')
  const [user, setUser] = useState()
  const [userInfo, setUserInfo] = useState()

  const [showUpload, setShowUpload] = useState(false)
  const [profileImage, setProfileImage] = useState()

  const [consultRequest, setConsultRequest] = useState()
  const [consultOngoing, setConsultOngoing] = useState()
  const [consultDone, setConsultDone] = useState()

  const [open, setOpen] = React.useState(false)
  const eventDateRef = React.useRef(new Date())
  const timerRef = React.useRef(0)

  const handleNotification = () => {
    setOpen(false)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      // eventDateRef.current = oneWeekAway()
      setOpen(true)
    }, 100)
  }

  const getConsultCustomer = async (url, setData) => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // console.log(response)
        setData(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getUserInfo = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // console.log(response)
        if (
          response.data.data.role_id === 1 ||
          response.data.data.role_id === 2
        ) {
          router.push('/admin')
        }
        setUserInfo(response.data)
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  useEffect(() => {
    const storedToken = Cookies.get('token')
    if (storedToken) {
      const getUser = async () => {
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/customers/1`, {
            headers: {
              Authorization: storedToken,
            },
          })
          .then((response) => {
            console.log(response)
            setUser(response.data.data)
            return response
          })
          .catch((error) => {
            console.log(error)
          })
      }
      getUser()
      setToken(storedToken)
    }
  }, [token])

  useEffect(() => {
    if (user) {
      // console.log(user._links)
      getUserInfo()
      getConsultCustomer(
        user?._links?.['consult-request']?.href,
        setConsultRequest
      )
      getConsultCustomer(
        user?._links?.['consult-ongoing']?.href,
        setConsultOngoing
      )
      getConsultCustomer(user?._links?.['consult-done']?.href, setConsultDone)
    }
  }, [user])

  const login = async (data) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`

    const res = await axios
      .post(url, data)
      .then((response) => {
        // console.log(response)
        if (response.data) {
          const { token } = response.data.data
          // console.log(token)
          setToken(token)
          // setUserId(userId)
          Cookies.set('token', token, {
            expires: 3,
          })
        }

        return response
      })
      .catch((err) => {
        console.log(err)
        return err
      })
    return res.response
  }

  const logout = () => {
    // console.log('logout')
    setToken(null)
    setUser({})
    setToken()
    setProfileImage()
    setConsultRequest()
    setConsultOngoing()
    setConsultDone()
    Cookies.remove('token')
    router.push('/')
  }

  const handleUploadImage = (e) => {
    // console.log(e)
    setProfileImage(e.target.files[0])
    setShowUpload(true)
  }

  const isAuthenticated = async () => {
    return !!token
  }

  const authValue = {
    token,
    login,
    logout,
    isAuthenticated,
    token,
    setToken,
    previousPath,
    setPreviousPath,
    user,
    setUser,
    showUpload,
    setShowUpload,
    handleUploadImage,
    profileImage,
    setProfileImage,
    open,
    setOpen,
    eventDateRef,
    timerRef,
    handleNotification,
    consultRequest,
    setConsultRequest,
    consultOngoing,
    setConsultOngoing,
    consultDone,
    setConsultDone,
    userInfo,
    setUserInfo,
  }

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}
