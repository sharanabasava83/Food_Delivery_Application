# 🍔 Food Delivery Application

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Website-success?style=for-the-badge&logo=vercel)](https://food-delivery-application-beta-pied.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://food-delivery-application-0.onrender.com)
[![Database](https://img.shields.io/badge/Database-Aiven%20MySQL-FF3E00?style=for-the-badge&logo=mysql&logoColor=white)](https://aiven.io)

A full-stack food delivery web application built with **Spring Boot 3 (Java 17)** and **React 19 (Vite)**. Features end-to-end food ordering, dynamic discount strategies, customer authentication, restaurant management, cart and checkout workflows, order tracking, and an admin management dashboard.

- 🌐 **Live Website**: [https://food-delivery-application-beta-pied.vercel.app/](https://food-delivery-application-beta-pied.vercel.app/)
- ⚙️ **Backend API (Render)**: `https://food-delivery-application-0.onrender.com/api`

---

## 📑 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [Design Patterns & Engineering Highlights](#-design-patterns--engineering-highlights)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup-spring-boot)
  - [Frontend Setup](#frontend-setup-react--vite)
- [REST API Reference](#-rest-api-reference)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [License](#-license)

---

## 🚀 Live Demo

| Service | Platform | URL |
|---|---|---|
| **Frontend Web App** | Vercel | [https://food-delivery-application-beta-pied.vercel.app/](https://food-delivery-application-beta-pied.vercel.app/) |
| **Backend REST API** | Render | [`https://food-delivery-application-0.onrender.com`](https://food-delivery-application-0.onrender.com) |
| **MySQL Database** | Aiven Cloud | Managed MySQL Cluster (SSL Required) |

---


## ✨ Features

- **🍽️ Browse & Search**: Filter food items by categories or search restaurants and food items in real-time.
- **🛒 Dynamic Cart Management**: Add items, update quantities, persist cart states per customer, and calculate real-time totals.
- **🏷️ Smart Coupon & Discount Engine**: Extensible discount system implementing Factory & Strategy patterns for:
  - First-order discounts
  - Category-based discounts
  - Total order amount tier discounts
- **📦 Checkout & Order Management**: Real-time order placement, itemized receipts, order confirmation, and customer order history.
- **🔐 Customer Authentication**: Registration and login endpoints for customer accounts.
- **🛠️ Admin Dashboard**: Administrative controls to manage categories, restaurants, menu items, coupons, and orders.
- **📱 Responsive UI**: Modern, glassmorphism-inspired UI built with pure CSS tokens, smooth transitions, and mobile-friendly design.

---

## 🏗️ Architecture & Tech Stack

### Backend
- **Framework**: Spring Boot 3.2.4
- **Language**: Java 17
- **Data Persistence**: Spring Data JPA & Hibernate
- **Database**: MySQL 8+
- **Validation**: Jakarta Bean Validation (`@Valid`, `@NotNull`, `@Positive`, etc.)
- **Testing**: JUnit 5, Mockito, Spring Boot Starter Test

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid, Responsive Media Queries)
- **API Client**: Native `fetch` with centralized async request handler

---

## 📁 Project Structure

```text
food-delivery-app/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/franconnect/fooddelivery/
│   │   │   │   ├── controller/      # REST API Controllers
│   │   │   │   ├── dto/             # Request & Response Data Transfer Objects
│   │   │   │   ├── entity/          # JPA Entities (Customer, Order, Food, Cart, Coupon, etc.)
│   │   │   │   ├── exception/       # GlobalExceptionHandler and Custom Exceptions
│   │   │   │   ├── repository/      # Spring Data JPA Repositories
│   │   │   │   ├── service/         # Business Logic Interfaces & Implementations
│   │   │   │   └── strategy/        # Discount Strategy & Factory Pattern Implementations
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                    # JUnit & Mockito Unit Tests
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/              # Reusable UI components (Navbar, FoodCard, CartItem, etc.)
│   │   ├── pages/                   # Views (Home, Cart, Checkout, Admin, Login, Register, OrderHistory)
│   │   ├── services/api.js          # REST Client integration
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── Food_Delivery_App_Complete_Test_Cases.xlsx  # Comprehensive manual and integration test suites
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🧩 Design Patterns & Engineering Highlights

- **Strategy Pattern (`DiscountStrategy`)**: Encapsulates interchangeable discount algorithms (`FirstOrderDiscountStrategy`, `CategoryDiscountStrategy`, `TotalAmountDiscountStrategy`).
- **Factory Pattern (`DiscountStrategyFactory`)**: Dynamically resolves and instantiates the appropriate discount algorithm based on coupon rules or customer order conditions.
- **DTO Pattern**: Decouples domain entities from external JSON representation to prevent mass assignment vulnerabilities and control payload schemas.
- **Global Exception Handling**: Centralized controller advice (`@ControllerAdvice`) mapping `ResourceNotFoundException` and `BadRequestException` into clean, standardized API error responses.

---

## 🚀 Getting Started

### Prerequisites
- **Java**: JDK 17 or later installed and configured in `PATH`
- **Node.js**: v18 or later and `npm`
- **Database**: MySQL 8.x installed and running locally

---

### Backend Setup (Spring Boot)

1. **Configure MySQL Database**:
   Create a database named `foodapp`:
   ```sql
   CREATE DATABASE foodapp;
   ```

2. **Update Database Credentials**:
   Adjust [backend/src/main/resources/application.properties](backend/src/main/resources/application.properties) with your MySQL user and password:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/foodapp
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   ```

3. **Build & Run**:
   ```bash
   cd backend
   ./mvnw clean spring-boot:run
   # Or on Windows PowerShell:
   mvn spring-boot:run
   ```
   The backend starts at `http://localhost:8080`.

---

### Frontend Setup (React + Vite)

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 📡 REST API Reference

| Domain | Method | Endpoint | Description |
|---|---|---|---|
| **Categories** | `GET` | `/api/categories` | List all food categories |
| | `POST` | `/api/categories` | Create a new food category |
| | `DELETE` | `/api/categories/{id}` | Delete category by ID |
| **Restaurants** | `GET` | `/api/restaurants` | List all restaurants |
| | `GET` | `/api/restaurants/search?keyword=` | Search restaurants by keyword |
| | `POST` | `/api/restaurants` | Register a new restaurant |
| | `DELETE` | `/api/restaurants/{id}` | Remove a restaurant |
| **Foods** | `GET` | `/api/foods` | Fetch all menu food items |
| | `GET` | `/api/foods/category/{categoryId}` | Fetch foods filtered by category |
| | `GET` | `/api/foods/search?keyword=` | Search food by keyword |
| | `POST` | `/api/foods` | Create a new food listing |
| | `DELETE` | `/api/foods/{id}` | Delete food listing |
| **Cart** | `GET` | `/api/cart/{customerId}` | Retrieve customer's active cart |
| | `POST` | `/api/cart/{customerId}/items` | Add item to cart |
| | `PUT` | `/api/cart/{customerId}/items/{itemId}?quantity=` | Update item quantity |
| | `DELETE` | `/api/cart/{customerId}/items/{itemId}` | Remove item from cart |
| | `DELETE` | `/api/cart/{customerId}` | Clear entire cart |
| **Coupons** | `GET` | `/api/coupons` | List active coupons |
| | `POST` | `/api/coupons/validate?code=&customerId=` | Validate coupon code |
| | `POST` | `/api/coupons` | Create a new coupon |
| **Orders** | `POST` | `/api/orders` | Place order from cart |
| | `GET` | `/api/orders/{id}` | Fetch order details by ID |
| | `GET` | `/api/orders/number/{orderNumber}` | Fetch order details by order number |
| | `GET` | `/api/orders/customer/{customerId}` | Fetch order history for a customer |
| **Customers** | `POST` | `/api/customers/login` | Authenticate customer |
| | `POST` | `/api/customers` | Register customer |

---

## 🧪 Testing & Quality Assurance

### Running Backend Tests
Execute unit and integration tests using Maven:
```bash
cd backend
mvn test
```

### Test Case Documentation
A complete test case matrix covering functional, regression, validation, and integration tests is available in:
- [`Food_Delivery_App_Complete_Test_Cases.xlsx`](Food_Delivery_App_Complete_Test_Cases.xlsx)

---

## 📄 License

This project is licensed under the terms described in the [LICENSE](LICENSE) file.