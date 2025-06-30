# 📝 BlogApp

> A RESTful API for managing blog posts, users, image uploads, authentication, and admin approval — built with Node.js, Express, Sequelize, and MySQL.

![Node.js](https://img.shields.io/badge/Node.js-16.x-green?logo=node.js)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 📚 Features

- 🔐 **Authentication** with Session & Cookies (Register/Login)
- 📝 **CRUD** blog posts (only the author can edit/delete)
- 🖼️ **Image Upload** (via `multer`)
- 👮‍♂️ **Admin Panel**: approve posts, change user roles
- ✏️ **User Settings**: change display name and password
- 💬 **Comments** (optional)
- 🧑‍💻 Role-based access: User / Admin

---

## ⚙️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MySQL, Sequelize ORM
- **Authentication:** Express-session, Bcrypt
- **File Upload:** Multer (local storage)
- **Template Engine:** EJS
- **View Styling:** Bootstrap 5
- **Session Handling:** Cookie-based login
- **Others:** Dotenv, Nodemon
---

## 🚀 Getting Started

### 🔧 Setup

```bash
# Clone the repository
git clone https://github.com/CaoNguyenHao/BlogApp.git

# Move into the project directory
cd BlogApp

# Install dependencies
npm install
