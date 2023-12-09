import bcrypt from "bcrypt";
import {
  selectUserByEmail,
  selectUserByNickName,
  insertUser,
} from "../../models/users/index.js";
import generateError from "../../utils/generateError.js";

const register = async (req, res) => {
  try {
    const { name, firstName, nickName, email, password, DOB } = req.body;
    const userWithSameEmail = await selectUserByEmail(email);
    const userWithSameNickName = await selectUserByNickName(nickName);

    if (!name || !nickName || !email || !password || !DOB) {
      res.status(400).send("Completa todos los campos");
      return;
    }
    if (userWithSameEmail || userWithSameNickName) {
      res.status(400).send("El nickname o el email ya estan registrados");
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const insertId = await insertUser({
      name,
      firstName,
      nickName,
      email,
      hashedPassword,
      DOB,
    });
    res.status(201).send({
      message: "Te has registrado mákina ✔️",
      data: { id: insertId, name, firstName, nickName, email, DOB },
    });
  } catch (error) {
    console.log("Se ha producido un error:", error);
    res.sendStatus(500).json({ message: "Error interno del servidor" });
  }
};

export default register;
