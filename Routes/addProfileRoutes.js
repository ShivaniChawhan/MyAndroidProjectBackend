const express = require('express');
const multer = require('multer');
const { addProfile } = require('../controller/AddProfileController');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'), // Upload folder
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// POST route to add user
router.post('/add-profile', upload.single('profilePic'), addProfile);

module.exports = router;
