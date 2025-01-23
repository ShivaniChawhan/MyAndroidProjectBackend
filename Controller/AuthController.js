const AuthUser = require('../Models/AuthModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail')
require('dotenv').config();

const JWT_SECRET = 'abhanjjduueuekdk@@@@%$#^%&&*)(hsdgd'

// Signup Controller
sgMail.setApiKey(process.env.API_KEY)
exports.signup = async (req, res) => {
    try {
        const { name, mobile, email, password } = req.body;
        console.log('Request Body:', req.body);
        // Check if user already exists
        const existingUser = await AuthUser.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        // Create OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Generated OTP:', otp);
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);
        // Save user to database
        const newUser = new AuthUser({
            name,
            mobile,
            email,
            password: hashedPassword,
            otp,
            otpExpires: Date.now() + 10 * 60 * 1000, // OTP valid for 10 minutes
        });

        await newUser.save();
        console.log(newUser)
        // Send OTP to user email
        const msg = {
            to: email,
            from: 'contact@hobo.video',
            subject: 'Your OTP for Hobo.Video Dashboard Signup',
            text: `${otp} is your OTP (One Time Password) to Sign up on Hobo.Video Dashboard.`,
            html: `<p>${otp} is Your OTP to Sign up on Hobo.Video Dashboard.<br><br>Note: If you did not generate this OTP, contact us at contact@hobo.video.<br>This is a system-generated email.<br>Thanks,<br>Hobo.Video Team</p>`,
        };

        await sgMail.send(msg);

        res.status(201).json({ message: 'User registered successfully. Check your email for the OTP.' });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up', error: error.message });
    }
};
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log('Request Body:', req.body);
        // Find user by email
        const user = await AuthUser.findOne({ email });
        console.log(user)

        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

        // Check if OTP matches and is not expired
        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Mark user as verified
        user.isVerified = true;
        user.otp = undefined; // Clear OTP
        user.otpExpires = undefined; // Clear OTP expiration
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error: error.message });
    }
};
// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Request Body:', req.body);

    if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Find user by email
        const user = await AuthUser.findOne({ email });
        console.log('User Found:', user);

        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match:', isMatch);

        if (!isMatch) {
            console.log('Invalid password');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '3h' });
        console.log('JWT Token Generated: ', token);

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};