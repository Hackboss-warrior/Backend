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

    if (userWithSameNickName) {
      generateError("El nickname ya están registrados", 400);
      return;
    }

    if (userWithSameEmail) {
      generateError("El email ya están registrados", 400);
      return;
    }

    registerValidation({name, firstName, BIO, nickName, email, password, DOB})

    const processAvatar = async () => {
      if (req.files && req.files.avatar && Object.keys(req.files.avatar).length !== 0) {
        const archivoSubido = req.files.avatar;
        const filePath = `./temp/${archivoSubido.name}`;
        try {
          await new Promise((resolve, reject) => {
            archivoSubido.mv(filePath, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          });
    
          const imageBuffer = fs.readFileSync(filePath);
          const fileExtension = path.extname(archivoSubido.name);
          const uniqueFilename = uuidv4() + fileExtension;
          const newFilePath = `./uploads/${uniqueFilename}`;
    
          fs.writeFileSync(newFilePath, imageBuffer);
          fs.unlinkSync(filePath);
    
          return uniqueFilename;
        } catch (err) {
          console.error("Error al mover el archivo:", err);
          throw new Error("Error al procesar el avatar");
        }
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

