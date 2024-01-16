import {
  deletePostById,
  selectIdPostByIdUser,
  deleteCommentByPostId,
  deleteFavoriteByPostId,
  deleteInteractsByPostId,
} from "../../models/news/index.js";
import { selectPostById } from "../../models/news/index.js";
import generateError from "../../utils/generateError.js";

const deletePost = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    const id = req.params.id;

    if (!await selectPostById(id)){
      generateError(
        "No puedes eliminar un post que no existe",
        404
      );
    }
    
    const userId = await selectIdPostByIdUser(id);

    if (AuthUserId !== userId.userId) {
      generateError(
        "No puedes eliminar un post que no sea tuyo, payaso :)",
        400
      );
    }
    await deletePostById(id);
    res.send(`El post ha sido eliminado correctamente`);
    
    
  } catch (error) {
    next(error);
  }
};

export default deletePost;
