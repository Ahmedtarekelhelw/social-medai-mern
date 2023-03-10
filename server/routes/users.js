import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser,
  getUsersBySearch,
} from "../controllers/user.js";

const router = express.Router();

router.get("/search", getUsersBySearch);
router.get("/:id", getUser);
router.get("/:id/friends", getUserFriends);
router.patch("/:id/:friendId", addRemoveFriend);
router.patch("/", updateUser);

export default router;
