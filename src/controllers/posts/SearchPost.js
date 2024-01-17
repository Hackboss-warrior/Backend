import {
    selectPostByTitle
  } from "../../models/news/index.js";
  import generateError from "../../utils/generateError.js";

  
  const lsPostByTitle = async (req, res, next) => {
    try {
      const title = req.params.title;
  
      const post = await selectPostByTitle(title);
      if (!post) {
        generateError(
          "El post solicitado no existe, por favor compruebe su solicitud",
          400
        );
      }
      res.send(post);/*comments*/
    } catch (error) {
      next(error);
    }
  };
  
  export default lsPostByTitle;
  