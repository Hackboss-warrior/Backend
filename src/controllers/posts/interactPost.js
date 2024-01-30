import {
  likeInteract,
  modifyInteraction,
  selectInteracts,
  dropInteraction,
  selectAllInteracts,
} from "../../models/news/index.js";

const interactPost = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    let { like, postId } = req.body;
    console.log(AuthUserId);
    const selectPost = await selectInteracts(postId, AuthUserId);

    if (selectPost === undefined) {
      await likeInteract(like, postId, AuthUserId);
      // res.status(200).send("Has interactuado correctamente👍");
    } else if (selectPost.interaction === like) {
      await dropInteraction(like, postId, AuthUserId);
      // res.status(200).send("Has borrado correctamente la interación👍");
    } else {
      await modifyInteraction(like, postId, AuthUserId);
      //res.status(200).send("Has modificado la interación correctamente");
    }
  } catch (error) {
    next(error);
  } finally {
    const interacts = await selectAllInteracts();
    res.status(200).send(interacts);
  }
};

export default interactPost;
