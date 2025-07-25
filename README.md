# AP-Store

A **complete, professional, job-ready MERN stack e-commerce platform** featuring JWT authentication, RESTful APIs, a powerful admin panel, and a modern customer storefront ready for deployment and showcasing in your developer portfolio.

✅ **Admin Panel:** Manage products, orders, and users with a clean React frontend and Node backend secured by JWT (`localhost:3000`).
✅ **Customer Store:** Fully functional React storefront for browsing products, managing cart, checkout, QR/COD payment, and order tracking (`localhost:3001`).
✅ **Backend API:** Node.js + Express + MongoDB REST APIs with JWT authentication (`localhost:5000`).

---

## 🚀 Tech Stack

* **Frontend:** React, Redux Toolkit, Tailwind CSS, Axios
* **Backend:** Node.js, Express, JWT, REST APIs
* **Database:** MongoDB with Mongoose ODM

---

## ⚙️ Environment Variables

In `Admin-panel/backend/.env`:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET_KEY=your_secret_key
```

---

## 🖥️ Setup & Run Instructions

1️⃣ **Clone the Repository:**

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

## 🛠️ Features of AP-Store

* 🔐 JWT Authentication for secure login/register for users and admins
* 🛒 **Storefront:**

  * View products with images and prices
  * Add to cart with local storage hydration
  * Address collection for checkout
  * QR code payment and Cash on Delivery options
  * View "Thank You" page after successful checkout
  * Track orders (Pending, Completed, Cancelled)
  * Responsive, mobile-friendly layout
* 🛠️ **Admin Panel:**

  * Secure login/logout with JWT
  * View, create, edit, and delete products with images
  * Manage all orders, update statuses
  * View all registered users and manage user roles
  * Dashboard to see pending, completed, and cancelled orders
* 🗄️ **Backend:**

  * REST API endpoints for products, orders, and users
  * Protected routes using JWT authentication middleware
  * MongoDB integration with Mongoose schemas for Orders, Users, Products
  * Image upload handling for product images
* ⚡ Performance-focused clean architecture for real-world scalability
* 🧩 Modular folder structure for easy maintenance
* ⚙️ Scripts for maintaining order consistency and payment method corrections
* 📦 Uses Redux Toolkit for structured state management
* 🎨 Tailwind CSS for consistent and modern UI
* 🔄 Axios for API handling with error management

---

## 🗂️ Folder Structure

```
AP-Store/
├── Admin-panel/
│   ├── backend/        # API server (PORT 5000)
│   └── frontend/       # Admin React frontend (PORT 3000)
├── store/              # Customer React frontend (PORT 3001)
```

---

## 🛡️ API & JWT Authentication

* Users and admins receive JWT tokens upon login.
* Tokens are stored securely and used to access protected routes.
* Middleware checks and verifies tokens for all secure API calls.

---

## 🧪 Maintenance Scripts

* `fixOrders.js`: Corrects and cleans inconsistent order data.
* `fixPaymentMethod.js`: Updates and corrects payment methods for orders.

Located in `Admin-panel/backend/scripts/`.

---

## 🚀 Future Improvements

* Add product categories and filtering
* Razorpay/Stripe payment gateway integration
* Admin analytics dashboard with charts
* Pagination and search for large product lists
* Email notifications for order updates
* Unit and integration tests with Jest and React Testing Library

---

## 👤 Author

**Abhay Panchal**
📧 Email: [abhaypanchal095@gmail.com](mailto:abhaypanchal095@gmail.com)
🔗 [GitHub Profile](https://github.com/Abpa007)

---

## 🌟 Contributing

Contributions are welcome. Fork this repo, create a feature branch, commit changes, and submit a pull request.

---


> ⭐ **Star this repository if it helps you in your MERN journey or job portfolio. This encourages clean, scalable open-source contributions.**

---
