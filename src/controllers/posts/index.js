// En controllers/posts se ubicarán todas las funciones que realizan las acciones de la petición relacionadas con las noticias (crear un post, eliminar un post, listar todos los posts, listar un post por ID, gestión de las interacciones con el post y editar un post ya creado)
import createPost from "./createPost.js"
import lsPostById from "./getPost.js";
import deletePost from "./deletePost.js";
export { createPost,lsPostById,deletePost };