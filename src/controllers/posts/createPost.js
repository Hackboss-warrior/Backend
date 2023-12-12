import { insertPost } from "../../models/news/index.js";
import { createPostValidation } from "../../utils/joi.js";
import generateError from "../../utils/generateError.js";
import fs from "fs";
import sharp from "sharp";

const createPost = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    const { title, topic, body, tags } = req.body;

    let archivoSubido = req.files.image;

    archivoSubido.mv(`./temp/${archivoSubido.name}`, async (err) => {
      if (err) {
        return generateError(err);
      }

      let url = `temp/${archivoSubido.name}`;

      try {
        await sharp(url)
          .composite([{ input: "./temp/fakNews-logo.png" }])
          .toFile(url);
      } catch (error) {
        next(error);
      }

      let files;

      try {
        const imageBuffer = fs.readFileSync(url);
        files = imageBuffer.toString("base64");
      } catch (error) {
        next(error);
      }

      /* 
      fs.unlink(url, (err) => {
        if (err) {
          return generateError(err, 400);
        }
      }); */

      try {
        //createPostValidation({ title, topic, body, tags });

        //await insertPost({ title, topic, files, body, tags, AuthUserId });
        res.send(title);
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
};

/* const createPost = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;

    const { title, topic, body, tags } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("Ningún archivo fue subido.");
    }

    let archivoSubido = req.files.archivo;

    await archivoSubido.mv(`./temp/${archivoSubido.name}`, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
    });
    let url = `C:/Users/Omar/Documents/GitHub/Backend/temp/${archivoSubido.name}`;
    
    const prueba = async (url) => {
      const imagePath = url;
      console.log(imagePath);
      const imageBuffer = fs.readFileSync(imagePath);
      console.log("ok");
      const file = imageBuffer.toString("base64");
      return file;
    };
    const file = await prueba(url);
    console.log(file);
    createPostValidation({ title, topic, body, tags });

    //await insertPost({ title, topic, file, body, tags, AuthUserId });

    res.send(title);
  } catch (error) {
    next(error);
  }
};
 */
export default createPost;
