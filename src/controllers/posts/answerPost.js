import { getComments, insertComment } from "../../models/news/index.js";
import generateError from "../../utils/generateError.js";

const answerPost = async (req, res, next) => {
  try {

    const postId = req.params.id;

    console.log(req.body)

  } catch (error) {
    next(error);
  }
};

export default answerPost;
