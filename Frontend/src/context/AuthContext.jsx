import React, { createContext, useEffect, useState } from 'react'
import { getMe, loginUser, logoutUser, registerUser } from '../services/auth.api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe()
        if (data && data.user) {
          setUser(data.user)
        }
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleRegister = async (username, email, password) => {
    const data = await registerUser(username, email, password)
    if (data && data.user) {
      setUser(data.user)
    }
    return data
  }

  const handleLogin = async (email, password) => {
    const data = await loginUser(email, password)
    if (data && data.user) {
      setUser(data.user)
    }
    return data
  }

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, handleRegister, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}
