import bcrypt from "bcrypt";
import {
  selectUserByEmail,
  selectUserByNickName,
  insertUser,
} from "../../models/users/index.js";
import generateError from "../../utils/generateError.js";
import sendMail from "../../utils/sendMail.js";
import { registerValidation } from "../../utils/joi.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const register = async (req, res, next) => {
  try {
    const { name, firstName, BIO, nickName, email, password, DOB } = req.body;
    const userWithSameEmail = await selectUserByEmail(email);
    const userWithSameNickName = await selectUserByNickName(nickName);
    if (userWithSameEmail || userWithSameNickName) {
      generateError("El nickname o el email ya estan registrados", 400);
      return;
    }

    const archivoSubido = req.files.avatar;
    const filePath = `./temp/${archivoSubido.name}`;
    let insertId;

    //Mover el archivo subido
    archivoSubido.mv(filePath, async (err) => {
      if (err) {
        return next(generateError(err, 500, "Error al subir el archivo"));
      }

      const imageBuffer = fs.readFileSync(filePath);
      const fileExtension = path.extname(archivoSubido.name);
      const uniqueFilename = uuidv4() + fileExtension;

      const newFilePath = `./uploads/avatar/${uniqueFilename}`;

      fs.writeFileSync(newFilePath, imageBuffer);

      fs.unlinkSync(`./temp/${archivoSubido.name}`);

      registerValidation(req.body);

      const hashedPassword = bcrypt.hashSync(password, 10);

      insertId = await insertUser({
        name,
        firstName,
        BIO,
        uniqueFilename,
        nickName,
        email,
        hashedPassword,
        DOB,
      });
      return insertId;
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
