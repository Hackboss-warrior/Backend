import {
  SearchPostByTags,
  getComments,
  getFavorites,
  selectAllInteracts,
  selectPosts,
  selectPostByTitle, selectPostByTitleTag
} from "../../models/news/index.js";


const getAllPosts = async (req, res, next) => {

  try {
    const title = req.query.title || "";
    const tag = req.query.tag || "";
    const posts = await selectPosts(title, tag);
    const comments = await getComments();
    const likes = await selectAllInteracts();
    const favs = await getFavorites();
    res.send([posts, comments, likes, favs]);
  } catch (error) {
    next(error);
  }

  
};

export default getAllPosts;
