const express = require('express');
const router = express.Router();
const postCollabController = require('../Controller/PostCollabsController');

// Create a new collaboration post
router.post('/', postCollabController.createPost);

// Fetch all collaboration posts
router.get('/', postCollabController.getAllPosts);

// Fetch a single post by ID
router.get('/:userId', postCollabController.getPostById);

// Update a collaboration post
router.put('/:id', postCollabController.updatePost);

// Delete a collaboration post
router.delete('/:id', postCollabController.deletePost);

module.exports = router;
