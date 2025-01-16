const Profile = require('../Models/AddProfilemodel');

// Add user
exports.addProfile = async (req, res) => {
    try {
        // Log the incoming request body for debugging
        console.log('Request Body:', req.body);

//        const parsedBody = JSON.parse(req.body);

     // Parse the request body if it's a string
            let parsedBody = req.body;
                    if (typeof req.body === 'string') {
                        try {
                            parsedBody = JSON.parse(req.body);
                        } catch (parseError) {
                            return res.status(400).json({ error: 'Invalid JSON format' });
                        }
                    }
        console.log('Parsed Request Body:', parsedBody);

        // Extract data from form fields
//           const { name, instagramHandle, followersCount, niche, about, portfolioLink } = profileData;


        // Validate required fields
                const { name, instagramHandle, followersCount, niche, about, portfolioLink } = parsedBody;
                if (!name || !instagramHandle) {
                    return res.status(400).json({ error: 'Name and Instagram handle are required' });
                }

        // Log individual fields for debugging
        console.log('Extracted Fields:', {name, instagramHandle, followersCount, niche, about, portfolioLink });

        // Extract file path
        const profilePic = req.body.profilePic ? req.body.profilePic : null;
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
//            if (processedRange[0] !== null && processedRange[1] !== null) {
//                processedFollowersCount = `${processedRange[0]}-${processedRange[1]}`;
//            }
            processedFollowersCount = processedRange.filter(value => value !== null).join('-');
        }

        // Log processed followersCount
        console.log('Processed Followers Count:', processedFollowersCount);

        // Create a new profile document
        const user = new Profile({
            profilePic,          // Uploaded file path
            name, // Ensure null for missing fields
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

// Fetch a specific profile by ID
exports.getProfileById = async (req, res) => {
    try {
    const { id } = req.params;

        // Find the profile by ID
        const profile = await Profile.findById(id);

        // Check if the profile exists
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Respond with the profile
        res.status(200).json({ message: 'Profile fetched successfully', profile });
    } catch (error) {
        console.error('Error while fetching profile:', error.message);
        res.status(500).json({ error: 'Failed to fetch profile', details: error.message });
    }
};