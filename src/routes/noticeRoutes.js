import  express from "express";
import  {createPost , lsPostById,deletePost}  from "../controllers/posts/index.js";

const router = express.Router();

router.delete("/delete/:id",deletePost)
 router.post("/posts",createPost);
router.get("/post/:id",lsPostById) 

export default router;