import { insertPost } from "../../models/news/index.js";
import { createPostValidation } from "../../utils/joi.js";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import fs from "fs";

const createPost = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    const { title, topic, body, tags } = req.body;
    const archivoSubido = req.files.image;

    const filePath = `./temp/${archivoSubido.name}`;
    archivoSubido.mv(filePath, async (err) => {
      if (err) {
        return next(err);
      }

      try {
        const imageBuffer = fs.readFileSync(filePath);
        const fileExtension = path.extname(archivoSubido.name);
        const uniqueFilename = uuidv4() + fileExtension;

        const newFilePath = `./uploads/${uniqueFilename}`;

        fs.writeFileSync(newFilePath, imageBuffer);

        fs.unlinkSync(`./temp/${archivoSubido.name}`)
   
        createPostValidation({ title, topic, body, tags });

        await insertPost({ title, topic, uniqueFilename, body, tags, AuthUserId });

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
