import { insertPost } from "../../models/news/index.js";
import { createPostValidation } from "../../utils/joi.js";

const createPost = async (req, res, next) => {
    try {
        const AuthUserId = req.auth.jwtPayLoad.id;

        const { title, files, topic, body, tags } = req.body;
    
        createPostValidation({ title, files, topic, body, tags})
        
        await insertPost({ title, files, topic, body, tags, AuthUserId });

        res.send(title)

    } catch (error) {
        next(error)
    }
}




export default createPost