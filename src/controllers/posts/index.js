// En controllers/posts se ubicarán todas las funciones que realizan las acciones de la petición relacionadas con las noticias (crear un post, eliminar un post, listar todos los posts, listar un post por ID, gestión de las interacciones con el post y editar un post ya creado)
import createPost from "./createPost.js";
import lsPostById from "./getPost.js";
import deletePost from "./deletePost.js";
import interactPost from "./interactPost.js";
import getAllPosts from "./getAllPosts.js";

//////////////////////////////////////////////
import patchPost from "./patchPost.js";
import filterPost from "./filterPost.js";
import commentPost from "./commentPost.js";
////////////////////////////////////////
import patchPost from "./patchPost.js"
import filterPost from "./filterPost.js"
////////////////////////////////////////
import  {selectFavorites,insertFavorite} from "./favorites.js";
export { createPost,lsPostById,deletePost, interactPost, getAllPosts, patchPost, filterPost,commentPost,selectFavorites,insertFavorite, interactComments };

import interactComments from "./likeComments.js";
