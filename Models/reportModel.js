// filepath: /C:/Users/ASUS/Desktop/hobo_collab_backend/models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    report: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', reportSchema);