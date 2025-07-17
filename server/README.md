# Library Management API

## Overview
This **Library Management System** is built using **Express**, **TypeScript**, and **MongoDB** (via Mongoose). The API enables users to manage books, track borrowing records, and retrieve summaries of borrowed books. It includes schema validation, business logic enforcement, aggregation pipelines, Mongoose middleware, and filtering features as specified in the requirements.

## Features
- **Book Management**:
  - Create, read, update, and delete books with proper validation.
  - Filter books by genre, sort by creation date, and limit results.
- **Borrowing System**:
  - Borrow books with availability checks and automatic updates to book copies.
  - Uses a Mongoose static method to handle availability updates.
- **Aggregation Pipeline**:
  - Summarizes borrowed books with total quantities and book details.
- **Error Handling**:
  - Comprehensive error responses for validation errors, 404s, and invalid inputs.
- **Code Quality**:
  - Clean, modular, and well-documented TypeScript code.
  - Proper use of Mongoose middleware (pre/post hooks) for validation and updates.
- **API Documentation**:
  - Follows exact endpoint and response structures as specified.

## Tech Stack
- **Node.js** with **Express**: Backend framework for handling API requests.
- **TypeScript**: Adds type safety and improves code maintainability.
- **MongoDB**: NoSQL database for storing books and borrow records.
- **Mongoose**: ODM for MongoDB, used for schema validation and middleware.
- **dotenv**: Environment variable management.
- **ESLint & Prettier**: Ensures consistent code style and quality.

## Setup Instructions
Follow these steps to set up and run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/BodruddozaRedoy/Library-Management-System-B5A3.git
   cd library-management-System-b5a3
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/library
   ```
   Replace `MONGODB_URI` with your MongoDB connection string (e.g., MongoDB Atlas URI if using a cloud instance).

4. **Run the Application**:
   - For development with hot-reloading:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

5. **Access the API**:
   The API will be available at `http://localhost:3000`.

## API Endpoints
Below is a summary of the API endpoints. All endpoints follow the exact response structures specified.

### Book Endpoints
- **Create Book**:
  - **Method**: `POST /api/books`
  - **Request Body**:
    ```json
    {
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true
    }
    ```
  - **Response**: Returns the created book with `_id`, `createdAt`, and `updatedAt`.

- **Get All Books**:
  - **Method**: `GET /api/books`
  - **Query Parameters**:
    - `filter`: Filter by genre (e.g., `FANTASY`, `SCIENCE`).
    - `sortBy`: Sort by field (e.g., `createdAt`).
    - `sort`: Sort order (`asc` or `desc`).
    - `limit`: Number of results (default: 10).
  - **Example**: `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`
  - **Response**: Array of books matching the query.

- **Get Book by ID**:
  - **Method**: `GET /api/books/:bookId`
  - **Response**: Single book details.

- **Update Book**:
  - **Method**: `PUT /api/books/:bookId`
  - **Request Body**: Partial book data (e.g., `{"copies": 50}`).
  - **Response**: Updated book details.

- **Delete Book**:
  - **Method**: `DELETE /api/books/:bookId`
  - **Response**: Confirmation of deletion with `data: null`.

### Borrow Endpoints
- **Borrow a Book**:
  - **Method**: `POST /api/borrow`
  - **Request Body**:
    ```json
    {
      "book": "64ab3f9e2a4b5c6d7e8f9012",
      "quantity": 2,
      "dueDate": "2025-07-18T00:00:00.000Z"
    }
    ```
  - **Business Logic**:
    - Verifies sufficient book copies.
    - Deducts borrowed quantity from book copies.
    - Updates `available` to `false` if copies reach 0 (via Mongoose static method).
  - **Response**: Borrow record details.

- **Borrowed Books Summary**:
  - **Method**: `GET /api/borrow`
  - **Response**: Aggregated summary of borrowed books with total quantities and book details (title, ISBN).

## Error Handling
The API returns standardized error responses for invalid inputs, validation errors, and 404s:
```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

## Project Structure
```
library-management-api/
├── src/
│   ├── controllers/       # Request handlers for books and borrow
│   ├── models/            # Mongoose schemas and models
│   ├── routes/            # Express route definitions
│   ├── middleware/        # Custom middleware (e.g., error handling)
│   ├── types/             # TypeScript interfaces
│   ├── config/            # Database and environment config
│   └── app.ts             # Express app setup
├── .env                   # Environment variables
├── package.json           # Project metadata and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```
```

## Deployment
The API is deployed at: https://library-management-system-b5-a3.vercel.app/


## Notes
- The project strictly adheres to the provided API endpoints and response formats.
- Mongoose middleware is used for validation and automatic updates (e.g., setting `available` to `false` when copies reach 0).
- The aggregation pipeline is implemented for the borrowed books summary endpoint.
- All code is written in TypeScript with proper type definitions for better maintainability.



##