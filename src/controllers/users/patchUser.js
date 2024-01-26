import { selectUserById, editUser } from "../../models/users/index.js";
import { editUserValidation } from "../../utils/joi.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import generateError from "../../utils/generateError.js";

const patchUser = async (req, res, next) => {

  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    const [user] = await selectUserById(AuthUserId);
    let {
      name = user.name,
      firstName = user.firstName,
      BIO = user.BIO,
      avatar: reqAvatar,
      nickName = user.nickName,
      email = user.email,
      password: reqPassword,
      DOB = user.DOB,
    } = req.body;

    if (req.files) {
      reqAvatar = req.files.avatar;
    }


    editUserValidation({ name, firstName, BIO, nickName, email, password: reqPassword, DOB })

    const password = reqPassword
      ? bcrypt.hashSync(reqPassword, 10)
      : user.passwordHash;
    let avatar;


    res.status(200).send("Has modificado tu perfil");



    let processAvatar = async (reqAvatar) => {
      if (reqAvatar) {
        const archivoSubido = reqAvatar;
        const filePath = `./temp/${archivoSubido.name}`;

        if (req.files?.avatar) {
          const archivoSubido = req.files.avatar;
          if (path.extname(archivoSubido.name) !== '.gif' && path.extname(archivoSubido.name) !== '.jpeg' && path.extname(archivoSubido.name) !== '.png'
          ) {
            generateError("Archivo de imagen no soportado. Utilice: png, jpeg o gif", 400);
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
          return null;
        }
      } else {
        avatar = user.avatar;
      }
      return avatar;
    };

    processAvatar(reqAvatar)
      .then(async (avatar) => {
        await editUser({
          AuthUserId,
          name,
          firstName,
          BIO,
          avatar,
          nickName,
          email,
          password,
          DOB,
        });

        res.status(200).send("Has modificado tu perfil");
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

export default patchUser;
