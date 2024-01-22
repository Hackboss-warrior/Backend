import { selectUser } from "../../models/users/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import generateError from "../../utils/generateError.js";

const login = async (req, res, next) => {
  try {
    const { email, nickName, password } = req.body;

    const user = await selectUser(email, nickName);

    if (!bcrypt.compareSync(password, user[0].passwordHash)) {
      generateError(
        "Credenciales inválidas, por favor, revise los datos introducidos",
        400
      );
    }

    let jwtPayLoad = { id: user[0].id, role: user[0].role };

    const token = jwt.sign(
      {
        jwtPayLoad,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "5d" }
    );
    
    console.log(jwtPayLoad)

    res.status(200).json({ id: jwtPayLoad.id, role:jwtPayLoad.role, token: token });

  } catch (error) {
    next(error);
  }
};

export default login;
