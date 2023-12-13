import { insertPost } from "../../models/news/index.js";
import { createPostValidation } from "../../utils/joi.js";
import generateError from "../../utils/generateError.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

const createPost = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    const { title, topic, body, tags } = req.body;
    const archivoSubido = req.files.image;

    const filePath = `./temp/${archivoSubido.name}`;

    //Mover el archivo subido
    archivoSubido.mv(filePath, async (err) => {
      if (err) {
        return next(generateError(err, 500, "Error al subir el archivo"));
      }

      try {
        const imageBuffer = fs.readFileSync(filePath);
        const fileExtension = path.extname(archivoSubido.name);
        const uniqueFilename = uuidv4() + fileExtension;

        const newFilePath = `./uploads/${uniqueFilename}`;

        fs.writeFileSync(newFilePath, imageBuffer);

        fs.unlinkSync(`./temp/${archivoSubido.name}`);

        // Validar datos de entrada
        createPostValidation({ title, topic, body, tags });

        // Insertar el post en la base de datos
        await insertPost({
          title,
          topic,
          uniqueFilename,
          body,
          tags,
          AuthUserId,
        });

        res.send(title);
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
};

export default createPost;
