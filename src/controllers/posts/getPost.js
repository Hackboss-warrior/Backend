import {
  selectPostById,
  listCommentByPostId,
} from "../../models/news/index.js";
import generateError from "../../utils/generateError.js";

const lsPostById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const post = await selectPostById(id);
    if (!post) {
      generateError(
        "El post solicitado no existe, por favor compruebe su solicitud",
        400
      );
    }

    //////////////////////////////////////
    const comments = await listCommentByPostId(id);
    //////////////////////////////////////
    res.send({ post, comments });
  } catch (error) {
    next(error);
  }
};

export default lsPostById;
