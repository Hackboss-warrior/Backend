import Joi from "joi";
import generateError from "./generateError.js";


//selecciona
const selectByIdValidation = (id) => {
    const schema = Joi.number().integer().positive();
    const validation = schema.validate(id);
    if (validation.error) {
        throw new Error(validation.error.message)
    }
}
//guardar nueva noticia
const createPostValidation = ({ title, files, topic, body, tags }) => {
    const schema = Joi.object().keys({
        title: Joi.string().min(2).max(30).required(),
        files: Joi.string(),
        topic: Joi.string().min(20).max(100),
        body: Joi.string().max(600),
        tags: Joi.object(),
    })

    const validation = schema.validate({ title, files, topic, body, tags })
    
    if (validation.error) {
        generateError(validation.error.message, 400)
    }
}
//crear una reacción
const interactPostValidation = ({ like, postId, AuthUserId }) => {
    const schema = Joi.object().keys({
        like: boolean(),
        postId: Joi.number().integer().positive(),
        AuthUserId: Joi.number().integer().positive(),
    });
    const validation = schema.validate({ like, postId, AuthUserId })

    if (validation.error) {
        throw new Error(validation.error.message)
    }
}

export { selectByIdValidation, createPostValidation, interactPostValidation }