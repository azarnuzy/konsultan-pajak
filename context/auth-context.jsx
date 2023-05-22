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

  const [token, setToken] = useState(null)
  // const [userId, setUserId] = useState()
  const [previousPath, setPreviousPath] = useState('/')
  const [user, setUser] = useState()

  useEffect(() => {
    const storedToken = Cookies.get('token')
    // console.log('render page')
    // console.log(storedToken)

    if (storedToken) {
      const getUser = async () => {
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/customers/1`, {
            headers: {
              Authorization: storedToken,
            },
          })
          .then((response) => {
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
  }, [])

  const login = async (data) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`

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
    // console.log(res)
    // return res.data
    return res.response
  }

  const logout = () => {
    // console.log('logout')
    setToken(null)
    Cookies.remove('token')
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
    previousPath,
    setPreviousPath,
    user,
    setUser,
  }

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}
