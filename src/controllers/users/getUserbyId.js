import { selectUserById } from "../../models/users/index.js";
import generateError from "../../utils/generateError.js";

const getUserbyId = async (req, res, next) => {

  try {
    
    const AuthUserId = req.auth.jwtPayLoad.id;
    
    const userId = await selectUserById(AuthUserId)

    if (!userId){
        generateError("No tienes acceso a un perfil que no sea el tuyo")
    }

    res.status(200).send(userId[0]);
    
  } catch (error) {
    next(error);
  }
};

export default getUserbyId;










