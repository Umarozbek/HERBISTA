import { useQuery } from 'react-query'
import { fetchAnalytics } from '../config/api'

const Dashboard = () => {
  const { data, isLoading, error } = useQuery('analytics', () => fetchAnalytics().then(res => res.data.data))

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
        <p className="text-red-600">Error loading dashboard data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card flex flex-col items-center justify-center p-6">
          <span className="text-3xl font-bold text-green-600">{data?.totalUsers ?? 0}</span>
          <span className="text-gray-700 mt-2">Total Users</span>
        </div>
        <div className="card flex flex-col items-center justify-center p-6">
          <span className="text-3xl font-bold text-blue-600">{data?.totalOrders ?? 0}</span>
          <span className="text-gray-700 mt-2">Total Orders</span>
        </div>
        <div className="card flex flex-col items-center justify-center p-6">
          <span className="text-3xl font-bold text-purple-600">${data?.totalRevenue?.toFixed(2) ?? '0.00'}</span>
          <span className="text-gray-700 mt-2">Total Revenue</span>
        </div>
      </div>
      {/* Add more cards/charts as needed for analytics */}
    </div>
  )
}

export default Dashboard 