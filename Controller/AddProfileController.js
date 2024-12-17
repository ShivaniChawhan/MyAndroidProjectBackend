const Profile = require('../models/AddProfilemodel');

// Add user
exports.addProfile = async (req, res) => {
    try {
        // Extract data from form fields
        const { name, instagramHandle, followersCount, niche, about, portfolioLink } = req.body;

        // Extract file path
        const profilePic = req.file ? req.file.path : null;

        // Create a new profile document
        const user = new Profile({
            profilePic,          // Uploaded file path
            name,
            instagramHandle,
            followersCount: parseInt(followersCount, 10), // Ensure numeric conversion
            niche,
            about,
            portfolioLink,
        });

        // Save the profile to the database
        await user.save();

        // Respond with success message
        res.status(201).json({ message: 'User added successfully', user });
    } catch (error) {
        console.error('Error while adding profile:', error.message);
        res.status(500).json({ error: 'Failed to add user', details: error.message });
    }
};
