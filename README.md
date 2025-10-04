# Task Management API

A RESTful API for managing users and their tasks, built with Node.js, Express, and MongoDB. This backend service provides endpoints for user authentication and full CRUD (Create, Read, Update, Delete) functionality for tasks.

## Features

- **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
- **Task Management**: Full CRUD operations for tasks, linked to authenticated users.
- **Task Filtering**: Ability to filter tasks based on their status or due date.
- **Password Hashing**: Uses `bcrypt` to ensure user passwords are securely stored.
- **Structured & Scalable**: Organized into a modular structure with routes, controllers, and models.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Token (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Development**: nodemon for live-reloading

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <your-repository-url>
    cd task-management-server
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**

    Create a `.env` file in the root of the `task-management-server` directory. It must contain the following variables:

    ```ini
    # The port the server will run on
    PORT=5000

    # Your MongoDB connection string
    MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.../<database-name>"

    # A secret key for signing JWTs (can be any long, random string)
    JWT_SECRET="your_super_secret_jwt_key"
    ```
    > **Note**: `.env` files should never be committed to Git.

### Running the Application

-   **Development Mode**: Starts the server with `nodemon`, which automatically restarts on file changes.
    ```bash
    npm run dev
    ```

-   **Production Mode**: Starts the server with `node`.
    ```bash
    npm start
    ```

The API will be available at `http://localhost:5000`.

---

## API Endpoints

All API endpoints are prefixed with `/api`.

### Authentication

#### `POST /users/register`

Registers a new user.

-   **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "age": 30
    }
    ```
-   **Success Response (201)**:
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "_id": "60d5f2f5c7b5f3b2c8f5e8a1",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "age": 30
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

#### `POST /users/login`

Logs in an existing user.

-   **Request Body**:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
-   **Success Response (200)**:
    ```json
    {
      "message": "Login successful",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "_id": "60d5f2f5c7b5f3b2c8f5e8a1",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "age": 30
      }
    }
    ```

### Users

#### `GET /users/profile`

Gets the profile of the currently authenticated user.

-   **Authentication**: `Bearer Token` required.
-   **Success Response (200)**:
    ```json
    {
      "_id": "60d5f2f5c7b5f3b2c8f5e8a1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "age": 30
    }
    ```

#### `GET /users`

Gets a list of all registered users.

-   **Authentication**: None.
-   **Success Response (200)**:
    ```json
    [
      {
        "_id": "60d5f2f5c7b5f3b2c8f5e8a1",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "age": 30
      }
    ]
    ```

### Tasks

> **Note**: All task routes require `Bearer Token` authentication.

#### `POST /tasks`

Creates a new task for the authenticated user.

-   **Request Body**:
    ```json
    {
      "title": "Finish project documentation",
      "description": "Update the README and add Swagger docs.",
      "status": "in-progress",
      "dueDate": "2025-12-31"
    }
    ```
-   **Success Response (201)**:
    ```json
    {
      "message": "Task created",
      "task": {
        "_id": "60d5f3a0c7b5f3b2c8f5e8a2",
        "title": "Finish project documentation",
        "status": "in-progress",
        "user": "60d5f2f5c7b5f3b2c8f5e8a1",
        ...
      }
    }
    ```

#### `GET /tasks`

Retrieves all tasks for the authenticated user.

-   **Query Parameters**:
    -   `status` (optional): Filter tasks by status (`pending`, `in-progress`, `completed`).
    -   `dueDate` (optional): Filter tasks by due date (e.g., `2025-12-31`).
-   **Success Response (200)**:
    ```json
    [
      {
        "_id": "60d5f3a0c7b5f3b2c8f5e8a2",
        "title": "Finish project documentation",
        "status": "in-progress",
        ...
      }
    ]
    ```

#### `PUT /tasks/:id`

Updates an existing task.

-   **URL Parameter**:
    -   `id`: The ID of the task to update.
-   **Request Body**:
    ```json
    {
      "status": "completed"
    }
    ```
-   **Success Response (200)**:
    ```json
    {
      "message": "Task updated",
      "task": {
        "_id": "60d5f3a0c7b5f3b2c8f5e8a2",
        "status": "completed",
        ...
      }
    }
    ```

#### `DELETE /tasks/:id`

Deletes a task.

-   **URL Parameter**:
    -   `id`: The ID of the task to delete.
-   **Success Response (200)**:
    ```json
    {
      "message": "Task deleted"
    }
    ```

---

## Project Structure

The project follows a standard Express application structure:

```
/
├── config/         # Database configuration
├── controllers/    # Logic for handling requests
├── middleware/     # Custom middleware (e.g., auth)
├── models/         # Mongoose schemas and models
├── routes/         # API route definitions
├── .env            # Environment variables (ignored by Git)
├── server.js       # Main application entry point
└── package.json
```