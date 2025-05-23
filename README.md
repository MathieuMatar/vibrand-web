
---

# API Documentation

Below is the comprehensive documentation for all API routes in the application. Each section outlines the available endpoints with their HTTP methods, parameters, request bodies, and descriptions.

---

## Table of Contents

- [Services API](#services-api)
- [Clients API](#clients-api)
- [Projects API](#projects-api)
- [Tasks API](#tasks-api)
- [Users API](#users-api)
- [Server Information](#server-information)
- [Project Setup](#project-setup)
- [Technologies Used](#technologies-used)

---

## Services API

### Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/api/services` | Retrieve all services |
| `GET` | `/api/services/:id` | Retrieve a specific service by ID |
| `POST` | `/api/services` | Create a new service |
| `PUT` | `/api/services/:id` | Update a service by ID |
| `DELETE` | `/api/services/:id` | Delete a service by ID |

### Parameters

- `:id` - Service ID (for GET, PUT, DELETE methods)

### Request Body (POST/PUT)

```json
{
  "name": "string",
  "description": "string",
  "rate": "number",
  "duration": "number",
  "status": "ENUM('Active', 'Inactive', 'Pending')"
}
```

---









## Clients API

### Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/api/clients` | Retrieve all clients |
| `GET` | `/api/clients/:id` | Retrieve a specific client by ID |
| `POST` | `/api/clients` | Create a new client |
| `PUT` | `/api/clients/:id` | Update a client by ID |
| `DELETE` | `/api/clients/:id` | Delete a client by ID |

### Parameters

- `:id` - Client ID (for GET, PUT, DELETE methods)

### Request Body (POST/PUT)

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "client_type": "ENUM('Corporate', 'Hospitality', 'Religious', 'Retail', 'NonProfit', 'Startup', 'ECommerce', 'Healthcare', 'PersonalBrand')"
}
```

---














## Projects API

### Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/api/projects` | Retrieve all projects |
| `GET` | `/api/projects/:id` | Retrieve a specific project by ID |
| `POST` | `/api/projects` | Create a new project |
| `PUT` | `/api/projects/:id` | Update a project by ID |
| `DELETE` | `/api/projects/:id` | Delete a project by ID |
| `POST` | `/api/projects/:project_id/users/:user_id` | Assign a user to a project |
| `DELETE` | `/api/projects/:project_id/users/:user_id` | Remove a user from a project |
| `POST` | `/api/projects/:project_id/services/:service_id` | Link a service to a project |
| `DELETE` | `/api/projects/:project_id/services/:service_id` | Unlink a service from a project |
| `POST` | `/api/projects/:id/milestones` | Create a milestone for a project |
| `PUT` | `/api/projects/milestones/:id` | Update a milestone |
| `DELETE` | `/api/projects/milestones/:id` | Delete a milestone |

### Parameters

- `:id` – Project ID (used for retrieving, updating, deleting a project, or adding a milestone)
- `:project_id` – Project ID (used for user/service associations)
- `:user_id` – User (employee) ID
- `:service_id` – Service ID
- `:milestone_id` – Milestone ID (used for updating or deleting a milestone)

### Request Body (POST/PUT for Projects)

```json
{
  "name": "string",
  "description": "string",
  "client_id": 1,
  "start_date": "YYYY-MM-DD",
  "deadline": "YYYY-MM-DD",
  "status": "string",
  "overview": "string",
  "files": "string"
}
```

### Request Body (POST/PUT for Milestones)

```json
{
  "name": "string",
  "description": "string",
  "date": "YYYY-MM-DD",
  "due_date": "YYYY-MM-DD",
  "status": "string"
}
```

---
















## Tasks API

### Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/api/tasks` | Retrieve all tasks |
| `GET` | `/api/tasks/:id` | Retrieve a specific task by ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task by ID |
| `DELETE` | `/api/tasks/:id` | Delete a task by ID |

### Parameters

- `:id` - Task ID (for GET, PUT, DELETE methods)

### Request Body (POST/PUT)

```json
{
  "type": "ENUM('note', 'task')",
  "project_id": "number",
  "created_by": "number",
  "assigned_to": "number",
  "completed_by": "number",
  "due_date": "string (YYYY-MM-DD)",
  "task_description": "string",
  "importance_level": "ENUM('Critical', 'High', 'Medium', 'Low', 'Optional')"
}
```

---

## Users API

### Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/api/users` | Retrieve all users |
| `GET` | `/api/users/:id` | Retrieve a specific user by ID |
| `POST` | `/api/users` | Create a new user |
| `PUT` | `/api/users/:id` | Update a user by ID |
| `DELETE` | `/api/users/:id` | Delete a user by ID |

### Parameters

- `:id` - User ID (for GET, PUT, DELETE methods)

### Request Body (POST/PUT)

```json
{
  "name": "string",
  "password": "string",
  "company": "string",
  "position": "string",
  "email": "string",
  "phone": "string"
}
```

---

## Server Information

The server runs on the port specified in the `.env` file. All endpoints follow RESTful conventions and return appropriate HTTP status codes and JSON responses.

---

## Project Setup

### 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MathieuMatar/webProjectWithSequelize.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables by creating a `.env` file:
   ```env
   PORT=3002
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=your_database_name
   ```

4. Start MariaDB and create your database:
   ```sql
   CREATE DATABASE your_database_name;
   ```

5. Run migrations (if any):
   ```bash
   npm run migrate
   ```

6. Start the server:
   ```bash
   npm start
   ```
   or in development:
   ```bash
   npm run dev
   ```

---

## Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Web application framework
- **MariaDB** – Relational database
- **Sequelize / Raw SQL** – ORM or query method
- **dotenv** – Environment config
- **Postman** – API testing (optional)

---
