import {
  selectInteractsComment,
  likeInteractComment,
  dropInteractionComment,
  modifyInteractionComment,
} from "../../models/news/index.js";

const interactComments = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    let { like, commentId } = req.body;
    const selectComment = await selectInteractsComment(commentId, AuthUserId);

    if (selectComment === undefined) {
      await likeInteractComment(like, commentId, AuthUserId);
      res.status(200).send("Has interactuado correctamente👍");
    } else if (
      selectComment.commentId === commentId &&
      selectComment.userId === AuthUserId &&
      selectComment.interaction === like
    ) {
      await dropInteractionComment(like, commentId, AuthUserId);
      res.status(200).send("Has borrado correctamente la interación👍");
    } else {
      await modifyInteractionComment(like, commentId, AuthUserId);
      res.status(200).send("Has modificado la interación correctamente");
    }
  } catch (error) {
    next(error);
  }
};

export default interactComments;
