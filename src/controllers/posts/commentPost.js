import { insertComment } from "../../models/news/index.js";
import generateError from "../../utils/generateError.js";

const commentPost = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    console.log(AuthUserId);
    const postId = req.params.id;

    const { commentBody, hierarchy } = req.body;

    const comment = commentBody.comment;
    console.log(comment);
    if (!comment) {
      generateError("El comentario no puede estar vacío", 400);
    }

    await insertComment({ postId, AuthUserId, comment, hierarchy });

    res.send(`Su comentario "${comment}" se ha publicado`);
  } catch (error) {
    next(error);
  }
};

export default commentPost;
