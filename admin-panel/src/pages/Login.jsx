import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Lock, Mail, User } from 'lucide-react'

const Login = () => {
  const [tab, setTab] = useState('login') // 'login' or 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login, register } = useAuth()

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setName('')
    setConfirm('')
    setError('')
  }

  const handleTab = (newTab) => {
    setTab(newTab)
    resetForm()
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const success = await login(email, password)
    if (!success) setError('Invalid credentials')
    setLoading(false)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }
    const success = await register(name, email, password)
    if (!success) setError('Registration failed')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-2 rounded-t-lg font-semibold focus:outline-none ${tab === 'login' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => handleTab('login')}
            >
              Login
            </button>
            <button
              className={`px-6 py-2 rounded-t-lg font-semibold focus:outline-none ${tab === 'signup' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => handleTab('signup')}
            >
              Sign Up
            </button>
          </div>
          {tab === 'login' && (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-10"
                    placeholder="admin@herbista.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-10"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          )}
          {tab === 'signup' && (
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field pl-10"
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-10"
                    placeholder="admin@herbista.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-10"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="input-field pl-10"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Create account'
                )}
              </button>
            </form>
          )}
        </div>
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Demo credentials: admin@herbista.com / admin123
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login 