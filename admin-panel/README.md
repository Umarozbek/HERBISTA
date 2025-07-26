# Herbista Admin Panel

A comprehensive admin panel for managing the Herbista restaurant's operations, built with React, Vite, and Tailwind CSS.

## Features

### 🔐 Authentication
- Secure admin login system
- Role-based access control
- JWT token authentication
- Automatic session management

### 📊 Dashboard
- Real-time statistics overview
- Today's orders, reservations, and revenue
- Recent activity feed
- Quick action buttons
- Visual data representation

### 👥 User Management
- View all registered users
- Search and filter users
- Toggle user roles (admin/user)
- User verification status management
- Delete user accounts

### 🛒 Order Management
- View all restaurant orders
- Filter orders by status
- Update order status (pending → confirmed → preparing → ready → delivered)
- Order details and customer information
- Pagination support

### 📅 Reservation Management
- View all restaurant reservations
- Filter by status and date
- Update reservation status
- Detailed reservation information
- Contact customer details

### 🍽️ Menu Management
- Add, edit, and delete menu items
- Category management
- Image upload support
- Price and availability control
- Featured item management
- Search and filter functionality

### 🖼️ Gallery Management
- Upload and manage gallery images
- Category organization
- Image status control (active/inactive)
- Bulk image operations
- Responsive grid layout

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API server running

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd admin-panel
```

2. Install dependencies:
```bash
npm install
```

3. Configure the API base URL:
   - Update the axios base URL in your API calls or create an environment variable
   - Default API endpoint: `http://localhost:5000/api`

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Usage

### Login
- Use the provided demo credentials or create an admin account
- Demo: `admin@herbista.com` / `admin123`

### Dashboard
- View real-time statistics
- Monitor recent orders and reservations
- Access quick actions for common tasks

### User Management
- Search users by name or email
- Toggle user roles between admin and regular user
- Manage user verification status
- Delete user accounts when necessary

### Order Management
- View all orders with detailed information
- Filter orders by status (pending, confirmed, preparing, etc.)
- Update order status through the workflow
- View customer details and order items

### Reservation Management
- View all reservations with customer details
- Filter by status and date
- Update reservation status
- View detailed reservation information

### Menu Management
- Add new menu items with images
- Edit existing menu items
- Manage categories and pricing
- Control item availability and featured status
- Upload images for menu items

### Gallery Management
- Upload gallery images
- Organize images by categories
- Control image visibility (active/inactive)
- Manage image metadata and descriptions

## API Endpoints

The admin panel expects the following API endpoints:

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user info

### Dashboard
- `GET /api/admin/dashboard` - Dashboard statistics

### Users
- `GET /api/admin/users` - Get users with pagination
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

### Orders
- `GET /api/admin/orders` - Get orders with pagination
- `PUT /api/admin/orders/:id/status` - Update order status

### Reservations
- `GET /api/admin/reservations` - Get reservations with pagination
- `PUT /api/admin/reservations/:id/status` - Update reservation status
- `DELETE /api/admin/reservations/:id` - Delete reservation

### Menu
- `GET /api/admin/menu` - Get menu items with pagination
- `POST /api/admin/menu` - Add menu item
- `PUT /api/admin/menu/:id` - Update menu item
- `DELETE /api/admin/menu/:id` - Delete menu item
- `GET /api/admin/menu/categories` - Get menu categories
- `PATCH /api/admin/menu/:id/availability` - Toggle item availability

### Gallery
- `GET /api/admin/gallery` - Get gallery images with pagination
- `POST /api/admin/gallery` - Add gallery image
- `PUT /api/admin/gallery/:id` - Update gallery image
- `DELETE /api/admin/gallery/:id` - Delete gallery image
- `GET /api/admin/gallery/categories` - Get gallery categories
- `PATCH /api/admin/gallery/:id/active` - Toggle image active status

### File Upload
- `POST /api/admin/upload` - Upload images

## Project Structure

```
admin-panel/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Main layout with sidebar
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── pages/
│   │   ├── Dashboard.jsx       # Dashboard overview
│   │   ├── Users.jsx          # User management
│   │   ├── Orders.jsx         # Order management
│   │   ├── Reservations.jsx   # Reservation management
│   │   ├── Menu.jsx           # Menu management
│   │   ├── Gallery.jsx        # Gallery management
│   │   └── Login.jsx          # Login page
│   ├── styles/
│   │   └── index.css          # Global styles and Tailwind
│   ├── utils/                 # Utility functions
│   ├── App.jsx               # Main app component
│   └── main.jsx              # App entry point
├── public/                   # Static assets
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Styling
- Modify `src/styles/index.css` for global styles
- Update Tailwind classes in components
- Customize color scheme in Tailwind config

### Components
- Add new pages in `src/pages/`
- Create reusable components in `src/components/`
- Update navigation in `src/components/Layout.jsx`

### API Integration
- Update API endpoints in components
- Modify request/response handling
- Add new API integrations as needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository. 