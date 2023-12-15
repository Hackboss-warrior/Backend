import { selectUserAll, editUser } from "../../models/users/index.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const patchUser = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    const [user] = await selectUserAll(AuthUserId);

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
    
    if (req.files){
      reqAvatar = req.files.avatar;
    }
    

    const password = reqPassword
      ? bcrypt.hashSync(reqPassword, 10)
      : user.passwordHash;
    let avatar;

    let processAvatar = async (reqAvatar) => {
      if (reqAvatar) {
        const archivoSubido = reqAvatar;
        const filePath = `./temp/${archivoSubido.name}`;

        try {
          await new Promise((resolve, reject) => {
            archivoSubido.mv(filePath, async (err) => {
              if (err) {
                reject(err);
              }

              const imageBuffer = fs.readFileSync(filePath);
              const fileExtension = path.extname(archivoSubido.name);
              avatar = uuidv4() + fileExtension;
              const newFilePath = `./uploads/${avatar}`;

              fs.writeFileSync(newFilePath, imageBuffer);
              fs.unlinkSync(`./temp/${archivoSubido.name}`);

              resolve();
            });
          });
        } catch (err) {
          console.error("Error al subir el archivo:", err);
          throw new Error("Error al subir el archivo");
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
