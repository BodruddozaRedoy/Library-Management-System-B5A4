# BookBase - Library Management System

## Overview
BookBase is a full-stack web application designed for managing library operations. It provides a user-friendly interface for browsing, borrowing, and managing books, built with a modern tech stack for both client and server sides.

## Live Demo
- **Client**: [BookBase Client](https://library-management-system-b5-a4.vercel.app/)
- **Server**: [BookBase Server](https://library-management-system-b5-a4-ge8.vercel.app/)

## GitHub Repository
[Library-Management-System-B5A4](https://github.com/BodruddozaRedoy/Library-Management-System-B5A4.git)

## Features
- Browse and search for books
- Book borrowing and return management
- Book management system
- Admin dashboard for managing library inventory
- Responsive UI with modern design

## Tech Stack

### Client-Side
- **Framework**: React (v19.1.0)
- **State Management**: Redux Toolkit (v2.8.2)
- **Form Handling**: React Hook Form (v7.60.0), Zod (v4.0.5)
- **Styling**: Tailwind CSS (v4.1.11), Class Variance Authority (v0.7.1)
- **UI Components**: Radix UI, Lucide React (v0.525.0)
- **Routing**: React Router (v7.7.0)
- **Date Handling**: date-fns (v4.1.0), React Day Picker (v9.8.0)
- **Notifications**: React Hot Toast (v2.5.2), SweetAlert2 (v11.22.2)
- **Build Tool**: Vite (v7.0.4)
- **Type Checking**: TypeScript (v5.8.3)
- **Linting**: ESLint (v9.30.1)

### Server-Side
- **Framework**: Express (v5.1.0)
- **Database**: MongoDB with Mongoose (v8.16.1)
- **Environment Variables**: Dotenv (v17.0.0)
- **CORS**: cors (v2.8.5)
- **Development**: ts-node-dev (v2.0.0)
- **Type Checking**: TypeScript with @types/express (v5.0.3), @types/cors (v2.8.19)

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

### Client Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/BodruddozaRedoy/Library-Management-System-B5A4.git
   ```
2. Navigate to the client directory:
   ```bash
   cd Library-Management-System-B5A4/client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Server Setup
1. Navigate to the server directory:
   ```bash
   cd Library-Management-System-B5A4/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the server directory with the following:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```
6. Start the production server:
   ```bash
   npm start
   ```

## Usage
- Access the client application at `http://localhost:5173` (or the port specified by Vite).
- The server runs on `http://localhost:5000` (or the port defined in your `.env` file).
- Use the client interface to browse books, manage your account, or access admin features.
- Admin users can log in to manage the library inventory and user requests.

## Scripts

### Client
- `npm run dev`: Starts the development server with Vite
- `npm run build`: Builds the app for production
- `npm run lint`: Runs ESLint for code linting
- `npm run preview`: Previews the production build locally

### Server
- `npm run dev`: Starts the development server with hot-reloading
- `npm run start`: Runs the compiled production server
- `npm run lint`: Runs ESLint for code linting

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a pull request.
