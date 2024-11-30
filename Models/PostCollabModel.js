const mongoose = require('mongoose');

const PostCollabSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredFollowers: { type: Number, required: true },
    platforms: { type: [String], required: true }, // Example: ['Instagram', 'Facebook']
});

module.exports = mongoose.model('PostCollab', PostCollabSchema);
