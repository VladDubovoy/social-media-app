import express from "express";
import { PostService } from "../services/post.service.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../config/upload.config.js";

const router = express.Router();
const postService = new PostService();

/* CREATE */
router.post("/", verifyToken, upload.single("picture"), async (req, res, next) => {
  try {
    const postData = {
      ...req.body,
      userId: req.user.id,
    };
    const post = await postService.create(postData);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

/* READ */
router.get("/feed", verifyToken, async (req, res, next) => {
  try {
    const posts = await postService.getUserFeed(req.user.id);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/search", verifyToken, async (req, res, next) => {
  try {
    const posts = await postService.searchPosts(req.query.q);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/posts", verifyToken, async (req, res, next) => {
  try {
    const posts = await postService.getUserPosts(req.params.userId);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

/* UPDATE */
router.patch("/:id/like", verifyToken, async (req, res, next) => {
  try {
    const post = await postService.likePost(req.params.id, req.user.id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

/* DELETE */
router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const post = await postService.deletePost(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

/* ADD COMMENT */
router.post("/:id/comments", verifyToken, async (req, res, next) => {
  try {
    const post = await postService.addComment(req.params.id, req.user.id, req.body.text);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

/* DELETE COMMENT */
router.delete("/:postId/comments/:commentId", verifyToken, async (req, res, next) => {
  try {
    const post = await postService.deleteComment(req.params.postId, req.params.commentId);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

export default router; 