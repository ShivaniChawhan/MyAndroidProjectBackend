const express = require('express');
const { saveUserData, getUserById } = require('../controller/AppliedUserController');

const router = express.Router();

// POST endpoint to save user data
router.post('/saveUser', saveUserData);

// Route to fetch a specific profile by ID
router.get('/getUser/:userId', getUserById);

module.exports = router;
