import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRouter } from 'next/router'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const router = useRouter()

  // Request interceptor
  axios.interceptors.request.use(
    (config) => {
      // Modify the request config here (e.g., adding headers, modifying data)
      return config
    },
    (error) => {
      // Handle request error
      return Promise.reject(error)
    }
  )

  // Response interceptor
  axios.interceptors.response.use(
    (response) => {
      // Process the response data here (e.g., transform response, handle success)
      return response
    },
    (error) => {
      // Handle response error based on the status code
      if (error.response) {
        const { status } = error.response

        // Redirect to the appropriate page based on the status code
        if (status === 401) {
          // Unauthorized - Redirect to the unauthorized page
          router.push('/unauthorized')
        } else if (status === 403) {
          // Forbidden - Redirect to the home page
          router.push('/')
        } else if (status === 404) {
          // Not Found - Redirect to the error page
          router.push('/error')
        } else if (status === 500) {
          // Internal Server Error - Redirect to the error page
          router.push('/error')
        }
      }

      // Return the error to the caller
      return Promise.reject(error)
    }
  )
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState()
  const [previousPath, setPreviousPath] = useState('/')

  useEffect(() => {
    const storedToken = Cookies.get('token')
    const storedUserId = Cookies.get('user_id')
    if (storedToken && storedUserId) {
      setToken(storedToken)
      setUserId(storedUserId)
    }
  }, [])

  const login = async (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/login`

    const res = await axios
      .post(url, data)
      .then((response) => {
        console.log(response)
        if (response.data.code === 200) {
          const { authentication_token, userId } = response.data.data
          setToken(authentication_token)
          setUserId(userId)
          Cookies.set('token', authentication_token, {
            expires: 1,
          })
          Cookies.set('user_id', userId, { expires: 1 })
        }

        return response
      })
      .catch((err) => {
        console.log(err)
        return err
      })

    return res.data
    // return res
    //   // return res
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const logout = () => {
    // console.log('logout')
    setToken(null)
    setUserId(null)
    Cookies.remove('token')
    Cookies.remove('user_id')
    router.push('/')
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
    userId,
    setUserId,
    previousPath,
    setPreviousPath,
  }

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}
