
import { selectFavoriteByPost, saveFavorite, dropfavorite, selectFavoritesPosts, selectPostByIdLimit } from "../../models/news/index.js"
import generateError from "../../utils/generateError.js";

const insertFavorite = async (req, res, next) => {


    try {
        const AuthUserId = req.auth.jwtPayLoad.id;
        let postId = req.params.id

        const validator = await selectPostByIdLimit(postId)
        if (!validator) {
            generateError('El post que intentas añadir a favoritos no existe ', 404)
        }


        const selectPost = await selectFavoriteByPost(postId, AuthUserId)
        if (selectPost === undefined) {
            await saveFavorite(postId, AuthUserId);
            res.status(200).send('Has almacenado en favoritos 👍')
        } else {
            await dropfavorite(postId, AuthUserId);
            res.status(200).send('borrado de favoritos👍')
        }
    } catch (error) {
        next(error)
    }
};


const selectFavorites = async (req, res, next) => {
    try {
        const AuthUserId = req.auth.jwtPayLoad.id;
        const favoritos = await selectFavoritesPosts(AuthUserId);
        res.send(favoritos)

    } catch (error) {
        next(error)
    }
};





export { selectFavorites, insertFavorite }