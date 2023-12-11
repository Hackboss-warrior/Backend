// En models/news ubicaremos todas las querys realizadas a la base de datos para luego utilizarlas en las peticiones al servidor. p.e. insert into posts...
import insertPost from "./insertPost.js";
import selectByPostId from "./selectPostById.js";
import deletePostById from "./deletePost.js"
import selectIdPostByIdUser from "./selectIdPostByIdUser.js"
import selectPosts from "./selectPosts.js"
import selectInteracts from "./selectInteracts.js"
import {IFukingLiked, modifyInteraction, dropInteraction} from "./interactPost.js"

export {insertPost, selectByPostId, deletePostById, selectIdPostByIdUser, selectPosts, selectInteracts, IFukingLiked, modifyInteraction, dropInteraction} ;