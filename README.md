# 🎮 Gaming Cafe Management System (Backend)

A backend system built using **Node.js, Express, and MongoDB** to manage users, memberships, and slot bookings for a gaming cafe.

## 📌 Overview

Gaming cafes often manage customer records manually, which can lead to poor tracking and data mismanagement.
This project provides a simple digital solution to:

* Register and manage users
* Handle membership subscriptions
* Track gaming slot bookings
* Allow admins to monitor users and memberships

The system is designed to be lightweight, easy to use, and suitable for small-scale gaming cafe operations.


## 🛠️ Tech Stack

* **Node.js** – Runtime environment
* **Express.js** – Backend framework
* **MongoDB** – Database
* **Mongoose** – ODM for MongoDB
* **JWT** – Authentication
* **bcrypt.js** – Password hashing


## 🔐 Features Implemented

* User signup and login with secure password hashing
* JWT-based authentication system
* Role-based access (User / Admin)
* Membership management
* Gaming slot booking storage
* Admin access to monitor users


## 🛡️ Security

* Passwords stored using **bcrypt hashing**
* Protected routes using **JWT authentication**
* Role-based authorization middleware


## 🔮 Future Improvements

* Frontend integration (React)
* CORS configuration
* Prevent duplicate slot bookings
* Payment integration
* Admin dashboard
* Booking analytics


