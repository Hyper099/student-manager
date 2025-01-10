# Student Management API

This is a simple Node.js and Express-based API for managing student data, which is stored in a JSON file (`students.json`). The API supports CRUD operations: Create, Read, Update, and Delete.

## Features

* **GET /students** : Retrieve all students.
* **POST /students** : Add a new student.
* **PUT /students/:id** : Update an existing student's details by ID.
* **DELETE /students/:id** : Delete a student by ID.

## Prerequisites

Before running this application, ensure that you have the following installed:

* [Node.js](https://nodejs.org/) (v14 or higher)
* [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup

1. Clone this repository or copy the source files to your local machine.

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create the `students.json` file in the root directory:

   ```bash
   touch students.json
   ```

   Initialize the file with an empty array:

   ```json
   []
   ```
4. Start the server:

   ```bash
   node app.js
   ```
5. The server will start on port `3000` by default. You can access the API at `http://localhost:3000`.

## API Endpoints

### GET /students

Retrieve all students.

**Example Request:**

```bash
GET http://localhost:3000/students
```

**Example Response:**

```json
[
  {
    "id": 1694327001921,
    "name": "Jayneel",
    "age": 19,
    "department": "Computer Science"
  }
]
```

### POST /students

Add a new student.

**Example Request:**

```bash
POST http://localhost:3000/students
Content-Type: application/json

{
  "name": "Jayneel",
  "age": 19,
  "department": "Mathematics"
}
```

**Example Response:**

```json
{
  "message": "New student added successfully",
  "newStudent": {
    "id": 1694327103123,
    "name": "Jayneel",
    "age": 19,
    "department": "Mathematics"
  }
}
```

### PUT /students/:id

Update a student by ID.

**Example Request:**

```bash
PUT http://localhost:3000/students/1694327001921
Content-Type: application/json

{
  "age": 19
}
```

**Example Response:**

```json
{
  "message": "Student updated successfully",
  "updatedStudent": {
    "id": 1694327001921,
    "name": "Jayneel",
    "age": 19,
    "department": "Computer Science"
  }
}
```

### DELETE /students/:id

Remove a student by ID.

**Example Request:**

```bash
DELETE http://localhost:3000/students/1694327001921
```

**Example Response:**

```json
{
  "message": "Student with ID 1694327001921 deleted successfully"
}
```

## Error Handling

The API responds with appropriate status codes and error messages:

* `500`: Server error (e.g., file read/write issues)
* `404`: Student not found

## File Structure

```
.
├── app.js           # Main application file
├── students.json    # JSON file to store student data
├── package.json     # Project dependencies
└── README.md        # Documentation
```
