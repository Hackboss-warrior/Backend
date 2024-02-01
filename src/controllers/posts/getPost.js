import {
  getFavoriteByPost,
  listCommentByPostId,
  listInteractsByPostId,
  selectPostById,
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

    const comments = await listCommentByPostId(id);

    const likes = await listInteractsByPostId(id);
    const favs = await getFavoriteByPost(id);

    res.send([post, comments, likes, favs]);
  } catch (error) {
    next(error);
  }
};

export default lsPostById;
