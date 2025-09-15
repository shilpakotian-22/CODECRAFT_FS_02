### EmployeeManagement — CODECRAFT_FS_02

A simple and efficient Employee Management System built with Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript.
This project is part of the CodeCraft Full Stack Series (FS_02).

### Project Description

This project demonstrates a full-stack system for managing employee records.
It includes user authentication (register/login) and complete CRUD operations (Create, Read, Update, Delete) for employees.
The system is designed as a foundation for real-world employee data management.

### Features

-User Registration & Login (JWT Authentication)

-Add, View, Edit, and Delete employees

-Secure password hashing with bcrypt

-RESTful APIs with Express.js

-Employee records stored in MongoDB

-Frontend built using HTML, CSS, JavaScript

-Well-structured backend (models, routes, middleware)

### Tech Stack

Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB

### Project Structure

CODECRAFT_FS_02/
├── backend/
│   ├── config/ (db.js)
│   ├── middleware/ (auth.js)
│   ├── models/ (User.js, Employee.js)
│   ├── routes/ (auth.js, employees.js)
│   ├── server.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── css/ (style.css)
│   ├── js/ (auth.js, employees.js)
│   ├── index.html
│   ├── register.html
│   ├── employees.html
│   └── employee-form.html
               

## 🛠 Setup Instructions
### Backend
1. Go inside backend folder 
   ```bash
   cd backend
   npm install
   node server.js
### MongoDB 
1. Database Name: ems_db
2. Collection Name: employees
                    users
                    
