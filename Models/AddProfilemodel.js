const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    profilePic: { type: String, default: null }, // Optional
    name: { type: String, required: false }, // Optional
    instagramHandle: { type: String, required: false }, // Optional
    followersCount: { type: Number, required: false }, // Optional
    niche: { type: String, required: false }, // Optional
    about: { type: String, required: false }, // Optional
    portfolioLink: { type: String, default: null }, // Optional
}, { timestamps: true });

// Pre-validation hook
profileSchema.pre('validate', function (next) {
    try {
        // Check if `followersCount` is defined and is a string
        if (this.followersCount && typeof this.followersCount === 'string') {
            const parsedCount = parseInt(this.followersCount, 10);

            // Ensure the parsed value is a valid number
            if (!isNaN(parsedCount)) {
                this.followersCount = parsedCount; // Assign the converted value
            } else {
                this.followersCount = undefined; // Set to undefined if invalid
            }
        }

        next(); // Proceed to the next middleware
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});

module.exports = mongoose.model('Profile', profileSchema);
