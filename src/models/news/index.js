// En models/news ubicaremos todas las querys realizadas a la base de datos para luego utilizarlas en las peticiones al servidor. p.e. insert into posts...
import insertPost from "./insertPost.js";
import {selectPostById, selectPostByIdLimit} from "./selectPostById.js";
import deletePostById from "./deletePost.js"
import selectIdPostByIdUser from "./selectIdPostByIdUser.js"
import selectPosts from "./selectPosts.js"
import selectInteracts from "./selectInteracts.js"
import {likeInteract, modifyInteraction, dropInteraction} from "./interactPost.js"
import updatePost from "./updatePost.js"
import filterPostByTags from "./filterPostByTags.js"

export {insertPost,selectPostByIdLimit, selectPostById, deletePostById, selectIdPostByIdUser, selectPosts, selectInteracts, likeInteract, modifyInteraction, dropInteraction, updatePost, filterPostByTags} ;