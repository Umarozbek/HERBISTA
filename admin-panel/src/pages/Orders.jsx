import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { Eye, CheckCircle, XCircle, Clock } from 'lucide-react'
import { fetchOrders, updateOrderStatus } from '../config/api'

const Orders = () => {
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('')
  const queryClient = useQueryClient()

  const { data: ordersData, isLoading, error } = useQuery(
    ['orders', page, statusFilter],
    () => fetchOrders({ page, limit: 10, status: statusFilter }).then(res => res.data.data)
  )

  const updateOrderStatusMutation = useMutation(
    ({ orderId, status }) => updateOrderStatus(orderId, { status }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['orders'])
        toast.success('Order status updated successfully')
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update order status')
      }
    }
  )

  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatusMutation.mutate({ orderId, status: newStatus })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending'
      case 'confirmed': return 'status-confirmed'
      case 'preparing': return 'bg-blue-100 text-blue-800'
      case 'ready': return 'bg-purple-100 text-purple-800'
      case 'out-for-delivery': return 'bg-orange-100 text-orange-800'
      case 'delivered': return 'status-completed'
      case 'cancelled': return 'status-cancelled'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
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
        <p className="text-red-600">Error loading orders</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage and track all restaurant orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status Filter</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="out-for-delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Order</th>
                <th className="table-header">Customer</th>
                <th className="table-header">Items</th>
                <th className="table-header">Total</th>
                <th className="table-header">Status</th>
                <th className="table-header">Date</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ordersData?.orders?.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div>
                      <p className="font-medium text-gray-900">#{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">{order.orderType}</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="font-medium text-gray-900">{order.user?.name || 'Guest'}</p>
                      <p className="text-sm text-gray-500">{order.user?.email}</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="text-sm text-gray-900">{order.items?.length || 0} items</p>
                      <p className="text-xs text-gray-500">
                        {order.items?.slice(0, 2).map(item => item.name).join(', ')}
                        {order.items?.length > 2 && '...'}
                      </p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <p className="font-medium text-gray-900">${order.total?.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{order.paymentStatus}</p>
                  </td>
                  <td className="table-cell">
                    <span className={`status-badge ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </span>
                  </td>
                  <td className="table-cell">
                    {format(new Date(order.createdAt), 'MMM dd, HH:mm')}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleStatusUpdate(order._id, 'confirmed')}
                        disabled={order.status === 'confirmed'}
                        className="p-1 text-green-600 hover:text-green-800 disabled:opacity-50"
                        title="Confirm order"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(order._id, 'preparing')}
                        disabled={order.status === 'preparing'}
                        className="p-1 text-blue-600 hover:text-blue-800 disabled:opacity-50"
                        title="Start preparing"
                      >
                        <Clock className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(order._id, 'delivered')}
                        disabled={order.status === 'delivered'}
                        className="p-1 text-purple-600 hover:text-purple-800 disabled:opacity-50"
                        title="Mark as delivered"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {ordersData?.pagination && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing {((ordersData.pagination.page - 1) * ordersData.pagination.limit) + 1} to{' '}
              {Math.min(ordersData.pagination.page * ordersData.pagination.limit, ordersData.pagination.total)} of{' '}
              {ordersData.pagination.total} results
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
                Page {page} of {ordersData.pagination.pages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === ordersData.pagination.pages}
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

export default Orders 