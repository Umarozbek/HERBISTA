// API Configuration
const API_CONFIG = {
  // Base URL for API requests
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  
  // API Endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      LOGIN: '/auth/login',
      ME: '/auth/me',
    },
    
    // Dashboard
    DASHBOARD: '/admin/dashboard',
    
    // Users
    USERS: '/admin/users',
    USER_BY_ID: (id) => `/admin/users/${id}`,
    
    // Orders
    ORDERS: '/admin/orders',
    ORDER_STATUS: (id) => `/admin/orders/${id}/status`,
    
    // Reservations
    RESERVATIONS: '/admin/reservations',
    RESERVATION_STATUS: (id) => `/admin/reservations/${id}/status`,
    RESERVATION_BY_ID: (id) => `/admin/reservations/${id}`,
    
    // Menu
    MENU: '/admin/menu',
    MENU_BY_ID: (id) => `/admin/menu/${id}`,
    MENU_CATEGORIES: '/admin/menu/categories',
    MENU_AVAILABILITY: (id) => `/admin/menu/${id}/availability`,
    
    // Gallery
    GALLERY: '/admin/gallery',
    GALLERY_BY_ID: (id) => `/admin/gallery/${id}`,
    GALLERY_CATEGORIES: '/admin/gallery/categories',
    GALLERY_ACTIVE: (id) => `/admin/gallery/${id}/active`,
    
    // File Upload
    UPLOAD: '/admin/upload',
  },
  
  // Request timeout (in milliseconds)
  TIMEOUT: 10000,
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
}

import axios from 'axios'

// USERS
export const fetchUsers = (params) => axios.get(API_CONFIG.ENDPOINTS.USERS, { params })
export const fetchUserById = (id) => axios.get(API_CONFIG.ENDPOINTS.USER_BY_ID(id))
export const updateUser = (id, data) => axios.put(API_CONFIG.ENDPOINTS.USER_BY_ID(id), data)
export const deleteUser = (id) => axios.delete(API_CONFIG.ENDPOINTS.USER_BY_ID(id))

// ORDERS
export const fetchOrders = (params) => axios.get(API_CONFIG.ENDPOINTS.ORDERS, { params })
export const updateOrderStatus = (id, data) => axios.put(API_CONFIG.ENDPOINTS.ORDER_STATUS(id), data)

// RESERVATIONS
export const fetchReservations = (params) => axios.get(API_CONFIG.ENDPOINTS.RESERVATIONS, { params })
export const fetchReservationById = (id) => axios.get(API_CONFIG.ENDPOINTS.RESERVATION_BY_ID(id))
export const updateReservationStatus = (id, data) => axios.put(API_CONFIG.ENDPOINTS.RESERVATION_STATUS(id), data)

// MENU
export const fetchMenu = (params) => axios.get(API_CONFIG.ENDPOINTS.MENU, { params })
export const fetchMenuById = (id) => axios.get(API_CONFIG.ENDPOINTS.MENU_BY_ID(id))
export const updateMenu = (id, data) => axios.put(API_CONFIG.ENDPOINTS.MENU_BY_ID(id), data)
export const deleteMenu = (id) => axios.delete(API_CONFIG.ENDPOINTS.MENU_BY_ID(id))
export const fetchMenuCategories = () => axios.get(API_CONFIG.ENDPOINTS.MENU_CATEGORIES)
export const updateMenuAvailability = (id, data) => axios.put(API_CONFIG.ENDPOINTS.MENU_AVAILABILITY(id), data)

// GALLERY
export const fetchGallery = (params) => axios.get(API_CONFIG.ENDPOINTS.GALLERY, { params })
export const fetchGalleryById = (id) => axios.get(API_CONFIG.ENDPOINTS.GALLERY_BY_ID(id))
export const updateGallery = (id, data) => axios.put(API_CONFIG.ENDPOINTS.GALLERY_BY_ID(id), data)
export const deleteGallery = (id) => axios.delete(API_CONFIG.ENDPOINTS.GALLERY_BY_ID(id))
export const fetchGalleryCategories = () => axios.get(API_CONFIG.ENDPOINTS.GALLERY_CATEGORIES)
export const updateGalleryActive = (id, data) => axios.put(API_CONFIG.ENDPOINTS.GALLERY_ACTIVE(id), data)

// CATEGORIES (Menu & Gallery)
// If you have a separate endpoint for categories, add here. Otherwise, use menu/gallery categories above.

// STAFF
export const fetchStaff = (params) => axios.get('/admin/staff', { params })
export const fetchStaffById = (id) => axios.get(`/admin/staff/${id}`)
export const updateStaff = (id, data) => axios.put(`/admin/staff/${id}`, data)
export const deleteStaff = (id) => axios.delete(`/admin/staff/${id}`)

// TABLES
export const fetchTables = (params) => axios.get('/admin/tables', { params })
export const fetchTableById = (id) => axios.get(`/admin/tables/${id}`)
export const updateTable = (id, data) => axios.put(`/admin/tables/${id}`, data)
export const deleteTable = (id) => axios.delete(`/admin/tables/${id}`)

// EVENTS
export const fetchEvents = (params) => axios.get('/admin/events', { params })
export const fetchEventById = (id) => axios.get(`/admin/events/${id}`)
export const updateEvent = (id, data) => axios.put(`/admin/events/${id}`, data)
export const deleteEvent = (id) => axios.delete(`/admin/events/${id}`)

// CUSTOMERS
export const fetchCustomers = (params) => axios.get('/admin/customers', { params })
export const fetchCustomerById = (id) => axios.get(`/admin/customers/${id}`)
export const updateCustomer = (id, data) => axios.put(`/admin/customers/${id}`, data)
export const deleteCustomer = (id) => axios.delete(`/admin/customers/${id}`)

// SETTINGS
export const fetchSettings = () => axios.get('/admin/settings')
export const updateSettings = (data) => axios.put('/admin/settings', data)

// ANALYTICS
export const fetchAnalytics = (params) => axios.get('/admin/analytics', { params })

export default API_CONFIG 