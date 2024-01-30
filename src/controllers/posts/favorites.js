import { selectFavoriteByPost, saveFavorite, dropfavorite, selectFavoritesPosts } from "../../models/news/index.js"

const insertFavorite = async (req, res, next) => {

    try {
        const AuthUserId = req.auth.jwtPayLoad.id;
        let postId = req.params.id
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

///////////////////////////////////////////////////////////////////////////////////////////////
// const selectFavoritesById = async (req, res, next) => {
//     try {
//         const AuthUserId = req.auth.jwtPayLoad.id;
//         const favoritos = await selectFavoritesPostsById(AuthUserId);
//         res.send(favoritos)

//     } catch (error) {
//         next(error)
//     }
// };



export { selectFavorites, insertFavorite }