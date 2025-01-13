const express = require('express');
const { signup, verifyOtp, login } = require('../Controller/AuthController');

const router = express.Router();

// Signup Route
router.post('/signup', signup);

router.post('/verifyotp', verifyOtp);
// Login Route
router.post('/login', login);


module.exports = router;
