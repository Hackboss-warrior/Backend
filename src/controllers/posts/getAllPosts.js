import {
  getComments,
  getFavorites,
  selectAllInteracts,
  selectPosts,
} from "../../models/news/index.js";

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await selectPosts();
    const comments = await getComments();
    const likes = await selectAllInteracts();
    const favs = await getFavorites();
    res.send([posts, comments, likes, favs]);
  } catch (error) {
    next(error);
  }
};

export default getAllPosts;
