const Profile = require('../Models/AddProfilemodel');
const mongoose = require('mongoose');

// Add user
exports.addProfile = async (req, res) => {
    try {
        // Log the incoming request body for debugging
        console.log('Request Body:', req.body);

        // Parse the request body if it's a string
        let parsedBody = req.body;
       /* if (typeof req.body === 'string') {
            try {
                parsedBody = JSON.parse(req.body);
            } catch (parseError) {
                return res.status(400).json({ error: 'Invalid JSON format' });
            }
        }*/
        if (req.body.profile) {
             try {
                   parsedBody = JSON.parse(req.body.profile);
             } catch (parseError) {
                   return res.status(400).json({ error: 'Invalid JSON format in profile' });
             }
        }

        console.log('Parsed Request Body:', parsedBody);

        // Extract data from form fields
        const { userID, name, instagramHandle, followersCount, niche, about, portfolioLink, profilePic} = parsedBody;

        console.log("UserID:", userID)
        console.log("Instagram Handle:", instagramHandle)
        console.log("Name:", name)
        console.log("Profile Pic:", profilePic)

        // Validate required fields
        if (!userID || !name || !instagramHandle) {
            return res.status(400).json({ error: 'User ID, Name, and Instagram handle are required' });
        }

        // Log individual fields for debugging
        console.log('Extracted Fields:', { userID, name, instagramHandle, followersCount, niche, about, portfolioLink, profilePic });

        // Extract file path
//        profilePic = req.body.profilePic ? req.body.profilePic : null;
        console.log('Profile Pic:', profilePic);

        // Preprocess followersCount (convert "10K-20K" to "10000-20000")
        let processedFollowersCount = '';
        if (followersCount) {
            const range = followersCount.split('-'); // Split into "10K" and "20K"
            const processedRange = range.map((value) => {
                const match = value.match(/(\d+)(K|M)?/i); // Match "10K" or "20K"
                if (match) {
                    const number = parseInt(match[1], 10); // Extract numeric part
                    const multiplier = match[2] ? (match[2].toLowerCase() === 'k' ? 1000 : 1000000) : 1; // Handle K/M
                    return number * multiplier; // Convert to full numeric value
                }
                return null; // If invalid, return null
            });

            // Join the processed range back into a string like "10000-20000"
            processedFollowersCount = processedRange.filter(value => value !== null).join('-');
        }

        // Log processed followersCount
        console.log('Processed Followers Count:', processedFollowersCount);

        // Create a new profile document
        const user = new Profile({
            userID,              // New user ID field
            profilePic,          // Uploaded file path
            name,                // Ensure null for missing fields
            instagramHandle,
            followersCount: processedFollowersCount || null, // Processed range as string
            niche: niche || null,
            about: about || null,
            portfolioLink: portfolioLink || null,
        });

        // Save the profile to the database
        const savedUser = await user.save();

        // Respond with success message
        res.status(201).json({ message: 'User added successfully', user: savedUser });
    } catch (error) {
        console.error('Error while adding profile:', error.message);
        res.status(500).json({ error: 'Failed to add user', details: error.message });
    }
};

// Fetch all profiles
exports.getAllProfiles = async (req, res) => {
    try {
        // Fetch all profiles from the database
        const profiles = await Profile.find();

        // Check if profiles exist
        if (!profiles.length) {
            return res.status(404).json({ message: 'No profiles found' });
        }

        // Respond with the list of profiles
        res.status(200).json({ message: 'Profiles fetched successfully', profiles });
    } catch (error) {
        console.error('Error while fetching profiles:', error.message);
        res.status(500).json({ error: 'Failed to fetch profiles', details: error.message });
    }
};

exports.getProfileById = async (req, res) => {
    try {
        const profile = await Profile.find({ userID: req.params.userID }); // Fetch by userId
        if (profile.length === 0) return res.status(404).json({ message: 'No profile found for this user' });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};


