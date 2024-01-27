import { selectUserById, selectUserAll } from "../../models/users/index.js";
import generateError from "../../utils/generateError.js";

const getAllUser = async (req, res, next) => {

  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    
    const userID = await selectUserById(AuthUserId)
    if (userID[0].role !== 'admin'){
        generateError("Que intentas hacer si no eres admin..., tira pa' casa flipao", 400)
    }
    const user = await selectUserAll()
    res.status(200).send(user);
    
  } catch (error) {
    next(error);
  }
};

export default getAllUser;
