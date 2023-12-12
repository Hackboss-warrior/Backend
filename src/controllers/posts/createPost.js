// import { insertPost } from "../../models/news/index.js";
// import { createPostValidation } from "../../utils/joi.js";
// import generateError from "../../utils/generateError.js";
// import fs from "fs";
// import sharp from "sharp";

// const createPost = async (req, res, next) => {
//   try {
//     const AuthUserId = req.auth.jwtPayLoad.id;
//     const { title, topic, body, tags } = req.body;

//     let archivoSubido = req.files.image;

//     archivoSubido.mv(`./temp/${archivoSubido.name}`, async (err) => {
//       if (err) {
//         return generateError(err);
//       }

//       let url = `temp/${archivoSubido.name}`;

//       try {
//         await sharp(url)
//           .composite([{ input: "./temp/fakNews-logo.png" }])
//           .toFile(url);
//       } catch (error) {
//         next(error);
//       }

//       let files;

//       try {
//         const imageBuffer = fs.readFileSync(url);
//         files = imageBuffer.toString("base64");
//       } catch (error) {
//         next(error);
//       }

//       /* 
//       fs.unlink(url, (err) => {
//         if (err) {
//           return generateError(err, 400);
//         }
//       }); */

//       try {
//         //createPostValidation({ title, topic, body, tags });

//         //await insertPost({ title, topic, files, body, tags, AuthUserId });
//         res.send(title);
//       } catch (error) {
//         next(error);
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export default createPost;


import { insertPost } from "../../models/news/index.js";
import { createPostValidation } from "../../utils/joi.js";
import generateError from "../../utils/generateError.js";
import fs from "fs";
import sharp from "sharp";

const createPost = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    const { title, topic, body, tags } = req.body;
    const archivoSubido = req.files.image;

    const filePath = `./temp/${archivoSubido.name}`;
    const filePath2= `./temp/mod/${archivoSubido.name}`;

    // Mover el archivo subido
    archivoSubido.mv(filePath, async (err) => {
      if (err) {
        return next(generateError(err, 500, "Error al subir el archivo"));
      }

      try {
        // Procesar la imagen con Sharp
        await sharp(filePath)
          .composite([{ input: "./fakNews-logo.png", gravity: "southeast" }])
          .toFile(filePath2);

        // Leer y convertir la imagen a base64
        const imageBuffer = fs.readFileSync(filePath2);
        const files = imageBuffer.toString("base64");

        // Eliminar el archivo temporal
        fs.unlink(filePath, (err) => {
          if (err) {
            return next(generateError(err, 500, "Error al eliminar el archivo temporal"));
          }
       });

        // Eliminar el archivo temporal
        fs.unlink(filePath2, (err) => {
           if (err) {
             return next(generateError(err, 500, "Error al eliminar el archivo temporal"));
           }
        });

        // Validar datos de entrada
        createPostValidation({ title, topic, body, tags });

        // Insertar el post en la base de datos
        await insertPost({ title, topic, files, body, tags, AuthUserId });

        res.send(title); // Envía una respuesta si todo está bien
      } catch (error) {
        next(error); // Propaga cualquier error al manejador de errores
      }
    });
  } catch (error) {
    next(error);
  }
};

export default createPost;
