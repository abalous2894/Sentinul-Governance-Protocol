import express from 'express';
import mysql from 'mysql2';

const app = express();
const db = mysql.createConnection({ host: 'localhost', user: 'root', database: 'sentinul_db' });

// 🚩 VULNERABILITY: SQL Injection via string concatenation
app.get('/api/search', (req, res) => {
  const query = "SELECT * FROM users WHERE id = " + req.query.id;
  
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(3000, () => console.log('Target App Live on Port 3000'));
