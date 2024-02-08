import {
  selectPostById,
  updatePost,
  selectPostByIdLimit,
} from "../../models/news/index.js";
import generateError from "../../utils/generateError.js";
import { editPostValidation } from "../../utils/joi.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import sharp from "sharp";
const patchPost = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    const id = req.params.id;
    let { title, topic, body, tag } = req.body;
    const post = await selectPostById(id);

    const processFile = async () => {
      if (req.files?.file) {
        const archivoSubido = req.files.file;
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
        return post.files;
      }
    };

    const postFile = await processFile();

    if (!post) {
      generateError("La noticia a la que quieres acceder no existe", 404);
    }

    if (post.userId !== AuthUserId) {
      generateError("Solo puedes editar noticias tuyas", 403);
    }

    const validTags = [
      "Otros",
      "Política",
      "Economía",
      "Tecnología",
      "Ciencia",
      "Salud",
      "Cultura",
      "Deportes",
      "Entretenimiento",
    ];

    if (!tag) {
      tag = "Otros";
    }

    if (!validTags.includes(tag)) {
      generateError("La categoria seleccionada no existe", 400);
    }

    editPostValidation({ title, topic, body });

    await updatePost({ title, topic, body, tag, postFile, id });

    const updatedPost = await selectPostByIdLimit(id);
    res.send({ updatedPost });
  } catch (error) {
    next(error);
  }
};

export default patchPost;
