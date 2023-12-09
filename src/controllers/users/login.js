import { selectUser } from "../../models/users/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import generateError from "../../utils/generateError.js";

let globalToken;
let jwtPayLoad;
const login = async (req, res, next) => {
  try {
    const { email, nickName, password } = req.body;

    const user = await selectUser(email, nickName, password);

    if (!user) {
      generateError(
        "El email o la contraseña son incorrectos, por favor, revise los datos introducidos",
        400
      );
    }

    let userCheck = false;

    user.forEach((data) => {
      if (
        (data.email === email || data.nickName === nickName) &&
        bcrypt.compareSync(password, data.passwordHash)
      ) {
        jwtPayLoad = { id: data.id };

        let token = jwt.sign(
          {
            jwtPayLoad,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "5d" }
        );

        globalToken = token;
        userCheck = true;
        return;
      }
    });

    if (userCheck === true) {
      res.status(200).json({ id: jwtPayLoad.id, token: globalToken });
    } else {
      generateError("Credenciales inválidas", 401);
    }
  } catch (error) {
    next(error);
  }
};

export default login;
