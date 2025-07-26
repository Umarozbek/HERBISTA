import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  Mail, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  Edit
} from 'lucide-react'

const Reservations = () => {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState(null)
  const queryClient = useQueryClient()

  const { data: reservationsData, isLoading, error } = useQuery(
    ['reservations', page, searchTerm, statusFilter, dateFilter],
    async () => {
      const response = await axios.get(`/api/admin/reservations?page=${page}&limit=10&search=${searchTerm}&status=${statusFilter}&date=${dateFilter}`)
      return response.data.data
    }
  )

  const updateReservationStatusMutation = useMutation(
    async ({ reservationId, status }) => {
      const response = await axios.put(`/api/admin/reservations/${reservationId}/status`, { status })
      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reservations'])
        toast.success('Reservation status updated successfully')
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update reservation status')
      }
    }
  )

  const deleteReservationMutation = useMutation(
    async (reservationId) => {
      await axios.delete(`/api/admin/reservations/${reservationId}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reservations'])
        toast.success('Reservation deleted successfully')
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to delete reservation')
      }
    }
  )

  const handleStatusUpdate = (reservationId, newStatus) => {
    updateReservationStatusMutation.mutate({ reservationId, status: newStatus })
  }

  const handleDeleteReservation = (reservationId) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      deleteReservationMutation.mutate(reservationId)
    }
  }

  const handleViewDetails = (reservation) => {
    setSelectedReservation(reservation)
    setShowDetailsModal(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending'
      case 'confirmed': return 'status-confirmed'
      case 'cancelled': return 'status-cancelled'
      case 'completed': return 'status-completed'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />
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
        <p className="text-red-600">Error loading reservations</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
          <p className="text-gray-600">Manage restaurant reservations and bookings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <button
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('')
                setDateFilter('')
              }}
              className="btn-secondary w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Customer</th>
                <th className="table-header">Date & Time</th>
                <th className="table-header">Guests</th>
                <th className="table-header">Contact</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservationsData?.reservations?.map((reservation) => (
                <tr key={reservation._id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div>
                      <p className="font-medium text-gray-900">{reservation.name}</p>
                      <p className="text-sm text-gray-500">{reservation.email}</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="font-medium text-gray-900">
                        {format(new Date(reservation.date), 'MMM dd, yyyy')}
                      </p>
                      <p className="text-sm text-gray-500">{reservation.time}</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="font-medium text-gray-900">{reservation.numberOfPeople}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{reservation.phone}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`status-badge ${getStatusColor(reservation.status)}`}>
                      {getStatusIcon(reservation.status)}
                      <span className="ml-1">{reservation.status}</span>
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(reservation)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(reservation._id, 'confirmed')}
                        disabled={reservation.status === 'confirmed'}
                        className="p-1 text-green-600 hover:text-green-800 disabled:opacity-50"
                        title="Confirm reservation"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(reservation._id, 'cancelled')}
                        disabled={reservation.status === 'cancelled'}
                        className="p-1 text-red-600 hover:text-red-800 disabled:opacity-50"
                        title="Cancel reservation"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {reservationsData?.pagination && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing {((reservationsData.pagination.page - 1) * reservationsData.pagination.limit) + 1} to{' '}
              {Math.min(reservationsData.pagination.page * reservationsData.pagination.limit, reservationsData.pagination.total)} of{' '}
              {reservationsData.pagination.total} results
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
                Page {page} of {reservationsData.pagination.pages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === reservationsData.pagination.pages}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reservation Details Modal */}
      {showDetailsModal && selectedReservation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Reservation Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <p className="text-gray-900">{selectedReservation.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{selectedReservation.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-900">{selectedReservation.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900">
                    {format(new Date(selectedReservation.date), 'EEEE, MMMM dd, yyyy')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <p className="text-gray-900">{selectedReservation.time}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <p className="text-gray-900">{selectedReservation.numberOfPeople} people</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <p className="text-gray-900">
                    {selectedReservation.specialRequests || 'No special requests'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`status-badge ${getStatusColor(selectedReservation.status)}`}>
                    {selectedReservation.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                  <p className="text-gray-900">
                    {format(new Date(selectedReservation.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDeleteReservation(selectedReservation._id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reservations 