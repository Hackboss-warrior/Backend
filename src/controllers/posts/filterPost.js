import { filterPostByTags } from "../../models/news/index.js";

const filterPost = async (req, res, next) => {
  try {
    const  {tag}  = req.body;
    console.log(tag)
    const consulta = await filterPostByTags(tag);

    res.send(consulta);
  } catch (error) {
    next(error);
  }
};

export default filterPost;
