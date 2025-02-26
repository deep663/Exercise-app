const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try{
        const userExists = await User.findOne({email});
        if(userExists) return res.status(403).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword});

        await newUser.save();
        res.status(201).json({ messsage: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

//Login user
router.post('/login', async (req, res) => {
    const {email, password } = req.body;

    try{
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ token: token, id: user._id, name: user.name });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
