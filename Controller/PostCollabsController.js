const PostCollab = require('../Models/PostCollabModel');

// Create a new collaboration post
exports.createPost = async (req, res) => {
    try {
        const { title, description, requiredFollowers, platforms, userId } = req.body;
        const newPost = new PostCollab({ title, description, requiredFollowers, platforms, userId });
        await newPost.save();
        res.status(201).json({ message: 'Collaboration post created successfully', post: newPost });
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
};

// Fetch all collaboration posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await PostCollab.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

// Fetch a single post by ID
exports.getPostById = async (req, res) => {
    try {
        const posts = await PostCollab.find({ userId: req.params.userId }); // Fetch by userId
        if (posts.length === 0) return res.status(404).json({ message: 'No posts found for this user ',userId});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

// Update a collaboration post
exports.updatePost = async (req, res) => {
    try {
        const { title, description, requiredFollowers, platforms } = req.body;
        const updatedPost = await PostCollab.findByIdAndUpdate(
            req.params.id,
            { title, description, requiredFollowers, platforms },
            { new: true }
        );
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
    }
};

// Delete a collaboration post
exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await PostCollab.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
};