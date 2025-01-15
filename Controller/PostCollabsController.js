const PostCollab = require('../Models/PostCollabModel');

// Create a new collaboration post
exports.createPost = async (req, res) => {
    try {
        const { title, description, requiredFollowers, platforms } = req.body;
        const newPost = new PostCollab({ title, description, requiredFollowers, platforms });
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
        const post = await PostCollab.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
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