# Zudio Clone — Full-Stack MERN Storefront

Premium black & white fashion e-commerce app built with React, Express, MongoDB, JWT auth, and Razorpay payments.

## Project Structure

```
backend/src/
├── config/          # Environment configuration
├── database/        # MongoDB connection
├── models/          # User, Product, Cart, Order
├── controllers/     # Request handlers
├── services/        # Business logic
├── routes/          # API routes
├── middleware/      # Auth, validation, errors
├── validators/      # Joi schemas
├── utils/           # JWT, API responses
├── app.js
└── server.js

frontend/src/
├── components/      # ProductCard, ProtectedRoute, etc.
├── pages/           # Home, Cart, BuyForm, category pages
├── services/        # API clients
├── context/         # Auth & Cart state
├── hooks/           # useProducts
├── routes/          # AppRouter
├── layouts/         # Auth & Home layouts
├── styles/          # Global CSS + Tailwind
├── utils/
├── App.jsx
└── main.jsx
```

## Prerequisites

- Node.js 18+
- MongoDB running locally
- Razorpay test/live API keys (for payments)

## Setup

### 1. MongoDB

Ensure MongoDB is running. The app connects to:

```
mongodb://localhost:27017/zudiooo
```

Database `zudiooo` with collections `users`, `products`, `carts`, `orders` is created automatically.

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env — set JWT_SECRET and Razorpay keys
npm install
npm run dev
```

Backend runs at `http://localhost:5000`

### 3. Frontend

```bash
# From project root
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

## Environment Variables

**backend/.env**
| Variable | Description |
|---|---|
| `PORT` | Server port (default 5000) |
| `JWT_SECRET` | Secret for JWT signing |
| `JWT_EXPIRES_IN` | Token expiry (default 7d) |
| `MONGODB_URI` | MongoDB connection string |
| `RAZORPAY_KEY_ID` | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret |

**Root `.env`**
| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | API base URL (default `/api`) |

## Application Flow

```
Login / Register → Home → Categories → Products → Add to Cart / Buy Now
→ Checkout Form → Razorpay Payment → Order Success → Home
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/auth/me` | Yes | Current user |
| GET | `/api/products` | No | List products (`?category=Men`) |
| GET | `/api/products/:id` | No | Single product |
| GET | `/api/cart` | Yes | Get cart |
| POST | `/api/cart/items` | Yes | Add to cart |
| PATCH | `/api/cart/items/:id` | Yes | Update quantity |
| DELETE | `/api/cart/items/:id` | Yes | Remove item |
| POST | `/api/payments/create-order` | Yes | Create Razorpay order |
| POST | `/api/payments/verify` | Yes | Verify payment |
| GET | `/api/payments/orders` | Yes | Order history |

## Scripts

```bash
npm run dev          # Start frontend
npm run dev:backend  # Start backend
npm run build        # Production build
npm run lint         # ESLint
```
