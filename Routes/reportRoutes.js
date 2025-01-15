const multer = require('multer');
const express = require('express');
const router = express.Router();
const { submitReport } = require('../controller/reportController');


// Route for adding a profile
router.post('/report_profile', submitReport);

module.exports = router;
