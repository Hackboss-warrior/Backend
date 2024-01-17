import { likeInteract, modifyInteraction, selectInteracts, dropInteraction, selectPostByIdLimit } from '../../models/news/index.js'
import generateError from '../../utils/generateError.js';


const interactPost = async (req, res, next) => {

    try {
        const AuthUserId = req.auth.jwtPayLoad.id;
        let { like, postId } = req.body

        const validator = await selectPostByIdLimit(postId)


        if (!validator) {
            generateError('El post con el que intentas interactuar no existe', 404)
        }


        const selectPost = await selectInteracts(postId, AuthUserId)
        if (selectPost === undefined) {
            await likeInteract(like, postId, AuthUserId);
            res.status(200).send('Has interactuado correctamente👍')
        } else if (selectPost.interaction === like) {
            await dropInteraction(like, postId, AuthUserId);
            res.status(200).send('Has borrado correctamente la interación👍')
        } else {
            await modifyInteraction(like, postId, AuthUserId);
            res.status(200).send('Has modificado la interación correctamente')
        }

    } catch (error) {
        next(error)
    }
};

export default interactPost;