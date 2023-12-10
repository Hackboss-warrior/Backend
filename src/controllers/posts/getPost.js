import { selectByPostId } from "../../models/news/index.js";
import generateError from "../../utils/generateError.js"


const lsPostById = async (req, res, next) => {
  try {

    const id = req.params.id;
    //Joi





    const post = await selectByPostId(id);

    res.send(post)

  } catch (error) {
    //lanzamos el error al middleware de errores
    next(error)
    //si por algun casual el middleware no saltase, aparecería este error
    console.error('error en el generador de errores'+error.message);
  }
};

export default lsPostById;