const express = require('express');
const { saveUserData, getUserById , getLoginUserById, updateStatusByUserIds } = require('../controller/AppliedUserController');

const router = express.Router();

// POST endpoint to save user data
router.post('/saveUser', saveUserData);

// Route to fetch a specific profile by loginID
router.get('/getUser/:loginUserId', getLoginUserById);

// Route to fetch a specific profile by userID
router.get('/getAppliedUser/:userId', getUserById);

// Route to update status by loginUserId and userId
router.put('/users/status/:loginUserId/:userId', updateStatusByUserIds);

module.exports = router;