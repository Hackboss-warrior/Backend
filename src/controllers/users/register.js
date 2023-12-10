import bcrypt from "bcrypt";
import {
  selectUserByEmail,
  selectUserByNickName,
  insertUser,
} from "../../models/users/index.js";
import generateError from "../../utils/generateError.js";
import sendMail from "../../utils/sendMail.js";

const register = async (req, res, next) => {
  try {
    const { name, firstName, nickName, email, password, DOB } = req.body;
    const userWithSameEmail = await selectUserByEmail(email);
    const userWithSameNickName = await selectUserByNickName(nickName);

    if (!name || !nickName || !email || !password || !DOB) {
      generateError("Completa todos los campos", 401);
      return;
    }
    if (userWithSameEmail || userWithSameNickName) {
      generateError("El nickname o el email ya estan registrados", 400);
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

    const emailSubject = "Gracias por registrarte en fakNews";
    const bodyMail = `Hola ${nickName}.
    Bienvenido/a a fakNews`;

    await sendMail(email, emailSubject, bodyMail);

    res.status(201).send({
      message: "Te has registrado mákina ✔️",
      data: { id: insertId, name, firstName, nickName, email, DOB },
    });
  } catch (error) {
    next(error);
  }
};

export default register;
