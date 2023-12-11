import { selectPosts } from "../../models/news/index.js";

const getAllPosts = async (req, res, next) => {
  try {

    const posts = await selectPosts();
    res.send(posts)

  } catch (error) {
    next(error)
  }
};

export default getAllPosts;