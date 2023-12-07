import  express from "express";
import  {createPost , lsPostById}  from "../controllers/posts/index.js";
const router = express.Router();
router.post("/posts",createPost);
router.get("/post/:id",lsPostById) 

export default router;