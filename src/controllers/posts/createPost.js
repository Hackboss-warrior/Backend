import { insertPost } from "../../models/news/index.js";
import { createPostValidation } from "../../utils/joi.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import generateError from "../../utils/generateError.js";

const createPost = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    let { title, topic, body, tag } = req.body;
    let uniqueFilename = null;

    const uploadFile = async () => {
      if (req.files && req.files.image) {
        const archivoSubido = req.files.image;
        const filePath = `./temp/${archivoSubido.name}`;
        return new Promise((resolve, reject) => {
          archivoSubido.mv(filePath, async (err) => {
            if (err) {
              reject(err);
              return;
            }

            try {
              const imageBuffer = fs.readFileSync(filePath);
              const fileExtension = path.extname(archivoSubido.name);
              uniqueFilename = uuidv4() + fileExtension;

              const newFilePath = `./uploads/${uniqueFilename}`;
              fs.writeFileSync(newFilePath, imageBuffer);

              fs.unlinkSync(filePath);

              resolve(uniqueFilename);
            } catch (error) {
              reject(error);
            }
          });
        });
      } else {
        return uniqueFilename;
      }
    };


    uniqueFilename = await uploadFile();

    const validTags = ['Otros', 'Política', 'Economía', 'Tecnología', 'Ciencia', 'Salud', 'Cultura', 'Deportes', 'Entretenimiento']

    if (!tag){
      tag = 'Otros'
    }
    
    if (!validTags.includes(tag)) {
      generateError("La categoria seleccionada no existe", 400)
    }

    createPostValidation({ title, topic, body });

    await insertPost({ title, topic, uniqueFilename, body, AuthUserId, tag });

    res.send(`Felicidades su artículo ${title} se ha publicado con éxito`);


  } catch (error) {
    next(error);
  }
};

export default createPost;
