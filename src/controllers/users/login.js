import { selectUser } from "../../models/users/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import generateError from "../../utils/generateError.js";

const login = async (req, res, next) => {
  try {
    const { email, nickName, password } = req.body;

    console.log(email, nickName, password);

    const user = await selectUser();

    if (!user) {
      generateError(
        "El email o la contraseña son incorrectos, por favor, revise los datos introducidos",
        400
      );
    }

    const foundUser = user.find(
      (data) =>
        (data.email === email || data.nickName === nickName) &&
        bcrypt.compareSync(password, data.passwordHash)
    );

    if (foundUser) {
      let jwtPayLoad = { id: foundUser.id };

      const token = jwt.sign(
        {
          jwtPayLoad,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "5d" }
      );

      res.status(200).json({ id: jwtPayLoad.id, token: token });
    } else {
      generateError("Credenciales inválidas", 401);
    }
  } catch (error) {
    next(error);
  }
};

export default login;
