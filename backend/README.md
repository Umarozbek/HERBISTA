# Herbista Backend API

A comprehensive REST API for the Herbista restaurant management system with user and admin roles.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Registration, login, profile management, password reset
- **Menu Management**: CRUD operations for menu items with categories and ratings
- **Reservation System**: Table booking with availability checking
- **Order Management**: Food ordering with payment processing
- **Gallery Management**: Photo gallery with like/save/share functionality
- **Admin Dashboard**: Comprehensive admin panel for restaurant management

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/herbista
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password/:token` - Reset password
- `POST /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/logout` - Logout user

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Change password
- `GET /api/users/orders` - Get user orders
- `GET /api/users/orders/:id` - Get specific order
- `GET /api/users/reservations` - Get user reservations
- `GET /api/users/reservations/:id` - Get specific reservation
- `DELETE /api/users/reservations/:id` - Cancel reservation

### Menu

- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get specific menu item
- `POST /api/menu/:id/rate` - Rate menu item
- `GET /api/menu/categories` - Get menu categories
- `GET /api/menu/featured` - Get featured items

### Reservations

- `POST /api/reservations` - Create reservation
- `GET /api/reservations/available-times` - Get available times

### Orders

- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get specific order
- `PUT /api/orders/:id/cancel` - Cancel order
- `POST /api/orders/:id/rate` - Rate order

### Gallery

- `GET /api/gallery` - Get gallery items
- `GET /api/gallery/categories` - Get gallery categories
- `POST /api/gallery/:id/like` - Like/unlike item
- `POST /api/gallery/:id/save` - Save/unsave item
- `POST /api/gallery/:id/share` - Share item

### Admin Routes

#### Dashboard
- `GET /api/admin/dashboard` - Get dashboard stats

#### User Management
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

#### Order Management
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status

#### Reservation Management
- `GET /api/admin/reservations` - Get all reservations
- `PUT /api/admin/reservations/:id/status` - Update reservation status

#### Menu Management
- `POST /api/menu` - Create menu item (Admin only)
- `PUT /api/menu/:id` - Update menu item (Admin only)
- `DELETE /api/menu/:id` - Delete menu item (Admin only)

#### Gallery Management
- `POST /api/gallery` - Add gallery item (Admin only)
- `PUT /api/gallery/:id` - Update gallery item (Admin only)
- `DELETE /api/gallery/:id` - Delete gallery item (Admin only)

## Database Models

### User
- Authentication fields (email, password)
- Profile information (name, phone, address)
- Role-based access (user/admin)
- Email verification
- Password reset functionality

### Menu
- Menu item details (name, description, price)
- Categories and tags
- Nutritional information
- Ratings and reviews
- Availability status

### Reservation
- Booking details (date, time, people)
- Table preferences
- Special requests
- Status tracking

### Order
- Order items and quantities
- Payment information
- Delivery details
- Status tracking
- Rating system

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Input validation with express-validator
- CORS configuration
- Rate limiting
- Helmet security headers
- Role-based authorization

## Error Handling

- Centralized error handling middleware
- Validation error responses
- Proper HTTP status codes
- Detailed error messages in development

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/herbista |
| `JWT_SECRET` | JWT secret key | Required |
| `JWT_EXPIRE` | JWT expiration | 7d |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## Testing

```bash
npm test
```

## API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Optional message"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    // Validation errors
  ]
}
```

## Rate Limiting

- 100 requests per 15 minutes per IP address
- Applied to all `/api/` routes

## CORS Configuration

- Configured for frontend URL
- Credentials enabled
- Customizable via environment variables 