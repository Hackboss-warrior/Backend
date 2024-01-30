import generateError from "../../utils/generateError.js";
import {
  deleteCommentById,
  getCommentsbyId,
  selectIdCommentByIdUser,
} from "../../models/news/index.js";

const deleteComment = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    const id = req.params.id;

    if (!(await getCommentsbyId(id))) {
      generateError("No puedes eliminar un comentario que no existe", 404);
    }

    const userId = await selectIdCommentByIdUser(id);

    if (AuthUserId !== userId.userId) {
      generateError(
        "No puedes eliminar un comentario que no sea tuyo, payaso :)",
        400
      );
    }

    await deleteCommentById(id);
    res.send(`El comentario ha sido eliminado correctamente`);
  } catch (error) {
    next(error);
  }
};

export default deleteComment;
