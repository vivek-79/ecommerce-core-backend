# 🛒 E-Commerce Backend (Admin & User)

This is a **Node.js and Express-based** backend system for an **E-commerce platform**, supporting **admin and user authentication, category & product management, and order processing**.

---

## 🚀 Features

### **Authentication & Authorization**
- Separate **Admin & User authentication** using JWT.
- Secure routes with authentication middleware.

### **Category Management**
- Add, Update, Delete, and List product categories.

### **Product Management**
- Add, Update, Delete, and List products.

### **Order Management**
- Place, track, and manage orders.

### **Sales Reports**
- **Category-wise Sales**: Total sales grouped by product category.
- **Top-Selling Products**: Fetches products sorted by `salesCount`.
- **Worst-Selling Products**: Fetches products with the lowest `salesCount`.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Middleware**: Express Middleware for request handling

---

## 💂‍♂️ Project Structure

```
📁 e-commerce-backend
┣ 📁 controllers
┃ ┣ 📄 admin.controller.ts         # Admin login & management
┃ ┣ 📄 user.controller.ts          # User CRUD operations
┃ ┣ 📄 category.controller.ts      # Category CRUD operations
┃ ┣ 📄 product.controller.ts       # Product CRUD operations
┃ ┣ 📄 order.controller.ts         # Order processing
┃ ┣ 📄 sales.controller.ts         # Sales reports (new)
┣ 📁 lib
┃ ┣ 📄 db.ts                       # Database setup
┣ 📁 middleware
┃ ┣ 📄 admin.auth.ts               # Admin authentication middleware
┃ ┣ 📄 user.auth.ts                # User authentication middleware
┣ 📁 models
┃ ┣ 📄 admin.model.ts              # Admin schema
┃ ┣ 📄 user.model.ts               # User schema
┃ ┣ 📄 category.model.ts           # Category schema
┃ ┣ 📄 product.model.ts            # Product schema (includes salesCount)
┃ ┣ 📄 order.model.ts              # Order schema
┣ 📁 routes
┃ ┣ 📄 admin.routes.ts             # Admin, product, category, and sales routes
┃ ┣ 📄 user.routes.ts              # User routes
┃ ┣ 📄 order.routes.ts             # Order routes
┣ 📄 app.ts                         # Main application file
┣ 📄 .env                           # Environment variables
┣ 📄 constants.ts                   # Global constants
┗ 📄 README.md                      # Project documentation
```

---

## 📌 Setup Instructions

### 1️⃣ Clone the repository

```sh
git clone https://github.com/yourusername/e-commerce-backend.git
cd e-commerce-backend
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file in the root directory and add the following:

```env
PORT=4040
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ACCESSTOKENEXPIRY=your_jwt_expiry
```

### 4️⃣ Run the server

```sh
npm start
```

---

## 📂 API Endpoints

### **Authentication**
| Endpoint         | Method | Description         |
|-----------------|--------|---------------------|
| `/admin/login`  | POST   | Admin login        |
| `/users/register` | POST | Register a user    |
| `/users/login`  | POST   | User login         |

### **Categories**
| Endpoint              | Method | Description          |
|----------------------|--------|----------------------|
| `/categories`        | GET    | Get all categories  |
| `/categories/add`    | POST   | Add a new category  |
| `/categories/update` | PUT    | Update a category  |
| `/categories/delete` | DELETE | Delete a category  |

### **Products**
| Endpoint           | Method | Description          |
|-------------------|--------|----------------------|
| `/products`       | GET    | Get all products    |
| `/products/add`   | POST   | Add a new product  |
| `/products/update` | PUT   | Update a product  |
| `/products/delete` | DELETE | Delete a product  |

### **Orders**
| Endpoint       | Method | Description       |
|---------------|--------|-------------------|
| `/orders`     | GET    | Get all orders   |
| `/place-order` | POST   | Place an order   |

### **Sales Reports**
| Endpoint                 | Method | Description                           |
|--------------------------|--------|---------------------------------------|
| `/sales/category-wise`   | GET    | Get total sales grouped by category  |
| `/sales/top-products`    | GET    | Get top-selling products             |
| `/sales/worst-products`  | GET    | Get worst-selling products           |

---

## 📌 License
This project is **MIT licensed**. Feel free to use and modify.

💡 **Contributions are welcome!** If you find any issues or have suggestions, feel free to submit a pull request.

