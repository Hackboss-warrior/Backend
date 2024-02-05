// En models/news ubicaremos todas las querys realizadas a la base de datos para luego utilizarlas en las peticiones al servidor. p.e. insert into posts...
import insertPost from "./insertPost.js";

import { selectPostById, selectPostByIdLimit } from "./selectPostById.js";
import {
  deletePostById,
  deleteCommentByPostId,
  deleteFavoriteByPostId,
  deleteInteractsByPostId,
} from "./deletePost.js";
import selectIdPostByIdUser from "./selectIdPostByIdUser.js";
import selectPosts from "./selectPosts.js";
import { selectInteracts, selectAllInteracts } from "./selectInteracts.js";
import {
  likeInteract,
  modifyInteraction,
  dropInteraction,
  listInteractsByPostId,
} from "./interactPost.js";
import updatePost from "./updatePost.js";
import {filterPostByTags,SearchPostByTags }from "./filterPostByTags.js";
import insertComment from "./insertComment.js";
import listCommentByPostId from "./listCommentsByPostId.js";
///////////////////////////////////////
import {
  selectFavoriteByPost,
  saveFavorite,
  dropfavorite,
  selectFavoritesPosts,
  getFavorites,
  getFavoriteByPost,

  selectFavoritesPostsById

} from "./favorites.js";
import {
  selectInteractsComment,
  likeInteractComment,
  dropInteractionComment,
  modifyInteractionComment,
} from "./likeComents.js";
import {selectPostByTitle,selectPostByTitleTag} from "./selectPostByTitle.js";
import {
  getComments,
  getCommentsbyId,
  selectIdCommentByIdUser,
  deleteCommentById,
} from "./getComments.js";
import aboutCount from "./aboutCount.js";
import insertContactForm from "./insertContactForm.js";

export {
  aboutCount,
  insertPost,
  selectPostByIdLimit,
  selectPostById,
  deletePostById,
  selectIdPostByIdUser,
  selectPosts,
  selectInteracts,
  selectAllInteracts,
  likeInteract,
  modifyInteraction,
  dropInteraction,
  updatePost,
  filterPostByTags,
  SearchPostByTags,
  insertComment,
  listCommentByPostId,
  deleteCommentByPostId,
  deleteFavoriteByPostId,
  deleteInteractsByPostId,
  selectFavoriteByPost,
  saveFavorite,
  dropfavorite,
  selectFavoritesPosts,
  selectInteractsComment,
  likeInteractComment,
  dropInteractionComment,
  modifyInteractionComment,
  selectPostByTitle,
  getComments,
  insertContactForm,
  listInteractsByPostId,
  getCommentsbyId,
  selectIdCommentByIdUser,
  deleteCommentById,
  getFavorites,
  getFavoriteByPost,
  selectFavoritesPostsById,
  selectPostByTitleTag

};
