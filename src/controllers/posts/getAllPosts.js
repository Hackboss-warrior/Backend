import { getComments, selectPosts } from "../../models/news/index.js";

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await selectPosts();
    const comments = await getComments();
    res.send([posts, comments]);
  } catch (error) {
    next(error);
  }
};

export default getAllPosts;
