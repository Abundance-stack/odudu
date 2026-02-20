# UISS Backend Setup Guide

## Prerequisites

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - [Download](https://www.mongodb.com/try/download/community)
3. **Paystack Account** - [Sign up](https://paystack.com/)

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup MongoDB

**Option A: Local MongoDB**
- Install MongoDB Community Edition
- Start MongoDB service:
  ```bash
  # Windows
  net start MongoDB
  
  # Mac/Linux
  sudo systemctl start mongod
  ```

**Option B: MongoDB Atlas (Cloud)**
- Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster
- Get connection string
- Update `.env` file with connection string

### 3. Configure Environment Variables

Create `.env` file:
```bash
cp .env.example .env
```

Update the following in `.env`:

```env
# Required
PORT=5000
MONGODB_URI=mongodb://localhost:27017/uiss_school
JWT_SECRET=your_random_secret_key_here

# Paystack (Get from https://dashboard.paystack.com/#/settings/developer)
PAYSTACK_SECRET_KEY=sk_test_your_key_here
PAYSTACK_PUBLIC_KEY=pk_test_your_key_here

# Optional
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### 4. Start the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

### 5. Test the API

Visit: `http://localhost:5000/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "UISS Backend Server Running"
}
```

## Frontend Integration

Update `script.js` API_URL if backend runs on different port:

```javascript
const API_URL = 'http://localhost:5000/api';
```

## Creating Admin Account

Use API or MongoDB directly:

```javascript
// POST to /api/auth/signup
{
  "fullname": "Admin User",
  "email": "admin@uiss.edu.ng",
  "phone": "08012345678",
  "studentId": "ADMIN001",
  "password": "admin123",
  "userType": "admin"
}
```

## Payment Gateway Setup

### Paystack Integration

1. Sign up at [Paystack](https://paystack.com/)
2. Go to Settings > API Keys & Webhooks
3. Copy Test Keys (for development)
4. Add to `.env` file
5. For production, use Live Keys

### Test Cards (Paystack)

- **Success**: 4084084084084081
- **Insufficient Funds**: 5060666666666666666
- **CVV**: 408
- **Expiry**: Any future date
- **PIN**: 0000

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Windows
sc query MongoDB

# Mac/Linux
sudo systemctl status mongod
```

### Port Already in Use
Change PORT in `.env` file to different number (e.g., 5001)

### CORS Errors
Make sure frontend and backend URLs are correctly configured

## Production Deployment

### Recommended Platforms

1. **Backend**: Heroku, Railway, Render, DigitalOcean
2. **Database**: MongoDB Atlas
3. **Frontend**: Netlify, Vercel, GitHub Pages

### Environment Variables for Production

- Set `NODE_ENV=production`
- Use Live Paystack keys
- Update `FRONTEND_URL` to production domain
- Use strong `JWT_SECRET`

## API Documentation

See `README.md` for complete API endpoints documentation.

## Support

For issues, contact: pixeltech@gmail.com
