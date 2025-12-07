# Real Estate Agent Directory 🏠

A full-stack web application for searching and managing real estate agents. Built with Express with Node.js, PostgreSQL, and Next.js.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

## ✨ Features

- **Search Agents**: Search by name, location, and specialization
- **Add Agents**: Add agents form 
- **RESTful API**: Well-documented API with Swagger
- **Clean Architecture**: Repository-Service-Controller pattern
- **Modern Frontend**: Responsive Next.js interface
- **Type Validation**: Request validation using Zod
- **Database Indexing**: Optimized PostgreSQL queries
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: PostgreSQL (Used live links from Neon)
- **Validation**: Zod
- **Documentation**: Swagger UI
- **Testing**: Postman Collection

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: CSS Modules
- **State Management**: React Hooks

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (Used live links from Neon so not necessary)

### Installation

1. **Clone the repository**

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   copy .env.example .env
   ```
   
   Edit `.env` with your PostgreSQL credentials:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=real_estate_db
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Initialize database schema**
   ```bash
   npm run init-db
   ```

5. **Seed database with sample data**
   ```bash
   npm run seed
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   ```
   
   Backend will run on: http://localhost:5000
   
   Swagger API Documentation: http://localhost:5000/api-docs

7. **Set up the frontend** (in a new terminal)
   ```bash
   cd ../frontend
   npm install
   ```

8. **Configure frontend environment**
   ```bash
   copy .env.example .env
   ```

9. **Start the frontend**
    ```bash
    npm run dev
    ```
    
    Frontend will run on: http://localhost:3000


## 📝 Available Scripts

### Backend
```bash
npm run dev      # Start development server with auto-reload
npm start        # Start production server
npm run init-db  # Initialize database schema
npm run seed     # Seed database with sample data
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
```

## 📊 Performance Optimizations

- **Database Indexing**: Indexes on search columns
- **Connection Pooling**: PostgreSQL connection pool
- **Response Caching**: Browser caching headers

---

**Built with using Node.js, PostgreSQL, and Next.js**
