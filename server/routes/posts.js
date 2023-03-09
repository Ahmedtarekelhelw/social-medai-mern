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
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE
router.post("/", verifyToken, createPost);

// READ
router.get("/search", getPostsBySearch);
router.get("/", getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);

// UPDATE
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id", verifyToken, updatePost);
router.patch("/:id/comment",verifyToken ,commentPost);

//DELETE
router.delete("/:id", verifyToken, deletePost);

export default router;
