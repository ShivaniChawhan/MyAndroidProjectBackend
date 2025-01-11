const multer = require('multer');
const express = require('express');
const router = express.Router();
const { submit_report } = require('../Controller/reportController');


// Route for adding a profile
router.post('/report_profile', submit_report);

module.exports = router;
