const mongoose = require('mongoose');

const PostCollabSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredFollowers: { type: String, required: true },
    platforms: { type: [String], required: true }, // Example: ['Instagram', 'Facebook']
    userId: { type: String, required: true }, // Reference to the User model
});

module.exports = mongoose.model('PostCollab', PostCollabSchema);
