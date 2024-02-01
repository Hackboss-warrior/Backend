// En controllers/posts se ubicarán todas las funciones que realizan las acciones de la petición relacionadas con las noticias (crear un post, eliminar un post, listar todos los posts, listar un post por ID, gestión de las interacciones con el post y editar un post ya creado)
import createPost from "./createPost.js";
import lsPostById from "./getPost.js";
import deletePost from "./deletePost.js";
import interactPost from "./interactPost.js";
import getAllPosts from "./getAllPosts.js";
import deleteComment from "./deleteComment.js";
//////////////////////////////////////////////
import patchPost from "./patchPost.js";
import filterPost from "./filterPost.js";
import commentPost from "./commentPost.js";
import { selectFavorites, insertFavorite } from "./favorites.js";
import selectFavoritesByToken from "./getMyFavorites.js";
import interactComments from "./likeComments.js";
import lsPostByTitle from "./SearchPost.js";
import aboutCounting from "./aboutCount.js";
import postContactForm from "./contactForm.js";
import deletePostAdmin from "./deletePostAdmin.js";
import answerPost from "./answerPost.js";

export {
  createPost,
  lsPostById,
  deletePost,
  interactPost,
  getAllPosts,
  patchPost,
  filterPost,
  commentPost,
  selectFavorites,
  insertFavorite,
  interactComments,
  lsPostByTitle,
  aboutCounting,
  postContactForm,
  deletePostAdmin,
  answerPost,
  deleteComment,
  selectFavoritesByToken
};
