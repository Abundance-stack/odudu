# UISS International Secondary School - Backend API

Complete backend system for UISS school management with authentication, payment processing, and results management.

## Features

- **Authentication System**: Student and Teacher/Admin login with JWT
- **Payment Processing**: Integrated with Paystack for online fee payment
- **Results Management**: Create, view, and publish student results
- **Student Management**: CRUD operations for student records
- **Role-Based Access Control**: Different permissions for students, teachers, and admins

## Tech Stack

- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- Paystack Payment Gateway
- bcryptjs for password hashing

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your credentials

4. Start MongoDB

5. Run the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user
- POST `/api/auth/forgot-password` - Request password reset

### Payment
- POST `/api/payment/initialize` - Initialize payment
- GET `/api/payment/verify/:reference` - Verify payment
- GET `/api/payment/student/:studentId` - Get payment history
- GET `/api/payment/all` - Get all payments (Admin)

### Results
- POST `/api/results/create` - Create/Update result (Teacher/Admin)
- GET `/api/results/student/:studentId` - Get student results
- GET `/api/results/class/:className` - Get class results (Teacher/Admin)
- PUT `/api/results/publish/:resultId` - Publish result (Admin)

### Students
- GET `/api/students` - Get all students (Teacher/Admin)
- GET `/api/students/:studentId` - Get student by ID
- PUT `/api/students/:studentId` - Update student (Admin)
- DELETE `/api/students/:studentId` - Delete student (Admin)

## Environment Variables

See `.env.example` for required variables.

## License

MIT
