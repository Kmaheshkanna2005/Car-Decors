# 🚗 Car Decors – Inventory Management System

A full-stack **MERN-based Inventory Management System** designed for managing car accessories in a service center environment.
The system allows **admins to manage inventory and staff**, while **staff can use parts through a cart-based workflow**.

---

## 📌 Features

### 👑 Admin Features

* ➕ Add new parts with image upload
* ✏️ Edit part details (name, category, price, image)
* ❌ Delete parts
* 📦 Increase stock quantity
* 🔧 Set exact stock (manual correction)
* ⚠️ Low stock alerts
* 👨‍🔧 Create and manage staff accounts
* 📊 Dashboard analytics (Total parts, stock, staff, usage)
* 📄 Generate PDF usage reports
* 📋 View usage history

---

### 👨‍🔧 Staff Features

* 🔍 View and search parts
* 🛒 Add parts to cart with quantity
* ✅ Commit cart (reduces stock)
* 📄 Generate usage report (PDF)

---

### 📊 System Features

* 🔐 JWT Authentication (Admin & Staff roles)
* 🖼 Image upload using Multer
* 📦 Inventory tracking system
* 📉 Stock auto-update after usage
* 📊 Charts & analytics dashboard
* 📍 Leaflet map integration (company location)

---

## 🛠 Tech Stack

### Frontend

* React.js
* Axios
* React Router
* Leaflet (Maps)
* Chart.js

### Backend

* Node.js
* Express.js

### Database

* MongoDB (MongoDB Atlas)

---

## 📁 Project Structure

```
Car-Decors/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/car-decors.git
cd car-decors
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```
node server.js
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

---

## 🔑 Default Flow

### Admin Workflow

```
Login → Dashboard → Manage Parts → Manage Staff → View Reports
```

### Staff Workflow

```
Login → View Parts → Add to Cart → Commit → Generate Report
```

---

## 📊 API Endpoints (Sample)

### Auth

```
POST /api/auth/login
```

### Parts

```
GET    /api/parts
POST   /api/parts
PATCH  /api/parts/:id/increase
PATCH  /api/parts/:id/set-stock
PUT    /api/parts/:id
DELETE /api/parts/:id
```

### Cart

```
POST /api/cart/add
GET  /api/cart
POST /api/cart/commit
```

### Reports

```
GET /api/reports/usage
GET /api/reports/history
```

---

## 📍 Map Feature

* Integrated using **Leaflet.js**
* Displays company location on map
* Can be extended to track service locations

---

## 📸 Screenshots (Add here)

* Login Page
* Admin Dashboard
* Parts Inventory
* Cart System
* Reports

---

## 🚀 Future Enhancements

* 🔔 Real-time notifications (Socket.io)
* 📜 Stock adjustment history (audit logs)
* 📥 Export inventory to Excel
* 📍 Live vehicle tracking
* 📱 Mobile app (React Native)

---

## 👨‍💻 Author

**Mahesh Kanna -**
Computer Science Engineering Student

---

## ⭐ Conclusion

This project demonstrates a **complete real-world inventory management system** using the MERN stack with advanced features like:

* Role-based access
* Stock control
* Reporting system
* Analytics dashboard

Perfect for **placements, portfolios, and real-world applications**.

---
