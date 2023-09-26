const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ritco'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the MySQL database');
});

// Define routes for CRUD operations
app.post('/brands', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO vehicle_brands (name) VALUES (?)';
    
    db.query(sql, [name], (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: 'Brand created successfully' });
    });
});

app.get('/brands', (req, res) => {
    const sql = 'SELECT * FROM vehicle_brands';
    
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

app.get('/brands/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM vehicle_brands WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.status(200).json(result[0]);
    });
});

app.put('/brands/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const sql = 'UPDATE vehicle_brands SET name = ? WHERE id = ?';
    
    db.query(sql, [name, id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Brand updated successfully' });
    });
});

app.delete('/brands/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM vehicle_brands WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Brand deleted successfully' });
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
