import { insertComment } from "../../models/news/index.js";
import generateError from "../../utils/generateError.js";
import { io } from "../../../app.js"; // Ajusta la ruta según tu estructura


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

    io.emit("newComment", { postId, AuthUserId, comment });

    res.send(`Su comentario "${comment}" se ha publicado`);
  } catch (error) {
    next(error);
  }
};

export default commentPost;
