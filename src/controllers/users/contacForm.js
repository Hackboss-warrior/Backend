import generateError from "../../utils/generateError.js";
import insertForm from "../../models/users/insertContactForm.js";

const contacForm = async (req, res, next)=>{

const {asunto, email,body} = req.body
console.log(asunto, email,body);
try {

     await insertForm(asunto, email,body)
    
    res.send("Su exposición ha sido subida con el asunto: "+asunto)
} catch (error) {
    next(error)
}

}


export default contacForm