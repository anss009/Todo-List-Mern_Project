const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');      // For password hashing (encryption)
const jwt = require('jsonwebtoken');      // For creating login tokens
const User = require('../models/User');   // Import User model

// ==================== REGISTER ROUTE ====================
// POST /api/auth/register
// This creates a new user account
router.post('/register', async (req, res) => {
  try {
    // Get data from request body
    const { name, email, password } = req.body;
    
    // Check if user already exists with this email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    
    // Hash (encrypt) the password for security
    // Never store plain passwords in database!
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user object
    user = new User({ 
      name, 
      email, 
      password: hashedPassword 
    });
    
    // Save user to database
    await user.save();
    
    // Create a token (like a login session)
    // This token proves the user is logged in
    const token = jwt.sign(
      { userId: user._id },           
      'mysecretkey12345',            
      { expiresIn: '30d' }            
    );
    
    // Send back the token and user info
    res.json({ 
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      } 
    });
    
  } catch (err) {
    // If something goes wrong, send error
    res.status(500).json({ error: err.message });
  }
});

// ==================== LOGIN ROUTE ====================
// POST /api/auth/login
// This logs in an existing user
router.post('/login', async (req, res) => {
  try {
    // Get email and password from request
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    // Compare the provided password with the hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    // Create a token for this login session
    const token = jwt.sign(
      { userId: user._id },           // Store user ID in token
      'mysecretkey12345',             // Secret key
      { expiresIn: '30d' }            // Token expires in 30 days
    );
    
    // Send back token and user info
    res.json({ 
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      } 
    });
    
  } catch (err) {
    // If something goes wrong, send error
    res.status(500).json({ error: err.message });
  }
});

// Export the router so we can use it in server.js
module.exports = router;