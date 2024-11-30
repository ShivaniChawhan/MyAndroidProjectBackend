const express = require('express');
const { facebookCallback } = require('../Controller/UserController');

const router = express.Router();

// Facebook Login
router.get('/facebook', (req, res) => {
    const facebookAuthUrl = `https://www.facebook.com/v15.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&scope=email,public_profile,instagram_basic,instagram_manage_insights,pages_read_engagement`;
    res.redirect(facebookAuthUrl);
});

// Facebook Callback
router.get('/facebook/callback', facebookCallback);

module.exports = router;
