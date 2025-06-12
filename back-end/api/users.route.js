import express from "express";
import { UserService } from "../services/user.service.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
const userService = new UserService();

/* READ */
router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const user = await userService.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/friends", verifyToken, async (req, res, next) => {
  try {
    const friends = await userService.getUserFriends(req.params.id);
    res.status(200).json(friends);
  } catch (error) {
    next(error);
  }
});

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, async (req, res, next) => {
  try {
    const updatedUser = await userService.addRemoveFriend(req.params.id, req.params.friendId);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", verifyToken, async (req, res, next) => {
  try {
    const updatedUser = await userService.updateProfile(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.get("/search", verifyToken, async (req, res, next) => {
  try {
    const users = await userService.searchUsers(req.query.q);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

export default router; 