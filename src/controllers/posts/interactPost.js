import { IFukingLiked, IFukingHated } from '../../models/news/interactPost.js'
import generateError from '../../utils/generateError.js';
const intercatPost = async (req, res, next) => {

    try {

        const AuthUserId = req.auth.id;

        const { like, postId } = req.body
        //Joi





        console.log({ like, postId });
        if (!like) {
            generateError("No se ha podido realizar la operación", 400);
        }
        let binaryLikes;
        if (like === true) {
            binaryLikes = 1
            await IFukingLiked(binaryLikes, postId, AuthUserId);
            res.status(200).send('👍')

        }
        if (like === false) {
            binaryLikes = 0
            await IFukingHated(binaryLikes, postId, AuthUserId);
            res.status(200).send('👎')
        }



    } catch (error) {

        next(error)
    }
};
export default intercatPost;