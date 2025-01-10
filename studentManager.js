const express = require('express');
const fs = require('fs');
const path = require("path");

const fsPath = path.join(__dirname, "students.json");

const app = express();

// Middleware
app.use(express.json());

// Utility functions
function readStudents() {
   return new Promise((resolve, reject) => {
      fs.readFile(fsPath, "utf-8", (err, data) => {
         if (err) {
            reject(err);
         } else {
            resolve(JSON.parse(data || '[]'));
         }
      });
   });
}

function writeStudents(students) {
   return new Promise((resolve, reject) => {
      fs.writeFile(fsPath, JSON.stringify(students, null, 2), err => {
         if (err) {
            reject(err);
         } else {
            resolve();
         }
      });
   });
}

// Routes

// GET: Retrieve all students
app.get('/students', (req, res) => {
   readStudents()
      .then(students => res.json(students))
      .catch(err => res.status(500).json({ message: 'Error reading students', err }));
});

// POST: Add a new student
app.post('/students', (req, res) => {
   const newStudent = {
      id: Date.now(),
      ...req.body,
   };
   readStudents()
      .then(students => {
         students.push(newStudent);
         writeStudents(students);
      })
      .then(() => res.status(201).json({ message: "New student added successfully", newStudent }))
      .catch(err => res.status(500).json({ message: 'Error creating student', err }));
});

// PUT: Update a student by ID
app.put('/students/:id', (req, res) => {
   const id = parseInt(req.params.id, 10);

   readStudents()
      .then(students => {
         const index = students.findIndex(student => student.id === id);
         if (index === -1) {
            return res.status(404).json({ message: 'Student not found' });
         }
         students[index] = {
            id,
            name: req.body.name || students[index].name,
            age: req.body.age || students[index].age,
            department: req.body.department || students[index].department,
         };
         writeStudents(students);
      })
      .then(updatedStudent => res.json({ message: "Student updated successfully", updatedStudent }))
      .catch(err => res.status(500).json({ message: 'Error updating student', err }));
});

// DELETE: Remove a student by ID
app.delete('/students/:id', (req, res) => {
   const id = parseInt(req.params.id, 10);

   readStudents()
      .then(students => {
         const filteredStudents = students.filter(student => student.id !== id);
         if (students.length === filteredStudents.length) {
            return res.status(404).json({ message: 'Student not found' });
         }
         writeStudents(filteredStudents);
      })
      .then(() => res.json({ message: `Student with ID ${id} deleted successfully` }))
      .catch(err => res.status(500).json({ message: 'Error deleting student', err }));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
   console.log("Server is running on port: " + PORT);
});
