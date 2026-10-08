# 🍔 Food Delivery System

A full-stack **MERN Food Delivery System** where users can browse food items, create an account, add items to their cart, place orders, and make payments using Stripe.

The project also includes a separate **Admin Panel** for managing food items and tracking customer orders.

## 🚀 Live Demo

### Customer Website

https://food-delivery-system-chi-three.vercel.app

### Admin Panel

https://food-delivery-system-ohf2.vercel.app

### Backend API

https://food-delivery-system-2xcs.onrender.com

---

## ✨ Features

### 👤 User Features

* User Registration and Login
* JWT-based Authentication
* Browse food items
* Explore food by category
* Add food items to cart
* Increase/decrease food quantity
* Remove items from cart
* Cart data stored in MongoDB
* Place orders
* Cash on Delivery
* Stripe online payment
* View previous orders
* Track order status

### 🛠️ Admin Features

* Admin dashboard
* Add new food items
* Upload food images
* View all food items
* Delete food items
* View customer orders
* View order details
* Update order status
* Order status options:

  * Food Processing
  * Out for Delivery
  * Delivered

---

## 🧑‍💻 Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* React Toastify
* CSS

### Admin Panel

* React.js
* Vite
* React Router
* Axios
* React Toastify
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Multer
* Stripe

### Deployment

* Vercel – Frontend
* Vercel – Admin Panel
* Render – Backend
* MongoDB Atlas – Database

---

## 📂 Project Structure

```text
FOOD-DELIVERY-SYSTEM/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AppDownload/
│   │   │   ├── ExploreMenu/
│   │   │   ├── FoodDisplay/
│   │   │   ├── FoodItem/
│   │   │   ├── Footer/
│   │   │   ├── Header/
│   │   │   ├── LoginPopup/
│   │   │   └── Navbar/
│   │   │
│   │   ├── context/
│   │   │   └── StoreContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Cart/
│   │   │   ├── Home/
│   │   │   ├── MyOrders/
│   │   │   ├── PlaceOrder/
│   │   │   └── Verify/
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── vercel.json
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── cartController.js
│   │   ├── foodController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── foodModel.js
│   │   ├── orderModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── cartRoute.js
│   │   ├── foodRoute.js
│   │   ├── orderRoute.js
│   │   └── userRoute.js
│   │
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── admin/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── pages/
    │   │   ├── Add/
    │   │   ├── List/
    │   │   └── Orders/
    │   ├── App.jsx
    │   └── main.jsx
    │
    └── package.json
```

---

## 🔄 How the Application Works

```text
                    ┌───────────────┐
                    │    MongoDB    │
                    │     Atlas     │
                    └───────▲───────┘
                            │
                            │
                    ┌───────┴───────┐
                    │   Express.js  │
                    │   Backend API │
                    └───────▲───────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              │                           │
       ┌──────┴──────┐             ┌──────┴──────┐
       │   Customer  │             │    Admin    │
       │   Frontend  │             │    Panel    │
       │    Vercel   │             │   Vercel    │
       └─────────────┘             └─────────────┘
```

### Order Flow

```text
User
 ↓
Select Food
 ↓
Add to Cart
 ↓
Place Order
 ↓
Cash on Delivery / Stripe
 ↓
Order Stored in MongoDB
 ↓
Admin Views Order
 ↓
Admin Updates Status
 ↓
User Tracks Order
```

---

## 💳 Stripe Payment

The application integrates **Stripe Checkout** for online payments.

The payment flow is:

```text
Customer
   ↓
Place Order
   ↓
Backend creates Stripe Checkout Session
   ↓
Stripe Payment Page
   ↓
Payment Successful
   ↓
Verify Order
   ↓
Order marked as Paid
```

The Stripe secret key is stored securely using environment variables and is **not included in the repository**.

---

## 🔐 Authentication

The application uses **JWT (JSON Web Token)** for user authentication.

After successful login:

```text
User Login
    ↓
Backend verifies credentials
    ↓
JWT Token generated
    ↓
Token stored on frontend
    ↓
Token sent with protected API requests
```

Protected routes include user-specific operations such as:

* Cart management
* Placing orders
* Viewing orders

---

## 🌐 API Routes

### User

```text
POST /api/user/register
POST /api/user/login
```

### Food

```text
POST /api/food/add
GET  /api/food/list
POST /api/food/remove
```

### Cart

```text
POST /api/cart/add
POST /api/cart/remove
POST /api/cart/get
```

### Orders

```text
POST /api/order/place
POST /api/order/stripe
POST /api/order/verify
POST /api/order/userorders
GET  /api/order/list
POST /api/order/status
```

### Images

```text
GET /images/<image-name>
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend` folder.

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=your_frontend_url
```

### Example

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_secret
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Never commit your `.env` file to GitHub.**

Add this to `.gitignore`:

```text
.env
node_modules
```

---

## 🛠️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Lavyaagrawal/FOOD-DELIVERY-SYSTEM.git
```

```bash
cd FOOD-DELIVERY-SYSTEM
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create your `.env` file:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
node server.js
```

The backend will run on:

```text
http://localhost:4000
```

---

### 3. Setup Customer Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

### 4. Setup Admin Panel

Open another terminal:

```bash
cd admin
npm install
npm run dev
```

The Admin Panel will run on the Vite development port shown in the terminal.

---

## 📦 Build for Production

### Frontend

```bash
cd frontend
npm run build
```

### Admin

```bash
cd admin
npm run build
```

---

## 🧪 Testing the Application

You can test the complete application using the following flow:

### Customer

```text
Register
 ↓
Login
 ↓
Browse Food
 ↓
Add Food to Cart
 ↓
Checkout
 ↓
Select Payment Method
 ↓
Place Order
 ↓
View My Orders
 ↓
Track Order
```

### Admin

```text
Open Admin Panel
 ↓
Add Food
 ↓
View Food List
 ↓
View Orders
 ↓
Update Order Status
```

---

## 🔒 Security Notes

* Environment variables are used for sensitive credentials.
* JWT is used for authentication.
* MongoDB credentials should never be committed to GitHub.
* Stripe secret keys should never be exposed in frontend code.
* `.env` should always be included in `.gitignore`.

---

## 🚀 Deployment

The application is deployed using:

```text
Customer Frontend → Vercel
Admin Panel       → Vercel
Backend API       → Render
Database          → MongoDB Atlas
Payment           → Stripe
```

---

## 📌 Future Improvements

Some possible improvements for future versions:

* Admin authentication and role-based access
* Search functionality
* Food ratings and reviews
* Order cancellation
* Better order tracking UI
* Email/SMS order notifications
* Improved responsive design
* Cloud image storage
* Payment webhooks for more reliable payment verification
* Advanced admin dashboard with analytics

---

## 👨‍💻 Author

**Lavya Agrawal**

B.Tech Computer Science Engineering

GitHub:
https://github.com/Lavyaagrawal

LinkedIn:
https://linkedin.com/in/lavya-agrawal-026771287

---

## ⭐ If you like this project

Give the repository a ⭐ on GitHub!
