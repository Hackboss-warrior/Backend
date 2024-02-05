import express from "express";

import {
  createPost,
  answerPost,
  lsPostById,
  deletePost,
  interactPost,
  getAllPosts,
  patchPost,
  filterPost,
  selectFavorites,
  insertFavorite,
  commentPost,
  interactComments,
  lsPostByTitle,
  aboutCounting,
  postContactForm,
  deletePostAdmin,
  deleteComment,
  selectFavoritesByToken
} from "../controllers/posts/index.js";

import validateAuth from "../middlewares/validateAuth.js";

const router = express.Router();

router.delete("/post/:id", validateAuth, deletePost);
router.delete("/post/:id", validateAuth, deletePostAdmin);
router.delete("/comments/:id", validateAuth, deleteComment);
router.post("/posts", validateAuth, createPost);
router.get("/post/:id", lsPostById);
//--------------------------------------------
router.get("/search", lsPostByTitle);

//--------------------------------------------
router.get("/posts", getAllPosts);
router.post("/liked", validateAuth, interactPost);
router.patch("/post/:id", validateAuth, patchPost);
router.post("/filter", filterPost);
router.post("/favorite/:id", validateAuth, insertFavorite);
router.get("/favorites", validateAuth, selectFavorites);
router.post("/post/:id", validateAuth, commentPost);
router.post("/answers", answerPost);
router.post("/likeComments", validateAuth, interactComments);
router.get("/about", aboutCounting);
router.post("/contact", postContactForm);
router.get("/myfavorites", validateAuth, selectFavoritesByToken);
export default router;
