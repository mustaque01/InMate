# InMate - Hostel Management System

A comprehensive full-stack hostel management application built with Next.js 15, TypeScript, Prisma, and SQLite.

## 🚀 Features

### **Core Functionality**
- **Role-based Authentication** - Secure login for Admins and Students
- **Room Management** - Create, update, and track room availability
- **Booking System** - Handle room reservations with status tracking
- **Payment Management** - Track rent payments and due dates
- **Notice Board** - Admin announcements with priority levels
- **Dashboard Analytics** - Real-time stats and insights

### **Advanced Features**
- **TypeScript Integration** - Full type safety across frontend and backend
- **Real-time Updates** - Live data synchronization
- **Data Export** - CSV export for reports and analytics
- **Security First** - Rate limiting, security headers, input validation
- **Error Handling** - Global error boundaries and consistent error states
- **Responsive Design** - Mobile-first UI with shadcn/ui components

## 🛠 Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### **Backend**
- **Next.js API Routes** - Server-side API endpoints
- **Prisma ORM** - Type-safe database client
- **SQLite** - Lightweight database (easily switchable)
- **JWT Authentication** - Secure token-based auth
- **bcryptjs** - Password hashing
- **Zod** - Request validation

### **DevOps & Tools**
- **TypeScript** - Static type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Prisma Studio** - Database management GUI

## 📊 Database Schema

```
Users (Admin/Student accounts with profile info)
├── Rooms (Room details, capacity, rent, amenities)
├── Bookings (Room reservations with status tracking)
├── Payments (Rent payments with due dates)
└── Notices (Admin announcements with priorities)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd InMate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Create database and tables
   npm run db:push
   
   # Seed initial data
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open application**
   Visit `http://localhost:3000`

## 👥 Default Accounts

After seeding, you can log in with:

### Admin Account
- **Email:** `admin@hostel.com`
- **Password:** `admin123`

### Student Account  
- **Email:** `john.doe@student.com`
- **Password:** `student123`

## 📁 Project Structure

```
InMate/
├── app/                     # Next.js App Router
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── rooms/          # Room management
│   │   ├── bookings/       # Booking system  
│   │   ├── payments/       # Payment tracking
│   │   ├── notices/        # Notice board
│   │   └── users/          # User management
│   ├── admin/              # Admin dashboard pages
│   ├── student/            # Student portal pages
│   └── auth/               # Authentication pages
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── admin/              # Admin-specific components  
│   └── auth/               # Authentication components
├── lib/                    # Utility libraries
│   ├── api-client.ts       # Centralized API client
│   ├── auth.ts             # Authentication utilities
│   ├── types.ts            # TypeScript type definitions
│   ├── validations.ts      # Zod validation schemas
│   └── export-utils.ts     # Data export utilities
├── hooks/                  # Custom React hooks
├── contexts/               # React context providers
├── prisma/                 # Database schema and migrations
└── middleware.ts           # Next.js middleware (rate limiting, security)
```

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs with salt rounds
- **Rate Limiting** - API request throttling
- **Security Headers** - XSS, CSRF, clickjacking protection
- **Input Validation** - Zod schema validation
- **Role-based Access** - Admin/Student permission levels

## 📈 Performance Features

- **TypeScript** - Compile-time error detection
- **API Client** - Centralized request handling with caching
- **Error Boundaries** - Graceful error handling
- **Loading States** - Smooth user experience
- **Optimistic Updates** - Instant UI feedback

## 🛠 Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Lint code

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema changes
npx prisma db seed     # Seed database
npm run db:studio       # Open Prisma Studio
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration  
- `GET /api/auth/me` - Get current user

### Rooms
- `GET /api/rooms` - List rooms with filters
- `POST /api/rooms` - Create room (Admin)
- `GET /api/rooms/[id]` - Get room details
- `PUT /api/rooms/[id]` - Update room (Admin)
- `DELETE /api/rooms/[id]` - Delete room (Admin)

### Bookings
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/[id]` - Update booking status (Admin)
- `DELETE /api/bookings/[id]` - Cancel booking

### Payments  
- `GET /api/payments` - List payments
- `POST /api/payments` - Create payment record (Admin)
- `PUT /api/payments/[id]` - Update payment status (Admin)

### Notices
- `GET /api/notices` - List notices
- `POST /api/notices` - Create notice (Admin)
- `PUT /api/notices/[id]` - Update notice (Admin)
- `DELETE /api/notices/[id]` - Delete notice (Admin)

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## 🚀 Deployment

### Environment Setup
1. Set production environment variables
2. Use a production database (PostgreSQL recommended)
3. Configure JWT secrets
4. Set up proper CORS policies

### Database Migration
```bash
# For production deployment
npx prisma generate
npx prisma db push
```

## 🔧 Customization

### Adding New Features
1. Define types in `lib/types.ts`
2. Create API routes in `app/api/`
3. Add validation schemas in `lib/validations.ts`
4. Create UI components
5. Add custom hooks in `hooks/`

### Switching Database
1. Update `prisma/schema.prisma` datasource
2. Install database driver
3. Update connection string in `.env`
4. Run `npx prisma generate`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**MD MUSTAK**
- Email: mustakarman560@gmail.com
- GitHub: [Your GitHub Profile]

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://prisma.io/) - Database toolkit
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

## 🆕 Recent Improvements

### ✅ **Production-Ready Enhancements**
- **Complete TypeScript Integration** - Shared types between frontend/backend
- **Real API Integration** - Replaced mock auth with actual backend calls  
- **Centralized API Client** - Error handling and token management
- **Input Validation** - Zod schemas for all forms and API requests
- **Global Error Handling** - Error boundaries and consistent error states
- **Security Middleware** - Rate limiting and security headers
- **Data Export** - CSV export functionality for reports
- **Performance Optimization** - Loading states and error handling

### 🔮 **Future Enhancements** 
- **Real-time Features** - WebSocket integration for live updates
- **Advanced Analytics** - Detailed reporting and insights
- **File Uploads** - Profile pictures and document management  
- **Email Integration** - Automated notifications
- **Mobile App** - React Native companion app
- **Multi-tenancy** - Support for multiple hostels

Ready for production deployment! 🎉
