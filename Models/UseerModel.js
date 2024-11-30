const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    facebookId: String,
    instagramId: String,
    name: String,
    email: String,
    profilePicture: String,
    accessToken: String,
    instagramMetrics: Object, // To store insights like followers, impressions, etc.
});

module.exports = mongoose.model('User', userSchema);
