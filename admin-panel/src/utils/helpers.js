import { format, parseISO } from 'date-fns'

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

// Format date
export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatString)
}

// Format date and time
export const formatDateTime = (date) => {
  return formatDate(date, 'MMM dd, yyyy HH:mm')
}

// Get status color class
export const getStatusColor = (status) => {
  const statusColors = {
    pending: 'status-pending',
    confirmed: 'status-confirmed',
    cancelled: 'status-cancelled',
    completed: 'status-completed',
    preparing: 'bg-blue-100 text-blue-800',
    ready: 'bg-purple-100 text-purple-800',
    'out-for-delivery': 'bg-orange-100 text-orange-800',
    delivered: 'status-completed',
    active: 'status-confirmed',
    inactive: 'status-cancelled',
    available: 'status-confirmed',
    unavailable: 'status-cancelled',
  }
  return statusColors[status] || 'bg-gray-100 text-gray-800'
}

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Generate initials from name
export const getInitials = (name) => {
  if (!name) return ''
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Format phone number
export const formatPhone = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return phone
}

// Debounce function
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Convert to title case
export const toTitleCase = (str) => {
  if (!str) return ''
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Check if image URL is valid
export const isValidImageUrl = (url) => {
  if (!url) return false
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  return imageExtensions.some(ext => url.toLowerCase().includes(ext))
}

// Get file extension
export const getFileExtension = (filename) => {
  if (!filename) return ''
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

// Validate required fields
export const validateRequired = (fields, data) => {
  const errors = {}
  fields.forEach(field => {
    if (!data[field] || data[field].toString().trim() === '') {
      errors[field] = `${capitalize(field)} is required`
    }
  })
  return errors
}

// Calculate pagination info
export const getPaginationInfo = (pagination) => {
  if (!pagination) return {}
  
  const { page, limit, total, pages } = pagination
  const start = ((page - 1) * limit) + 1
  const end = Math.min(page * limit, total)
  
  return {
    start,
    end,
    total,
    pages,
    hasNext: page < pages,
    hasPrev: page > 1
  }
} 