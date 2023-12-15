import {
  deletePostById,
  selectIdPostByIdUser,
  deleteCommentByPostId,
  deleteFavoriteByPostId,
  deleteInteractsByPostId,
} from "../../models/news/index.js";
import generateError from "../../utils/generateError.js";

const deletePost = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    const id = req.params.id;
    const userId = await selectIdPostByIdUser(id);

    if (AuthUserId !== userId.userId) {
      generateError(
        "No puedes eliminar un post que no sea tuyo, payaso :)",
        400
      );
    }

    try {
      await deleteCommentByPostId(id);
    } catch (error) {
      next(error)
    }

    try {
      await deleteFavoriteByPostId(id);
    } catch (error) {
      next(error)
    }

    try {
      await deleteInteractsByPostId(id);
    } catch (error) {
      next(error)
    }

    try {
      await deletePostById(id);
      res.send(`El post ha sido eliminado correctamente`);
    } catch (error) {
      next(error)
    }
  } catch (error) {
    next(error);
  }
};

export default deletePost;
