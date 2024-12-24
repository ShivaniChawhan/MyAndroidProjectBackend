const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    profilePic: { type: String, default: null }, // Optional
    name: { type: String, required: false }, // Optional
    instagramHandle: { type: String, required: false }, // Optional
    followersCount: { type: String, required: false }, // Optional
    niche: { type: String, required: false }, // Optional
    about: { type: String, required: false }, // Optional
    portfolioLink: { type: String, default: null }, // Optional
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
