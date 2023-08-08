const express=require("express")
const { authenticate } = require("../middleware/auth")
const { PostHead, PostBody, Comment, User }=require("../models/index")

require("dotenv").config()
const commentRoute=express.Router()

// Create a comment for a specific post
commentRoute.post("/post-head/:postHeadId/comment", authenticate, async (req, res) => {
  try {
    const { content } = req.body;
    const { postHeadId } = req.params;
    const userId = req.user.id;

    // Create the comment and associate it with the specific post
    const comment = await Comment.create({ content, postHeadId, userId });

    return res.status(201).json({ message: 'Comment created successfully', comment });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});
  
// Get all comments for a specific post
commentRoute.get("/post-head/:postHeadId/comments", async (req, res) => {
  try {
    const { postHeadId } = req.params;

    // Find all comments associated with the specific post
    const comments = await Comment.findAll({
      where: { postHeadId },
      include: {
        model: User,
        attributes: ['name'], // Include only the 'name' attribute of the User model
        as: 'user', // Use the alias defined in the Comment model
      },
    });

    return res.status(200).json({ comments });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update a specific comment
commentRoute.put("/post-body/:postId/comment/:commentId",authenticate,  async (req, res) => {
    try {
      const { postId, commentId } = req.params;
      const { content } = req.body;
  
      // Find the comment associated with the specific post and commentId
      const comment = await Comment.findOne({ where: { id: commentId, postId } });
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Update the comment
      comment.content = content;
      await comment.save();
  
      return res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
});
  
// Delete a specific comment
commentRoute.delete("/post-body/comment/:commentId",authenticate, async (req, res) => {
    try {
      const { commentId } = req.params;
      const userId = req.user.id
  
      // Find the comment associated with the specific post and commentId
      const comment = await Comment.findOne({ where: { id: commentId } });
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // console.log("comment UserId", comment.userId)
      // console.log("userId", userId);

      if (comment.userId !== userId) {
        return res.status(403).json({ message: 'You are not authorized to delete this Comment' });
      }
  
      // Delete the comment
      await comment.destroy();
  
      return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
});
  
module.exports={commentRoute}