import { getComments, insertComment } from "../../models/news/index.js";
import generateError from "../../utils/generateError.js";

const commentPost = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;

    const postId = req.params.id;

    const { comment } = req.body;

    // const comment = commentBody.comment;

    if (!comment) {
      generateError("El comentario no puede estar vacío", 400);
    }

    await insertComment({ postId, AuthUserId, comment });

    const resComments = await getComments();
    res.send(resComments);
  } catch (error) {
    next(error);
  }
};

export default commentPost;
