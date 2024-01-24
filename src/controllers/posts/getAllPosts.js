import {
  getComments,
  selectAllInteracts,
  selectPosts,
} from "../../models/news/index.js";

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await selectPosts();
    const comments = await getComments();
    const likes = await selectAllInteracts();
    res.send([posts, comments, likes]);
  } catch (error) {
    next(error);
  }
};

export default getAllPosts;
