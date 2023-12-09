import {deletePostById} from "../../models/news/index.js";

const deletePost = async (req,res)=>{
try {
    const id = req.params.id;
    const deletingPost = await deletePostById(id);
    res.send(deletingPost)
} catch (error) {
    console.error(error.message);
}
;}

   

 
export default deletePost;