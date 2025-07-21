
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

app.post('/register-student', (req, res) => {
  const { name, age, grade } = req.body;
  const query = 'INSERT INTO students (name, age, grade) VALUES (?, ?, ?)';
  db.query(query, [name, age, grade], (err) => {
    if (err) throw err;
    res.send('Student Registered');
  });
});

app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
