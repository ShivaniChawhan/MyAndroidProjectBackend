const User = require('../Models/AppliedUserModel');


// Save user data to MongoDB
const saveUserData = async (req, res) => {
    try {
        const { userName, followerCount, profilePic, title, descriptions, platforms, userId } = req.body;

        // Validation
        if (!userName || !followerCount || !title || !platforms) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newUser = new User({
            userName,
            followerCount,
            profilePic,
            title,
            descriptions,
            platforms,
            userId
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: "User data saved successfully", data: savedUser });
    } catch (error) {
        res.status(500).json({ message: "Error saving user data", error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const appliedUser = await User.find({ userId: req.params.userId }); // Fetch by userId
        if (appliedUser.length === 0) return res.status(404).json({ message: 'No User found for this user' });
        res.status(200).json(appliedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

module.exports = { saveUserData, getUserById };
