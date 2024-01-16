import { selectPostById, updatePost, selectPostByIdLimit } from "../../models/news/index.js";
import generateError from "../../utils/generateError.js"
import { editPostValidation } from "../../utils/joi.js";

const patchPost = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    const id = req.params.id;

    const post = await selectPostById(id)

    if (!post) {
       generateError("La noticia a la que quieres acceder no existe", 404);
    }


    if (post.userId !== AuthUserId) {
      generateError("Solo puedes editar noticias tuyas", 403);
    }

    editPostValidation = ({ title, topic, body, tags })

    const postToUpdate = {
       ...post,
       ...req.body,
    };
    
    const { title, files, topic, body, tags } = postToUpdate;
    
    await updatePost({ title, files, topic, body, tags, id })
    const updatedPost = await selectPostByIdLimit(id)
    res.send({ updatedPost });

    } catch (error) {
        next(error);
    }
};

export default patchPost;