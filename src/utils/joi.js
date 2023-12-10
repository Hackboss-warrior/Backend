import Joi, { boolean, string } from "@hapi/joi";



//selecciona
const selectByIdValidation = (id) => {
    const schema = Joi.number().integer().positive();
    const validation = schema.validate(id);
    if (validation.error) {
        throw new Error(validation.error.message)
    }
}
//guardar nueva noticia
const createPostValidation = ({ title, files, topic, body, tags, AuthUserId }) => {
    const schema = Joi.object().keys({
        title: Joi.string().min(2).max(30).required(),
        files: string(),
        topic: Joi.string().min(20).max(100),
        body: Joi.string().min(40).max(600).required(),
        tags: Joi.object(),
        AuthUserId: Joi.number().integer().positive()
    })

    const validation = schema.validate({ title, files, topic, body, tags, AuthUserId })

    if (validation.error) {
        throw new Error(validation.error.message)
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