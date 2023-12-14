import express from "express";

import { createPost, lsPostById, deletePost, interactPost, getAllPosts, patchPost, filterPost, selectFavorites, insertFavorite, interactComments } from "../controllers/posts/index.js";

import validateAuth from "../middlewares/validateAuth.js";

const router = express.Router();

router.delete("/post/:id", validateAuth, deletePost);
router.post("/posts", validateAuth, createPost);
router.get("/post/:id", lsPostById)
router.get("/posts", getAllPosts)
router.post("/liked", validateAuth, interactPost)
router.patch("/post/:id", validateAuth, patchPost)
router.post("/filter", filterPost)
////////////////////////////////////////
router.post("/favorite/:id", validateAuth, insertFavorite)
router.get("/favorites", validateAuth, selectFavorites)
////////////////////////////////////////
router.post("/post/:id", validateAuth, commentPost);
export default router;
router.post("/likeComments", validateAuth, interactComments)