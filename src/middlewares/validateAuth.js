import jwt from "jsonwebtoken";
import generateError from "../utils/generateError.js";

const validateAuth = (req, res, next) => {
  try {
    const  {authorization}  = req.headers;

    const [tokenType, token] = authorization.split(" ");

    if (token === "null") {
      return generateError("El header 'authorization' es requerido", 401);
    }

    if (tokenType !== "Bearer") {
      return generateError("El token debe ser de tipo 'Bearer'", 400);
    }

    try {
      const tokenPayLoad = jwt.verify(token, process.env.TOKEN_SECRET);
      req.auth = tokenPayLoad;
      next();
    } catch (error) {
      return generateError("El token es inválido", 400);
    }

  } catch (error) {
    next(error);
  }
};

export default validateAuth;
