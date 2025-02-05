const AppliedUser = require('../Models/AppliedUserModel');

// Save user data to MongoDB
const saveUserData = async (req, res) => {
    try {
        const { userName, followerCount, profilePic, title, descriptions, platforms, loginUserId, userId, status, isApplied } = req.body;

        // Validation
        if (!userName || !followerCount || !title || !platforms) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newUser = new AppliedUser({
            userName,
            followerCount,
            profilePic,
            title,
            descriptions,
            platforms,
            loginUserId,
            userId,
            status,
            isApplied
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: "User data saved successfully", data: savedUser });
    } catch (error) {
        res.status(500).json({ message: "Error saving user data", error: error.message });
    }
};

const getLoginUserById = async (req, res) => {
    try {
        const appliedUser = await AppliedUser.find({ loginUserId: req.params.loginUserId }); // Fetch by loginUserId
        if (appliedUser.length === 0) return res.status(404).json({ message: 'No User found for this user' });
        res.status(200).json(appliedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const appliedUser = await AppliedUser.find({ userId: req.params.userId }); // Fetch by userId
        if (appliedUser.length === 0) return res.status(404).json({ message: 'No User found for this user' });
        res.status(200).json(appliedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

const updateStatusByUserIds = async (req, res) => {
    try {
        const { status } = req.body;
        const { loginUserId, userId } = req.params;

        const updatedUser = await AppliedUser.findOneAndUpdate(
            { loginUserId, userId },
            { status },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User status updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user status', error: error.message });
    }
};

module.exports = { saveUserData, getUserById, getLoginUserById, updateStatusByUserIds };