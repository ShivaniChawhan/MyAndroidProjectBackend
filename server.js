require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./Routes/userRoutes');
const postCollabRoutes = require('./Routes/postCollabRoutes')
const profileROutes = require('./Routes/addProfileRoutes')
const reportRoutes = require('./Routes/reportRoutes')
const mongoDB = require('./Config/DbConfig');
const userRoutes = require('./Routes/AuthRoutes')
const getProfileById = require('./Routes/AddProfileRoutes');
const getUserById = require('./Routes/AppliedUserRoutes');
const appliedUsersRoutes = require('./Routes/AppliedUserRoutes'); // Import the new route



const app = express();
const PORT = process.env.API_PORT || 9001;
// MongoDB Connection
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploaded files
mongoDB.connect();
// Session Middleware
// app.use(
//     session({
//         secret: 'your-secret-key',
//         resave: false,
//         saveUninitialized: false,
//     })
// );

// Routes
app.use('/auth', authRoutes);
app.use('/api/post-collab', postCollabRoutes);
app.use('/api', profileROutes);
app.use('/api/report', reportRoutes);
app.use('/api/user', userRoutes);
app.use('/api/applied-users', appliedUsersRoutes); // Add the new route

// Home Route
app.get('/', (req, res) => {
    res.send('<h1>Login with Facebook and Fetch Instagram Insights</h1><a href="/auth/facebook">Login with Facebook</a>');
});

// Start Server

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});