import express from "express";
import { createPost, lsPostById, deletePost, intercatPost, getAllPosts } from "../controllers/posts/index.js";
import validateAuth from "../middlewares/validateAuth.js";

const router = express.Router();

router.delete("/delete/:id", validateAuth, deletePost)
router.post("/posts", validateAuth, createPost);
router.get("/post/:id", lsPostById)
router.get("/posts", getAllPosts)
router.post("/liked", validateAuth, intercatPost)

export default router;