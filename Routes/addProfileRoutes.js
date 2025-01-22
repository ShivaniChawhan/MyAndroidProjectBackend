const multer = require('multer');
const express = require('express');
const router = express.Router();
const { addProfile } = require('../Controller/AddProfileController');
const { getAllProfiles } = require('../Controller/AddProfileController');
const { getProfileById } = require('../Controller/AddProfileController');

// Set up Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where files will be saved
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Route for adding a profile
router.post('/addProfile', upload.single('profilePic'), addProfile);
router.get('/getProfile', getAllProfiles);

// Route to fetch a specific profile by ID
router.get('/getProfile/:id', getProfileById);

module.exports = router;
