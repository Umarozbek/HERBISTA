import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Calendar,
  Utensils,
  Image,
  Menu,
  LogOut,
  User
} from 'lucide-react'
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Orders', href: '/orders', icon: ShoppingCart },
    { name: 'Reservations', href: '/reservations', icon: Calendar },
    { name: 'Menu', href: '/menu', icon: Utensils },
    { name: 'Gallery', href: '/gallery', icon: Image },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg flex flex-col justify-between transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div>
          {/* Logo and Admin Text at the very top */}
          <div className="flex flex-col items-center justify-center h-20 px-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <User className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-green-600 leading-tight">Herbista</h1>
                <span className="text-xs text-gray-500 font-semibold tracking-wide">Restaurant Admin</span>
              </div>
            </div>
          </div>

          <nav className="mt-6 px-3">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>

        {/* User section at the very bottom, separated from nav */}
        <div className="p-4 border-t border-gray-200 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-green-600" />
              <h1 className="text-lg font-bold text-green-600 leading-tight">Herbista</h1>
              <span className="text-xs text-gray-500 font-semibold ml-1">Admin</span>
            </div>
            <div className="w-6"></div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Layout 