import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { Plus, Edit, Trash2, Eye, Search, Filter, Utensils, DollarSign, Tag } from 'lucide-react'
import { fetchMenu, fetchMenuCategories, updateMenu, deleteMenu, updateMenuAvailability } from '../config/api'

const Menu = () => {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    isAvailable: true,
    isFeatured: false
  })
  const queryClient = useQueryClient()

  const { data: menuData, isLoading, error } = useQuery(
    ['menu', page, searchTerm, categoryFilter],
    () => fetchMenu({ page, limit: 10, search: searchTerm, category: categoryFilter }).then(res => res.data.data)
  )

  const { data: categories } = useQuery(
    'categories',
    () => fetchMenuCategories().then(res => res.data.data)
  )

  const updateMenuMutation = useMutation(
    ({ itemId, itemData }) => updateMenu(itemId, itemData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['menu'])
        setShowEditModal(false)
        setSelectedItem(null)
        toast.success('Menu item updated successfully')
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update menu item')
      }
    }
  )

  const deleteMenuMutation = useMutation(
    (itemId) => deleteMenu(itemId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['menu'])
        toast.success('Menu item deleted successfully')
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to delete menu item')
      }
    }
  )

  const toggleAvailabilityMutation = useMutation(
    ({ itemId, isAvailable }) => updateMenuAvailability(itemId, { isAvailable }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['menu'])
        toast.success('Availability updated successfully')
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update availability')
      }
    }
  )

  const handleAddItem = () => {
    // This mutation is not defined in the new_code, so it will be removed.
    // addMenuItemMutation.mutate(newItem)
  }

  const handleEditItem = (item) => {
    setSelectedItem(item)
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image || '',
      isAvailable: item.isAvailable,
      isFeatured: item.isFeatured
    })
    setShowEditModal(true)
  }

  const handleUpdateItem = () => {
    updateMenuMutation.mutate({ itemId: selectedItem._id, itemData: newItem })
  }

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      deleteMenuMutation.mutate(itemId)
    }
  }

  const handleToggleAvailability = (itemId, currentStatus) => {
    toggleAvailabilityMutation.mutate({ itemId, isAvailable: !currentStatus })
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
        <p className="text-red-600">Error loading menu items</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600">Manage your restaurant's menu items and categories</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Menu Item
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Item</th>
                <th className="table-header">Category</th>
                <th className="table-header">Price</th>
                <th className="table-header">Status</th>
                <th className="table-header">Featured</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {menuData?.menuItems?.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                        ) : (
                          <Utensils className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Tag className="h-3 w-3 mr-1" />
                      {item.category}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                      <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleToggleAvailability(item._id, item.isAvailable)}
                      className={`status-badge ${
                        item.isAvailable ? 'status-confirmed' : 'status-cancelled'
                      } cursor-pointer`}
                    >
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </button>
                  </td>
                  <td className="table-cell">
                    <span className={`status-badge ${
                      item.isFeatured ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.isFeatured ? 'Featured' : 'Regular'}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="Edit item"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Delete item"
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
        {menuData?.pagination && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing {((menuData.pagination.page - 1) * menuData.pagination.limit) + 1} to{' '}
              {Math.min(menuData.pagination.page * menuData.pagination.limit, menuData.pagination.total)} of{' '}
              {menuData.pagination.total} results
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
                Page {page} of {menuData.pagination.pages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === menuData.pagination.pages}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Menu Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add Menu Item</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    className="input-field"
                    placeholder="Item name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    className="input-field"
                    rows="3"
                    placeholder="Item description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                    className="input-field"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select category</option>
                    {categories?.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newItem.image}
                    onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newItem.isAvailable}
                      onChange={(e) => setNewItem({...newItem, isAvailable: e.target.checked})}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Available</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newItem.isFeatured}
                      onChange={(e) => setNewItem({...newItem, isFeatured: e.target.checked})}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  disabled={!newItem.name || !newItem.price || !newItem.category}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Menu Item Modal */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Menu Item</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    className="input-field"
                    placeholder="Item name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    className="input-field"
                    rows="3"
                    placeholder="Item description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                    className="input-field"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select category</option>
                    {categories?.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newItem.image}
                    onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newItem.isAvailable}
                      onChange={(e) => setNewItem({...newItem, isAvailable: e.target.checked})}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Available</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newItem.isFeatured}
                      onChange={(e) => setNewItem({...newItem, isFeatured: e.target.checked})}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateItem}
                  disabled={!newItem.name || !newItem.price || !newItem.category}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Menu 