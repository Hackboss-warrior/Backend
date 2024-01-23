import insertForm from "../../models/users/insertContactForm.js";
import {createContactMessageValidation} from "../../utils/joi.js"
const contacForm = async (req, res, next) => {

    const { subject, email, body } = req.body
    console.log(subject, email, body);
    try {
        createContactMessageValidation({ subject, email, body })
        await insertForm(subject, email, body)

        res.send("Su exposición ha sido subida con el asunto: " + subject)
    } catch (error) {
        next(error)
    }

}


export default contacForm