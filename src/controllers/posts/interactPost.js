import { IFukingLiked, modifyInteraction, selectInteracts, dropInteraction } from '../../models/news/index.js'

const intercatPost = async (req, res, next) => {

    try {
        const AuthUserId = req.auth.jwtPayLoad.id;
        let { like, postId } = req.body
        const selectPost = await selectInteracts(postId, AuthUserId)  

        if (selectPost === undefined){
            await IFukingLiked(like, postId, AuthUserId);
            res.status(200).send('Has interactuado correctamente👍')
        } else if (selectPost.postId === postId && selectPost.userId === AuthUserId && selectPost.interaction === like){
            await dropInteraction(like, postId, AuthUserId);
            res.status(200).send('Has borrado correctamente la interación👍')
        } else {
            console.log("modificar la interacion")
            await modifyInteraction(like, postId, AuthUserId);
            res.status(200).send('Has modificado la interación correctamente')
        }  

    } catch (error) {
        next(error)
    }
};

export default intercatPost;