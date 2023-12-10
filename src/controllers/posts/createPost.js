import { insertPost } from "../../models/news/index.js";
import generateError from "../../utils/generateError.js";
const createPost = async (req, res, next) => {
    try {
        const AuthUserId = req.auth.id;
        if (!AuthUserId) {
            generateError("Debe loguearse antes de realizar cambios", 401);
        }
        const { title, files, topic, body, tags } = req.body;
//JOI




        await insertPost({ title, files, topic, body, tags, AuthUserId });

        res.send(title)


    } catch (error) {
        next(error)
        console.error('error en el generador de errores'+ error.message);
    }
}




export default createPost