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
import path from "path";
import sharp from "sharp";

const register = async (req, res, next) => {
  try {
    const { name, firstName, BIO, nickName, email, password, DOB } = req.body;
    const userWithSameEmail = await selectUserByEmail(email);
    const userWithSameNickName = await selectUserByNickName(nickName);

    if (userWithSameNickName) {
      generateError("El nickname ya están registrados", 400);
      return;
    }

    if (userWithSameEmail) {
      generateError("El email ya están registrados", 400);
      return;
    }

    registerValidation({
      name,
      firstName,
      BIO,
      nickName,
      email,
      password,
      DOB,
    });

    const processAvatar = async () => {
      if (req.files?.avatar) {
        const archivoSubido = req.files.avatar;
        if (
          path.extname(archivoSubido.name) !== ".gif" &&
          path.extname(archivoSubido.name) !== ".jpeg" &&
          path.extname(archivoSubido.name) !== ".png"
        ) {
          generateError(
            "Archivo de imagen no soportado. Utilice: png, jpeg o gif",
            400
          );
        }
        const uniqueFilename = uuidv4() + path.extname(archivoSubido.name);

        sharp(archivoSubido.data)
          .resize(500, 500)
          .toFile(`./uploads/${uniqueFilename}`, (err, info) => {
            if (err) {
              generateError("Hubo un error con la subida de imagen", 500);
            }
          });
        return uniqueFilename;
      } else {
        return null; // Si no se proporciona un avatar, devuelve null
      }
    };

    const avatarFilename = await processAvatar();

    const hashedPassword = bcrypt.hashSync(password, 10);

    const insertId = await insertUser({
      name,
      firstName,
      BIO,
      uniqueFilename: avatarFilename,
      nickName,
      email,
      hashedPassword,
      DOB,
    });

    const emailSubject = "Gracias por registrarte en fakNews";
    const bodyMail = `Hola ${nickName}. Bienvenido/a a fakNews`;

    await sendMail(email, emailSubject, bodyMail);

    res.status(201).send({
      message: "Te has registrado máquina ✔️",
      data: { id: insertId, name, firstName, nickName, email, DOB },
    });
  } catch (error) {
    next(error);
  }
};

export default register;
