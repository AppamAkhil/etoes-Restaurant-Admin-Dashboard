🍽️ Eatoes – Restaurant Admin Dashboard

A full-stack Restaurant Admin Dashboard that allows restaurant owners to manage menu items, view and update orders, and track availability in real time.
Built as part of the Eatoes Intern Technical Assessment.

🚀 Project Overview

The Eatoes Admin Dashboard is a MERN stack application designed to simulate real-world restaurant operations.
It demonstrates backend API design, MongoDB querying, React best practices, and performance optimizations such as debounced search and optimistic UI updates.

✨ Features Implemented
🔹 Menu Management

View all menu items

Search menu items by name or ingredients (MongoDB text search)

Filter by category and availability

Toggle availability with optimistic UI updates

Responsive grid layout

🔹 Orders Dashboard

View all orders with status badges

Pagination and status filtering

View total order amount

Update order status (Pending → Preparing → Ready → Delivered)

🔹 Performance & Best Practices

Debounced search (300ms delay)

RESTful API design

MongoDB Atlas cloud database

Proper error handling

Clean project structure

🛠️ Tech Stack
Frontend

React 18

Axios

React Router DOM

CSS (custom responsive styles)

Backend

Node.js

Express.js

MongoDB (Atlas)

Mongoose

✅ Prerequisites

Make sure you have the following installed:

Node.js (v18 or above)

npm

MongoDB Atlas account (free tier)

Git (optional)

Check versions:

node -v
npm -v

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/eatoes-admin-dashboard.git
cd eatoes-admin-dashboard

2️⃣ Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/eatoes


Start backend:

npm start


Backend runs at:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install


Create .env file:

REACT_APP_API_URL=http://localhost:5000/api


Start frontend:

npm start


Frontend runs at:

http://localhost:3000

4️⃣ Seed Sample Data (Optional but Recommended)
cd backend
node seed.js


This populates:

Sample menu items

Sample orders

🔐 Environment Variables
Backend (backend/.env)
Variable	Description
PORT	Backend server port
MONGO_URI	MongoDB Atlas connection string
Frontend (frontend/.env)
Variable	Description
REACT_APP_API_URL	Backend API base URL
📡 API Endpoints Documentation
🥗 Menu APIs
Get all menu items
GET /api/menu


Response

[
  {
    "_id": "123",
    "name": "Veg Burger",
    "category": "Main Course",
    "price": 150,
    "isAvailable": true
  }
]

Search menu items
GET /api/menu/search?q=burger

Toggle availability
PATCH /api/menu/:id/availability

📦 Order APIs
Get all orders
GET /api/orders


Response

{
  "total": 1,
  "page": 1,
  "pages": 1,
  "orders": [
    {
      "orderNumber": "ORD-1001",
      "status": "Pending",
      "totalAmount": 500
    }
  ]
}

Create order
POST /api/orders


Request

{
  "customerName": "Akhil",
  "tableNumber": 5,
  "items": [
    { "menuItem": "MENU_ITEM_ID", "quantity": 2 }
  ]
}

Update order status
PATCH /api/orders/:id/status

{
  "status": "Delivered"
}

⚠️ Challenges Faced & Solutions
🔹 MongoDB Connection Issues

Problem: Local MongoDB connection errors
Solution: Switched to MongoDB Atlas, ensuring reliability and production readiness.

🔹 Excessive API Calls During Search

Problem: API called on every keystroke
Solution: Implemented a custom useDebounce hook (300ms delay).

🔹 UI Lag on Availability Toggle

Problem: UI waited for API response
Solution: Implemented optimistic UI updates with rollback on error.

🔹 Project Structure Complexity

Problem: Managing frontend & backend separately
Solution: Adopted a clear modular folder structure for scalability.

📌 Future Improvements

Role-based authentication

Analytics dashboard (top-selling items)

React Query / SWR integration

UI enhancement using Tailwind or Material UI

📬 Submission Details

GitHub Repository: (https://github.com/AppamAkhil/etoes-Restaurant-Admin-Dashboard.git)

Backend API URL: https://etoes-backend.onrender.com/api

Frontend URL: https://legendary-griffin-fc0a01.netlify.app/

🙌 Conclusion

This project demonstrates my ability to:

Build scalable REST APIs

Design MongoDB schemas and queries

Implement React best practices

Handle real-world frontend and backend challenges

Thank you for reviewing my submission!
