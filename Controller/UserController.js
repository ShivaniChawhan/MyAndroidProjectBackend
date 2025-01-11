const axios = require('axios');
const User = require('../Models/UserModel');

// Facebook Login Callback
exports.facebookCallback = async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).send('Authorization failed');
    }

    try {
        // Step 1: Exchange code for access token
        const tokenResponse = await axios.get(
            `https://graph.facebook.com/v15.0/oauth/access_token`,
            {
                params: {
                    client_id: process.env.FACEBOOK_APP_ID,
                    client_secret: process.env.FACEBOOK_APP_SECRET,
                    redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
                    code,
                },
            }
        );

        const { access_token } = tokenResponse.data;

        // Step 2: Fetch user's Facebook profile
        const userProfile = await axios.get(
            `https://graph.facebook.com/me?fields=id,name,email&access_token=${access_token}`
        );

        const { id, name, email } = userProfile.data;

        // Step 3: Fetch connected Instagram account
        const pagesResponse = await axios.get(
            `https://graph.facebook.com/me/accounts?access_token=${access_token}`
        );

        const pageId = pagesResponse.data.data[0]?.id;

        const instagramAccount = await axios.get(
            `https://graph.facebook.com/${pageId}?fields=instagram_business_account&access_token=${access_token}`
        );

        const instagramId = instagramAccount.data.instagram_business_account?.id;

        // Step 4: Fetch Instagram insights
        const instagramInsights = await axios.get(
            `https://graph.facebook.com/${instagramId}/insights?metric=impressions,reach,profile_views&period=day&access_token=${access_token}`
        );

        const metrics = instagramInsights.data.data;

        // Save user to database
        let user = await User.findOne({ facebookId: id });
        if (!user) {
            user = new User({
                facebookId: id,
                instagramId,
                name,
                email,
                profilePicture: `https://graph.facebook.com/${id}/picture?type=large`,
                accessToken: access_token,
                instagramMetrics: metrics,
            });
            await user.save();
        }

        res.json({ message: 'Login successful', user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
};
