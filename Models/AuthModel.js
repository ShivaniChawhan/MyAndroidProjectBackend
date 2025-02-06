const mongoose = require('mongoose');

const authuserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String }, // OTP for verification
    otpExpires: { type: Date }, // OTP expiration time
    isVerified: { type: Boolean, default: false }, // Verification status
});

module.exports = mongoose.model('AuthUser', authuserSchema);
