# 🛒 E-Commerce Backend (Admin & User)

This is a **Node.js and Express-based** backend system for an **E-commerce platform**, supporting **admin and user authentication, category & product management, and order processing**.

## 🚀 Features

- **Authentication & Authorization**
  - Separate **Admin & User authentication** using JWT.
  - Secure routes with authentication middleware.

- **Category Management**
  - Add, Update, Delete, and List product categories.

- **Product Management**
  - Add, Update, Delete, and List products.

- **Order Management**
  - Place, track, and manage orders.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Middleware**: Express Middleware for request handling

## 📂 Project Structure

📁 e-commerce-backend
┣ 📂 controllers
┃ ┣ 📜 adminlogin.ts               # Admin login
┃ ┣ 📜 user.controller.ts                # User CRUD
┃ ┣ 📜 product.controller.ts       # Product CRUD
┃ ┣ 📜 order.controller.ts         # Order 
processing
┃ 📂 lib
┃ ┣ 📜 db.ts               # database setup
┣ 📂 middleware
┃ ┣ 📜 admin.auth.ts     # Admin authentication
┃ ┣ 📜 user.auth.ts      # User authentication
┣ 📂 models
┃ ┣ 📜 Admin.model.ts                   # Admin schema
┃ ┣ 📜 user.model.ts                    # User schema
┃ ┣ 📜 category.model.ts            # Category  schema
┃ ┣ 📜 product.model.ts           # Product schema
┃ ┣ 📜 order.model.ts                   # Order 
┣ 📂 routes
┃ ┣ 📜 admin.routes.ts             # Admin 
┃ ┣ 📜 user.routes.ts              # User routes
server
┣ 📜 app.ts                       # app 
Environment
┣ 📜 .env                         # Environment 
constants
┣ 📜 constants                         # Environment variables
┗ 📜 README.md                    # Project documentation

📌 Setup Instructions
Clone the repository


git clone https://github.com/yourusername/e-commerce-backend.git
cd e-commerce-backend


🛡️ Security Considerations
Uses bcrypt to hash passwords before storing them in the database.
Implements JWT authentication for secure access.
Follows best practices for middleware and request validation.

📜 License
This project is MIT licensed. Feel free to use and modify.

#   e c o m m e r c e - c o r e - b a c k e n d  
 