import {
  SearchPostByTags,
  getComments,
  getFavorites,
  selectAllInteracts,
  selectPostByTitle, selectPostByTitleTag
} from "../../models/news/index.js";
import generateError from "../../utils/generateError.js";


const lsPostByTitle = async (req, res, next) => {
  try {

    const { title, tag } = req.query;
    let post

    if (!title && tag) {
      post = await SearchPostByTags(tag)
    }
    if (!tag && title) {
      post = await selectPostByTitle(title)
    }
    if (title && tag) {
      post = await selectPostByTitleTag(title, tag);
    }



    if (!post) {
      generateError(
        "El post solicitado no existe, por favor compruebe su solicitud",
        400
      );
    }


    const likes = await selectAllInteracts();
 
    const comments = await getComments();

    const favs = await getFavorites();


    res.send([post, comments, likes, favs]);
  } catch (error) {
    next(error);
  }
};


export default lsPostByTitle;
