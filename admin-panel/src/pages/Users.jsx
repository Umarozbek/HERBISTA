import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { Edit, Trash2, Eye, Search } from 'lucide-react'
import { fetchUsers, updateUser, deleteUser } from '../config/api'

const Users = () => {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const queryClient = useQueryClient()

  const { data: usersData, isLoading, error } = useQuery(
    ['users', page, searchTerm],
    () => fetchUsers({ page, limit: 10, search: searchTerm }).then(res => res.data.data)
  )

  const updateUserMutation = useMutation(
    ({ userId, userData }) => updateUser(userId, userData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users'])
        toast.success('User updated successfully')
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update user')
      }
    }
  )

  const deleteUserMutation = useMutation(
    (userId) => deleteUser(userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users'])
        toast.success('User deleted successfully')
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to delete user')
      }
    }
  )

  const handleUpdateUser = (userId, userData) => {
    updateUserMutation.mutate({ userId, userData })
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUserMutation.mutate(userId)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading users</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage restaurant users and their accounts</p>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">Email</th>
                <th className="table-header">Role</th>
                <th className="table-header">Status</th>
                <th className="table-header">Joined</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersData?.users?.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-green-600">
                          {user.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.phone || 'No phone'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">{user.email}</td>
                  <td className="table-cell">
                    <span className={`status-badge ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`status-badge ${
                      user.isVerified ? 'status-confirmed' : 'status-pending'
                    }`}>
                      {user.isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="table-cell">
                    {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateUser(user._id, { role: user.role === 'admin' ? 'user' : 'admin' })}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="Toggle role"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {usersData?.pagination && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing {((usersData.pagination.page - 1) * usersData.pagination.limit) + 1} to{' '}
              {Math.min(usersData.pagination.page * usersData.pagination.limit, usersData.pagination.total)} of{' '}
              {usersData.pagination.total} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-2 text-sm text-gray-700">
                Page {page} of {usersData.pagination.pages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === usersData.pagination.pages}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Users 