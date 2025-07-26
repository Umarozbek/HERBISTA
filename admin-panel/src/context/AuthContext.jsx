import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      checkAuth()
    } else {
      setLoading(false)
    }
  }, [])

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/auth/me')
      if (response.data.success) {
        setUser(response.data.user)
      } else {
        localStorage.removeItem('adminToken')
        delete axios.defaults.headers.common['Authorization']
      }
    } catch (error) {
      localStorage.removeItem('adminToken')
      delete axios.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password })
      if (response.data.success) {
        const { token, user } = response.data
        localStorage.setItem('adminToken', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setUser(user)
        toast.success('Login successful!')
        return true
      } else {
        toast.error('Login failed')
        return false
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return false
    }
  }

  // Register function for admin sign up
  const register = async (name, email, password) => {
    try {
      const response = await axios.post('/api/auth/register', { name, email, password })
      if (response.data.success) {
        toast.success('Registration successful!')
        return true
      } else {
        toast.error(response.data.message || 'Registration failed')
        return false
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    toast.success('Logged out successfully')
  }

  const value = {
    user,
    loading,
    login,
    logout,
    register
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 