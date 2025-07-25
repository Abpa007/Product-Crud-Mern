# AP-Store

A **clean, scalable, job-ready full-stack MERN e-commerce platform** with JWT authentication, REST APIs, admin panel, and a customer storefront.

✅ **Admin Panel:** Separate React frontend and Node backend for managing products, orders, and users with JWT authentication (`localhost:3000`).
✅ **Customer Store:** React frontend with cart, checkout, QR/COD payment, and order tracking (`localhost:3001`).
✅ **Backend API:** Node.js, Express, MongoDB with REST APIs, JWT authentication (`localhost:5000`).

---

## 🚀 Tech Stack

* **Frontend:** React, Redux Toolkit, Tailwind CSS
* **Backend:** Node.js, Express, JWT, REST APIs
* **Database:** MongoDB (Mongoose)

---

## ⚙️ Environment Variables

In `Admin-panel/backend/.env`:

```
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET_KEY=your_jwt_secret
```

---

## 🖥️ Setup & Run Instructions

1️⃣ **Clone the repository:**

```bash
git clone https://github.com/Abpa007/AP-Store.git
```

2️⃣ **Run the Backend:**

```bash
cd AP-Store/Admin-panel/backend
npm install
npm start
```

3️⃣ **Run the Admin Frontend:**

```bash
cd AP-Store/Admin-panel/frontend
npm install
npm start
```

4️⃣ **Run the Store Frontend:**

```bash
cd AP-Store/store
npm install
npm start
```

---

## 🛠️ Features

* JWT user/admin authentication
* Admin CRUD: products, orders, users
* Product listing, cart, checkout, address collection
* QR & COD payments
* Order tracking (Pending, Completed, Cancelled)
* Mobile-friendly responsive design
* Clean, scalable structure for real-world projects

---

## 📂 Folder Structure

```
AP-Store/
├── Admin-panel/
│   ├── backend/        # Admin API (port 5000)
│   └── frontend/       # Admin React frontend (port 3000)
├── store/              # Customer React frontend (port 3001)
```

---

## 🛡️ API & Authentication

* JWT authentication for secure routes
* REST APIs for product, order, user management
* Middleware for protection and error handling

---

## 🧪 Maintenance Scripts

* `fixOrders.js` - Corrects order data.
* `fixPaymentMethod.js` - Fixes payment methods in orders.

Located in `Admin-panel/backend/scripts`.

---

## 👤 Author

**Abhay Panchal**
📧 [abhaypanchal095@gmail.com](mailto:abhaypanchal095@gmail.com)
🔗 [GitHub](https://github.com/Abpa007)

---

> ⭐ **Star this repository if you find it useful for your job-ready MERN portfolio.**
