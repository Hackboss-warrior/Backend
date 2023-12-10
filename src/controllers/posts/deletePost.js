import { deletePostById } from "../../models/news/index.js";
import generateError from "../../utils/generateError.js";

const deletePost = async (req, res, next) => {
    try {
        const AuthUserId = req.auth.id;
        if (!AuthUserId) {
            generateError("Debe loguearse antes de realizar cambios", 401);
        }
        //Joi





        const id = req.params.id;
        const deletingPost = await deletePostById(id);
        res.send(deletingPost)
    } catch (error) { 
        next(error)
        console.error('error en el generador de errores'+ error.message);
       
    }
};




export default deletePost;