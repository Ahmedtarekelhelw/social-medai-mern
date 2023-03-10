import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost,
  deletePost,
  updatePost,
  getPostsBySearch,
  commentPost,
} from "../controllers/post.js";

const router = express.Router();

// CREATE
router.post("/", createPost);

// READ
router.get("/search", getPostsBySearch);
router.get("/", getFeedPosts);
router.get("/:userId", getUserPosts);

// UPDATE
router.patch("/:id/like", likePost);
router.patch("/:id", updatePost);
router.patch("/:id/comment", commentPost);

//DELETE
router.delete("/:id", deletePost);

export default router;
