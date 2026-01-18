const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; 

// Signup
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) return res.status(400).json({ msg: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword],
            (err, results) => {
                if (err) return res.status(500).send(err);
                res.json({ msg: "User created successfully" });
            });
    });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(400).json({ msg: "User not found" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

        // Create JWT token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({ 
            token, 
            user: { 
                id: user.id, 
                fullName: user.name,  
                email: user.email 
            } 
        });
    });
});


module.exports = router;
