const Profile = require('../models/AddProfilemodel');

// Add user
exports.addProfile = async (req, res) => {
    try {
        const { name, instagramHandle, followersCount, niche, about, portfolioLink } = req.body;
        const profilePic = req.file ? req.file.path : null; // File path from multer

        const user = new Profile({
            profilePic,
            name,
            instagramHandle,
            followersCount,
            niche,
            about,
            portfolioLink,
        });

        await user.save();
        res.status(201).json({ message: 'User added successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user', details: error.message });
    }
};
