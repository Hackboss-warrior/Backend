import { IFukingLiked, IFukingHated } from '../../models/news/interactPost.js'
import generateError from '../../utils/generateError.js';
const intercatPost = async (req, res, next) => {

 try {

    const AuthUserId = req.auth.id;
        if (!AuthUserId) {
            generateError("Debe loguearse antes de realizar cambios", 401);
        }

        //Joi
   


        
        const { like, postId } = req.body
        console.log({ like, postId });
        if (!like) {
            console.error('vacio');
        }
        let binaryLikes;
        if (like === true) {
            binaryLikes = 1
            await IFukingLiked(binaryLikes, postId,AuthUserId);
            res.status(200).send('👍')

        }
        if (like === false) {
            binaryLikes = 0
            await IFukingHated(binaryLikes, postId,AuthUserId);
            res.status(200).send('👎')
        }



    } catch (error) {

        next(error)
    }
};
export default intercatPost;