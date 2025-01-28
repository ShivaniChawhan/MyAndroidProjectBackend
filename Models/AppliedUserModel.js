const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    followerCount: { type: Number, required: true },
    profilePic: { type: String },
    title: { type: String, required: true },
    descriptions: { type: String },
    platforms: { type: [String], required: true },
    userId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('AppliedUser', userSchema);
