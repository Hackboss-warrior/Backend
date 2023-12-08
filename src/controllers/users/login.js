import { selectUser } from "../../models/users/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const login = async (req, res) => {
  try {
    const { email, nickName, password } = req.body;

    const user = await selectUser(email, nickName, password);

    if (!user) {
      generateError(
        "El email o la contraseña son incorrectos, por favor, revise los datos introducidos",
        400
      );
    }

    let globalToken;
    let userCheck = false;
    let jwtPayLoad;

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
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    console.log("Se ha producido un error:", error);
    res.sendStatus(500).json({ message: "Error interno del servidor" });
  }
};

export default login;
