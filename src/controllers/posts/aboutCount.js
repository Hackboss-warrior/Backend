import { aboutCount } from "../../models/news/index.js";

const aboutCounting = async (req, res, next) => {
  try {
   const counting = await aboutCount()
 
   
    res.send({"totalUsers":counting.totalUsers, "totalPosts":counting.totalPosts, "totalComments":counting.totalComments});
  } catch (error) {
    next(error);
  }
};

export default aboutCounting;