import {selectUserAll, editUser} from "../../models/users/index.js";
import bcrypt from "bcrypt";

const patchUser = async (req, res, next) => {
    try {
      const AuthUserId = req.auth.jwtPayLoad.id;
      const [user] = await selectUserAll(AuthUserId);
  
      const {
        name = user.name,
        firstName = user.firstName,
        nickName = user.nickName,
        email = user.email,
        password: reqPassword,
        DOB = user.DOB
      } = req.body;
  
      const password = reqPassword ? bcrypt.hashSync(reqPassword, 10) : user.password;
  
      await editUser({ AuthUserId, name, firstName, nickName, email, password, DOB });
  
      res.status(200).send('Has modificado tu perfil');
    } catch (error) {
      next(error);
    }
};

export default patchUser;